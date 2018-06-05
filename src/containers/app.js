import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import App from '../components/app'

export class AppContainer extends Component {
  render() {
    return <App />
  }
}

const mapStateToProps = null

const mapDispatchToProps = null

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AppContainer)
)
