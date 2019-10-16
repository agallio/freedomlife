import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';

import rootReducer, { exampleInitialState } from './reducers';
import rootSaga from './sagas';

// const bindMiddleware = middleware => {
//   if (process.env.NODE_ENV !== 'production') {
//     const { composeWithDevTools } = require('redux-devtools-extension');
//     return composeWithDevTools(applyMiddleware(...middleware));
//   }
//   return applyMiddleware(...middleware);
// };

// function configureStore(initialState = exampleInitialState) {
//   const sagaMiddleware = createSagaMiddleware();
//   const store = createStore(
//     rootReducer,
//     initialState,
//     bindMiddleware([sagaMiddleware])
//   );

//   store.sagaTask = sagaMiddleware.run(rootSaga);

//   return store;
// }

// export default configureStore;

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const configureStore = () => {
  let store;
  const sagaMiddleware = createSagaMiddleware();

  // TODO: Research a better way using this redux-persist package
  const isClient = typeof window !== undefined;

  if (isClient) {
    const { persistReducer } = require('redux-persist');
    const storage = require('redux-persist/lib/storage').default;

    const persistConfig = {
      key: 'root',
      blacklist: ['bible'],
      storage
    };

    store = createStore(
      persistReducer(persistConfig, rootReducer),
      bindMiddleware([sagaMiddleware])
    );

    store.__PERSISTOR = persistStore(store);
  } else {
    store = createStore(rootReducer, bindMiddleware([sagaMiddleware]));
  }

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
