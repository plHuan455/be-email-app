import React from 'react';

import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import { useQuill } from 'react-quilljs';

import styles from './styles.module.scss';

const EditContent = () => {
  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: '#toolbar',
      history: {
        delay: 200,
        maxStack: 100,
        userOnly: true,
      },
      clipboard: {
        matchVisual: false,
      },
    },
    formats: [
      'undo',
      'redo',
      'size',
      'bold',
      'italic',
      'underline',
      'strike',
      'script',
      'background',
      'color',
      'link',
      'image',
      'blockquote',
      'align',
      'list',
    ],
  });

  const toolbar = quill?.getModule('toolbar').quill;

  React.useEffect(() => {
    if (quill) {
      // quill.on('text-change', (delta, oldDelta, source) => {
      //   console.log('Text change!');
      //   console.log(quill.getText()); // Get text only
      //   console.log(quill.getContents()); // Get delta contents
      //   console.log(quill.root.innerHTML); // Get innerHTML using quill
      //   console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
      // });
    }
  }, [quill]);
  return (
    <div className="my-4 border-transparent">
      <div
        id="toolbar"
        className="flex justify-center items-center flex-wrap"
        style={{ borderColor: 'transparent' }}>
        <button
          className="ql-undo"
          value="undo"
          onClick={() => {
            toolbar.history.undo();
          }}>
          <UndoIcon />
        </button>
        <button
          className="ql-undo"
          value="undo"
          onClick={() => {
            toolbar.history.redo();
          }}>
          <RedoIcon />
        </button>
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-underline" />
        <button className="ql-strike" />
        <select className="ql-font" />
        <button className="ql-script" value="sub" />
        <button className="ql-script" value="super" />
        <select className="ql-size" defaultValue={'false'}>
          <option value="small" />
          <option value="false" />
          <option value="large" />
          <option value="huge" />
        </select>
        <select className="ql-background" />
        <select className="ql-color" />
        <button className="ql-link" />
        <button className="ql-image" />
        <button className="ql-blockquote" />
        <select className="ql-align" />
        <button className="ql-list" value="ordered" />
        <button className="ql-list" value="bullet" />
      </div>
      <div
        ref={quillRef}
        style={{ borderColor: 'transparent' }}
        className={` text-black text-[16px] font-medium ${styles.editor}`}
      />

      <div id="editor" />
    </div>
  );
};

export default EditContent;
