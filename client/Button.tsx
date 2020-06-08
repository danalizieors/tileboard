import React, { useEffect, useState } from 'react'
import { connection, subscribe, unsubscribe } from './connection'
import { usePointersContext } from './contexts/Pointers'

export const Button: React.FC = () => {
    const pointers = usePointersContext()

    const [state, setState] = useState()
    useEffect(() => {
        const handler = (message: MessageEvent) => setState(message.data)

        subscribe(handler)
        return () => unsubscribe(handler)
    }, [])

    useEffect(() => {
        if (pointers[0]?.action.type === 'down')
            connection.send(JSON.stringify({ note: [0b10010000, 64, 100] }))
        if (pointers[0]?.action.type === 'up')
            connection.send(JSON.stringify({ note: [0b10000000, 64, 100] }))
    }, [pointers])

    return (
        <>
            <div>send note</div>
            <div>{state}</div>
        </>
    )
}
