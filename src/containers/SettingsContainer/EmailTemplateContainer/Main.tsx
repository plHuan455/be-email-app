import { emailTemplateList } from "@assets/dummyData/emaiTemplate";
import EmailTemplateList from "@components/templates/EmailTemplateList";
import { useNavigate } from "react-router";

const EmailTemplateContainer = () => {
  const navigate = useNavigate();

  const handleUpdateClick = (templateId: number) => {
    navigate(`edit/${templateId}`)
  }

  return (
    <>
      <EmailTemplateList
        onUpdateClick={handleUpdateClick}
        emailTemplateList={emailTemplateList}
      />
    </>
  );
};

export default EmailTemplateContainer;
