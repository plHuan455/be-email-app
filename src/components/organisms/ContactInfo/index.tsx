import { Avatar, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { rem } from "@utils/functions"

interface ContactInfoProps {
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({
  avatar,
  firstName,
  lastName,
  email,
  phone,
  createdAt,
}) => {
  return (
    <Box className="o-contactInfo">
      <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Avatar sx={{width: rem(100), height: rem(100)}} src={avatar}/>
      </Box>
      <Typography sx={{mt: rem(20), textAlign: 'center', fontWeight: 500, fontSize: rem(20), lineHeight: rem(22)}}>
        {`${firstName} ${lastName}`}
      </Typography>
      <Box sx={{mt: rem(12)}}>
        <Typography>Email:</Typography>
        <Typography className="o-contactInfo_field_text" sx={{fontWeight: 500, fontSize: rem(20), lineHeight: rem(22)}}>
          {email}
        </Typography>
      </Box>
      <Box sx={{mt: rem(12)}}>
        <Typography>Phone:</Typography>
        <Typography className="o-contactInfo_field_text" sx={{fontWeight: 500, fontSize: rem(20), lineHeight: rem(22)}}>
          {phone}
        </Typography>
      </Box>
      <Box sx={{mt: rem(12)}}>
        <Typography>Created at:</Typography>
        <Typography className="c-contactTable_info" sx={{fontWeight: 500, fontSize: rem(20), lineHeight: rem(22)}}>
          {createdAt}
        </Typography>
      </Box>
    </Box>
  )
}

export default ContactInfo