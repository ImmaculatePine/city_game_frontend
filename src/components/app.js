import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MapContainer from '../containers/map'

export default class App extends Component {
  static propTypes = {
    places: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchPlaces: PropTypes.func.isRequired
  }

  render() {
    const { places } = this.props
    return (
      <div>
        <ul>{places.map(place => <li key={place.id}>{place.address}</li>)}</ul>
        <MapContainer />
      </div>
    )
  }
}
