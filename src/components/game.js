/* global google */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Map from '../containers/map'
import NewWaypoint from '../containers/new-waypoint'

export default class App extends Component {
  static propTypes = {
    game: PropTypes.object,
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
          <ul>
            {waypoints.map(waypoint => (
              <li key={waypoint.id}>
                {waypoint.place.name} <small>{waypoint.place.address}</small>
              </li>
            ))}
          </ul>
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
