import Dashboard from "./components/Dashboard"
import Login from "./components/Login"
import useLocalStorage from "./hooks/useLocalStorage"
import { ContactsProvider } from "./provider/ContactsProvider"
import { ConversationsProvider } from "./provider/ConversationsProvider"
import { SocketProvider } from "./provider/SocketProvider"

const App = () => {
  const [id, setId] = useLocalStorage('id')

  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  )

  return (
    id ? dashboard : <Login onIdSubmit={setId} />
  )
}

export default App
