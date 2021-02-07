import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table, { TableColumn } from '../components/Table';
import { SORT_ORDER_TEXT } from '../constant';
import { actions, SortOptions } from '../state';
import {
  renderableCountriesSelector,
  sortOptionsSelector,
} from '../state/selector';

const { useEffect, useCallback } = React;

/** 국가 정보를 나타내는 컴포넌트 */
const CountryTable = (): JSX.Element => {
  const dispatch = useDispatch();
  const countries = useSelector(renderableCountriesSelector);
  const sortOptions = useSelector(sortOptionsSelector);

  const onColumnClick = useCallback(
    (column: TableColumn) => dispatch(actions.sortCountries(column.dataIndex)),
    [dispatch]
  );

  const columms = [
    {
      title: getColumnTitle('name', sortOptions),
      dataIndex: 'name',
      onClick: onColumnClick,
    },
    {
      title: getColumnTitle('alpha2Code', sortOptions),
      dataIndex: 'alpha2Code',
      onClick: onColumnClick,
    },
    {
      title: getColumnTitle('callingCodes', sortOptions),
      dataIndex: 'callingCodes',
      render: (codes: unknown) => {
        if (Array.isArray(codes)) {
          return codes.join(', ');
        }
      },
      onClick: onColumnClick,
    },
    {
      title: getColumnTitle('capital', sortOptions),
      dataIndex: 'capital',
      onClick: onColumnClick,
    },
    {
      title: getColumnTitle('region', sortOptions),
      dataIndex: 'region',
      onClick: onColumnClick,
    },
  ];

  useEffect(() => {
    dispatch(actions.fetchCountries());
  }, [dispatch]);

  return <Table columns={columms} dataSource={countries} />;
};

/** 정렬 정보를 담은 colume 이름을 반환한다 */
function getColumnTitle(title: string, sortOptions: SortOptions): string {
  const sortInfo =
    sortOptions.key === title ? SORT_ORDER_TEXT[sortOptions.sortOrder] : '';
  return title + sortInfo;
}

export default CountryTable;
