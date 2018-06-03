import { denormalize } from 'normalizr'
import { gameSchema } from '../schema'

export const getGames = ({ data }) =>
  denormalize(data.gameIds, [gameSchema], data.entities)
