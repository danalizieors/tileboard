import React, { useEffect, useState } from 'react'
import { connection, subscribe, unsubscribe } from './connection'

export const Button: React.FC = () => {
    const [state, setState] = useState()
    useEffect(() => {
        const handler = (message: MessageEvent) => setState(message.data)

        subscribe(handler)
        return () => unsubscribe(handler)
    }, [])

    const send = () => {
        connection.send(JSON.stringify({ hello: 'WebSocket' }))
    }

    return (
        <>
            <div onClick={send}>send message</div>
            <div>{state}</div>
        </>
    )
}
