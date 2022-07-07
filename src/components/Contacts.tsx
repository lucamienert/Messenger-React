import { ListGroup } from "react-bootstrap"
import { useContacts } from "../provider/ContactsProvider"

const Contacts = () => {
  const { contacts } = useContacts()

  return (
    <ListGroup variant="flush">
      {contacts.map((contact: any) => (
        <ListGroup.Item key={contact.id}>
          {contact.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default Contacts