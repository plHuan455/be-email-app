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
        renderInput={(props) => <TextField {...props} />}
        label="DateTimePicker"
        value={value}
        onChange={(newValue) => {
          setValueCalendar(newValue);
        }}
      />
    </Box>
  );
};

export default DateTimePicker;
