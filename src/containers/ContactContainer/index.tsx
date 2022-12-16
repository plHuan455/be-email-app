import Contact from "@components/templates/Contact";

interface ContactContainerProps {}

const ContactContainer:React.FC<ContactContainerProps> = () => {
  return (
    <>
      <Contact 
        title="Contact"
        contactList={[]}
      />
    </>
  )
}

export default ContactContainer;