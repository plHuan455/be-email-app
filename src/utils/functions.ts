import draftToHtml from 'draftjs-to-html';
import { convertToRaw, ContentState, EditorState, convertFromHTML } from 'draft-js';

export const convertPathImage = (image?: string) => {
  if (image && !image.includes('src/assets/images'))
    return `${process.env.REACT_APP_API_BASE_URL}image/${image}`;
  return '';
};

export const getHtmlStringFromEditorState = (data: any) => {
  if(data === '' || data === undefined) return '<p></p>';
  return draftToHtml(convertToRaw(data.getCurrentContent()))
}

export const getEditorStateFormHtmlString = (data?: string) => {
  if(!data) return EditorState.createEmpty();
  const blocksFromHTML = convertFromHTML(data);
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap,
  );
  return EditorState.createWithContent(state)
}
export const addHttp = (url: string) => {
  if (url.match(/^https:\/\/|^http:\/\//g)) 
     return url;
  return `http://${url}`
}

export const createCustomFiles = (files: FileList | File[] | null) => {
  if (!files) return [];
  return Object.keys(files).map((key) => {
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
}

export const rem = (pixel: number) => {
  return `${pixel / 16}rem`;
}