import AddSignature, { CreateSignatureFields } from '@components/templates/AddSignature';
import Layout from '@layouts/Layout';
import { Box } from '@mui/material';
import { getEditorStateFormHtmlString, getHtmlStringFromEditorState } from '@utils/functions';
import React from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useForm } from 'react-hook-form';
import { useCreateSignManagement } from './hook';
import SignatureTemplate from './template';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { createSignatureService } from '@api/user';
import { toast } from 'react-toastify';


const schema = yup.object().shape({
  name: yup.string().required('Name is required!'),
});

const CreateSignContainer = () => {
  // const {
  //   schema,
  //   signature,
  //   setSignature,
  //   files,
  //   setFiles,
  //   handleCancel,
  //   handleCreate,
  // } = useCreateSignManagement();

  const navigate = useNavigate();

  const method = useForm<CreateSignatureFields>({
    defaultValues: {
      name: '',
      editor: getEditorStateFormHtmlString()
    },
    resolver: yupResolver(schema)
  });

  const {mutate: createSignatureMutate, isLoading: isSignatureCreating} = useMutation({
    mutationKey: ['create-signature-container-create'],
    mutationFn: createSignatureService,
    onSuccess: () => {
      toast.success('Signature have been created');
      navigate('/setting/signature');
    }
  })

  const handleSubmit = (values: CreateSignatureFields) => {
    createSignatureMutate({
      name: values.name,
      text_html: getHtmlStringFromEditorState(values.editor)
    })
  }

  return (
    // <SignatureTemplate
    //   schema={schema}
    //   formData={signature}
    //   onChange={(formData) => setSignature(formData)}
    //   files={files}
    //   onChangeFile={setFiles}
    //   onSubmit={handleCreate}
    //   onCancel={handleCancel}
    //   disabledClear
    // />
    <>
      <AddSignature
        submitLabel='Create'
        method={method}
        onSubmit={handleSubmit}
        onCancelClick={() => navigate('/setting/signature')}
      />
    </>
  );
};

export default CreateSignContainer;
