import {createStore, combineReducers} from 'redux';

//import {reducer as notifications} from 'react-notification-system-redux';
import data from './reducers'


export function configureStore(initialState) {
  return createStore(
    combineReducers({
      data
    }),
    initialState,
     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
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
