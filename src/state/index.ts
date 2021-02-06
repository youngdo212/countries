import { createAction, createReducer } from '@reduxjs/toolkit';
import { INITIAL_PAGE } from '../constant';
import { Country } from '../types';

interface State {
  countries: Country[];
  currentPage: number;
}

export const actions = {
  setCountries: createAction('setCountries', (countries: Country[]) => ({
    payload: countries,
  })),
  increaseCurrentPage: createAction('increaseCurrentPage'),
  fetchCountries: createAction('fetchCountries'),
};

const INITIAL_STATE: State = {
  countries: [],
  currentPage: INITIAL_PAGE,
};

const reducer = createReducer(INITIAL_STATE, (builder) => {
  builder
    .addCase(actions.setCountries, (state, action) => {
      const countries = action.payload;
      state.countries = countries;
    })
    .addCase(actions.increaseCurrentPage, (state) => {
      state.currentPage += 1;
    });
});

export default reducer;
