import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchGame } from '../actions/games'
import { route } from '../actions/directions'
import { getGame } from '../selectors/games'
import Game from '../components/game'

export class GameContainer extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    game: PropTypes.object,
    fetchGame: PropTypes.func.isRequired,
    route: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { fetchGame, match } = this.props
    fetchGame(match.params.id)
  }

  render() {
    return <Game {...this.props} />
  }
}

const mapStateToProps = (state, ownProps) => ({
  game: getGame(state, ownProps.match.params.id)
})

const mapDispatchToProps = dispatch => ({
  fetchGame: bindActionCreators(fetchGame, dispatch),
  route: bindActionCreators(route, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)
