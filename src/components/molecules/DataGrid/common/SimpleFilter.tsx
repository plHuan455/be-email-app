import classNames from 'classnames';
import { Button, Menu, MenuItem, Popover } from '@mui/material';
import isFunction from 'lodash/isFunction';
import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/configureStore';

const cx = classNames.bind(styles);
interface SimpleFilterProps {
  onSearch?: (evt: string) => void;
  onClearSortClicked?: () => void;
  onFilter?: (status: string) => void;
  hasSimpleFilter?: boolean;
}

const SimpleFilter: FC<SimpleFilterProps> = (props) => {
  const [toggle, setToggle] = useState(false);
  const search = useRef<HTMLDivElement>(null);

  const { searchActionValue } = useSelector((state: RootState) => state.global);
  const [isFirstTimeSearch, setIsFirstTimeSearch] = useState<boolean>(true);

  useEffect(() => {
    if (isFirstTimeSearch) {
      setIsFirstTimeSearch(false);
      return;
    }
    props.onSearch?.(searchActionValue);
  }, [searchActionValue]);

  const handleOnChange = (
    evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    props.onSearch?.(evt.target.value);
  };

  if (!isFunction(props.onSearch)) return null;

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleFilter = (status: string) => {
    props.onFilter?.(status);
    handleClose();
  };

  return (
    <React.Fragment>
      {props.hasSimpleFilter ? (
        <div className="mr-4">
          <Button aria-describedby={id} variant="contained" onClick={handleClick}>
            Filter
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}>
            <MenuItem onClick={() => handleFilter('Public')}>Public</MenuItem>
            <MenuItem onClick={() => handleFilter('Private')}>Private</MenuItem>
          </Popover>
        </div>
      ) : null}
      <div className={cx(styles.search, toggle ? styles.open : '')} ref={search}>
        <input
          type="search"
          className={cx(styles['search-box'])}
          id="search-input"
          value={searchActionValue}
          onChange={handleOnChange}
          placeholder={'Enter Search'}
        />
        <span
          className={cx(styles['search-button'])}
          onClick={(e) => {
            e.preventDefault();
            setToggle(!toggle);
          }}>
          <span className={cx(styles['search-icon'])}></span>
        </span>
      </div>
      {/* <Input
        type="text"
        id="search-input"
        value={searchValue}
        onChange={handleOnChange}
        size="small"
        placeholder={'Enter Search'}
      /> */}
      {/* <InputGroupAddon addonType="append">
        <Button color="info" onClick={props.onClearSortClicked}>
          <i className="fa fa-refresh" style={{ fontSize: 14 }} /> Reload
        </Button>
      </InputGroupAddon> */}
    </React.Fragment>
  );
};

export default React.memo(SimpleFilter);
