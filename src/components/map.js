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
    directions: PropTypes.object
  }

  render() {
    const { directions } = this.props
    return (
      <div>
        <GoogleMap defaultZoom={2} defaultCenter={{ lat: 0, lng: 0 }}>
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </div>
    )
  }
}

export default withScriptjs(withGoogleMap(Map))
