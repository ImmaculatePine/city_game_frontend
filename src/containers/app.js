import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchPlaces } from '../actions/places'
import { fetchGames } from '../actions/games'
import { route } from '../actions/directions'
import { getPlaces } from '../selectors/places'
import { getGames } from '../selectors/games'
import App from '../components/app'

export class AppContainer extends Component {
  static propTypes = {
    places: PropTypes.arrayOf(PropTypes.object).isRequired,
    games: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchPlaces: PropTypes.func.isRequired,
    fetchGames: PropTypes.func.isRequired,
    route: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { fetchPlaces, fetchGames } = this.props
    fetchPlaces()
    fetchGames()
  }

  render() {
    return <App {...this.props} />
  }
}

const mapStateToProps = state => ({
  places: getPlaces(state),
  games: getGames(state)
})

const mapDispatchToProps = dispatch => ({
  fetchPlaces: bindActionCreators(fetchPlaces, dispatch),
  fetchGames: bindActionCreators(fetchGames, dispatch),
  route: bindActionCreators(route, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
