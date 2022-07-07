import React, { useContext, useState, useEffect, useCallback } from 'react'
import { arrayEquality } from '../helper/arrayHelper'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts } from './ContactsProvider'
import { useSocket } from './SocketProvider'

const ConversationsContext = React.createContext<any | null>(null)

export const useConversations = () => useContext(ConversationsContext)

export const ConversationsProvider = ({ id, children }: any) => {
    const [conversations, setConversations] = useLocalStorage('conversations', [])
    const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)
    const { contacts } = useContacts()
    const socket = useSocket()

    const createConversation = (recipients: string) =>
        setConversations((prevConversations: any) => [...prevConversations, { recipients, messages: [] }])

    const addMessageToConversation = useCallback(({ recipients, text, sender }: any) => {
        setConversations((prevConversations: any) => {
            let madeChange = false
            const newMessage = { sender, text }
            const newConversations = prevConversations.map((conversation: any) => {
                if (arrayEquality(conversation.recipients, recipients)) {
                    madeChange = true
                    return {
                        ...conversation, 
                        messages: [...conversation.messages, newMessage]
                    }
                }

                return conversation
            })

            if (madeChange)
                return newConversations

            return [
                ...prevConversations,
                { recipients, messages: [newMessage] }
            ]
        })
    }, [setConversations])

    useEffect(() => {
        if (socket == null) 
            return

        socket.on('receive-message', addMessageToConversation)

        return () => socket.off('receive-message')
    }, [socket, addMessageToConversation])

    const sendMessage = (recipients: string, text: string) => {
        socket.emit('send-message', { recipients, text })

        addMessageToConversation({ recipients, text, sender: id })
    }

    const formattedConversations = conversations.map((conversation: any, index: any) => {
        const recipients = conversation.recipients.map((recipient: any) => {
            const contact = contacts.find((contact: any) => contact.id === recipient)
            const name = (contact && contact.name) || recipient

            return { 
                id: recipient, 
                name 
            }
        })

        const messages = conversation.messages.map((message: any) => {
            const contact = contacts.find((contact: any) => contact.id === message.sender)
            const name = (contact && contact.name) || message.sender
            const fromMe = id === message.sender

            return { 
                ...message, 
                senderName: 
                name, 
                fromMe 
            }
        })
        
        const selected = index === selectedConversationIndex
        
        return { 
            ...conversation, 
            messages, 
            recipients, 
            selected 
        }
    })

    const value = {
        conversations: formattedConversations,
        selectedConversation: formattedConversations[selectedConversationIndex],
        sendMessage,
        selectConversationIndex: setSelectedConversationIndex,
        createConversation
    }

    return (
        <ConversationsContext.Provider value={value}>
            {children}
        </ConversationsContext.Provider>
    )
}