import TableManagerHeader from '@components/molecules/TableManagerHeader';
import React from 'react';
import TableManagerEmployee from './TableManagerEmployee';

const TableManagerEmployeeContainer = () => {
  return (
    <div>
      <TableManagerHeader />
      <TableManagerEmployee />
    </div>
  );
};

export default TableManagerEmployeeContainer;
