import { add, dot, mul, sub } from '@tensorflow/tfjs'
import { reduce } from 'ramda'

type Transformation = {
    location: Cartesian
    rotation: number
    scaling: number
}

type Transform = Partial<{
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
    transformation: Transformation,
    origin?: Cartesian,
) => Transformation = (
    { move = [0, 0], rotate = 0, scale = 1 },
    { location, rotation, scaling },
    origin = [0, 0],
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
