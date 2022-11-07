import React, { FC, useState } from 'react';
import isFunction from 'lodash/isFunction';
import Icon from '@components/atoms/Icon';
import { Button, Input, Toolbar } from '@mui/material';
import { useTranslation } from '@@packages/localization';

interface TableToolbarProps {
  onClearSortClicked?: () => void;
  onAddClicked?: () => void;
  searchComponent?: React.ReactNode;
  advanceFilter?: React.ReactNode;
  btnCreateTitle?: string | null;
}

const TableToolbar: FC<TableToolbarProps> = (props) => {
  //   const [anchorEl, setAnchorEl] = useState(null);
  const { t } = useTranslation();
  //   const handleClick = (event: any) => {
  //     setAnchorEl(event.currentTarget);
  //   };

  //   const handleClose = () => {
  //     setAnchorEl(null);
  //   };

  //   const open = Boolean(anchorEl);
  return (
    <Toolbar className="p-3">
      <div className="grid grid-cols-2 w-full h-full">
        <div className="flex-fill pb-2">
          {isFunction(props.onAddClicked) && (
            <Button onClick={props.onAddClicked}>
              <Icon icon="plus" />
            </Button>
          )}
          {props.advanceFilter}
        </div>
        <div className="flex justify-end">{props.searchComponent}</div>
      </div>
    </Toolbar>
  );
};

export default React.memo(TableToolbar);
