import TableHeader from '@components/molecules/TableManagerHeader';
import { Manager } from '@page/Manager/interface';
import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import AddEmployeeModal, { AddEmployeeField } from './AddEmployeeModal';
import TableManagerEmployee from './TableManagerEmployee';
import { yupResolver } from '@hookform/resolvers/yup';

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

const createEmployeeSchema = yup.object({
  fullName: yup.string().required(),
  email: yup.string().email().required(),
  position: yup.string().required(),
  role: yup.string().required().oneOf(['Admin', 'Employee', 'Manager', 'Manager 02', 'Blocked']),
}).required();

const TableManagerEmployeeContainer = () => {
  const [isShowAddEmployee, setIsShowEmployee] = useState<boolean>(false);
  const method = useForm<AddEmployeeField>({
    defaultValues: {
      fullName: '',
      email: '',
      position: '',
      role: 'Blocked'
    },
    resolver: yupResolver(createEmployeeSchema)
  });
  return (
    <div>
      <TableHeader onAddEmployeeClick={() => setIsShowEmployee(true)}/>
      <TableManagerEmployee data={rows} />
      <AddEmployeeModal
        method={method}
        isOpen={isShowAddEmployee} 
        title="Add employee"
        onSubmit={(values) => {console.log(values);}}
        onClose={() => {
          setIsShowEmployee(false);
          method.reset();
        }}
      />
    </div>
  );
};

export default TableManagerEmployeeContainer;
