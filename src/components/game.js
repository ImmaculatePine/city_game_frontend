/* global google */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Map from '../containers/map'
import NewWaypoint from '../containers/new-waypoint'

export default class App extends Component {
  static propTypes = {
    game: PropTypes.object,
    deleteWaypoint: PropTypes.func.isRequired,
    route: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.onClickOptimize = this.onClickOptimize.bind(this)
  }

  onClickOptimize(e) {
    e.preventDefault()
    const places = this.props.game.waypoints.map(
      waypoint => waypoint.place.address
    )
    const [origin, ...tail] = places
    const destination = tail.slice(-1)[0]
    const waypoints = tail.slice(0, -1)
    this.props.route({
      origin,
      destination,
      waypoints,
      google: google
    })
  }

  onClickDelete(waypointId) {
    const { game, deleteWaypoint } = this.props
    deleteWaypoint(game.id, waypointId)
  }

  render() {
    const { game } = this.props
    return (
      <section className="section">
        <Link to="/">Back to games list</Link>
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
          <h1>{game.name}</h1>
          <button className="button" onClick={this.onClickOptimize}>
            Optimize route
          </button>
          <NewWaypoint game={game} />

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