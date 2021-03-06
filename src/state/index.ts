import { createAction, createReducer, nanoid } from '@reduxjs/toolkit';
import { INITIAL_PAGE, SortOrder } from '../constant';
import { Country } from '../types';
import { getEnumLength } from '../utils/enum';

export interface SortOptions {
  /** 정렬 기준이 되는 country의 속성 */
  key: string;
  /** 정렬 순서 */
  sortOrder: keyof { [K in SortOrder]: never };
}

interface State {
  countries: Country[];
  currentPage: number;
  sortOptions: SortOptions;
  searchKeyword: string;
}

export const actions = {
  setCountries: createAction('setCountries', (countries: Country[]) => ({
    payload: countries,
  })),
  increaseCurrentPage: createAction('increaseCurrentPage'),
  sortCountries: createAction('sortCountries', (key: string) => ({
    payload: key,
  })),
  setSearchKeyword: createAction<string>('setSearchKeyword'),
  removeCountry: createAction('removeCountry', (id: string) => ({
    payload: id,
  })),
  createCountry: createAction(
    'createCountry',
    (values: Omit<Country, 'id'>) => ({
      payload: values,
    })
  ),
  fetchCountries: createAction('fetchCountries'),
  search: createAction<string>('search'),
};

const INITIAL_STATE: State = {
  countries: [],
  currentPage: INITIAL_PAGE,
  sortOptions: {
    key: 'name',
    sortOrder: SortOrder.Default,
  },
  searchKeyword: '',
};

const reducer = createReducer(INITIAL_STATE, (builder) => {
  builder
    .addCase(actions.setCountries, (state, action) => {
      const countries = action.payload;
      state.countries = countries;
    })
    .addCase(actions.increaseCurrentPage, (state) => {
      state.currentPage += 1;
    })
    .addCase(actions.sortCountries, (state, action) => {
      const key = action.payload;
      const { sortOptions } = state;

      if (sortOptions.key === key) {
        sortOptions.sortOrder =
          (sortOptions.sortOrder + 1) % getEnumLength(SortOrder);
      } else {
        sortOptions.key = key;
        sortOptions.sortOrder = SortOrder.ASC;
      }

      state.currentPage = INITIAL_PAGE;
    })
    .addCase(actions.setSearchKeyword, (state, action) => {
      const keyword = action.payload;
      state.searchKeyword = keyword;
      state.currentPage = INITIAL_PAGE;
    })
    .addCase(actions.removeCountry, (state, action) => {
      const id = action.payload;
      state.countries = state.countries.filter((country) => country.id !== id);
    })
    .addCase(actions.createCountry, (state, action) => {
      const newCountry = { ...action.payload, id: nanoid() };
      state.countries = [newCountry, ...state.countries];
    });
});

export default reducer;
