import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ScrollLoader from './components/ScrollLoader';
import CountryTable from './containers/CountryTable';
import { actions } from './state';
import { hasMoreCountriesSelector } from './state/selector';

const App = (): JSX.Element => {
  const dispatch = useDispatch();
  const hasMoreCountries = useSelector(hasMoreCountriesSelector);

  return (
    <div>
      <CountryTable />
      {hasMoreCountries && (
        <ScrollLoader onLoad={() => dispatch(actions.increaseCurrentPage())} />
      )}
    </div>
  );
};

export default App;
