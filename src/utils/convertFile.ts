export const convertFileToImage = (files?: FileList) => {
  try {
    const arr: string[] = [];
    for (const key in files) {
      if (Object.prototype.hasOwnProperty.call(files, key)) {
        const element = files[key];
        arr.push(URL.createObjectURL(element));
      }
    }

    return arr;
  } catch (error) {
    console.error(error);
    return [];
  }
};
