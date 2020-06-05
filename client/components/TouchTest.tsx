import React, { useState } from 'react'
import styled from 'styled-components'
import { usePointers } from './usePointers'

const Root = styled.div({
    touchAction: 'none',
    margin: '50px',
    background: 'red',
})

export const TouchTest: React.FC = () => {
    const [pointer, setPointer] = useState<any>()

    const onEvent = usePointers((event: any) =>
        setPointer({
            ...pointer,
            [event.id]: event,
        }),
    )

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
