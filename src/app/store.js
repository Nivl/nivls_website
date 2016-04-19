import { createStore, combineReducers } from 'redux';

import navigationReducer from './reducers/navigation-reducer';

const appStore = combineReducers({
  navigation: navigationReducer,
});

const store = createStore(appStore);
export default store;
