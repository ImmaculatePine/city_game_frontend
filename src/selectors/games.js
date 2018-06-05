import { denormalize } from 'normalizr'
import { gameSchema } from '../schema'

export const getGames = ({ data }) =>
  denormalize(data.gameIds, [gameSchema], data.entities)

export const getGame = (state, id) =>
  getGames(state).find(game => game.id == id)
