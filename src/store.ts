import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducers'
import rootSaga from './sagas'

const bindMiddleware = (middleware: any) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

const configureStore = () => {
  let store
  const sagaMiddleware = createSagaMiddleware()

  store = createStore(rootReducer, bindMiddleware([sagaMiddleware]))
  store.sagaTask = sagaMiddleware.run(rootSaga)

  return store
}

export default configureStore
