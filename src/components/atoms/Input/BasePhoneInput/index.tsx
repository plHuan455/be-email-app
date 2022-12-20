import { FormLabel } from "@mui/material";
import { Box } from "@mui/system";
import { rem } from "@utils/functions";
import PhoneInput from 'react-phone-input-2';

interface PhoneInputProps {
  label?: string;
  value: string;
  onChange?: (phone: string) => void;
}

const BasePhoneInput: React.FC<PhoneInputProps> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <Box className="a-phoneInput">
      {Boolean(label) && <FormLabel sx={{fontSize: rem(16), color: '#0D0D0D'}}>{label}</FormLabel>}
      <Box className="a-phoneInput_inputWrapper">
        <PhoneInput 
          inputClass="a-phoneInput_input"
          country='vn'
          value={value}
          onChange={onChange}
        />
      </Box>
    </Box>
  )
}

export default BasePhoneInput;