import React from 'react'

type Props = {
    color: string
}

export const Background: React.FC<Props> = ({ color }) => (
    <rect width='100%' height='100%' fill={color} />
)
