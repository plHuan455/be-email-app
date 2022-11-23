import CustomButton from '@components/atoms/CustomButton';
import { SVGIconProps } from '@components/atoms/Icon';
import { Box, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import { RenderButtonIcon } from '../EmailActions';

import './styles.scss';

interface Props {
  isHaveActions?: boolean;
}

const TableHeader: React.FC<Props> = ({ isHaveActions = true }) => {
  const [value, setValue] = useState(0);

  const actionsList: {
    [key: string]: SVGIconProps['icon'];
  } = {
    import: 'import',
    plus: 'plus',
  };

  const handleChange = (e, newValue) => setValue(newValue);

  return (
    <div className="flex justify-between my-3">
      <Tabs
        className="tableManagerTabs"
        value={value}
        onChange={handleChange}
        aria-label="disabled tabs example">
        <Tab label="Manager" />
        <Tab label="Manager 2" />
        <Tab label="Employee" />
      </Tabs>
      {isHaveActions && (
        <Box className="flex gap-3 items-start">
          <CustomButton
            bgButtonColor="#282B33"
            className="p-3 px-5"
            classNameLabel="text-[12px]"
            color="#ffffff"
            label="Import"
            isBeforeIcon={true}
            beforeIcon={
              <RenderButtonIcon
                width={14}
                height={14}
                item={actionsList['import']}
                color="#ffffff"
              />
            }
          />
          <CustomButton
            bgButtonColor="#282B33"
            className="p-3 px-5"
            classNameLabel="text-[12px]"
            color="#ffffff"
            label="Add employee"
            isBeforeIcon={true}
            beforeIcon={
              <RenderButtonIcon
                width={14}
                height={14}
                item={actionsList['plus']}
                color="#ffffff"
              />
            }
          />
        </Box>
      )}
    </div>
  );
};

export default TableHeader;
