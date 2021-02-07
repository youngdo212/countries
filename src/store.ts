import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import appReducer from './state/index';
import { reducer as formReducer } from 'redux-form';
import saga from './state/saga';

const reducer = {
  app: appReducer,
  form: formReducer,
};

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
