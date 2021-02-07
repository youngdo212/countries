import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table, { TableColumn, TableData } from '../components/Table';
import { SORT_ORDER_TEXT } from '../constant';
import { actions, SortOptions } from '../state';
import {
  countriesWithLimitSelector,
  sortOptionsSelector,
} from '../state/selector';
import { assertIsDefined } from '../utils/assert';

const { useEffect, useCallback } = React;

/** 국가 정보를 나타내는 컴포넌트 */
const CountryTable = (): JSX.Element => {
  const dispatch = useDispatch();
  const countries = useSelector(countriesWithLimitSelector);
  const sortOptions = useSelector(sortOptionsSelector);

  const onColumnClick = useCallback(
    ({ dataIndex }: TableColumn) => {
      assertIsDefined(dataIndex);
      dispatch(actions.sortCountries(dataIndex));
    },
    [dispatch]
  );

  const removeCountry = useCallback(
    ({ target }: React.MouseEvent) => {
      if (target instanceof HTMLElement && target.dataset.id) {
        dispatch(actions.removeCountry(target.dataset.id));
      }
    },
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
      render: (data: TableData) => {
        if (Array.isArray(data.callingCodes)) {
          return data.callingCodes.join(', ');
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
    {
      title: 'Actions',
      render: function render({ id }: TableData) {
        return (
          <button data-id={id} onClick={removeCountry}>
            삭제
          </button>
        );
      },
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
