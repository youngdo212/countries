import { createSelector } from '@reduxjs/toolkit';
import { COUNTRY_LIMIT, SortOrder } from '../constant';
import { RootState } from '../store';
import { Country } from '../types';

const countriesSelector = (state: RootState) => state.countries;
const currentPageSelector = (state: RootState) => state.currentPage;
export const sortOptionsSelector = (state: RootState) => state.sortOptions;

/** 기본 또는 오름차순 또는 내림차순으로 정렬된 국가 배열을 반환하는 selector */
const sortedCountriesSelector = createSelector(
  countriesSelector,
  sortOptionsSelector,
  (countries, sortOptions) => {
    const { key, sortOrder } = sortOptions;
    const getSortValue = (country: Country) => {
      assertIsValidCountryKey(country, key);
      const sortValue = country[key];
      return Array.isArray(sortValue) ? sortValue.length : sortValue;
    };

    switch (sortOrder) {
      case SortOrder.Default:
        return [...countries];
      case SortOrder.ASC:
        return [...countries].sort((a, b) => {
          const valueA = getSortValue(a);
          const valueB = getSortValue(b);

          if (typeof valueA === 'number' && typeof valueB === 'number') {
            return valueA - valueB;
          } else if (typeof valueA === 'string' && typeof valueB === 'string') {
            return valueA === valueB ? 0 : valueA < valueB ? -1 : 1;
          } else {
            throw new Error(`not sortable type: ${valueA} or ${valueB}`);
          }
        });
      case SortOrder.DESC:
        return [...countries].sort((a, b) => {
          const valueA = getSortValue(a);
          const valueB = getSortValue(b);

          if (typeof valueA === 'number' && typeof valueB === 'number') {
            return valueB - valueA;
          } else if (typeof valueA === 'string' && typeof valueB === 'string') {
            return valueA === valueB ? 0 : valueA < valueB ? 1 : -1;
          } else {
            throw new Error(`not sortable type: ${valueA} or ${valueB}`);
          }
        });
    }
  }
);

/** 현재 페이지까지의 국가 정보 객체를 배열로 반환하는 selector */
const countriesWithLimitSelector = createSelector(
  sortedCountriesSelector,
  currentPageSelector,
  (countries, currentPage) => countries.slice(0, currentPage * COUNTRY_LIMIT)
);

/** 국가 리스트를 렌더링 가능한 객체의 배열로 나타내는 selector */
export const renderableCountriesSelector = createSelector(
  countriesWithLimitSelector,
  (countries) =>
    countries.map((country) => ({ ...country, key: country.alpha2Code }))
);

/** 다음 페이지의 국가 리스트가 존재하는 지 나타내는 selector */
export const hasMoreCountriesSelector = createSelector(
  countriesSelector,
  currentPageSelector,
  (countries, currentPage) => currentPage * COUNTRY_LIMIT < countries.length
);

/** country 객체의 올바른 속성임을 단언한다 */
function assertIsValidCountryKey(
  country: Country,
  key: string
): asserts key is keyof Country {
  if (!Object.prototype.hasOwnProperty.call(country, key)) {
    throw new Error(`국가 객체에 올바르지 않는 key로 접근하였습니다: ${key}`);
  }
}
