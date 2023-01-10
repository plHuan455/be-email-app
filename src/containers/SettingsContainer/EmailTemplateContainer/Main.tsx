import { deleteTemplate, getTemplateListService } from "@api/template";
import EmailTemplateList, { EmailTemplateItem } from "@components/templates/EmailTemplateList";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useNavigate } from "react-router";

const EmailTemplateContainer = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: templateData, isLoading: isTemplateDataGetting } = useQuery({
    queryKey: ['email-template-get'],
    queryFn: getTemplateListService,
  })

  const {mutate: deleteTemplateMutate, isLoading: isTemplateDeleting} = useMutation({
    mutationKey: ['email-template-delete'],
    mutationFn: deleteTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries(['email-template-get']);
    }
  })

  const convertedEmailTemplateList = useMemo<EmailTemplateItem[] | undefined>(() => {
    return templateData?.data.map(template => ({
      id: template.id,
      description: template.describe,
      htmlString: template.text_html,
      name: template.title,
      imgSrc: template.images[0]?.path ?? ''
    }))
  }, [templateData])

  const handleUpdateClick = (templateId: number) => {
    navigate(`edit/${templateId}`)
  }

  const handleDeleteTemplate = (templateId: number) => {
    deleteTemplateMutate(templateId);
  }

  const handleEmptyAddTemplateClick = () => {
    navigate('add');
  }

  return (
    <>
      <EmailTemplateList
        emailTemplateList={convertedEmailTemplateList ?? []}
        onUpdateClick={handleUpdateClick}
        onDeleteTemplate={handleDeleteTemplate}
        onEmptyAddTemplateClick={handleEmptyAddTemplateClick}
      />
    </>
  );
};

export default EmailTemplateContainer;
