import { useConversations } from "../provider/ConversationsProvider"

const Dashboard = ({ id }: any) => {
  const { selectedConversation } = useConversations()

  return (
    <div className="d-flex" style={{ height: '100vh' }}>
      <Sidebar id={id} />
      {selectedConversation && <OpenConversation />}
    </div>
  )
}

export default Dashboard