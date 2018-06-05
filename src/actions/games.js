import { normalize } from 'normalizr'
import { gameSchema } from '../schema'
import GamesAPI from '../api/games'
import {
  FETCH_GAMES_REQUEST,
  FETCH_GAMES_SUCCESS,
  FETCH_GAMES_FAILURE,
  FETCH_GAME_REQUEST,
  FETCH_GAME_SUCCESS,
  FETCH_GAME_FAILURE
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

    GamesAPI.fetch()
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

    GamesAPI.fetchOne(id)
      .then(({ data }) => dispatch(fetchGameSuccess(data)))
      .catch(error => dispatch(fetchGameFailure(error)))
  }
}
