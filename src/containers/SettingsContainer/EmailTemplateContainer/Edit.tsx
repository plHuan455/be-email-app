import { getTemplateService, updateTemplateService } from "@api/template";
import { UpdateTemplateParams } from "@api/template/interface";
import { uploadFile } from "@api/uploadFile";
import AlertDialog, { useAlertDialog } from "@components/molecules/AlertDialog";
import EditEmailTemplate, { EditEmailTemplateFields } from "@components/templates/EditEmailTemplate/intex";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addHttp, createImgFileFromElement, getEditorStateFormHtmlString, getHtmlStringFromEditorState } from "@utils/functions";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface EditEmailTemplateContainerProps {}

const EditEmailTemplateContainer: React.FC<EditEmailTemplateContainerProps> = () => {
  const { id } = useParams();

  const method = useForm<EditEmailTemplateFields>({
    defaultValues: {
      name: '',
      description: '',
      editor: getEditorStateFormHtmlString() 
    }
  })

  const alertDialog = useAlertDialog();

  const {data: templateData, isLoading: isTemplateGetting} = useQuery({
    queryKey: ['edit-email-template-get', id],
    queryFn: () => getTemplateService(Number(id)),
    onSuccess: (res) => {
      const {describe, text_html, title} = res.data;
      method.setValue('name', title);
      method.setValue('description', describe);
      method.setValue('editor', getEditorStateFormHtmlString(text_html));
    },
    enabled: id !== undefined
  });

  const { mutate: updateTemplateMutate, isLoading: isTemplateUpdating } = useMutation({
    mutationKey: ['edit-email-template-update'],
    mutationFn: async (params: {id: number; name: string; description: string; htmlContent: string; file?: File}) => {
      const imgSrc = params.file ? await uploadFile(params.file) : undefined ;
      return updateTemplateService(
        params.id,
        {
          title: params.name,
          describe: params.description,
          images: imgSrc ? [{path: addHttp(imgSrc.data)}] : undefined,
          text_html: params.htmlContent,
        }
      )
    },
    onSuccess: () => {
      toast.success('Template have been updated')
    },
    onError: () => {
      toast.error('Can\'t update template')
    }
  })

  const handleClearClick = () => {
    method.setValue('editor', getEditorStateFormHtmlString())
  }

  const handleUpdateTemplate = (values: EditEmailTemplateFields) => {
    if(id === undefined) return;

    alertDialog.setAlertData(
      'Update template',
      'Are you sure you want to update this template?',
      async () => {
        // TODO: CONVERT VALUES AND PASS TO ARGUMENT
        const htmlContent = getHtmlStringFromEditorState(values.editor);
        const file = htmlContent === templateData?.data.text_html ? 
          undefined : await createImgFileFromElement('.public-DraftEditor-content > div', values.name.replace(/\s+/g, '-'));
        await updateTemplateMutate({
          id: Number(id),
          description: values.description ?? '',
          name: values.name,
          htmlContent: getHtmlStringFromEditorState(values.editor),
          file
        });
        alertDialog.onClose()
      },
      () => alertDialog.onClose()
    )
  }

  return (
    <>
      <EditEmailTemplate 
        method={method}
        onClearClick={handleClearClick}
        onSubmit={handleUpdateTemplate}
      />
      <AlertDialog 
        isOpen={alertDialog.isOpen}
        titleLabel={alertDialog.title}
        descriptionLabel={alertDialog.description}
        onClose={alertDialog.onClose}
        onAgree={alertDialog.callback}
        onDisagree={alertDialog.onClose}
      />
    </>
  )
}

export default EditEmailTemplateContainer;