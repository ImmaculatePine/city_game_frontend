import { merge, uniq } from 'lodash'
import { FETCH_PLACES_SUCCESS } from '../constants/places'
import { FETCH_GAMES_SUCCESS, FETCH_GAME_SUCCESS } from '../constants/games'
import { CREATE_WAYPOINT_SUCCESS } from '../constants/waypoints'
import { ROUTE_SUCCESS } from '../constants/directions'

const initialState = {
  entities: {
    places: {},
    games: {},
    waypoints: {},
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
        placeIds: uniq([...state.placeIds, ...payload.result])
      }

    case FETCH_GAMES_SUCCESS:
      return {
        ...state,
        entities: merge({}, state.entities, payload.entities),
        gameIds: uniq([...state.gameIds, ...payload.result])
      }

    case FETCH_GAME_SUCCESS:
      return {
        ...state,
        entities: merge({}, state.entities, payload.entities),
        gameIds: uniq([...state.gameIds, payload.result])
      }

    case CREATE_WAYPOINT_SUCCESS:
      return {
        ...state,
        entities: merge({}, state.entities, payload.data.entities, {
          games: {
            [payload.gameId]: {
              waypoints: uniq([
                ...(state.entities.games[payload.gameId].waypoints || []),
                payload.data.result
              ])
            }
          }
        })
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
