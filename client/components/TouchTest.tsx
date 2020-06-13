import React from 'react'
import styled from 'styled-components'
import { usePointersContext } from '../contexts/Pointers'
import { colors } from '../guidelines/colors'

const Root = styled.div({
    touchAction: 'none',
    margin: '50px',
    background: colors.red,
})

export const TouchTest: React.FC = () => {
    const pointers = usePointersContext()

    return (
        <Root>
            <pre>
                <code>
                    TouchTest:
                    {JSON.stringify(pointers, null, 2)}
                </code>
            </pre>
        </Root>
    )
}
