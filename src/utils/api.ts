import { nanoid } from '@reduxjs/toolkit';
import axios from 'axios';
import { APIResult, Country } from '../types';

/**
 * 국가 정보를 받아온다
 */
export function getCountries(): Promise<APIResult<Country[]>> {
  return axios({
    method: 'get',
    url:
      'https://restcountries.eu/rest/v2/all?fields=alpha2Code;capital;name;region;callingCodes',
  })
    .then(({ data }: { data: Country[] }) => ({
      isSuccess: true,
      data: data.map((item) => ({ ...item, id: nanoid() })),
      errorMessage: '',
    }))
    .catch((error) => ({
      isSuccess: false,
      data: null,
      errorMessage: error.message,
    }));
}
