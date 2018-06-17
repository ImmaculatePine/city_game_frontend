import { normalize } from 'normalizr'
import { waypointSchema } from '../schema'
import WaypointsAPI from '../api/waypoints'
import {
  CREATE_WAYPOINT_REQUEST,
  CREATE_WAYPOINT_SUCCESS,
  CREATE_WAYPOINT_FAILURE,
  DELETE_WAYPOINT_REQUEST,
  DELETE_WAYPOINT_SUCCESS,
  DELETE_WAYPOINT_FAILURE
} from '../constants/waypoints'

const createWaypointRequest = () => ({
  type: CREATE_WAYPOINT_REQUEST
})

const createWaypointSuccess = (gameId, { data }) => {
  return {
    type: CREATE_WAYPOINT_SUCCESS,
    payload: { gameId, data: normalize(data, waypointSchema) }
  }
}

const createWaypointFailure = error => ({
  type: CREATE_WAYPOINT_FAILURE,
  payload: error
})

export const createWaypoint = (gameId, params) => {
  return dispatch => {
    dispatch(createWaypointRequest())

    return WaypointsAPI.create(gameId, params)
      .then(({ data }) => dispatch(createWaypointSuccess(gameId, data)))
      .catch(error => dispatch(createWaypointFailure(error)))
  }
}

const deleteWaypointRequest = () => ({
  type: DELETE_WAYPOINT_REQUEST
})

const deleteWaypointSuccess = (gameId, waypointId) => {
  return {
    type: DELETE_WAYPOINT_SUCCESS,
    payload: { gameId, waypointId }
  }
}

const deleteWaypointFailure = error => ({
  type: DELETE_WAYPOINT_FAILURE,
  payload: error
})

export const deleteWaypoint = (gameId, waypointId) => {
  return dispatch => {
    dispatch(deleteWaypointRequest())

    return WaypointsAPI.delete(gameId, waypointId)
      .then(() => dispatch(deleteWaypointSuccess(gameId, waypointId)))
      .catch(error => dispatch(deleteWaypointFailure(error)))
  }
}
