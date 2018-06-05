import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default class GamesList extends Component {
  static propTypes = {
    games: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchGames: PropTypes.func.isRequired
  }

  render() {
    const { games } = this.props
    return (
      <div>
        <h1>Games</h1>
        <ul>
          {games.map(game => (
            <li key={game.id}>
              <Link to={`/games/${game.id}`}>{game.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
