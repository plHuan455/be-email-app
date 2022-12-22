import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Box } from '@mui/material';
import { MobileTimePicker } from '@mui/x-date-pickers';

interface Props {
  value: Dayjs | null;
  setValueCalendar: (newValue: Dayjs | null) => void;
}

const SettimeInput: React.FC<Props> = ({ value, setValueCalendar }) => {
  return (
    <Box className="py-2">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileTimePicker
          ampmInClock
          openTo={'minutes'}
          views={['minutes', 'seconds']}
          inputFormat="mm:ss"
          mask="__:__"
          label="Hours and minutes"
          value={value}
          onChange={(newValue) => {
            setValueCalendar(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default SettimeInput;
