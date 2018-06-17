import { mergeWith, uniq, isArray } from 'lodash'
import { FETCH_PLACES_SUCCESS, CREATE_PLACE_SUCCESS } from '../constants/places'
import { FETCH_GAMES_SUCCESS, FETCH_GAME_SUCCESS } from '../constants/games'
import {
  CREATE_WAYPOINT_SUCCESS,
  DELETE_WAYPOINT_SUCCESS
} from '../constants/waypoints'
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

const gameWaypoints = (state, gameId) =>
  state.entities.games[gameId].waypoints || []

const rewriteArrays = (objValue, srcValue) => {
  if (isArray(objValue)) {
    return srcValue
  }
}

const merge = (...args) => mergeWith.apply(undefined, [...args, rewriteArrays])

export default (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case FETCH_PLACES_SUCCESS:
      return {
        ...state,
        entities: merge({}, state.entities, payload.entities),
        placeIds: uniq([...state.placeIds, ...payload.result])
      }

    case CREATE_PLACE_SUCCESS:
      return {
        ...state,
        entities: merge({}, state.entities, payload.entities),
        placeIds: uniq([...state.placeIds, payload.result])
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
                ...gameWaypoints(state, payload.gameId),
                payload.data.result
              ])
            }
          }
        })
      }

    case DELETE_WAYPOINT_SUCCESS:
      return {
        ...state,
        entities: merge({}, state.entities, {
          games: {
            [payload.gameId]: {
              waypoints: gameWaypoints(state, payload.gameId).filter(
                id => id != payload.waypointId
              )
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
