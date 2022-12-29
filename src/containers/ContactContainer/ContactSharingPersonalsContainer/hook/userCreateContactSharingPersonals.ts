import { useUploadFileToSever } from '@hooks/useUploadFileToSever';
import { RootState } from '@redux/configureStore';
import { editContactsList, pushContactsList } from '@redux/Contact/reducer';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, useToast } from 'react-toastify';
import * as yup from 'yup';
import { ContactSharingPersonalsType } from '../Template';

const schema = yup.object().shape({
  first_name: yup.string().required('First Name is required!'),
  last_name: yup.string().required('Last Name is required!'),
  mail: yup.string().email('Email invalid!').required('Email is required!'),
});

const initStore: ContactSharingPersonalsType = {
  id: -1,
  first_name: '',
  last_name: '',
  mail: '',
  avatar: '',
  share_by: '',
  share_with: [],
};

const initFiles: { [key: string]: FileList | undefined } = {
  avatar: undefined,
};

export const useContacts = () => {
  // hooks
  const navigate = useNavigate();
  const param = useParams();
  const { uploadImage } = useUploadFileToSever();

  const [files, setFiles] = useState(initFiles);
  const [contacts, setContacts] = useState(initStore);

  const handleCancel = () => navigate('..');

  return {
    navigate,
    schema,
    param,
    contacts,
    files,
    setFiles,
    uploadImage,
    setContacts,
    handleCancel,
  };
};

export const useCreateContacts = () => {
  const hook = useContacts();
  const { navigate, contacts, uploadImage, files } = hook;

  //   useDispatch
  const dispatch = useDispatch();

  const handleCreate = async () => {
    try {
      //   if (!files.avatar || files.avatar.length === 0) {
      //     toast.error('File not found!');
      //     return;
      //   }
      // const avatar = await uploadImage(files.avatar[0]);

      console.log('sign data --->', contacts);

      // console.log('sign avatar --->', avatar);

      // call create here
      dispatch(pushContactsList(contacts));
      toast.success('Add contact successfully!');

      navigate('..');
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

export const useEditContacts = () => {
  const hook = useCreateContacts();
  const { param, navigate, contacts, setContacts, files, uploadImage } = hook;

  const dispatch = useDispatch();

  // Dùng đỡ nào có API gỡ
  const { contactsList } = useSelector((state: RootState) => state.contact);
  const { id } = useParams();
  //   useEffect(() => {
  //     setContacts(contactsList[Number(id) - 1]);
  //   }, [id]);

  // useQuery(
  //   ['getSignById', param.id],
  //   () => {
  //     //  getSignById(param.id!)
  //   },
  //   {
  //     onError: (error: any) => {
  //       navigate('..');
  //       console.error(new Error(error));
  //       toast.error('Không thể tìm thấy sign này!');
  //     },
  //     onSuccess(data) {
  //       console.log('getSignById --->', data);
  //       // setSignature
  //     },
  //     enabled: !!param.id,
  //   },
  // );

  const handleEdit = async () => {
    try {
      // call await update
      // if (files.image && files.image.length > 0) {
      //   const picture = await uploadImage(files.image[0]);
      // update with img change
      // } else {
      // update without img change
      // }
      dispatch(
        editContactsList({
          id: id,
          data: contacts,
        }),
      );
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
