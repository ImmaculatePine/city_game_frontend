import React, { Component } from 'react'
import { Route, Link, NavLink } from 'react-router-dom'
import GamesListContainer from '../containers/games-list'
import GameContainer from '../containers/game'
import 'bulma/bulma.sass'
import '@fortawesome/fontawesome-free-webfonts/scss/fontawesome.scss'
import '@fortawesome/fontawesome-free-webfonts/scss/fa-solid.scss'

export default class App extends Component {
  render() {
    return (
      <div>
        <nav
          className="navbar is-info"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <span className="icon">
                <i className="fas fa-map" />
              </span>
              <b>City Game</b>
            </Link>
          </div>
          <div className="navbar-menu">
            <div className="navbar-start">
              <NavLink
                exact
                to="/"
                className="navbar-item"
                activeClassName="is-active"
              >
                Games
              </NavLink>
              <NavLink
                to="/places"
                className="navbar-item"
                activeClassName="is-active"
              >
                Places
              </NavLink>
            </div>
          </div>
        </nav>
        <Route exact path="/" component={GamesListContainer} />
        <Route path="/games/:id" component={GameContainer} />
        <Route path="/places" render={() => <h1>Places list</h1>} />
      </div>
    )
  }
}
