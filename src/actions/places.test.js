import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import { createPlace } from './places'
import {
  CREATE_PLACE_REQUEST,
  CREATE_PLACE_SUCCESS,
  CREATE_PLACE_FAILURE
} from '../constants/places'
import { URL_API } from '../config'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const apiMock = nock(URL_API)

describe('createPlace', () => {
  afterAll(() => nock.restore())

  const params = { name: 'New place', address: 'New address' }

  describe('when API responses with success', () => {
    beforeEach(() => apiMock.post('/api/places').reply(201, { data: place }))

    const place = { id: 1, ...params }

    test('dispatches CREATE_PLACE_REQUEST and CREATE_PLACE_FAILURE actions', async () => {
      const expectedActions = [
        { type: CREATE_PLACE_REQUEST },
        {
          type: CREATE_PLACE_SUCCESS,
          payload: {
            entities: {
              places: { 1: place }
            },
            result: 1
          }
        }
      ]

      const store = mockStore()

      await store.dispatch(createPlace(params, () => {}))
      expect(store.getActions()).toEqual(expectedActions)
    })

    test('calls onSuccess callback', async () => {
      const onSuccess = jest.fn()
      const store = mockStore()

      await store.dispatch(createPlace(params, onSuccess))
      expect(onSuccess.mock.calls.length).toBe(1)
    })
  })

  describe('when API responses with error', () => {
    beforeEach(() =>
      apiMock
        .post('/api/places')
        .reply(422, { errors: { name: ['is already taken'] } }))

    test('dispatches CREATE_PLACE_REQUEST and CREATE_PLACE_FAILURE', async () => {
      const expectedActions = [
        { type: CREATE_PLACE_REQUEST },
        {
          type: CREATE_PLACE_FAILURE,
          payload: new Error('Request failed with status code 422')
        }
      ]

      const store = mockStore()

      await store.dispatch(createPlace(params, () => {}))
      const dispatchedActions = store.getActions()
      expect(dispatchedActions).toEqual(expectedActions)
      expect(dispatchedActions[1].payload.response.data).toEqual({
        errors: { name: ['is already taken'] }
      })
    })

    test('does not call an onSuccess callback', async () => {
      const onSuccess = jest.fn()
      const store = mockStore()

      await store.dispatch(createPlace(params, onSuccess))
      expect(onSuccess.mock.calls.length).toBe(0)
    })
  })
})
