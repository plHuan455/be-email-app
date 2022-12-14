import Icon from '@components/atoms/Icon';
import EmailPrivateHashtag from '@components/molecules/EmailPrivateHashtag';
import { Autocomplete, Box, TextField } from '@mui/material';
import { RootState } from '@redux/configureStore';
import { HashtagTabs } from '@redux/Email/reducer';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface Props {
  defaultData: HashtagTabs[];
}

const EmailPrivateHashtagContainer: React.FC<Props> = ({ defaultData }) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const { privateHashtags } = useSelector((state: RootState) => state.email);

  // useNavigate
  const navigate = useNavigate();

  //   handler FUNC

  const handleNavigateIsActive = (e) => {
    setIsActive((prevState) => !prevState);
  };

  const handleClickPrivateTag = (tag: string) => (e) => {
    navigate(`/emails/tag/${tag}`);
  };

  return (
    <div className="flex items-center  py-4">
      <span className="font-semibold">Hashtag:</span>
      <Box>
        {defaultData.map((val, index) => (
          <span
            onClick={handleClickPrivateTag(val.value)}
            className="inline-block px-2 text-[#554CFF] cursor-pointer hover:opacity-80"
            key={index}>
            {val.title}
          </span>
        ))}
      </Box>
      <div className="pl-2 flex flex-1 items-center gap-2">
        {privateHashtags && isActive && (
          <EmailPrivateHashtag
            defaultValue={defaultData}
            privateHashtagData={privateHashtags}
          />
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
