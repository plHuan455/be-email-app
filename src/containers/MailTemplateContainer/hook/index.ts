import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, useToast } from 'react-toastify';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required('Vui lòng nhập Tên dự án!'),
  describe: yup.string().required('Vui lòng nhập mô tả dự án!'),
  area: yup.string().required('Vui lòng nhập mô tả dự án!'),
  business_id: yup
    .number()
    .required('Vui lòng chọn Danh mục dự án!')
    .positive('Vui lòng chọn Danh mục dự án!'),
  visibility: yup.string().required('Vui lòng chọn Trạng thái!'),
});

const initStore = {
  id: -1,
  name: '',
  area: '',
  business_type: '',
  picture: '',
  describe: '',
  visibility: 'Public',
  business_id: -1,
};

export const useTemplateManagement = () => {
  const navigate = useNavigate();
  const param = useParams();

  const [mailTemplate, setMailTemplate] = useState(initStore);

  const handleCancel = () => navigate('..');

  const { data: listTemplate } = useQuery(['getAllTemplate'], () => {});

  return {
    navigate,
    param,
    mailTemplate,
    setMailTemplate,
    listTemplate,
    handleCancel,
  };
};

export const useCreateStoreManagement = () => {
  const hook = useTemplateManagement();
  const { navigate, mailTemplate, setMailTemplate } = hook;

  const handleCreate = async () => {
    try {
      // call create
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

export const useEditStoreManagement = () => {
  const hook = useTemplateManagement();
  const { param, navigate, mailTemplate, setMailTemplate } = hook;

  useQuery(
    ['getMailTemplateById', param.id],
    () => {
      //  getMailTemplateById(param.id!)
    },
    {
      onError: (error: any) => {
        navigate('..');
        console.error(new Error(error));
        toast.error('Không thể tìm thấy Store này!');
      },
      onSuccess(data) {
        console.log('getMailTemplateById --->', data);
        // setMailTemplate
      },
      enabled: !!param.id,
    },
  );

  const handleEdit = async () => {
    try {
      // call await update
      navigate('..');
      toast.success('Success');
    } catch (error: any) {
      console.error(new Error(error));
      toast.error(error?.response?.message || 'Has Error');
    }
  };

  const handleDelete = async () => {
    try {
      // await delete(mailTemplate.id.toString());
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
