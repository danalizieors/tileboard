import React, { useEffect } from 'react'
import styled from 'styled-components'
import { usePointersContext } from '../contexts/Pointers'
import { colors } from '../guidelines/colors'
import { transformationToString } from '../helpers/transforms'
import { useCamera } from '../hooks/useCamera'
import { Background } from './patterns/Background'
import { GridPattern } from './patterns/GridPattern'

const Root = styled.div({
    touchAction: 'none',
    height: '500px',
})

export const CameraTest: React.FC = () => {
    const pointers = usePointersContext()
    const pointer = pointers[0]
    const [transformation, transform] = useCamera(pointer?.position)

    useEffect(() => {
        if (pointer?.buttons[0]) {
            transform({ move: pointer.movement })
        }
    }, [pointer])

    const onZoom = (event: any) => {
        const factor = -Math.sign(event.deltaY) * 0.1

        if (pointer?.buttons[0]) {
            transform({ rotate: factor })
        } else {
            transform({ scale: 1 + factor })
        }
    }

    const transformString = transformationToString(transformation)

    return (
        <Root>
            <svg width='100%' height='100%' onWheel={onZoom}>
                <Background color={colors.dark[3]} />
                <GridPattern
                    transformation={transformation}
                    color={colors.dark[2]}
                />
                <g transform={transformString}>
                    <rect x='-101' y='-101' width='2' height='2' fill='red' />
                    <rect x='0' y='0' width='10' height='10' fill='red' />
                    <rect x='0' y='20' width='10' height='10' fill='red' />
                    <rect x='20' y='0' width='10' height='10' fill='red' />
                    <rect x='20' y='20' width='10' height='10' fill='red' />
                    <rect x='100' y='100' width='10' height='10' fill='red' />
                    <rect x='100' y='200' width='10' height='10' fill='red' />
                    <rect x='200' y='100' width='10' height='10' fill='red' />
                    <rect x='200' y='200' width='10' height='10' fill='red' />
                </g>
            </svg>
        </Root>
    )
}
