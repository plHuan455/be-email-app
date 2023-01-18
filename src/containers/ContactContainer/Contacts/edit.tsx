import { uploadFile } from '@api/uploadFile';
import AddEditContact, { ContactFields } from '@components/templates/AddEditContact';
import { yupResolver } from '@hookform/resolvers/yup';
import { RootState } from '@redux/configureStore';
import { setContactsList } from '@redux/Contact/reducer';
import { addHttp } from '@utils/functions';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCreateContacts, useEditContacts } from './hook/useCreateContacts';
import ContactTemplate from './Template';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getContactService, updateContactService } from '@api/contact';
import { method } from 'lodash';

const schema = yup.object().shape({
  email: yup.string().email(),
});

const EditContactContainer = () => {
  // const {
  //   schema,
  //   contacts,
  //   setContacts,
  //   files,
  //   setFiles,
  //   handleCancel,
  //   handleEdit,
  // } = useEditContacts();

  const navigate = useNavigate();
  const {id} = useParams();

  const contactMethod = useForm<ContactFields>({
    defaultValues: {
      email: '',
      phone: '',
      firstName: '',
      lastName: '',
      avatar: {}
    },
    resolver: yupResolver(schema)
  })

  useQuery({
    queryKey: ['edit-contact-get-contact', id],
    queryFn: () => getContactService(Number(id)),
    onSuccess: (res) => {
      if(res.data){
        contactMethod.setValue('firstName', res.data.first_name ?? '');
        contactMethod.setValue('lastName', res.data.last_name ?? '');
        contactMethod.setValue('avatar', {defaultUrl: res.data?.avatar});
        contactMethod.setValue('phone', res.data?.phone ?? '');
        contactMethod.setValue('email', res.data?.email ?? '');
      }
    },
    enabled: id !== undefined
  })

  const {mutate: updateContactMutate, isLoading: isContactCreating} = useMutation({
    mutationKey: ['edit-contact-create-contact'], 
    mutationFn: async (params: Required<ContactFields>) => {
      const uploadFileRes = await uploadFile(params.avatar.file);
      return updateContactService({
        email: params.email,
        first_name: params.firstName,
        last_name: params.lastName,
        phone_number: params.phone,
        avatar: addHttp(uploadFileRes.data),
      })
    },
    onSuccess: () => {
      toast.success('Contact have been updated');
      navigate('/contact/contacts')
    }
  })

  const handleSubmit = (values: ContactFields) => {
    updateContactMutate(values as Required<ContactFields>)
  }

  // if (signature.id === -1) return <div>Loading...</div>;

  return (
    <div className="h-full">
      <AddEditContact 
        method={contactMethod}
        onCancel={() => navigate('/contact/contacts')}
        onSubmit={handleSubmit}
      />
      {/* <ContactTemplate
        schema={schema}
        formData={contacts}
        onChange={(formData) => setContacts(formData)}
        files={files}
        onChangeFile={setFiles}
        onSubmit={handleEdit}
        onCancel={handleCancel}
        disabledClear
      /> */}
    </div>
  );
};

export default EditContactContainer;
