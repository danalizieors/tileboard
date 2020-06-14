import { add, dot, mul, sub } from '@tensorflow/tfjs-core'
import { reduce } from 'ramda'

export type Transformation = {
    location: Cartesian
    rotation: number
    scaling: number
}

export type Transform = Partial<{
    move: Cartesian
    rotate: number
    scale: number
}>

const rotationMatrix = (radians: number) => {
    const [cos, sin] = [Math.cos(radians), Math.sin(radians)]

    return [
        [cos, -sin],
        [sin, cos],
    ]
}

export const applyTransform: (
    transform: Transform,
    origin: Cartesian,
    transformation: Transformation,
) => Transformation = (
    { move = [0, 0], rotate = 0, scale = 1 },
    origin,
    { location, rotation, scaling },
) => {
    const difference = sub(origin, location)
    const moveFromScale = sub(origin, mul(difference, scale))
    const moveFromRotate = add(
        dot(rotationMatrix(rotate), mul(difference, -1)),
        difference,
    )
    const moved = reduce(add, moveFromScale, [
        moveFromRotate,
        move,
    ]).arraySync() as Cartesian

    return {
        location: moved,
        rotation: rotation + rotate,
        scaling: scaling * scale,
    }
}

export const toDegrees = (radians: number) => (radians * 180) / Math.PI

export const transformationToString = ({
    location,
    rotation,
    scaling,
}: Transformation) => {
    const locationString = location.join(',')
    const degrees = toDegrees(rotation)

    return `translate(${locationString}) rotate(${degrees}) scale(${scaling})`
}
