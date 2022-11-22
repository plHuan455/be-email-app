import CustomButton from '@components/atoms/CustomButton';
import { SVGIconProps } from '@components/atoms/Icon';
import { Box, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import { RenderButtonIcon } from '../EmailActions';

import './styles.scss';

interface Props {
  isHaveActions?: boolean;
}

const TableManagerHeader: React.FC<Props> = ({ isHaveActions = true }) => {
  const [value, setValue] = useState(0);

  const actionsList: {
    [key: string]: SVGIconProps['icon'];
  } = {
    import: 'import',
    plus: 'plus',
  };

  const handleChange = (e, newValue) => setValue(newValue);

  return (
    <div className="flex justify-between mt-3">
      <Tabs
        className="tableManagerTabs"
        value={value}
        onChange={handleChange}
        aria-label="disabled tabs example">
        <Tab label="Active" />
        <Tab label="Active" />
      </Tabs>
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
    </div>
  );
};

export default TableManagerHeader;
