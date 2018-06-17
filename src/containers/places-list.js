import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchPlaces, deletePlace } from '../actions/places'
import { getPlaces } from '../selectors/places'
import PlacesList from '../components/places-list'

export class PlacesListContainer extends Component {
  static propTypes = {
    places: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchPlaces: PropTypes.func.isRequired,
    deletePlace: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { fetchPlaces } = this.props
    fetchPlaces()
  }

  render() {
    return <PlacesList {...this.props} />
  }
}

const mapStateToProps = state => ({
  places: getPlaces(state)
})

const mapDispatchToProps = dispatch => ({
  fetchPlaces: bindActionCreators(fetchPlaces, dispatch),
  deletePlace: bindActionCreators(deletePlace, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(PlacesListContainer)
