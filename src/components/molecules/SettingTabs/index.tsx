import { Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';

import './styles.scss';

const tabs = ['General', 'Theme', 'System', 'General', 'Security'];

const SettingTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs
        className="settingRolesTabs pr-4 border-transparent"
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}>
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab} />
        ))}
      </Tabs>
    </div>
  );
};

export default SettingTabs;
