import * as htmlToImage from "html-to-image";
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw, ContentState, EditorState, convertFromHTML } from 'draft-js';

export const convertPathImage = (image?: string) => {
  if (image && !image.includes('src/assets/images'))
    return `${process.env.REACT_APP_API_BASE_URL}image/${image}`;
  return '';
};

export const getHtmlStringFromEditorState = (data: any) => {
  if(data === '' || data === undefined) return '<p></p>\n';
  return draftToHtml(convertToRaw(data.getCurrentContent()))
}

export const getEditorStateFormHtmlString = (data?: string) => {
  if(!data) return EditorState.createEmpty();
  // const blocksFromHTML = convertFromHTML(data);
  // const state = ContentState.createFromBlockArray(
  //   blocksFromHTML.contentBlocks,
  //   blocksFromHTML.entityMap,
  // );
  // return EditorState.createWithContent(state)
  const blocksFromHtml = htmlToDraft(data);
  const { contentBlocks, entityMap } = blocksFromHtml;
  const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
  const editorState = EditorState.createWithContent(contentState);
  return editorState;
}
export const addHttp = (url: string) => {
  if (url.match(/^https:\/\/|^http:\/\//g)) 
     return url;
  return `http://${url}`
}

export const createImgFileFromElement = async (querySelectorString: string, fileName: string): Promise<File | undefined>=> {
  const element = document.querySelector(querySelectorString);
    if(!element) return undefined;
    const blob = await htmlToImage.toBlob(element as HTMLElement)
    if(!blob) return undefined
    return new File([blob], fileName.replace(/\s/g, '-'));
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

export const parseDataFromLocalStorage = (localStorageKey: string) => {
  const localStorageData = localStorage.getItem(localStorageKey);
  return localStorageData ? JSON.parse(localStorageData) : undefined
}

export const rem = (pixel: number) => {
  return `${pixel / 16}rem`;
}