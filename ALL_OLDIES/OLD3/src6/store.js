//import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk'
//import { composeWithDevTools } from 'remote-redux-devtools';

//import {reducer as notifications} from 'react-notification-system-redux';
import data from './reducers'

const middleware = [ thunk ]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),

);

export function configureStore() {
  return createStore(
    combineReducers({
      data
    }),
    enhancer
  );//creates store
}

/*fix for hot reloading */
/*
import { createStore } from 'redux';
import rootReducer from '../reducers/index';

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
*/
