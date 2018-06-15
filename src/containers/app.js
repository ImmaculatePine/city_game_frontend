import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { fetchPlaces } from '../actions/places'
import App from '../components/app'

export class AppContainer extends Component {
  static propTypes = {
    fetchPlaces: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { fetchPlaces } = this.props
    fetchPlaces()
  }

  render() {
    return <App />
  }
}

const mapStateToProps = null

const mapDispatchToProps = dispatch => ({
  fetchPlaces: bindActionCreators(fetchPlaces, dispatch)
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AppContainer)
)
