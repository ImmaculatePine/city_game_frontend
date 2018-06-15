import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createWaypoint } from '../actions/waypoints'
import { getPlaces } from '../selectors/places'
import NewWaypoint from '../components/new-waypoint'

export class NewWaypointContainer extends Component {
  static propTypes = {
    places: PropTypes.arrayOf(PropTypes.object).isRequired,
    createWaypoint: PropTypes.func.isRequired
  }

  render() {
    return <NewWaypoint {...this.props} />
  }
}

const mapStateToProps = state => ({
  places: getPlaces(state)
})

const mapDispatchToProps = dispatch => ({
  createWaypoint: bindActionCreators(createWaypoint, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(
  NewWaypointContainer
)
