import * as React from 'react';
import styled from 'styled-components';

interface TableProps {
  /** 테이블의 컬럼 값 */
  columns: TableColumn[];
  /** 테이블에 표시할 row의 집합 */
  dataSource: TableData[];
}

export interface TableColumn {
  /** 컬럼의 이름 */
  title: string;
  /** 컬럼에 해당되는 data의 속성 */
  dataIndex?: string;
  /** 컬럼을 고유하게 식별하는 값. key가 없을 경우 dataIndex를 사용 */
  key?: string | number;
  /** data[dataIndex]를 값으로 받아 렌더링을 수행하는 함수 */
  render?: (data: TableData) => React.ReactNode;
  /** 컬럼이 클릭되었을 때 실행할 콜백 함수 */
  onClick?: (column: TableColumn) => void;
}

export interface TableData {
  /** data를 고유하게 식별하는 값 */
  id: string;
  [dataIndex: string]: React.ReactNode;
}

/** 테이블 컴포넌트 */
const Table = ({ columns, dataSource }: TableProps): JSX.Element => {
  return (
    <TableWrapper>
      <TableHeader>
        <TabularRow>
          {columns.map((column, index) => {
            const { title, key, onClick } = column;
            return (
              <TabularHeader
                key={key || index}
                clickable={!!onClick}
                onClick={() => onClick && onClick(column)}
              >
                {title}
              </TabularHeader>
            );
          })}
        </TabularRow>
      </TableHeader>
      <TableBody>
        {dataSource.map((data) => (
          <TabularRow key={data.id}>
            {columns.map(({ dataIndex, render }, index) => (
              <TabularData key={index}>
                {render && render(data)}
                {!render && dataIndex && data[dataIndex]}
              </TabularData>
            ))}
          </TabularRow>
        ))}
      </TableBody>
    </TableWrapper>
  );
};

const TableWrapper = styled.table`
  border-collapse: collapse;
`;

const TableHeader = styled.thead``;

const TableBody = styled.tbody``;

const TabularRow = styled.tr`
  text-align: left;
`;

const TabularHeader = styled.th<{ clickable: boolean }>`
  width: 200px;
  padding: 10px;
  background: #eaeaea;
  cursor: ${(props) => (props.clickable ? 'pointer' : 'auto')};

  &:hover {
    background: ${(props) => (props.clickable ? '#ddd' : '#eaeaea')};
  }
`;

const TabularData = styled.td`
  max-width: 200px;
  border-bottom: 1px solid #eaeaea;
  padding: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default Table;
