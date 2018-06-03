import { normalize } from 'normalizr'
import { placeSchema } from '../schema'
import PlacesAPI from '../api/places'
import {
  FETCH_PLACES_REQUEST,
  FETCH_PLACES_SUCCESS,
  FETCH_PLACES_FAILURE
} from '../constants/places'

const fetchPlacesRequest = () => ({
  type: FETCH_PLACES_REQUEST
})

const fetchPlacesSuccess = ({ data }) => {
  return {
    type: FETCH_PLACES_SUCCESS,
    payload: normalize(data, [placeSchema])
  }
}

const fetchPlacesFailure = error => ({
  type: FETCH_PLACES_FAILURE,
  payload: error
})

export const fetchPlaces = () => {
  return dispatch => {
    dispatch(fetchPlacesRequest())

    PlacesAPI.fetch()
      .then(({ data }) => dispatch(fetchPlacesSuccess(data)))
      .catch(error => dispatch(fetchPlacesFailure(error)))
  }
}
