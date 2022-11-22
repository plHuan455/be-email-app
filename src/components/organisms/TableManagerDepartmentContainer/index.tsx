import TableHeader from '@components/molecules/TableManagerHeader';
import React from 'react';
import TableManagerDepartment from './TableManagerDepartment';

const TableManagerDepartmentContainer = () => {
  return (
    <div>
      <TableHeader isHaveActions={false} />
      <TableManagerDepartment />
    </div>
  );
};

export default TableManagerDepartmentContainer;
