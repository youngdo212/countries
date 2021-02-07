import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ScrollLoader from './components/ScrollLoader';
import CountryTable from './containers/CountryTable';
import SearchInput from './containers/SearchInput';
import { actions } from './state';
import { hasMoreCountriesSelector } from './state/selector';

const App = (): JSX.Element => {
  const dispatch = useDispatch();
  const hasMoreCountries = useSelector(hasMoreCountriesSelector);

  return (
    <div>
      <Header>
        <SearchInput />
      </Header>
      <Content>
        <CountryTable />
        {hasMoreCountries && (
          <ScrollLoader
            onLoad={() => dispatch(actions.increaseCurrentPage())}
          />
        )}
      </Content>
    </div>
  );
};

const Header = styled.div`
  text-align: center;
  margin: 30px 0px 15px 0px;
`;

const Content = styled.div`
  width: 1100px;
  margin: 0 auto;
`;

export default App;
