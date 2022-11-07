import React, { useCallback, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import SelectBox, { SelectBoxOptionInterface } from '../SelectBox';
import Input from '../Input';
import { Button, Grid, Typography } from '@mui/material';
import ModalBase, { ModalBaseProps } from '../ModalBase';
import { el } from 'date-fns/locale';
import { debounce } from 'lodash';
import ResetButton from '../ResetButton';
import RoleManagement, { Role } from '@components/molecules/RoleManagement';
import CategoryItem, { AccessibleFeature } from '../CategoryItem';

export type ModalInputType = {
  acacdemyName?: string | undefined;
  academyCode?: string | undefined;
  accountGroup?: string | undefined;
  name?: string | undefined;
  password?: string | undefined;
  phone?: string | undefined;
  email?: string | undefined;
  role?: string | undefined;
  group?: string | undefined;
  department?: string | undefined;
  PRMcode?: string | undefined;
};

export interface CategoryData {
  name: string;
  subTitle: string;
  data: AccessibleFeature[];
}

export type ModalItemType<T extends any = any> = {
  key: keyof T;
  type: 'select' | 'input' | 'category' | 'password';
  /**
   * Prop for type = "select"
   */
  isMulti?: boolean
  label: string;
  optionData?: Array<SelectBoxOptionInterface>;
  categoryData?: CategoryData[];
  placeholder?: string;
  value?: any;
  optionValue?: SelectBoxOptionInterface;
  optionMultiValue?: Array<SelectBoxOptionInterface>;
  isAccessControlInput?: boolean;
};

interface ModalProps extends ModalBaseProps {
  dataInput: Array<ModalItemType<any>>;
  style?: any;
  isHasRole?: boolean;
  roleListData?: any;
  isHasCategory?: boolean;
  onDataChange: (value: Array<ModalItemType<any>>) => void;
  onChange?: (key: any, value: any) => void
}

const ModalGroupInput = (props: ModalProps) => {
  const {
    dataInput,
    isOpen,
    style,
    title,
    onClose,
    onSubmit,
    isHasRole,
    roleListData,
    isHasCategory,
    onDataChange,
    submitLabel,
    onChange
  } = props;
  const handleDataChange = useCallback((newVal, item: ModalItemType) => {
    const newDataInput = dataInput.map((elm) => {
      onChange && onChange(item.key, newVal)
      if (elm.key === item.key && item.type === 'select') {
        elm.optionValue = newVal;
        elm.value = newVal.value;
        return elm
      }
      if (elm.key === item.key) {
        elm.value = newVal;
      }
      return elm;
    });
    onDataChange?.(newDataInput);
  }, [dataInput, onChange]);

  // const handleResetPassword = useCallback(() => {
  //   const newDataInput = dataInput.map((elm) => {
  //     if (elm.key === 'password') {
  //       elm.value = '';
  //     }
  //     return elm;
  //   });

  //   newDataInput();
  // }, []);

  console.log('rendering');

  // const handleResetPassword = () => {};

  return (
    <ModalBase
      isOpen={isOpen}
      title={title}
      style={style}
      onClose={onClose}
      onSubmit={onSubmit}
      submitLabel={submitLabel}>
      {dataInput.map((item, idx) => {
        return (
          <div className="modal-content-item" key={item.type + idx.toString()}>
            {item.type === 'input' && (
              <Input
                placeHolder={item.placeholder ?? ''}
                type="text"
                borderRadius="rounded-xl"
                fullWidth={true}
                label={item.label}
                value={item.value}
                isAccessControlInput={item.isAccessControlInput}
                onChange={(e) => handleDataChange(e.target.value, item)}
              />
            )}
            {item.type === 'password' && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Input
                    placeHolder=""
                    label={item.label}
                    type="password"
                    borderRadius="rounded-xl"
                    fullWidth={true}
                    isAccessControlInput={item.isAccessControlInput}
                    onChange={(e) => handleDataChange(e.target.value, item)}
                  />
                </Grid>
                {/* <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                  <ResetButton
                    onClick={handleResetPassword}
                    isFullWidth={true}
                    backgroundColor="#9822F4"
                  />
                </Grid> */}
              </Grid>
            )}
            {item.type === 'select' && item.optionData && (
              <Box sx={{ marginBottom: '40px' }}>
                <SelectBox
                  options={item.optionData}
                  isSearchable={false}
                  defaultValue={item?.optionData[0]}
                  value={item?.optionValue || item?.optionMultiValue}
                  label={item.label}
                  isAccessControlSelect={item.isAccessControlInput}
                  onChange={(newVal: any, actionMeta) =>
                    handleDataChange(newVal, item)
                  }
                  isMulti={item.isMulti}
                />
              </Box>
            )}
            {item.type === 'category' && (
              <Box>
                <Typography
                  component={'p'}
                  sx={{ fontSize: '16px', marginBottom: '17px' }}>
                  {item.label}
                </Typography>
                {(item.categoryData ?? []).map((cate, index) => {
                  return (
                    <CategoryItem
                      AccessibleFeatureData={cate.data}
                      title={cate.name}
                      subTitle={cate.subTitle}
                      onChange={(curAccessible) => (newVal: any, actionMeta) => {
                        curAccessible.value = newVal
                        handleDataChange(newVal, item)
                      }
                      }
                    />
                  );
                })}
              </Box>
            )}
          </div>
        );
      })}
      {isHasRole && <RoleManagement isHasRole={isHasRole} roleList={roleListData} />}
    </ModalBase>
  );
};

export default React.memo(ModalGroupInput);
