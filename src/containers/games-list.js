import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchGames } from '../actions/games'
import { getGames } from '../selectors/games'
import GamesList from '../components/games-list'

export class GamesListContainer extends Component {
  static propTypes = {
    games: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchGames: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { fetchGames } = this.props
    fetchGames()
  }

  render() {
    return <GamesList {...this.props} />
  }
}

const mapStateToProps = state => ({
  games: getGames(state)
})

const mapDispatchToProps = dispatch => ({
  fetchGames: bindActionCreators(fetchGames, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(GamesListContainer)
