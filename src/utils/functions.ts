import draftToHtml from 'draftjs-to-html';
import { convertToRaw, ContentState, EditorState, convertFromHTML } from 'draft-js';

export const convertPathImage = (image?: string) => {
  if (image && !image.includes('src/assets/images'))
    return `${process.env.REACT_APP_API_BASE_URL}image/${image}`;
  return '';
};

export const getHtmlStringFromEditorState = (data: any) => {
  return draftToHtml(convertToRaw(data.getCurrentContent()))
}

export const getEditorStateFormHtmlString = (data: string) => {
  const blocksFromHTML = convertFromHTML(data);
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap,
  );
  return EditorState.createWithContent(state)
}

export const rem = (pixel: number) => {
  return `${pixel / 16}rem`;
}