import { normalize } from 'normalizr'
import { placeSchema } from '../schema'
import PlacesAPI from '../api/places'
import {
  FETCH_PLACES_REQUEST,
  FETCH_PLACES_SUCCESS,
  FETCH_PLACES_FAILURE,
  CREATE_PLACE_REQUEST,
  CREATE_PLACE_SUCCESS,
  CREATE_PLACE_FAILURE,
  DELETE_PLACE_REQUEST,
  DELETE_PLACE_SUCCESS,
  DELETE_PLACE_FAILURE
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

const createPlaceRequest = () => ({
  type: CREATE_PLACE_REQUEST
})

const createPlaceSuccess = ({ data }) => {
  return {
    type: CREATE_PLACE_SUCCESS,
    payload: normalize(data, placeSchema)
  }
}

const createPlaceFailure = error => ({
  type: CREATE_PLACE_FAILURE,
  payload: error
})

export const createPlace = (params, onSuccess) => {
  return dispatch => {
    dispatch(createPlaceRequest())

    return PlacesAPI.create(params)
      .then(({ data }) => {
        dispatch(createPlaceSuccess(data))
        onSuccess()
      })
      .catch(error => dispatch(createPlaceFailure(error)))
  }
}

const deletePlaceRequest = () => ({
  type: DELETE_PLACE_REQUEST
})

const deletePlaceSuccess = placeId => {
  return {
    type: DELETE_PLACE_SUCCESS,
    payload: { placeId }
  }
}

const deletePlaceFailure = error => ({
  type: DELETE_PLACE_FAILURE,
  payload: error
})

export const deletePlace = id => {
  return dispatch => {
    dispatch(deletePlaceRequest())

    return PlacesAPI.delete(id)
      .then(() => dispatch(deletePlaceSuccess(id)))
      .catch(error => dispatch(deletePlaceFailure(error)))
  }
}
