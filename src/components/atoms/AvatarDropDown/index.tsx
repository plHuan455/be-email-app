import useOnClickOutside from '@hooks/useClickoutside';
import { Avatar, Box, Button, Theme, Typography } from '@mui/material';
import { useAppSelector } from '@redux/configureStore';
import { FC, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme: Theme) => ({
  userInfo: {
    marginLeft: theme.spacing(4),
  },
}));

interface AvatarDropdownProps {
  isShow?: boolean;
  label?: string;
  icon?: string;
  menu?: Array<{ id: number; name: string; url: string; cb?: VoidFunction }>;
}

const AvatarDropdown: FC<AvatarDropdownProps> = ({ isShow, label, icon, menu }) => {
  const [show, setShow] = useState(isShow);
  const ref = useRef(null);
  const handleShow = () => {
    setShow(!show);
  };
  const { classes, cx } = useStyles();
  const user = useAppSelector((state) => state.user);

  useOnClickOutside(ref, () => setShow(false));

  return (
    <Root ref={ref}>
      <div className="projects">
        <Div className="flex flex-row items-center" onClick={handleShow}>
          <Avatar sizes={'40'} alt="avt" src={''} />
          <Box className={cx(classes.userInfo)}>
            <Typography sx={{ fontWeight: 700 }}>{user.name}</Typography>
            <Typography variant="body2">{user.email}</Typography>
          </Box>
        </Div>

        <ul className={show ? 'active' : ''}>
          {(menu ?? []).map((val, idx) => {
            return (
              <li key={val.id + idx.toString()} onClick={() => val?.cb?.()}>
                <div className="h-10 display-center">{val.name}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </Root>
  );
};

export default AvatarDropdown;

const Root = styled.div`
  height: auto;
  display: flex; /* NEW, Spec - Firefox, Chrome, Opera */
  align-items: center;
  a,
  button {
    font-family: 'Roboto', sans-serif;
  }

  .projects,
  .products {
    position: relative;
  }

  .projects ul,
  .products ul {
    margin-top: 10px;
    position: absolute;
    display: flex; /* NEW, Spec - Firefox, Chrome, Opera */
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    min-width: 180px;
    min-height: fit-content;
    background: rgb(183, 183, 183);
    right: 0px;
    list-style: none;
    border-radius: 5px;
    opacity: 0;
    pointer-events: none;
    transform: translateY(-10px);
    transition: all 0.4s ease;
    z-index: 110;
  }
  .projects li,
  .products li {
    width: 100%;
    height: 100%;
    display: flex; /* NEW, Spec - Firefox, Chrome, Opera */
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    :first-child {
      margin: 0;
    }
  }

  .projects li:hover,
  .products li:hover {
    background-color: #667386;
    color: white;
  }

  .projects li:hover a,
  .products li:hover a {
    color: white;
  }

  .projects a,
  .products a {
    padding: 16px;
    color: black;
    text-decoration: none;
    width: 100%;
    height: 100%;
    text-align: center;
  }

  .active {
    opacity: 1 !important;
    pointer-events: all !important;
    transform: translateY(0px) !important;
  }

  .mr-1 {
    margin-right: 8px;
  }
`;

const Div = styled.div`
  min-width: 50px;
  border: none;
  background: none;
  padding: 4px 0 4px 12px;
  cursor: pointer;
`;
