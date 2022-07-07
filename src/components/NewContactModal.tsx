import { useRef } from "react"
import { 
  Button, 
  Form, 
  Modal 
} from "react-bootstrap"
import { useContacts } from "../provider/ContactsProvider"

const NewContactModal = ({ closeModal }: any) => {
  const idRef: any = useRef()
  const nameRef: any = useRef()
  const { createContact } = useContacts()

  const handleSubmit = (e: Event) => {
    e.preventDefault()

    createContact(idRef.current.value, nameRef.current.value)
    closeModal()
  }

  return (
    <>
      <Modal.Header closeButton>Create Contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Id</Form.Label>
            <Form.Control type="text" ref={idRef} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" ref={nameRef} required />
          </Form.Group>
          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </>
  )
}

export default NewContactModal