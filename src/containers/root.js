import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from '../store/configure-store'
import AppContainer from './app'

const store = configureStore()

export default class RootContainer extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <AppContainer />
        </BrowserRouter>
      </Provider>
    )
  }
}
