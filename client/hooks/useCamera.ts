import { useState } from 'react'
import {
    applyTransform,
    Transform,
    Transformation,
} from '../helpers/transforms'

const originDefault = [0, 0] as Cartesian

const initialDefault = {
    location: [0, 0] as Cartesian,
    rotation: 0,
    scaling: 1,
}

type Signature = (
    origin?: Cartesian,
    initial?: Transformation,
) => [Transformation, (transform: Transform) => void]

export const useCamera: Signature = (
    origin = originDefault,
    initial = initialDefault,
) => {
    const [transformation, setTransformation] = useState(initial)

    const transform = (transform: Transform) => {
        setTransformation(applyTransform(transform, origin, transformation))
    }

    return [transformation, transform]
}
