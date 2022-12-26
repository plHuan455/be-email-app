import { useUploadFileToSever } from '@hooks/useUploadFileToSever';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, useToast } from 'react-toastify';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required('Name is required!'),
  position: yup.string().required('Position is required!'),
  email: yup.string().email('Email invalid!').required('Email is required!'),
  phone: yup.number().required('Phone number is required!'),
});

const initStore = {
  id: -1,
  name: '',
  position: '',
  email: '',
  phone: '',
  avatar: '',
};

const initFiles: { [key: string]: FileList | undefined } = {
  avatar: undefined,
};

export const useSignatureManagement = () => {
  // hooks
  const navigate = useNavigate();
  const param = useParams();
  const { uploadImage } = useUploadFileToSever();

  const [files, setFiles] = useState(initFiles);
  const [signature, setSignature] = useState(initStore);

  const handleCancel = () => navigate('..');

  return {
    navigate,
    schema,
    param,
    signature,
    files,
    setFiles,
    uploadImage,
    setSignature,
    handleCancel,
  };
};

export const useCreateSignManagement = () => {
  const hook = useSignatureManagement();
  const { navigate, signature, uploadImage, files } = hook;

  const handleCreate = async () => {
    try {
      if (!files.avatar || files.avatar.length === 0) {
        toast.error('File not found!');
        return;
      }
      // const avatar = await uploadImage(files.avatar[0]);

      console.log('sign data --->', signature);
      // console.log('sign avatar --->', avatar);

      // call create here

      // navigate('..');
    } catch (error: any) {
      console.error(new Error(error));
      toast.error(error?.response?.message || 'Has Error');
    }
  };

  return {
    ...hook,
    handleCreate,
  };
};

export const useEditStoreManagement = () => {
  const hook = useCreateSignManagement();
  const { param, navigate, signature, setSignature, files, uploadImage } = hook;

  useQuery(
    ['getSignById', param.id],
    () => {
      //  getSignById(param.id!)s
    },
    {
      onError: (error: any) => {
        navigate('..');
        console.error(new Error(error));
        toast.error('Không thể tìm thấy sign này!');
      },
      onSuccess(data) {
        console.log('getSignById --->', data);
        // setSignature
      },
      enabled: !!param.id,
    },
  );

  const handleEdit = async () => {
    try {
      // call await update
      if (files.image && files.image.length > 0) {
        const picture = await uploadImage(files.image[0]);
        // update with img change
      } else {
        // update without img change
      }
      navigate('..');
      toast.success('Success');
    } catch (error: any) {
      console.error(new Error(error));
      toast.error(error?.response?.message || 'Update sign fail!');
    }
  };

  const handleDelete = async () => {
    try {
      // call await delete
      navigate('..');
      toast.success('Success');
    } catch (error: any) {
      console.error(new Error(error));
      toast.error(error?.response?.message || 'Has Error');
    }
  };

  return {
    ...hook,
    handleEdit,
    handleDelete,
  };
};
