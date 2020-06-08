import React from 'react'
import styled from 'styled-components'
import { usePointers } from '../hooks/usePointers'

const Root = styled.div({
    touchAction: 'none',
    margin: '50px',
    background: 'red',
})

export const TouchTest: React.FC = () => {
    const [pointers, onEvent] = usePointers()

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
                    {JSON.stringify(pointers, null, 2)}
                </code>
            </pre>
        </Root>
    )
}
