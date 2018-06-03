/* global google */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MapContainer from '../containers/map'
import 'bulma/bulma.sass'

export default class App extends Component {
  static propTypes = {
    places: PropTypes.arrayOf(PropTypes.object).isRequired,
    games: PropTypes.arrayOf(PropTypes.object).isRequired,
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
    const { places, games } = this.props
    return (
      <section className="section">
        <div className="columns">
          <div className="column is-one-third">
            <h1>Games</h1>
            <ul>{games.map(game => <li key={game.id}>{game.name}</li>)}</ul>

            <h1>Places</h1>
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
      </section>
    )
  }
}
