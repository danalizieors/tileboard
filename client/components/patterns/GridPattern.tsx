import { clamp } from 'ramda'
import React from 'react'
import { Transformation } from '../../helpers/transforms'
import { SquarePattern } from './SquarePattern'

const mod = (x: number, n: number) => ((x % n) + n) % n

const normalize = (min: number, max: number, value: number) =>
    (clamp(min, max, value) - min) / (max - min)

type Props = {
    transformation: Transformation
    color: string
}

export const GridPattern: React.FC<Props> = ({ transformation, color }) => {
    const initialScaling = 7
    const recurringScaling = Math.pow(
        10,
        mod(Math.log10(transformation.scaling * initialScaling), 1),
    )
    const recurringTransformation = {
        ...transformation,
        scaling: recurringScaling,
    }

    const fade = normalize(4, 6, recurringScaling)
    const adaptingStroke =
        1 +
        normalize(1, 2, recurringScaling) +
        normalize(8, 10, recurringScaling) * 2

    return (
        <>
            <SquarePattern
                size={10 / initialScaling}
                transformation={recurringTransformation}
                stroke={1}
                color={color}
                opacity={fade}
            />
            <SquarePattern
                size={100 / initialScaling}
                transformation={recurringTransformation}
                stroke={adaptingStroke}
                color={color}
                opacity={1}
            />
            <SquarePattern
                size={1000 / initialScaling}
                transformation={recurringTransformation}
                stroke={4}
                color={color}
                opacity={1}
            />
        </>
    )
}
