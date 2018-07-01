import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getDirections } from '../selectors/directions'
import { GOOGLE_MAPS_API_KEY } from '../config'
import Map from '../components/map'

export class MapContainer extends Component {
  static propTypes = {
    waypoints: PropTypes.arrayOf(PropTypes.object).isRequired,
    directions: PropTypes.object
  }

  render() {
    return (
      <Map
        {...this.props}
        isMarkerShown={false}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=directions&key=${GOOGLE_MAPS_API_KEY}`}
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '100%' }} />}
        mapElement={<div style={{ height: '100%' }} />}
      />
    )
  }
}

const mapStateToProps = state => ({
  directions: getDirections(state)
})

const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer)
