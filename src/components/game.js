/* global google */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Map from '../containers/map'

export default class App extends Component {
  static propTypes = {
    game: PropTypes.object,
    reorderWaypoints: PropTypes.func.isRequired,
    deleteWaypoint: PropTypes.func.isRequired,
    route: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.onClickOptimize = this.onClickOptimize.bind(this)
  }

  onClickOptimize(e) {
    e.preventDefault()
    const { game, route, reorderWaypoints } = this.props
    const places = game.waypoints.map(waypoint => waypoint.place.address)
    const [origin, ...tail] = places
    const destination = tail.slice(-1)[0]
    const waypoints = tail.slice(0, -1)

    route({
      origin,
      destination,
      waypoints,
      google: google
    }).then(data =>
      reorderWaypoints(game, data.payload.routes[0].waypoint_order)
    )
  }

  onClickDelete(waypointId) {
    const { game, deleteWaypoint } = this.props
    deleteWaypoint(game.id, waypointId)
  }

  render() {
    const { game } = this.props
    return (
      <section className="section">
        {game ? this._renderGame() : this._renderNotFound()}
      </section>
    )
  }

  _renderGame() {
    const { game } = this.props
    const waypoints = game.waypoints || []
    return (
      <div className="columns">
        <div className="column is-one-third">
          <h1 className="title">{game.name}</h1>

          <nav className="level is-mobile">
            <div className="level-left">
              <div className="level-item">
                <Link
                  className="button is-success"
                  to={`/games/${game.id}/waypoints/new`}
                >
                  <span className="icon is-small">
                    <i className="fas fa-plus" />
                  </span>
                  <span>Add waypoint</span>
                </Link>
              </div>

              <div className="level-item">
                <button className="button" onClick={this.onClickOptimize}>
                  <span className="icon is-small">
                    <i className="fas fa-calculator" />
                  </span>
                  <span>Optimize route</span>
                </button>
              </div>
            </div>
          </nav>

          <table className="table">
            <tbody>
              {waypoints.map(waypoint => (
                <tr key={waypoint.id}>
                  <td>{waypoint.place.name}</td>
                  <td>
                    <small>{waypoint.place.address}</small>
                  </td>
                  <td>
                    <button
                      className="button is-danger is-outlined"
                      onClick={() => this.onClickDelete(waypoint.id)}
                    >
                      <span className="icon is-small">
                        <i className="fas fa-times" />
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="column">
          <Map />
        </div>
      </div>
    )
  }

  _renderNotFound() {
    return <div>Nothing here...</div>
  }
}
