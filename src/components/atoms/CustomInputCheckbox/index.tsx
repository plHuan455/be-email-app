import React from 'react';
import styles from './styles.module.scss';

interface Props {
  checkBoxSize?: number;
  checkSize?: number;
  borderColor?: string;
  checkColor?: string;
  isCheck?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  name?: string;
  value?: string;
}

const CustomInputRadio: React.FC<Props> = ({
  checkBoxSize = 18,
  checkSize = 12,
  borderColor = '#8A94A8',
  checkColor = '#03A661',
  isCheck = false,
  onChange,
  name,
  value,
  ...props
}) => {
  return (
    <label
      className={styles.customInputCheckboxWrap}
      style={
        {
          '--border-color': borderColor,
          '--check-color': checkColor,
          '--checkbox-size': checkBoxSize + 'px',
          '--check-size': checkSize + 'px',
        } as React.CSSProperties
      }
      {...props}>
      <input
        type="radio"
        checked={isCheck}
        name={name || ''}
        onChange={onChange}
        value={value}
      />
    </label>
  );
};

export default CustomInputRadio;
