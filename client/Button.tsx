import React, { useEffect, useState } from 'react'
import { connection, subscribe, unsubscribe } from './connection'

export const Button: React.FC = () => {
    const [state, setState] = useState()
    useEffect(() => {
        const handler = (message: MessageEvent) => setState(message.data)

        subscribe(handler)
        return () => unsubscribe(handler)
    }, [])

    const noteOn = () => {
        connection.send(JSON.stringify({ note: [0b10010000, 64, 100] }))
    }

    const noteOff = () => {
        connection.send(JSON.stringify({ note: [0b10000000, 64, 100] }))
    }

    return (
        <>
            <div onPointerDown={noteOn} onPointerUp={noteOff}>
                send note
            </div>
            <div>{state}</div>
        </>
    )
}
