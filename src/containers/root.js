import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from '../store/configure-store'
import AppContainer from './app'

const store = configureStore()

export default class RootContainer extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}
