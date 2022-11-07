import React from 'react';

import Select, {
  StylesConfig,
  PropsValue,
  MultiValue,
  SingleValue,
  ActionMeta,
} from 'react-select';
import Icon from '../Icon';

interface SelectBoxProps {
  options: Array<any>;
  value?: PropsValue<SelectBoxOptionInterface>;
  defaultValue?: PropsValue<SelectBoxOptionInterface>;
  onChange?: (
    newValue:
      | MultiValue<SelectBoxOptionInterface>
      | SingleValue<SelectBoxOptionInterface>,
    actionMeta: ActionMeta<any>,
  ) => void | undefined;
  lable?: string;
  width?: number;
  height?: number;
  isSearchable: boolean;
  customStyles?: Pick<
    StylesConfig,
    'option' | 'input' | 'placeholder' | 'singleValue'
  >;
  label?: string;
  isAccessControlSelect?: boolean;
  isMulti?: boolean;
}

export interface SelectBoxOptionInterface {
  readonly value: string | number;
  readonly label: any;
}

const SelectBox: React.FC<SelectBoxProps> = (props) => {
  const { value, defaultValue, options, isSearchable, onChange, label, isMulti } = props;

  const colourStyles: StylesConfig<SelectBoxOptionInterface> = {
    control: (styles) => ({
      ...styles,
      backgroundColor: 'white',
      boxShadow: 'none',
      height: `${props.isAccessControlSelect ? '37px' : '48px'}`,
      borderRadius: `${props.isAccessControlSelect ? '20px' : '0.75rem'}`,
      borderColor: '#e5e7eb',
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const option = props.customStyles?.option;
      return {
        ...styles,
        ...option,
      };
    },
    input: (styles) => {
      const input = props.customStyles?.input;
      return {
        ...styles,
        ...input,
      };
    },
    placeholder: (styles) => {
      const placeholder = props.customStyles?.placeholder;
      return {
        ...styles,
        ...placeholder,
      };
    },
    singleValue: (styles, { data }) => {
      const singleValue = props.customStyles?.singleValue;
      return {
        ...styles,
        ...singleValue,
      };
    },
  };

  return (
    <div className="select-box-wrapper">
      {label && <div className="react-select-label">{label}</div>}
      <Select
        className={
          props.isAccessControlSelect
            ? 'access__control__select react-select-content mt-1'
            : 'react-select-content mt-1'
        }
        defaultValue={defaultValue}
        value={value}
        options={options}
        styles={colourStyles}
        isSearchable={isSearchable}
        onChange={onChange}
        isMulti={isMulti}
      />
    </div>
  );
};

export default SelectBox;
