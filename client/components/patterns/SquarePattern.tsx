import React from 'react'
import {
    Transformation,
    transformationToString,
} from '../../helpers/transforms'

type Props = {
    size: number
    transformation: Transformation
    stroke: number
    color: string
    opacity?: number
}

export const SquarePattern: React.FC<Props> = ({
    size,
    transformation,
    stroke,
    color,
    opacity,
}) => {
    const id = Math.random().toString()
    const patternTransform = transformationToString(transformation)
    const scaledStroke = stroke / transformation.scaling

    return (
        <>
            <pattern
                id={id}
                width={size}
                height={size}
                patternTransform={patternTransform}
                patternUnits='userSpaceOnUse'
            >
                <rect
                    width={size}
                    height={size}
                    strokeWidth={scaledStroke}
                    stroke={color}
                    opacity={opacity}
                    fill='none'
                />
            </pattern>
            <rect width='100%' height='100%' fill={`url(#${id})`} />
        </>
    )
}
