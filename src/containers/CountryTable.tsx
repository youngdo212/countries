import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../components/Table';
import { actions } from '../state';
import { countriesSelector } from '../state/selector';

const { useEffect } = React;

/** 국가 정보를 나타내는 컴포넌트 */
const CountryTable = (): JSX.Element => {
  const countries = useSelector(countriesSelector);
  const columms = [
    {
      title: 'name',
      dataIndex: 'name',
    },
    {
      title: 'alpha2Code',
      dataIndex: 'alpha2Code',
    },
    {
      title: 'callingCodes',
      dataIndex: 'callingCodes',
      render: (codes: unknown) => {
        if (Array.isArray(codes)) {
          return codes.join(', ');
        }
      },
    },
    {
      title: 'capital',
      dataIndex: 'capital',
    },
    {
      title: 'region',
      dataIndex: 'region',
    },
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchCountries());
  }, [dispatch]);

  return <Table columns={columms} dataSource={countries} />;
};

export default CountryTable;
