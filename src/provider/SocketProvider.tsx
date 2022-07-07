import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

const SocketContext = React.createContext<any | null>(null)

export const useSocket = () => useContext(SocketContext)

export const SocketProvider = ({ id, children }: any) => {
    const [socket, setSocket] = useState<any>()

    useEffect((): any => {
        const newSocket = io(
            'http://localhost:5000',
            { 
                query: { 
                    id 
                } 
            }
        )
        setSocket(newSocket)

        return () => newSocket.close()
    }, [id])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}