import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchPlaces } from '../actions/places'
import { getPlaces } from '../selectors/places'

export class App extends Component {
  static propTypes = {
    places: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchPlaces: PropTypes.func.isRequired
  }

  componentDidMount() {
    const fetchPlaces = this.props.fetchPlaces
    fetchPlaces()
  }

  render() {
    const places = this.props.places
    return (
      <ul>{places.map(place => <li key={place.id}>{place.address}</li>)}</ul>
    )
  }
}

const mapStateToProps = state => ({
  places: getPlaces(state)
})

const mapDispatchToProps = dispatch => ({
  fetchPlaces: bindActionCreators(fetchPlaces, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
