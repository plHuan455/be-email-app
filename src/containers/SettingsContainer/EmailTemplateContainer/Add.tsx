import * as htmlToImage from "html-to-image";
import AddEmailTemplate, { AddEmailTemplateFields } from "@components/templates/AddEmailTemplate/AddEmailTemplate";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditorState } from "draft-js";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "@api/uploadFile";
import { addHttp, getEditorStateFormHtmlString, getHtmlStringFromEditorState } from "@utils/functions";
import { createTemplateService } from "@api/template";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface AddEmailTemplateContainerProps {}


const addEmailTemplateSchema = yup.object({
  name: yup.string().required(),
})

const AddEmailTemplateContainer: React.FC<AddEmailTemplateContainerProps> = () => {
  const navigate = useNavigate();

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
    mutationFn: async (params: {imgFile: File, name: string, htmlContent: string, description?: string}) => {
      const imgUrl = await uploadFile(params.imgFile);
      const res = await createTemplateService({
        title: params.name,
        describe: params.description ?? '',
        text_html: params.htmlContent,
        images:[{path: addHttp(imgUrl.data)}]
      })
      return res;
    },
    onSuccess: () => {
      setIsShowFormModal(false);
      navigate('/setting/email-template');
    },
    onError: () => {
      toast.error('Cant\'t create template');
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

    const element = document.querySelector('.public-DraftEditor-content > div');
    if(!element) return;

    htmlToImage
      .toBlob(element as HTMLElement)
      .then(async function(dataUrl) {
        // // TODO: ADD ARGUMENTS
        if(dataUrl) {
          const file = new File([dataUrl], `${values.name.replace(/\s/g, '-')}-${Date.now()}`);
          createTemplateMutate({imgFile: file, name: values.name, htmlContent: getHtmlStringFromEditorState(values.editor), description: values.description});
        }
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