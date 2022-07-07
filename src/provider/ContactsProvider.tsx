import React, { useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const ContactsContext = React.createContext<any | null>(null)

interface Props {
    children: any
}

export const useContacts = () => useContext(ContactsContext)

export const ContactsProvider: React.FC<Props> = ({ children }: any) => {
    const [contacts, setContacts] = useLocalStorage('contacts', [])

    const createContact = (id: string, name: string) =>
        setContacts((prevContacts: any) => [...prevContacts, { id, name }])

    return (
        <ContactsContext.Provider value={{ contacts, createContact }}>
            {children}
        </ContactsContext.Provider>
    )
}