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
        <table className="table">
          <tbody>
            {games.map(game => (
              <tr key={game.id}>
                <td>
                  <Link to={`/games/${game.id}`}>{game.name}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}
