import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { route } from '../actions/directions'
import { getPlaces } from '../selectors/places'
import { getDirections } from '../selectors/directions'
import Map from '../components/map'

export class MapContainer extends Component {
  static propTypes = {
    places: PropTypes.arrayOf(PropTypes.object).isRequired,
    directions: PropTypes.object,
    route: PropTypes.func
  }

  render() {
    const { places, directions, route } = this.props
    return (
      <Map
        places={places}
        directions={directions}
        route={route}
        isMarkerShown={false}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=directions"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    )
  }
}

const mapStateToProps = state => ({
  places: getPlaces(state),
  directions: getDirections(state)
})

const mapDispatchToProps = dispatch => ({
  route: bindActionCreators(route, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer)
