import { emailTemplateList } from "@assets/dummyData/emaiTemplate";
import EmailTemplateList from "@components/templates/EmailTemplateList";
import { template } from "lodash";
import { useNavigate } from "react-router-dom";

const MailTemplateContainer = () => {
  const navigate = useNavigate();

  const handleUpdateClick = (templateId: number) => {
    navigate(`/template/edit/${templateId}`)
  }
  
  return (
    <>
      <EmailTemplateList 
        emailTemplateList={emailTemplateList}
        onUpdateClick={handleUpdateClick}
      />
    </>
  );
};

export default MailTemplateContainer;
