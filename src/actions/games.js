import { normalize } from 'normalizr'
import { gameSchema } from '../schema'
import GamesAPI from '../api/games'
import {
  FETCH_GAMES_REQUEST,
  FETCH_GAMES_SUCCESS,
  FETCH_GAMES_FAILURE,
  FETCH_GAME_REQUEST,
  FETCH_GAME_SUCCESS,
  FETCH_GAME_FAILURE,
  UPDATE_GAME_REQUEST,
  UPDATE_GAME_SUCCESS,
  UPDATE_GAME_FAILURE
} from '../constants/games'

const fetchGamesRequest = () => ({
  type: FETCH_GAMES_REQUEST
})

const fetchGamesSuccess = ({ data }) => {
  return {
    type: FETCH_GAMES_SUCCESS,
    payload: normalize(data, [gameSchema])
  }
}

const fetchGamesFailure = error => ({
  type: FETCH_GAMES_FAILURE,
  payload: error
})

export const fetchGames = () => {
  return dispatch => {
    dispatch(fetchGamesRequest())

    return GamesAPI.fetch()
      .then(({ data }) => dispatch(fetchGamesSuccess(data)))
      .catch(error => dispatch(fetchGamesFailure(error)))
  }
}

const fetchGameRequest = () => ({
  type: FETCH_GAME_REQUEST
})

const fetchGameSuccess = ({ data }) => {
  return {
    type: FETCH_GAME_SUCCESS,
    payload: normalize(data, gameSchema)
  }
}

const fetchGameFailure = error => ({
  type: FETCH_GAME_FAILURE,
  payload: error
})

export const fetchGame = id => {
  return dispatch => {
    dispatch(fetchGameRequest())

    return GamesAPI.fetchOne(id)
      .then(({ data }) => dispatch(fetchGameSuccess(data)))
      .catch(error => dispatch(fetchGameFailure(error)))
  }
}

const updateGameRequest = () => ({
  type: UPDATE_GAME_REQUEST
})

const updateGameSuccess = ({ data }) => {
  return {
    type: UPDATE_GAME_SUCCESS,
    payload: normalize(data, gameSchema)
  }
}

const updateGameFailure = error => ({
  type: UPDATE_GAME_FAILURE,
  payload: error
})

export const updateGame = (id, game) => {
  return dispatch => {
    dispatch(updateGameRequest())

    return GamesAPI.update(id, game)
      .then(({ data }) => dispatch(updateGameSuccess(data)))
      .catch(error => dispatch(updateGameFailure(error)))
  }
}

export const reorderWaypoints = (game, waypointsOrder) => {
  const [origin, ...tail] = game.waypoints
  const destination = tail.slice(-1)[0]
  const waypoints = tail.slice(0, -1)

  return updateGame(game.id, {
    waypoints: [
      { id: origin.id, position: 0 },
      ...waypointsOrder.map((position, index) => ({
        id: waypoints[position].id,
        position: index + 1
      })),
      { id: destination.id, position: waypoints.length + 1 }
    ]
  })
}
