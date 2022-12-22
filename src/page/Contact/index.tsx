import ContactContainer from "@containers/ContactContainer";

interface ContactPageProps {}

const ContactPage: React.FC<ContactPageProps> = () => {
  return (
    <div className="t-contactPage">
      <ContactContainer />
    </div>
  )
}

export default ContactPage;