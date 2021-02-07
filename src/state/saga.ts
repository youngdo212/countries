import { all, call, debounce, put, takeLeading } from 'redux-saga/effects';
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

function* search({ payload }: ReturnType<typeof actions.search>) {
  yield put(actions.setSearchKeyword(payload));
}

export default function* () {
  yield all([
    debounce(500, actions.search, search),
    takeLeading(actions.fetchCountries, fetchCountries),
  ]);
}
