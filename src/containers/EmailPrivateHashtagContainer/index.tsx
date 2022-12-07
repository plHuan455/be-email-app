import Icon from '@components/atoms/Icon';
import EmailPrivateHashtag from '@components/molecules/EmailPrivateHashtag';
import { Autocomplete, TextField } from '@mui/material';
import { RootState } from '@redux/configureStore';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const EmailPrivateHashtagContainer = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const { privateHashtag } = useSelector((state: RootState) => state.email);

  //   handler FUNC

  const handleNavigateIsActive = (e) => {
    setIsActive((prevState) => !prevState);
  };

  return (
    <div className="flex items-center  py-4">
      <span className="font-semibold">Hashtag:</span>
      <div className="pl-2 flex items-center gap-2">
        {privateHashtag && isActive && (
          <EmailPrivateHashtag privateHashtagData={privateHashtag} />
        )}
        <span
          className="flex items-center justify-center p-2 rounded-full border border-[#E0E0E0] cursor-pointer ease-in duration-300 hover:bg-[#F6F3FD]"
          onClick={handleNavigateIsActive}>
          <Icon icon={isActive ? 'close' : 'plus'} />
        </span>
      </div>
    </div>
  );
};

export default EmailPrivateHashtagContainer;
