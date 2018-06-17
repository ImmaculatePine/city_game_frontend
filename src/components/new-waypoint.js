import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default class NewWaypoint extends Component {
  static propTypes = {
    game: PropTypes.object,
    places: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSubmit: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = { placeId: '' }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange({ target: { name, value } }) {
    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const { game, onSubmit } = this.props
    const { placeId } = this.state
    const gameId = game.id
    const positions = (game.waypoints || []).map(waypoint => waypoint.position)
    const position = Math.max(-1, ...positions) + 1
    onSubmit(gameId, { placeId, position })
  }

  render() {
    const { game } = this.props
    if (game) {
      return this._renderModal()
    } else {
      return this._renderNotFound()
    }
  }

  _renderModal() {
    const { places, game } = this.props
    const waypoints = game.waypoints || []
    const usedPlaceIds = waypoints.map(waypoint => waypoint.place.id)
    const notUsedPlaces = places.filter(
      place => !usedPlaceIds.includes(place.id)
    )

    return (
      <div className="modal is-active">
        <div className="modal-background" />
        <div className="modal-card">
          <form onSubmit={this.handleSubmit}>
            <header className="modal-card-head">
              <p className="modal-card-title">Add waypoint</p>
            </header>

            <section className="modal-card-body">
              <div className="field">
                <div className="control">
                  <select
                    name="placeId"
                    value={this.state.placeId}
                    onChange={this.handleInputChange}
                  >
                    <option value="" />
                    {notUsedPlaces.map(place => (
                      <option key={place.id} value={place.id}>
                        {place.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            <footer className="modal-card-foot">
              <button className="button is-success" onClick={this.handleSubmit}>
                Add
              </button>
              <Link to={`/games/${game.id}`} className="button">
                Back
              </Link>
            </footer>
          </form>
        </div>
        <Link
          to={`/games/${game.id}`}
          className="modal-close is-large"
          aria-label="close"
        />
      </div>
    )
  }

  _renderNotFound() {
    return <div />
  }
}
