import SettingTabs from '@components/molecules/SettingTabs';
import TableHeader from '@components/molecules/TableManagerHeader';
import { Role } from '@page/Manager/interface';
import React, { useCallback, useState } from 'react';
import TableSettingRole from './TableSettingRole';

const SettingRolesContainer = () => {
  const [rows, setRows] = useState<Role[]>(
    [
      new Role('Manage Links', false, true),
      new Role('Edit template', true, false),
    ].sort((a, b) => (a.name < b.name ? -1 : 1)),
  );

  const handleChangeRow = useCallback(
    (index: number, row: Role) => {
      setRows((prevState) => {
        prevState[index] = row;
        return [...prevState];
      });
    },
    [rows],
  );

  return (
    <div>
      <TableHeader isHaveActions={false} />
      <div className="flex">
        <SettingTabs />
        <TableSettingRole data={rows} onChangeRow={handleChangeRow} />
      </div>
    </div>
  );
};

export default SettingRolesContainer;
