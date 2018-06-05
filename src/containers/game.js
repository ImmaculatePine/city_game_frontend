import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchGame } from '../actions/games'
import { fetchPlaces } from '../actions/places'
import { route } from '../actions/directions'
import { getGame } from '../selectors/games'
import { getPlaces } from '../selectors/places'
import Game from '../components/game'

export class GameContainer extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    game: PropTypes.object,
    places: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchGame: PropTypes.func.isRequired,
    fetchPlaces: PropTypes.func.isRequired,
    route: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { fetchGame, fetchPlaces, match } = this.props
    fetchGame(match.params.id)
    fetchPlaces()
  }

  render() {
    return <Game {...this.props} />
  }
}

const mapStateToProps = (state, ownProps) => ({
  game: getGame(state, ownProps.match.params.id),
  places: getPlaces(state)
})

const mapDispatchToProps = dispatch => ({
  fetchGame: bindActionCreators(fetchGame, dispatch),
  fetchPlaces: bindActionCreators(fetchPlaces, dispatch),
  route: bindActionCreators(route, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)
