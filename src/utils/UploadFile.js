import _uploadFile from '../api/UploadFileApi';

const UploadFile = (param) => {
  return _uploadFile(param.target.files[0])
    .then((res) => {
      if (res.status !== 200) {
        throw res;
      }
      return res;
    })
    .catch((err) => {
    });
};
export default UploadFile;
