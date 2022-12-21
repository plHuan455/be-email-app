import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import React, { useEffect, useRef } from 'react';
import { Dayjs } from 'dayjs';

interface Props {
  isOpen?: boolean;
  value: Dayjs | null;
  setValueCalendar: (newValue: Dayjs | null) => void;
  onAccept?: (date: Dayjs | null) => void;
  onClose?: () => void;
}

const DateTimePicker: React.FC<Props> = ({
  isOpen = false,
  value,
  setValueCalendar,
  onAccept,
  onClose
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if(inputRef.current && isOpen) {
      inputRef.current.click();
    }
  }, [isOpen])

  return (
    <Box className="p-4">
      <MobileDateTimePicker
        renderInput={(props) => {
          return <TextField {...props}/>
        }}
        label="DateTimePicker"
        inputRef={inputRef}
        inputFormat="lll"
        value={value}
        openTo={'hours'}
        views={['hours', 'minutes', 'day']}
        onChange={(newValue) => {
          setValueCalendar(newValue);
        }}
        onAccept={onAccept}
        onClose={onClose}
      />
    </Box>
  );
};

export default DateTimePicker;
