import { createStore, combineReducers } from 'redux';

import navigationReducer from './reducers/navigation-reducer';
import { routerReducer } from 'react-router-redux';

const appStore = combineReducers({
  navigation: navigationReducer,
  routing   : routerReducer,
});

const store = createStore(appStore);
export default store;
