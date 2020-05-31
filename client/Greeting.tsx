import React from 'react'
import styled from 'styled-components'
import { Button } from './Button'

type Style = {
    color: string
}

const Title = styled.h1<Style>(({ color }) => ({
    color,
    textAlign: 'center',
}))

type Props = {
    name: string
}

export const Greeting: React.FC<Props> = ({ name }) => (
    <>
        <Title color='palevioletred'>Hello {name}</Title>
        <Button></Button>
    </>
)
