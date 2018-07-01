import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer
} from 'react-google-maps'

const geolocationToPosition = ({ lat, lon }) => ({ lat, lng: lon })

const calculateDefaultPosition = waypoints => {
  if (waypoints.length > 0) {
    return {
      defaultZoom: 14,
      defaultCenter: geolocationToPosition(waypoints[0].place.geolocation)
    }
  } else {
    return {
      defaultZoom: 2,
      defaultCenter: { lat: 0, lng: 0 }
    }
  }
}

export class Map extends Component {
  static propTypes = {
    waypoints: PropTypes.arrayOf(PropTypes.object).isRequired,
    directions: PropTypes.object
  }

  render() {
    const { waypoints, directions } = this.props
    const waypointsWithGeolocations = waypoints.filter(
      waypoint => waypoint.place.geolocation
    )
    const { defaultZoom, defaultCenter } = calculateDefaultPosition(
      waypointsWithGeolocations
    )

    return (
      <div>
        <GoogleMap defaultZoom={defaultZoom} defaultCenter={defaultCenter}>
          {directions && <DirectionsRenderer directions={directions} />}
          {!directions &&
            waypointsWithGeolocations.map(waypoint =>
              this._renderWaypoint(waypoint)
            )}
        </GoogleMap>
      </div>
    )
  }

  _renderWaypoint({ id, position, place: { geolocation } }) {
    const label = String(position + 1)
    return (
      <Marker
        key={id}
        position={geolocationToPosition(geolocation)}
        label={label}
      />
    )
  }
}

export default withScriptjs(withGoogleMap(Map))
