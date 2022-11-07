import { Box, ButtonBase, Grid, MenuItem, Select, Typography } from '@mui/material';
import React from 'react';
import { MultiValue, SingleValue, ActionMeta } from 'react-select';
import { CategoryData } from '../ModalGroupInput';
import SelectBox, { SelectBoxOptionInterface } from '../SelectBox';

export interface AccessibleFeature {
  name: string;
  options?: SelectBoxOptionInterface[];
  value?: SelectBoxOptionInterface[];
}

type Props = {
  title: string;
  subTitle: string;
  AccessibleFeatureData: AccessibleFeature[];
  onChange?: (accessible: AccessibleFeature) => (
    newValue:
      | MultiValue<SelectBoxOptionInterface>
      | SingleValue<SelectBoxOptionInterface>,
    actionMeta: ActionMeta<any>,
  ) => void | undefined;
};

const CategoryItem = (props: Props) => {
  const { onChange } = props;

  const handleChange = (accessible: AccessibleFeature) => {
    return onChange && onChange(accessible)
  }

  return (
    <Box
      sx={{
        width: '100%',
        padding: '13px 14px',
        border: '1px dashed #000',
        marginBottom: '18px',
        borderRadius: '10px',
      }}>
      <Typography
        component={'p'}
        sx={{
          fontSize: '16px',
          color: '#9822F4',
          marginBottom: '15px',
          fontWeight: 500,
        }}>
        {props.title}
      </Typography>
      <Typography
        component={'p'}
        sx={{ fontSize: '15px', color: '#9A9AB0', marginBottom: '6px' }}>
        {props.subTitle}
      </Typography>
      <Grid container spacing={2}>
        {props.AccessibleFeatureData.map((item, index) => {
          return (
            <React.Fragment key={index.toString()}>
              <Grid item xs={3}>
                <Box
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  sx={{
                    width: '100%',
                    height: '48px',
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb',
                    fontSize: '16px',
                    fontWeight: 500,
                    color: '#9A9AB0',
                  }}>
                  {item.name}
                </Box>
              </Grid>
              <Grid
                item
                xs={9}
                sx={{
                  '& .react-select-content': {
                    mt: 0,
                  },
                }}>
                {/* <Select fullWidth multiple value={(item.value || []).map((ele) => ele.value)}>
                  {item.options ? item.options.map(option => 
                    <MenuItem key={option.value} value={option.value}>{ option.label }</MenuItem>
                  ) : (
                    <MenuItem sx={{ justifyContent: 'center' }} disabled key={'-1'} value={-1}>No Options</MenuItem>
                  )}
                </Select> */}
                <SelectBox isMulti value={item.value} options={item.options || []} isSearchable={false} onChange={handleChange(item)} />
              </Grid>
            </React.Fragment>
          );
        })}
      </Grid>
    </Box>
  );
};

export default CategoryItem;
