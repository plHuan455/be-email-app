import TableHeader from '@components/molecules/TableManagerHeader';
import { Manager } from '@page/Manager/interface';
import React from 'react';
import TableManagerEmployee from './TableManagerEmployee';

const rows = [
  new Manager('', 'adep adep', 'adep@adep.com', 'Marketing', 'Manager 02'),
  new Manager(
    '',
    'Anh Nguyen The',
    'theanh.nguyen@theanh.com',
    'Front End',
    'Admin',
  ),
  new Manager('', 'Anh Tran', 'anh.tran@test.com', 'Back End', 'Employee'),
  new Manager('', 'Bùi Thùy Thị Minh', 'minhthuy.bui@test.com', 'CS', 'Manager'),
  new Manager(
    '',
    'Bùi Phạn Hương Giang',
    'huonggiang.bui@test.com',
    'CS',
    'Blocked',
  ),
  new Manager('', 'CSKH iBe', 'cskh', 'Front End', 'Employee'),
  new Manager('', 'adep adep', 'adep@adep.com', 'Marketing', 'Manager 02'),
  new Manager(
    '',
    'Anh Nguyen The',
    'theanh.nguyen@theanh.com',
    'Front End',
    'Admin',
  ),
  new Manager('', 'Anh Tran', 'anh.tran@test.com', 'Back End', 'Employee'),
  new Manager('', 'Bùi Thùy Thị Minh', 'minhthuy.bui@test.com', 'CS', 'Manager'),
  new Manager(
    '',
    'Bùi Phạn Hương Giang',
    'huonggiang.bui@test.com',
    'CS',
    'Blocked',
  ),
  new Manager('', 'CSKH iBe', 'cskh', 'Front End', 'Employee'),
  new Manager('', 'adep adep', 'adep@adep.com', 'Marketing', 'Manager 02'),
  new Manager(
    '',
    'Anh Nguyen The',
    'theanh.nguyen@theanh.com',
    'Front End',
    'Admin',
  ),
  new Manager('', 'Anh Tran', 'anh.tran@test.com', 'Back End', 'Employee'),
  new Manager('', 'Bùi Thùy Thị Minh', 'minhthuy.bui@test.com', 'CS', 'Manager'),
  new Manager(
    '',
    'Bùi Phạn Hương Giang',
    'huonggiang.bui@test.com',
    'CS',
    'Blocked',
  ),
  new Manager('', 'CSKH iBe', 'cskh', 'Front End', 'Employee'),
  new Manager('', 'adep adep', 'adep@adep.com', 'Marketing', 'Manager 02'),
  new Manager(
    '',
    'Anh Nguyen The',
    'theanh.nguyen@theanh.com',
    'Front End',
    'Admin',
  ),
  new Manager('', 'Anh Tran', 'anh.tran@test.com', 'Back End', 'Employee'),
  new Manager('', 'Bùi Thùy Thị Minh', 'minhthuy.bui@test.com', 'CS', 'Manager'),
  new Manager(
    '',
    'Bùi Phạn Hương Giang',
    'huonggiang.bui@test.com',
    'CS',
    'Blocked',
  ),
  new Manager('', 'CSKH iBe', 'cskh', 'Front End', 'Employee'),
].sort((a, b) => (a.name < b.name ? -1 : 1));

const TableManagerEmployeeContainer = () => {
  return (
    <div>
      <TableHeader />
      <TableManagerEmployee data={rows} />
    </div>
  );
};

export default TableManagerEmployeeContainer;
