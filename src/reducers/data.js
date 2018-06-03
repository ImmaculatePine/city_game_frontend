import { merge } from 'lodash'
import { FETCH_PLACES_SUCCESS } from '../constants/places'
import { FETCH_GAMES_SUCCESS } from '../constants/games'
import { ROUTE_SUCCESS } from '../constants/directions'

const initialState = {
  entities: {
    places: {},
    games: {},
    directions: null
  },
  placeIds: [],
  gameIds: []
}

export default (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case FETCH_PLACES_SUCCESS:
      return {
        ...state,
        entities: merge({}, state.entities, payload.entities),
        placeIds: [...state.placeIds, ...payload.result]
      }

    case FETCH_GAMES_SUCCESS:
      return {
        ...state,
        entities: merge({}, state.entities, payload.entities),
        gameIds: [...state.gameIds, ...payload.result]
      }

    case ROUTE_SUCCESS:
      return {
        ...state,
        entities: {
          ...state.entities,
          directions: payload
        }
      }
    default:
      return state
  }
}
