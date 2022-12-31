import { emailTemplateList } from "@assets/dummyData/emaiTemplate";
import EmailTemplateList from "@components/templates/EmailTemplateList";

const MailTemplateContainer = () => {
  return (
    <>
      <EmailTemplateList 
        emailTemplateList={emailTemplateList}
      />
    </>
  );
};

export default MailTemplateContainer;
