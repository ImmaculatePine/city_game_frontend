/* global google */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import MapContainer from '../containers/map'

export default class App extends Component {
  static propTypes = {
    game: PropTypes.object,
    places: PropTypes.arrayOf(PropTypes.object).isRequired,
    route: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.onClickOptimize = this.onClickOptimize.bind(this)
  }

  onClickOptimize(e) {
    e.preventDefault()
    const places = this.props.places.map(place => place.address)
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
    const { game, places } = this.props
    return (
      <div className="columns">
        <div className="column is-one-third">
          <h1>{game.name}</h1>
          <button className="button" onClick={this.onClickOptimize}>
            Optimize route
          </button>
          <ul>
            {places.map(place => <li key={place.id}>{place.address}</li>)}
          </ul>
        </div>
        <div className="column">
          <MapContainer />
        </div>
      </div>
    )
  }

  _renderNotFound() {
    return <div>Nothing here...</div>
  }
}
