import CustomSwitcher from '@components/atoms/CustomSwitcher';
import RoleItemSwitcher from '@components/atoms/RoleItemSwitcher';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { string } from 'yup/lib/locale';

export interface Role {
  name: string;
  status: boolean;
}

type Props = { isHasRole: boolean; roleList: Role[] };

const RoleManagement = (props: Props) => {
  return (
    <Box>
      <Typography component={'p'}>Role</Typography>
      {props.isHasRole ? (
        <Box>
          <Box>
            {props.roleList.map((item, idx) => {
              return (
                <RoleItemSwitcher
                  key={item.name + idx.toString()}
                  isFullWidth={true}
                  name={item.name}
                  status={item.status}
                />
              );
            })}
          </Box>
          <Box className='flex justify-between items-center'>
            <Typography component={'p'}>Status</Typography>
            <CustomSwitcher isActive={true} />
          </Box>
        </Box>
      ) : (
        <Box>No Role</Box>
      )}
    </Box>
  );
};

export default RoleManagement;
