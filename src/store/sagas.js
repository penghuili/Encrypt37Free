import { all } from 'redux-saga/effects';
import { sharedSagas } from '../shared/react/store/sharedSaga';

export function* sagas() {
  yield all([sharedSagas()]);
}
