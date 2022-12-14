import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import React from 'react';
import { Dayjs } from 'dayjs';

interface Props {
  value: Dayjs | null;
  setValueCalendar: (newValue: Dayjs | null) => void;
}

const DateTimePicker: React.FC<Props> = ({ value, setValueCalendar }) => {
  return (
    <Box className="p-4">
      <MobileDateTimePicker
        renderInput={(props) => {
          console.log(props)
        return <TextField {...props} />
      }}
        label="DateTimePicker"
        inputFormat="LLL"
        value={value}
        openTo={'hours'}
        views={['hours', 'minutes', 'day']}
        onChange={(newValue) => {
          setValueCalendar(newValue);
        }}
      />
    </Box>
  );
};

export default DateTimePicker;
