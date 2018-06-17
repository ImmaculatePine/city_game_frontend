import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createWaypoint } from '../actions/waypoints'
import { getGame } from '../selectors/games'
import { getPlaces } from '../selectors/places'
import NewWaypoint from '../components/new-waypoint'

export class NewWaypointContainer extends Component {
  static propTypes = {
    game: PropTypes.object,
    places: PropTypes.arrayOf(PropTypes.object).isRequired,
    createWaypoint: PropTypes.func.isRequired
  }

  render() {
    const { game, places, createWaypoint } = this.props
    return <NewWaypoint game={game} places={places} onSubmit={createWaypoint} />
  }
}

const mapStateToProps = (state, ownProps) => ({
  game: getGame(state, ownProps.match.params.id),
  places: getPlaces(state)
})

const mapDispatchToProps = dispatch => ({
  createWaypoint: bindActionCreators(createWaypoint, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(
  NewWaypointContainer
)
