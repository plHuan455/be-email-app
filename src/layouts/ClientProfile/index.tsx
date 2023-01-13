import { UserProfileResponse } from '@api/user';
import { Avatar, Box, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { isEmpty } from 'lodash';
import React from 'react';

interface Props {
  clientProfileData?: UserProfileResponse;

  onEdit: (id: number) => void;
  onDelete: (user: UserProfileResponse) => void;
}

const ClientProfileLayout: React.FC<Props> = ({
  clientProfileData,
  onEdit,
  onDelete,
}) => {
  if (isEmpty(clientProfileData)) return null;

  const {
    id,
    avatar,
    first_name,
    last_name,
    email,
    phone_number,
    identity,
    role,
    department,
    position,
    sex,
    address,
  } = clientProfileData;

  const { city, district, national, number, street, ward } = address;

  return (
    <Box className="flex flex-col h-full">
      <Box className="flex-1">
        <Grid container sx={{ height: '100%', paddingBottom: 4 }}>
          <Grid
            xs={4}
            sx={{
              borderRight: '1px solid rgb(100 116 139/1)',
            }}>
            <Grid xs={12}>
              <h1 className="text-[20px] font-bold text-center">Profile</h1>
            </Grid>
            <Grid xs={12}>
              <Avatar
                sx={{ width: '80px', height: '80px' }}
                className="justify-center items-center mx-auto my-4"
                src={`http://${avatar}`}
                alt={`${first_name} ${last_name}`}
              />
            </Grid>
            <Grid xs={12}>
              <p className="px-4 text-[16px] leading-10 text-center">
                <b className="inline-block">First Name:</b>
                <span className="inline-block pl-2">{first_name}.</span>
              </p>
            </Grid>
            <Grid xs={12}>
              <p className="px-4 text-[16px] leading-10 text-center">
                <b className="inline-block">Last Name:</b>
                <span className="inline-block pl-2">{last_name}.</span>
              </p>
            </Grid>
            <Grid xs={12}>
              <p className="px-4 text-[16px] leading-10 text-center">
                <b className="inline-block">Identity:</b>
                <span className="inline-block pl-2">{identity}.</span>
              </p>
            </Grid>
            <Grid xs={12}>
              <p className="px-4 text-[16px] leading-10 text-center">
                <b className="inline-block">Sex:</b>
                <span className="inline-block pl-2">{sex}.</span>
              </p>
            </Grid>
          </Grid>
          <Grid xs={8} sx={{ paddingLeft: 4 }}>
            <Grid xs={12}>
              <p className="px-4 text-[18px] leading-10">
                <b className="min-w-[140px] inline-block">Email:</b>
                <span className="inline-block">{email}</span>
              </p>
            </Grid>
            <Grid xs={12}>
              <p className="px-4 text-[18px] leading-10">
                <b className="min-w-[140px] inline-block">Phone Number:</b>
                <span className="inline-block">{phone_number}</span>
              </p>
            </Grid>
            <Grid xs={12}>
              <p className="px-4 text-[18px] leading-10">
                <b className="min-w-[140px] inline-block">Identity:</b>
                <span className="inline-block">{identity}</span>
              </p>
            </Grid>
            <Grid xs={12}>
              <p className="px-4 text-[18px] leading-10">
                <b className="min-w-[140px] inline-block">Address:</b>
                <span className="inline-block">{`${number}, ${street}, ${ward}, ${district}, ${city}, ${national}`}</span>
              </p>
            </Grid>
            <Grid xs={12}>
              <p className="px-4 text-[18px] leading-10">
                <b className="min-w-[140px] inline-block">Role:</b>
                <span className="inline-block">{role}</span>
              </p>
            </Grid>
            <Grid xs={12}>
              <p className="px-4 text-[18px] leading-10">
                <b className="min-w-[140px] inline-block">Department:</b>
                <span className="inline-block">{department}</span>
              </p>
            </Grid>
            <Grid xs={12}>
              <p className="px-4 text-[18px] leading-10">
                <b className="min-w-[140px] inline-block">Position:</b>
                <span className="inline-block">{position}</span>
              </p>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box className="flex items-end justify-end gap-2 border-t border-slate-500 pt-2">
        <Button color="error" onClick={() => onDelete(clientProfileData)}>
          Delete
        </Button>
        <Button onClick={() => onEdit(id)}>Update</Button>
      </Box>
    </Box>
    // <Box className="flex flex-col h-full">
    //   <Grid container>
    //     <Grid xs={12}>
    //       <h1 className="text-[28px] font-bold text-center">User Profile</h1>
    //     </Grid>
    //     <Grid xs={12}>
    //       <Avatar
    //         sx={{ width: '80px', height: '80px' }}
    //         className="justify-center items-center mx-auto my-4"
    //         src={avatar}
    //         alt={`${first_name} ${last_name}`}
    //       />
    //     </Grid>
    //     <Grid xs={6}>
    //       <p className="px-4 text-[18px] leading-10">
    //         <b className="min-w-[140px] inline-block">First Name:</b>
    //         <span className="inline-block">{first_name}</span>
    //       </p>
    //     </Grid>
    //     <Grid xs={6}>
    //       <p className="px-4 text-[18px] leading-10">
    //         <b className="min-w-[140px] inline-block">Last Name:</b>
    //         <span className="inline-block">{last_name}</span>
    //       </p>
    //     </Grid>
    //     <Grid xs={6}>
    //       <p className="px-4 text-[18px] leading-10">
    //         <b className="min-w-[140px] inline-block">Email:</b>
    //         <span className="inline-block">{email}</span>
    //       </p>
    //     </Grid>
    //     <Grid xs={6}>
    //       <p className="px-4 text-[18px] leading-10">
    //         <b className="min-w-[140px] inline-block">Phone Number:</b>
    //         <span className="inline-block">{phone_number}</span>
    //       </p>
    //     </Grid>
    //     <Grid xs={6}>
    //       <p className="px-4 text-[18px] leading-10">
    //         <b className="min-w-[140px] inline-block">Identity:</b>
    //         <span className="inline-block">{identity}</span>
    //       </p>
    //     </Grid>
    //     <Grid xs={6}>
    //       <p className="px-4 text-[18px] leading-10">
    //         <b className="min-w-[140px] inline-block">Role:</b>
    //         <span className="inline-block">{role}</span>
    //       </p>
    //     </Grid>
    //     <Grid xs={6}>
    //       <p className="px-4 text-[18px] leading-10">
    //         <b className="min-w-[140px] inline-block">Department:</b>
    //         <span className="inline-block">{department}</span>
    //       </p>
    //     </Grid>
    //     <Grid xs={6}>
    //       <p className="px-4 text-[18px] leading-10">
    //         <b className="min-w-[140px] inline-block">Position:</b>
    //         <span className="inline-block">{position}</span>
    //       </p>
    //     </Grid>
    //   </Grid>
    //   <Box className="flex flex-1 items-end justify-around">
    //     <Button color="error">Delete</Button>
    //     <Button>Update</Button>
    //   </Box>
    // </Box>
  );
};

export default ClientProfileLayout;
