import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createPlace } from '../actions/places'
import PlaceForm from '../components/place-form'

export class NewPlaceContainer extends Component {
  static propTypes = {
    createPlace: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  }

  render() {
    const { createPlace, history } = this.props
    const onSuccess = () => history.push('/places')
    return (
      <PlaceForm
        onSubmit={createPlace}
        onSuccess={onSuccess}
        title="Add new place"
      />
    )
  }
}

const mapStateToProps = null

const mapDispatchToProps = dispatch => ({
  createPlace: bindActionCreators(createPlace, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(NewPlaceContainer)
