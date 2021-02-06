import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import reducer from './state/index';
import saga from './state/saga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(saga);

export default store;
export type RootState = ReturnType<typeof store.getState>;
