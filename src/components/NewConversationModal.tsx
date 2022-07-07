import { useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { useContacts } from "../provider/ContactsProvider"
import { useConversations } from "../provider/ConversationsProvider"

const NewConversationModal = ({ closeModal }: any) => {
  const [selectedContactIds, setSelectedContactIds] = useState<any>([])
  const { contacts } = useContacts()
  const { createConversation } = useConversations()

  const handleSubmit = (e: Event) => {
    e.preventDefault()

    createConversation(selectedContactIds)
    closeModal()
  }

  const handleCheckboxChange = (contactId: any) => {
    setSelectedContactIds((prevSelectedContactIds: any) => {
      if (prevSelectedContactIds.includes(contactId))
        return prevSelectedContactIds.filter((prevId: any) => contactId !== prevId)
      
      return [...prevSelectedContactIds, contactId]
    })
  }

  return (
    <>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map((contact: any) => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                type="checkbox"
                value={selectedContactIds.includes(contact.id)}
                label={contact.name}
                onChange={() => handleCheckboxChange(contact.id)}
              />
            </Form.Group>
          ))}
          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </>
  )
}

export default NewConversationModal