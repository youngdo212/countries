import { createSelector } from '@reduxjs/toolkit';
import { COUNTRY_LIMIT } from '../constant';
import { RootState } from '../store';

const currentPageSelector = (state: RootState) => state.currentPage;

/** 모든 국가 정보 객체를 배열로 반환하는 selector */
const allCountriesSelector = (state: RootState) => {
  const countries = state.countries;
  return countries.map((country) => ({ ...country, key: country.alpha2Code }));
};

/** 현재 페이지까지의 국가 정보 객체를 배열로 반환하는 selector */
export const countriesSelector = createSelector(
  allCountriesSelector,
  currentPageSelector,
  (allCountries, currentPage) =>
    allCountries.slice(0, currentPage * COUNTRY_LIMIT)
);

/** 다음 페이지의 국가 리스트가 존재하는 지 나타내는 selector */
export const hasMoreCountriesSelector = createSelector(
  allCountriesSelector,
  currentPageSelector,
  (allCountries, currentPage) =>
    currentPage * COUNTRY_LIMIT < allCountries.length
);
