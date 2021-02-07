import * as React from 'react';
import styled from 'styled-components';
import useAutofocus from '../hooks/useAutofocus';

const { useRef, useState } = React;

/** 검색 기능을 제공하는 컴포넌트 */
const SearchInput = (): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [keyword, setKeyword] = useState('');

  useAutofocus(inputRef);

  return (
    <Input
      ref={inputRef}
      type="text"
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
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
