import { createAction, createReducer } from '@reduxjs/toolkit';
import { Country } from '../types';

interface State {
  countries: Country[];
}

export const actions = {
  setCountries: createAction('setCountries', (countries: Country[]) => ({
    payload: countries,
  })),
  fetchCountries: createAction('fetchCountries'),
};

const INITIAL_STATE: State = {
  countries: [],
};

const reducer = createReducer(INITIAL_STATE, (builder) => {
  builder.addCase(actions.setCountries, (state, action) => {
    const countries = action.payload;
    state.countries = countries;
  });
});

export default reducer;
