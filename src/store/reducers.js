import { combineReducers } from 'redux';
import { sharedReducer } from '../shared/react/store/sharedReducer';

export const reducers = combineReducers({
  shared: sharedReducer,
});
