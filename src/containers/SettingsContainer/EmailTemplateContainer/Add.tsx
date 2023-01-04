import * as htmlToImage from "html-to-image";
import AddEmailTemplate, { AddEmailTemplateFields } from "@components/templates/AddEmailTemplate/AddEmailTemplate";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditorState } from "draft-js";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { useMutation } from "@tanstack/react-query";

interface AddEmailTemplateContainerProps {}


const addEmailTemplateSchema = yup.object({
  name: yup.string().required(),
})

const AddEmailTemplateContainer: React.FC<AddEmailTemplateContainerProps> = () => {
  const method = useForm<AddEmailTemplateFields>({
    defaultValues: {
      editor: EditorState.createEmpty(),
      name: '',
      description: '',
    },
    resolver: yupResolver(addEmailTemplateSchema)
  })

  const [isShowFormModal, setIsShowFormModal] = useState<boolean>(false);

  const {mutate: createTemplateMutate, isLoading: isTemplateCreating} = useMutation({
    mutationKey: ['add-email-template-create'],
    mutationFn: () => {
      // TODO: STORE THUMP IMAGE AND CREATE TEMPLATE
      return new Promise(()=>{})
    }
  })

  const handleClearClick = () => {
    method.resetField('editor');
  }

  const handleSaveClick = () => {
    setIsShowFormModal(true)
  }

  const handleFormModalClose = () => {
    setIsShowFormModal(false);
  }

  const handleSubmit = async (values: AddEmailTemplateFields) => {
    setIsShowFormModal(false);

    const element = document.querySelector('.public-DraftEditor-content > div');
    if(!element) return;

    htmlToImage
      .toCanvas(element as HTMLElement)
      .then(async function(dataUrl) {
        document.getElementById('root')?.appendChild(dataUrl);
        // preView image
        const image = dataUrl.toDataURL('image/png');

        // TODO: ADD ARGUMENTS
        createTemplateMutate();

        // download image
        // const link = document.createElement('a');
        // link.download = 'image.png';
        // link.href = image;
        // link.click();
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <AddEmailTemplate 
        method={method}
        isShowFormModal={isShowFormModal}
        onClearClick={handleClearClick}
        onFormModalClose={handleFormModalClose}
        onSaveClick={handleSaveClick}
        onSubmit={handleSubmit}
      />
    </>
  )
}

export default AddEmailTemplateContainer;