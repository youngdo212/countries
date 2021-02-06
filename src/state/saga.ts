import { call, put, takeLeading } from 'redux-saga/effects';
import { CallReturnType } from '../types';
import { getCountries } from '../utils/api';
import { actions } from './index';

function* fetchCountries() {
  const {
    isSuccess,
    data,
    errorMessage,
  }: CallReturnType<typeof getCountries> = yield call(getCountries);

  if (isSuccess && data) {
    yield put(actions.setCountries(data));
  } else {
    alert(errorMessage);
  }
}

export default function* () {
  yield takeLeading(actions.fetchCountries, fetchCountries);
}
