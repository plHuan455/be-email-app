import { createContact } from '@api/contact';
import { uploadFile } from '@api/uploadFile';
import AddEditContact, { ContactFields } from '@components/templates/AddEditContact';
import { useMutation } from '@tanstack/react-query';
import { addHttp } from '@utils/functions';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCreateContacts } from './hook/useCreateContacts';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  email: yup.string().email().required('Email is required!'),
  firstName: yup.string().required('First name is required!'),
  lastName: yup.string().required('Last name is required!'),
});

const AddContactsContainer = () => {
  const navigate = useNavigate();

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

  const {mutate: createContactMutate, isLoading: isContactCreating} = useMutation({
    mutationKey: ['add-contact-create-contact'], 
    mutationFn: async (params: Required<ContactFields>) => {
      const uploadFileRes = await uploadFile(params.avatar.file);
      return createContact({
        email: params.email,
        first_name: params.firstName,
        last_name: params.lastName,
        phone_number: params.phone,
        avatar: addHttp(uploadFileRes.data),
      })
    },
    onSuccess: () => {
      toast.success('A new contact have been created');
      navigate('/contact/contacts')
    }
  })

  const handleSubmit = (values: ContactFields) => {
    createContactMutate(values as Required<ContactFields>)
  }

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
        onSubmit={handleCreate}
        onCancel={handleCancel}
        disabledClear
      /> */}
    </div>
  );
};

export default AddContactsContainer;
