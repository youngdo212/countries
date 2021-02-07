import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import useAutofocus from '../hooks/useAutofocus';
import { actions } from '../state';
import { searchKeywordSelector } from '../state/selector';

const { useRef, useCallback } = React;

/** 검색 기능을 제공하는 컴포넌트 */
const SearchInput = (): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);
  const searchKeyword = useSelector(searchKeywordSelector);
  const dispatch = useDispatch();
  const handleChange = useCallback(
    (e) => dispatch(actions.setSearchKeyword(e.target.value)),
    [dispatch]
  );

  useAutofocus(inputRef);

  return (
    <Input
      ref={inputRef}
      type="text"
      value={searchKeyword}
      onChange={handleChange}
    />
  );
};

const Input = styled.input`
  width: 500px;
  height: 30px;
  border: 1px solid #999;
  border-radius: 5px;
  font-size: 1.2rem;
  padding: 0px 5px;
`;

export default SearchInput;
