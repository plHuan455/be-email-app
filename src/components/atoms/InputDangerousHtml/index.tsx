import { Box } from '@mui/material';
import React from 'react';
import { useQuill } from 'react-quilljs';

// interface Props {
//   toolbar: [[string | Object] | null];
// }

interface Props {
  styles?: object;
  placeholder?: string;
}

const InputDangerousHtml: React.FC<Props> = ({ styles, placeholder }) => {
  const { quillRef } = useQuill({
    modules: {
      toolbar: '#toolbar',
    },
    formats: [],
    placeholder: placeholder || '',
  });

  return (
    <Box style={{ width: '100%', height: 80 }} sx={styles}>
      <div ref={quillRef} />
      <div id="toolbar" style={{ display: 'none' }}></div>
      <div id="editor"></div>
    </Box>
  );
};

export default InputDangerousHtml;
