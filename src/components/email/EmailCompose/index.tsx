import { SingleOTPInputComponent } from '@components/atoms/Input/PinInput/SingleInput';
import Receiver from '@components/atoms/Receiver';
import WindowComposeActions from '@components/atoms/WindowComposeActions';
import { Autocomplete, Box, Button, TextField, Tooltip } from '@mui/material';
import EmailComposeFormGroup from '../hocs/EmailComposeFormGroup';

import ArticleIcon from '@mui/icons-material/Article';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import logoImg from '@assets/images/logo_without_text.png';
import SendIcon from '@mui/icons-material/Send';
import TableViewIcon from '@mui/icons-material/TableView';

import avatarImg from '@assets/images/avatars/avatar-1.jpg';

import './styles.scss';
import EditContent from '@components/atoms/EditContent';
import CustomButton from '@components/atoms/CustomButton';
import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import AttachFiles from '@components/atoms/AttachFiles';

interface ReceiverData {
  avatar: string;
  mail: string;
  abbreviations: string;
}

const receiversList: ReceiverData[] = [
  { avatar: avatarImg, mail: 'giangz0009@gmail.com', abbreviations: 'GI' },
  { avatar: '', mail: 'mail1@gmail.com', abbreviations: 'T2' },
  { avatar: avatarImg, mail: 'mail2@gmail.com', abbreviations: 'T3' },
];

function EmailCompose() {
  const [attachedFiles, setAttachedFile] = useState<any>([]);
  const [attachFiles, setAttachFile] = useState<any>([]);
  const [avatar, setAvatar] = useState<any>();

  const refInputAttachFile = useRef<HTMLInputElement>(null);

  const handleAttachFile = (e) => {
    const checkRef = !!refInputAttachFile.current;

    if (checkRef) {
      refInputAttachFile.current.click();
    }
  };

  const handleOnAttachedFiles = (e) => {
    const files = e.target.files;

    const customFiles = Object.keys(files).map((key) => {
      const file = files[key];
      const fileType = file.type;
      file.preview = URL.createObjectURL(file);
      const res = {
        name: file.name,
        type: '',
        url: file.preview,
      };

      if (fileType) {
        const splitFileType = fileType.split('/');
        const [firstSplitFileType, secondSplitFileType, ...restFileType] =
          splitFileType;
        if (firstSplitFileType === 'image') res.type = 'image';
        else if (secondSplitFileType === 'pdf') res.type = 'pdf';
        else res.type = 'file';
      }

      return res;
    });

    setAttachFile((prevState) => [...prevState, ...files]);
    setAttachedFile((prevState) => [...prevState, ...customFiles]);
    // const file = e.target.files[0];

    // file.preview = URL.createObjectURL(file);
    // setAvatar(file);
  };

  useEffect(() => {
    return () => {
      attachFiles.length !== 0 &&
        Object.keys(attachFiles).forEach((key) => {
          const file = attachFiles[key];

          URL.revokeObjectURL(file.preview);
        });
    };
  }, [attachFiles]);

  const handleDeleteAllAttachedFiles = useCallback(() => {
    setAttachedFile([]);
    setAttachFile([]);
  }, []);

  const handleDeleteAttachedFile = useCallback((index) => {
    setAttachedFile((prevState) => {
      prevState.splice(index, 1);
      return [...prevState];
    });
  }, []);

  return (
    <Box className="w-[654px] mx-auto shadow-xl rounded-3xl overflow-hidden">
      {/* Header */}
      <Box className="bg-white">
        {/* Window Compose Actions  */}
        <WindowComposeActions className="pt-3 pr-3" />
        {avatar && <img src={avatar.preview} alt="avatar" />}
        <Box className="px-9 py-10 pt-2">
          {/* Compose To */}
          <EmailComposeFormGroup label={'To:'}>
            <Autocomplete
              className="emailComposeTo"
              multiple
              id="tags-outlined"
              options={receiversList}
              getOptionLabel={(option) => option.mail}
              defaultValue={[]}
              filterSelectedOptions
              renderInput={(params) => {
                return (
                  <Box className="flex justify-between items-center">
                    <TextField
                      {...params}
                      className="outline-none border-transparent"
                    />
                    {/* <span>Cc,From</span> */}
                  </Box>
                );
              }}
              renderTags={(list, getTagProps) => {
                return list.map((receiver, index) => {
                  const props = getTagProps({ index: index });

                  return (
                    <Receiver
                      key={index}
                      data={receiver}
                      onDelete={() => props.onDelete(index)}
                    />
                  );
                });
              }}
            />
          </EmailComposeFormGroup>
          {/* Subject */}
          <EmailComposeFormGroup label={'Subject:'}>
            <SingleOTPInputComponent className="outline-none w-full text-black text-[18px] font-bold h-full" />
          </EmailComposeFormGroup>
          {/* Edit Content */}
          <EditContent />
          {/* Files List */}
          <Box>
            {attachedFiles.length !== 0 && (
              <AttachFiles
                data={attachedFiles}
                isDelete={true}
                onDeleteAll={handleDeleteAllAttachedFiles}
                onDeleteFile={handleDeleteAttachedFile}
              />
            )}
          </Box>
          {/* Greeting */}
          <Box>
            <p className="text-black text-[16px] font-normal">
              Thanks and Best regards, ------
            </p>
          </Box>
          {/* Logo */}
          <Box className="flex items-center">
            <img src={logoImg} alt="Logo" />
            <span className="bg-gradient-to-r text-[#675FFF] font-[900] text-[28px] pl-3">
              METANODE
            </span>
          </Box>
        </Box>
      </Box>
      {/* Footer */}
      <Box className="p-6 bg-[#F1F1F6]">
        {/* manipulation */}
        <Box></Box>
        {/* Actions */}
        <Box className="flex justify-end items-center">
          <Tooltip title="Use template">
            <Button className="bg-transparent p-2 hover:bg-transparent">
              <ArticleIcon className="text-[#7D7E80]" />
            </Button>
          </Tooltip>
          <Tooltip title="Insert link">
            <Button
              className="bg-transparent p-2 hover:bg-transparent"
              onClick={handleAttachFile}>
              <input
                type="file"
                name="file"
                id="file"
                hidden
                ref={refInputAttachFile}
                onChange={handleOnAttachedFiles}
                multiple
              />
              <AttachFileIcon className="text-[#7D7E80]" />
            </Button>
          </Tooltip>

          <CustomButton
            padding="8px 10px"
            label="SEND NOW"
            bgButtonColor="#554CFF"
            textColor="#FFFFFF"
            textSize={15}
            isBeforeIcon={true}
            beforeIcon={<SendIcon fontSize="small" />}
            isAfterIcon={true}
            afterIcon={<TableViewIcon fontSize="small" />}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default EmailCompose;
