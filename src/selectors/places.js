import { denormalize } from 'normalizr'
import { placeSchema } from '../schema'

export const getPlaces = ({ data }) =>
  denormalize(data.placeIds, [placeSchema], data.entities)
