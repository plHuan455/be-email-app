export const convertPathImage = (image?: string) => {
  if (image && !image.includes('src/assets/images'))
    return `${process.env.REACT_APP_API_BASE_URL}image/${image}`;
  return '';
};
