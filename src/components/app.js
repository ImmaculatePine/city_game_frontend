import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import GamesListContainer from '../containers/games-list'
import GameContainer from '../containers/game'
import 'bulma/bulma.sass'
import '@fortawesome/fontawesome-free-webfonts/scss/fontawesome.scss'
import '@fortawesome/fontawesome-free-webfonts/scss/fa-solid.scss'

export default class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={GamesListContainer} />
        <Route path="/games/:id" component={GameContainer} />
      </div>
    )
  }
}
