import { merge } from 'lodash'
import { FETCH_PLACES_SUCCESS } from '../constants/places'

const initialState = {
  entities: {
    places: {}
  },
  placeIds: []
}

export default (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case FETCH_PLACES_SUCCESS:
      return {
        ...state,
        entities: merge({}, state.entities, payload.entities),
        placeIds: [...state.placeIds, ...payload.result]
      }
    default:
      return state
  }
}
