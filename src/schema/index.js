import { schema } from 'normalizr'

export const placeSchema = new schema.Entity('places')
export const waypointSchema = new schema.Entity('waypoints', {
  place: placeSchema
})
export const gameSchema = new schema.Entity('games', {
  waypoints: [waypointSchema]
})
