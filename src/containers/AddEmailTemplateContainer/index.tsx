import * as htmlToImage from "html-to-image";
import AddEmailTemplate, { AddEmailTemplateFields } from "@components/templates/AddEmailTemplate/AddEmailTemplate";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditorState } from "draft-js";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from 'yup';

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
    console.log(values);
    setIsShowFormModal(false);

    const element = document.querySelector('.public-DraftEditor-content > div');
    console.log(element);
    if(!element) return;

    htmlToImage
      .toCanvas(element as HTMLElement)
      .then(async function(dataUrl) {
        document.getElementById('root')?.appendChild(dataUrl);
        const image = dataUrl.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'image.png';
        link.href = image;
        link.click();
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