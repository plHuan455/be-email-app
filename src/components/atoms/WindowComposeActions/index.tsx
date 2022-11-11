import { RenderButtonIcon } from '@components/email/EmailActions';
import { Box } from '@mui/material';
import React from 'react';

const WINDOWCOMPOSEACTIONS = {
  minus: {
    item: 'minus',
    color: '#9E96BE',
  },
  square: {
    item: 'square',
    color: '#9E96BE',
  },
  close: {
    item: 'close',
    color: '#9E96BE',
  },
};

function WindowComposeActions({ className }: any) {
  return (
    <Box className={`flex gap-x-1.5 justify-end ${className}`}>
      {Object.keys(WINDOWCOMPOSEACTIONS).map((val) => {
        const currVal = WINDOWCOMPOSEACTIONS[val];

        return (
          <RenderButtonIcon
            item={currVal.item}
            key={val}
            color={currVal.color}
            className="p-1 ease-in duration-300 rounded hover:bg-[#F2F2F2] hover:cursor-pointer hover:scale-110"
          />
        );
      })}
    </Box>
  );
}

export default WindowComposeActions;
