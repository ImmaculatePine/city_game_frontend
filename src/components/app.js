import React, { Component } from 'react'
import { Route, Link, NavLink } from 'react-router-dom'
import GamesList from '../containers/games-list'
import Game from '../containers/game'
import PlacesList from '../containers/places-list'
import NewPlace from '../containers/new-place'
import NewWaypoint from '../containers/new-waypoint'
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
        <Route exact path="/" component={GamesList} />
        <Route path="/games/:id" component={Game} />
        <Route path="/games/:id/waypoints/new" component={NewWaypoint} />
        <Route path="/places" component={PlacesList} />
        <Route path="/places/new" component={NewPlace} />
      </div>
    )
  }
}
