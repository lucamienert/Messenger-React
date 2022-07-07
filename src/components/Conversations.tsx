import { ListGroup } from "react-bootstrap"
import { useConversations } from "../provider/ConversationsProvider"

const Conversations = () => {
  const { conversations, selectConversationIndex } = useConversations()

  return (
    <ListGroup variant="flush">
      {conversations.map((conversation: any, index: any) => (
        <ListGroup.Item
          key={index}
          action
          onClick={() => selectConversationIndex(index)}
          active={conversation.selected}
        >
          {conversation.recipients.map((r: any) => r.name).join(', ')}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default Conversations