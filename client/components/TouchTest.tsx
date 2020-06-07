import React, { useState } from 'react'
import styled from 'styled-components'
import { usePointers } from '../hooks/usePointers'
import { Pointer } from '../types/Pointer'

const Root = styled.div({
    touchAction: 'none',
    margin: '50px',
    background: 'red',
})

export const TouchTest: React.FC = () => {
    const [pointer, setPointer] = useState<Record<number, Pointer>>()

    const onEvent = usePointers((event: Pointer) => {
        console.log(
            'TouchTest',
            event.action.type,
            (event.action as any).button,
        )
        setPointer({
            ...pointer,
            [event.id]: event,
        })
    })

    return (
        <Root
            onPointerEnter={onEvent}
            onPointerDown={onEvent}
            onPointerMove={onEvent}
            onPointerUp={onEvent}
            onPointerLeave={onEvent}
        >
            <pre>
                <code>
                    TouchTest:
                    {JSON.stringify(pointer, null, 2)}
                </code>
            </pre>
        </Root>
    )
}
