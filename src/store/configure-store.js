import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import rootReducer from '../reducers'

export default initialState => {
  const middleware = applyMiddleware(thunk, logger)
  const store = createStore(rootReducer, initialState, middleware)
  return store
}
