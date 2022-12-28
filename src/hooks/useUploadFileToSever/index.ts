import { uploadFile } from '@api/uploadFile';

export const useUploadFileToSever = () => {
  const uploadImage = (image: File) => {
    return new Promise<string>((resolve, reject) => {
      uploadFile(image)
        .then((res) => resolve(res.data))
        .catch((error: any) => {
          console.error(new Error(error));
          reject(new Error('Upload image fail!'));
        });
    });
  };

  return {
    uploadImage,
  };
};
