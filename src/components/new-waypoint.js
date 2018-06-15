import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class NewWaypoint extends Component {
  static propTypes = {
    game: PropTypes.object.isRequired,
    places: PropTypes.arrayOf(PropTypes.object).isRequired,
    createWaypoint: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = { placeId: '' }

    this.onPlaceSelect = this.onPlaceSelect.bind(this)
    this.onClickCreate = this.onClickCreate.bind(this)
  }

  onPlaceSelect(event) {
    this.setState({ placeId: event.target.value })
  }

  onClickCreate(event) {
    event.preventDefault()
    const { game, createWaypoint } = this.props
    const { placeId } = this.state
    const gameId = game.id
    const position = (game.waypoints || []).length
    createWaypoint(gameId, { placeId, position })
  }

  render() {
    const { places, game } = this.props
    const waypoints = game.waypoints || []
    const usedPlaceIds = waypoints.map(waypoint => waypoint.place.id)
    const notUsedPlaces = places.filter(
      place => !usedPlaceIds.includes(place.id)
    )

    return (
      <div>
        <select value={this.state.placeId} onChange={this.onPlaceSelect}>
          <option value="" />
          {notUsedPlaces.map(place => (
            <option key={place.id} value={place.id}>
              {place.name}
            </option>
          ))}
        </select>
        <button className="button" onClick={this.onClickCreate}>
          Add
        </button>
      </div>
    )
  }
}
