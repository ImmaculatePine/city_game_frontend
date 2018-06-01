/* global google */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} from 'react-google-maps'

export class Map extends Component {
  static propTypes = {
    places: PropTypes.arrayOf(PropTypes.object).isRequired,
    directions: PropTypes.object,
    route: PropTypes.func
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
    const { directions } = this.props
    return (
      <div>
        <button onClick={this.onClickOptimize}>Optimize route</button>
        <GoogleMap defaultZoom={2} defaultCenter={{ lat: 0, lng: 0 }}>
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </div>
    )
  }
}

export default withScriptjs(withGoogleMap(Map))
