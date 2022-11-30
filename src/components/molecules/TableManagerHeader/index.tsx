import CustomButton from '@components/atoms/CustomButton';
import { SVGIconProps } from '@components/atoms/Icon';
import { Box, Tab, Tabs } from '@mui/material';
import React, { PropsWithChildren, useState } from 'react';
import { RenderButtonIcon } from '../EmailActions';

import './styles.scss';

interface Props extends PropsWithChildren {
  isHaveActions?: boolean;
  plusButtonTitle?: string;
  onPlusClick?: () => void;
}

const TableHeader: React.FC<Props> = ({ plusButtonTitle = '', isHaveActions = true, onPlusClick, ...props }) => {
  const actionsList: {
    [key: string]: SVGIconProps['icon'];
  } = {
    import: 'import',
    plus: 'plus',
  };

  return (
    <div className="flex justify-between my-3">
      {props.children}
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
            label={plusButtonTitle}
            isBeforeIcon={true}
            onClick={onPlusClick}
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
