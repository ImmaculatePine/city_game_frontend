import {
  ROUTE_REQUEST,
  ROUTE_SUCCESS,
  ROUTE_FAILURE
} from '../constants/directions'
import DirectionAPI from '../api/directions'

const routeRequest = () => ({
  type: ROUTE_REQUEST
})

const routeSuccess = data => {
  return {
    type: ROUTE_SUCCESS,
    payload: data
  }
}

const routeFailure = error => ({
  type: ROUTE_FAILURE,
  payload: error
})

export const route = ({ origin, destination, waypoints, google }) => {
  return dispatch => {
    dispatch(routeRequest())

    return DirectionAPI.route({ origin, destination, waypoints, google })
      .then(data => dispatch(routeSuccess(data)))
      .catch(error => dispatch(routeFailure(error)))
  }
}
