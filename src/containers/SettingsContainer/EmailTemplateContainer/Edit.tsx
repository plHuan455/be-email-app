import AlertDialog, { useAlertDialog } from "@components/molecules/AlertDialog";
import EditEmailTemplate, { EditEmailTemplateFields } from "@components/templates/EditEmailTemplate/intex";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getEditorStateFormHtmlString } from "@utils/functions";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

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
    queryKey: ['edit-email-template-get'],
    queryFn: () => { 
      // TODO: CALL API GET TEMPLATE WITH {templateId}
    }
  });

  // FILL FORM FIRST RENDER
  useEffect(() => {
    // TODO: SET VALUES FOR FORM
    method.setValue('name', '');
    method.setValue('description', '');
    method.setValue('editor', getEditorStateFormHtmlString(''));
  }, [templateData])

  const { mutate: updateTemplateMutate, isLoading: isTemplateUpdating } = useMutation({
    mutationKey: ['edit-email-template-update'],
    mutationFn: () => {
      // TODO: CALL API UPDATE TEMPLATE WITH {templateId}
      return new Promise(() => {}); 
    }
  })

  const handleClearClick = () => {
    method.setValue('editor', getEditorStateFormHtmlString())
  }

  const handleUpdateTemplate = (values: EditEmailTemplateFields) => {
    alertDialog.setAlertData(
      'Update template',
      'Are you sure you want to update this template?',
      () => {
        // TODO: CONVERT VALUES AND PASS TO ARGUMENT
        updateTemplateMutate();
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
        onDisagree={alertDialog.onClose}
      />
    </>
  )
}

export default EditEmailTemplateContainer;