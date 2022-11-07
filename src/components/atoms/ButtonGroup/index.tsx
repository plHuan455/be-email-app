import { Button, ButtonProps } from '@mui/material';
import React from 'react';

interface BgColorType {
  success: string | undefined;
  warning: string | undefined;
  error: string | undefined;
}

interface ButtonItem extends ButtonProps {
  title: string;
}

interface ButtonGroupProps {
  buttonList: Array<ButtonItem>;
  onClick: (buttonName: string) => void;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ buttonList, onClick }) => {
  return (
      <div className="double-button-bottom">
        ahihi
        {buttonList.map(({ title, ...props }, index) => (
          <Button
            variant="contained"
            size="large"
            onClick={() => onClick(title)}
            {...props}>
            {title}
          </Button>
        ))}
      </div>
  );
};

export default ButtonGroup;
