import { RootState } from '../store';

export const countriesSelector = (state: RootState) => {
  const countries = state.countries;
  return countries.map((country) => ({ ...country, key: country.alpha2Code }));
};
