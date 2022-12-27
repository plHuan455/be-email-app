import ContactContainer from '@containers/ContactContainer';

interface ContactPageProps {}

const ContactSharingPage: React.FC<ContactPageProps> = () => {
  return (
    <div className="t-contactPage">
      <ContactContainer />
    </div>
  );
};

export default ContactSharingPage;
