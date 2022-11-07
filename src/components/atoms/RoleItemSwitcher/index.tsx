import { Box, ButtonBase, Grid } from '@mui/material';
import React from 'react';
import CustomSwitcher from '../CustomSwitcher';

type Props = { name: string; status: boolean; isFullWidth: boolean };

const RoleItemSwitcher = (props: Props) => {
  return (
    <Box
      sx={{
        width: `${props.isFullWidth ? '100%' : 'auto'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: `${props.isFullWidth ? 'space-between' : 'center'}`,
        marginBottom: '10px',
      }}>
      <Grid
        className="display-center"
        sx={{
          width: '164px',
          height: '37px',
          borderRadius: '20px',
          border: '1px solid #9A9AB0',
          fontSize: '16px',
          fontWeight: 'bold',
        }}>
        {props.name}
      </Grid>
      <CustomSwitcher isActive={props.status} />
    </Box>
  );
};

export default RoleItemSwitcher;
