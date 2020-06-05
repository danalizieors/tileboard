import React, { useState } from 'react'
import styled from 'styled-components'

const Root = styled.div({
    touchAction: 'none',
    margin: '50px',
    background: 'red',
})

export const TouchTest: React.FC = () => {
    const [pointer, setPointer] = useState<any>()

    const onEvent = (event: React.PointerEvent<HTMLDivElement>) => {
        setPointer({
            ...pointer,
            [event.type]: {
                id: event.pointerId,
                x: event.clientX,
                y: event.clientY,
                buttons: event.buttons,
            },
        })
    }

    return (
        <Root
            onPointerEnter={onEvent}
            onPointerDown={onEvent}
            onPointerMove={onEvent}
            onPointerUp={onEvent}
            onPointerCancel={onEvent}
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
