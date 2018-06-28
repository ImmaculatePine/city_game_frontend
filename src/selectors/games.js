import { denormalize } from 'normalizr'
import { gameSchema } from '../schema'

export const getGames = ({ data }) =>
  denormalize(data.gameIds, [gameSchema], data.entities).map(game => ({
    ...game,
    waypoints: (game.waypoints || []).sort((a, b) => a.position - b.position)
  }))

export const getGame = (state, id) =>
  getGames(state).find(game => game.id == id)
