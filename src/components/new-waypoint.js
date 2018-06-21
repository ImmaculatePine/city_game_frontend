import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Autosuggest from 'react-autosuggest'
import classNames from 'classnames'

export default class NewWaypoint extends Component {
  static propTypes = {
    game: PropTypes.object,
    places: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSubmit: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      placeId: '',
      placeName: '',
      suggestions: []
    }

    this.getSuggestions = this.getSuggestions.bind(this)
    this.getSuggestionValue = this.getSuggestionValue.bind(this)
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(
      this
    )
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(
      this
    )
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this)
    this.onPlaceChange = this.onPlaceChange.bind(this)
    this.onPlaceBlur = this.onPlaceBlur.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getSuggestions(value) {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length
    const { places, game } = this.props
    const waypoints = game.waypoints || []
    const usedPlaceIds = waypoints.map(waypoint => waypoint.place.id)
    const notUsedPlaces = places.filter(
      place => !usedPlaceIds.includes(place.id)
    )

    return inputLength === 0
      ? []
      : notUsedPlaces.filter(
          place => place.name.toLowerCase().slice(0, inputLength) === inputValue
        )
  }

  getSuggestionValue(suggestion) {
    return suggestion.name
  }

  onSuggestionsFetchRequested({ value }) {
    this.setState({
      suggestions: this.getSuggestions(value)
    })
  }

  onSuggestionsClearRequested() {
    this.setState({
      suggestions: []
    })
  }

  onSuggestionSelected(
    _event,
    {
      suggestion: { id, name }
    }
  ) {
    this.setState({
      placeId: id,
      placeName: name
    })
  }

  renderSuggestion(suggestion, { isHighlighted }) {
    const classes = classNames('card', {
      'has-background-white-ter': isHighlighted
    })

    return (
      <div className={classes}>
        {suggestion.name} <small>{suggestion.address}</small>
      </div>
    )
  }

  onPlaceChange(_event, { newValue }) {
    this.setState({
      placeName: newValue
    })
  }

  onPlaceBlur(_event, { highlightedSuggestion }) {
    if (highlightedSuggestion) {
      const { id, name } = highlightedSuggestion
      this.setState({
        placeId: id,
        placeName: name
      })
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    const { game, onSubmit } = this.props
    const { placeId } = this.state
    const gameId = game.id
    const positions = (game.waypoints || []).map(waypoint => waypoint.position)
    const position = Math.max(-1, ...positions) + 1
    onSubmit(gameId, { placeId, position })
    this.setState({
      placeId: '',
      placeName: ''
    })
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
    const { placeName, suggestions } = this.state
    const { game } = this.props

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
                  <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={
                      this.onSuggestionsFetchRequested
                    }
                    onSuggestionsClearRequested={
                      this.onSuggestionsClearRequested
                    }
                    onSuggestionSelected={this.onSuggestionSelected}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={{
                      className: 'input',
                      value: placeName,
                      onChange: this.onPlaceChange,
                      onBlur: this.onPlaceBlur,
                      autoFocus: true
                    }}
                  />
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
