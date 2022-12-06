import { Avatar } from '@mui/material';
import { rem } from '@utils/functions';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

interface AvatarInputProps {
  id?: string;
  placeholderImgSrc?: string;
  onChange?: (value: File) => void;
  className?: string;
  alt?: string;
  src?: string | undefined;
}

const StyleLabelWrapper = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;

  label {
    position: relative;
    height: ${rem(100)};
    height: ${rem(100)};
  }

  .MuiAvatar-root {
    height: ${rem(100)};
    width: ${rem(100)};
    cursor: pointer;
  }
`;

const StyleIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: ${rem(100)};
  width: ${rem(100)};
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.25);
  transition: background-color 0.25s linear;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
    svg {
      opacity: 1;
    }
  }

  svg {
    opacity: 0;
    transition: opacity 0.25s linear;
  }
`;

const AvatarInput: React.FC<AvatarInputProps> = ({
  id,
  placeholderImgSrc,
  onChange,
  className,
  alt,
  src,
}) => {
  const [preViewImgSrc, setPreViewImgSrc] = useState<string>(placeholderImgSrc ?? '');
  const objectUrlRef = useRef<string>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;

    if (fileList && fileList?.length > 0) {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
      objectUrlRef.current = URL.createObjectURL(fileList[0]);
      setPreViewImgSrc(objectUrlRef.current);
      return onChange && onChange(fileList[0]);
    }

    setPreViewImgSrc('');
  };

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  return (
    <div className={`a-avatarInput`}>
      <StyleLabelWrapper>
        <label htmlFor={id}>
          <Avatar src={preViewImgSrc} alt={alt} className={className} />
          <StyleIcon>
            <CameraAltIcon
              sx={{
                fontSize: '2rem',
              }}
            />
          </StyleIcon>
        </label>
      </StyleLabelWrapper>
      <input
        type="file"
        hidden
        id={id}
        onChange={handleChange}
        accept="image/*"></input>
    </div>
  );
};

export default AvatarInput;