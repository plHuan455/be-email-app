import { useUploadFileToSever } from '@hooks/useUploadFileToSever';
import { RootState } from '@redux/configureStore';
import {
  editContactGroup,
  editContactsList,
  pushContactGroups,
  pushContactsList,
} from '@redux/Contact/reducer';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, useToast } from 'react-toastify';
import * as yup from 'yup';

const schema = yup.object().shape({
  group_name: yup.string().required('First Name is required!'),
});

const initStore: {
  id: number;
  group_name: string;
  members: any[];
} = {
  id: -1,
  group_name: '',
  members: [],
};

const initFiles: { [key: string]: FileList | undefined } = {
  avatar: undefined,
};

export const useContactGroup = () => {
  // hooks
  const navigate = useNavigate();
  const param = useParams();
  const { uploadImage } = useUploadFileToSever();

  const [files, setFiles] = useState(initFiles);
  const [contactGroup, setContactGroup] = useState(initStore);

  const handleCancel = () => navigate('..');

  return {
    navigate,
    schema,
    param,
    contactGroup,
    files,
    setFiles,
    uploadImage,
    setContactGroup,
    handleCancel,
  };
};

export const useCreateContactSharingGroups = () => {
  const hook = useContactGroup();
  const { navigate, contactGroup, uploadImage, files } = hook;

  //   useDispatch
  const dispatch = useDispatch();
  // useSelector
  const { contactsList } = useSelector((state: RootState) => state.contact);

  const handleCreate = async () => {
    try {
      //   if (!files.avatar || files.avatar.length === 0) {
      //     toast.error('File not found!');
      //     return;
      //   }
      // const avatar = await uploadImage(files.avatar[0]);

      console.log('sign data --->', contactGroup);

      // console.log('sign avatar --->', avatar);

      const cloneContactsList = [...contactsList];
      const cloneMembers = [...contactGroup.members];

      const remapMember = cloneMembers.reduce((currMem, nextMem) => {
        const isFoundPosition = cloneContactsList.findIndex(
          (contact) => contact.mail === nextMem,
        );

        if (isFoundPosition > -1)
          return [...currMem, cloneContactsList[isFoundPosition]];
        return currMem;
      }, []);

      // call create here
      dispatch(pushContactGroups({ ...contactGroup, members: remapMember }));
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

export const useEditContactSharingGroups = () => {
  const hook = useCreateContactSharingGroups();
  const { param, navigate, contactGroup, setContactGroup, files, uploadImage } =
    hook;

  const dispatch = useDispatch();
  // useSelector
  const { contactsList } = useSelector((state: RootState) => state.contact);

  // Dùng đỡ nào có API gỡ
  const { contactGroupsList } = useSelector((state: RootState) => state.contact);
  const { id } = useParams();
  useEffect(() => {
    const setData = {
      ...contactGroupsList[Number(id) - 1],
      members: contactGroupsList[Number(id) - 1].members.map(
        (member) => member.mail,
      ),
    };

    setContactGroup(setData);
  }, [id]);

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
      const cloneContactsList = [...contactsList];
      const cloneMembers = [...contactGroup.members];

      const remapMembers = cloneMembers.reduce((currMem, nextMem) => {
        const isFoundPosition = cloneContactsList.findIndex(
          (contact) => contact.mail === nextMem,
        );

        if (isFoundPosition > -1)
          return [...currMem, cloneContactsList[isFoundPosition]];
        return currMem;
      }, []);

      dispatch(
        editContactGroup({
          id: id,
          data: { ...contactGroup, members: remapMembers },
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
