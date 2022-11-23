import SettingTabs from '@components/molecules/SettingTabs';
import TableHeader from '@components/molecules/TableManagerHeader';
import { Role } from '@page/Manager/interface';
import React from 'react';
import TableSettingRole from './TableSettingRole';

const rows = [
  new Role('Manage Links', false, true),
  new Role('Edit template', true, false),
].sort((a, b) => (a.name < b.name ? -1 : 1));

const SettingRolesContainer = () => {
  return (
    <div>
      <TableHeader isHaveActions={false} />
      <div className="flex">
        <SettingTabs />
        <TableSettingRole data={rows} />
      </div>
    </div>
  );
};

export default SettingRolesContainer;
