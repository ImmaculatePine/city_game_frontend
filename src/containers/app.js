import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchPlaces } from '../actions/places'
import { route } from '../actions/directions'
import { getPlaces } from '../selectors/places'
import App from '../components/app'

export class AppContainer extends Component {
  static propTypes = {
    places: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchPlaces: PropTypes.func.isRequired,
    route: PropTypes.func.isRequired
  }

  componentDidMount() {
    const fetchPlaces = this.props.fetchPlaces
    fetchPlaces()
  }

  render() {
    return <App {...this.props} />
  }
}

const mapStateToProps = state => ({
  places: getPlaces(state)
})

const mapDispatchToProps = dispatch => ({
  fetchPlaces: bindActionCreators(fetchPlaces, dispatch),
  route: bindActionCreators(route, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
