import { getUserInfo } from '@api/auth';
import UserProfile from '@layouts/UserProfile';
import UserProfileUpdate from '@layouts/UserProfileUpdate';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Loading from '@components/atoms/Loading';
import { useNavigate } from 'react-router-dom';

const UserProfileContainer = () => {
  // Use State
  //   const [isViewStatus, setIsViewStatus] = useState<boolean>(true);

  //   useQuery
  const queryData = useQuery({
    queryKey: ['get-user-profile'],
    queryFn: getUserInfo,
  });

  const { data: dataGetUserProfile, isLoading: isLoadingUserProfile } = queryData;

  //   useNavigate

  const navigate = useNavigate();

  //   const handleChangeStatus = (e) => {
  //     setIsViewStatus((prevState) => !prevState);
  //   };

  const onChangePassword = (e) => {
    navigate('/change-password');
  };

  if (isLoadingUserProfile) return <Loading isLoading={true} />;

  return (
    <Box
      sx={{
        height: '100vh',
        padding: '80px 28px 28px 28px',
        backgroundColor: '#EDEDF3',
        borderTopLeftRadius: '65px',
        overflow: 'scroll',
      }}>
      <Box className="flex flex-col rounded-xl bg-white h-full p-16 shadow-md">
        <Box className="flex-1">
          {/* {isViewStatus && dataGetUserProfile ? (
            <UserProfile userInfoData={dataGetUserProfile?.data} />
          ) : (
            <UserProfileUpdate />
          )} */}
          {dataGetUserProfile && (
            <UserProfile userInfoData={dataGetUserProfile?.data} />
          )}
        </Box>
        <Box className="flex justify-center py-6 gap-2">
          {/* <Button onClick={handleChangeStatus}>
            {isViewStatus ? 'Update' : 'UserInfo'}
          </Button> */}
          <Button onClick={onChangePassword}>Change Password</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfileContainer;
