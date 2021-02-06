import * as React from 'react';
import Table from './components/Table';

const App = (): JSX.Element => {
  const columms = [
    {
      title: 'name',
      dataIndex: 'name',
      onClick: () => {
        alert('name is clicked!');
      },
    },
    {
      title: 'age',
      dataIndex: 'age',
    },
    {
      title: 'live',
      dataIndex: 'live',
    },
  ];
  const data = [
    {
      key: 1,
      name: 'mando',
      age: 29,
      live: 'seoul',
    },
    {
      key: 2,
      name: 'crong',
      age: 40,
      live: 'korea',
    },
    {
      key: 3,
      name: 'shlee',
      age: 30,
      live: 'mapo',
    },
  ];
  return (
    <div>
      <Table columns={columms} dataSource={data} />
    </div>
  );
};

export default App;
