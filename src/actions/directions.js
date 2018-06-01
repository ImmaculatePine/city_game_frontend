import {
  ROUTE_REQUEST,
  ROUTE_SUCCESS,
  ROUTE_FAILURE
} from '../constants/directions'

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

    const DirectionsService = new google.maps.DirectionsService()

    DirectionsService.route(
      {
        origin,
        destination,
        waypoints: waypoints.map(location => ({ location })),
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.WALKING
      },
      (data, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          dispatch(routeSuccess(data))
        } else {
          dispatch(routeFailure(data))
        }
      }
    )
  }
}
