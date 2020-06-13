import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { usePointersContext } from '../contexts/Pointers'
import { colors } from '../guidelines/colors'
import { applyTransform } from '../helpers/applyTransform'

const Root = styled.div({
    touchAction: 'none',
    height: '500px',
    background: colors.blue,
})

export const CameraTest: React.FC = () => {
    const pointers = usePointersContext()
    const [state, setState] = useState({
        location: [0, 0] as Cartesian,
        rotation: 0,
        scaling: 1,
    })

    useEffect(() => {
        const pointer = pointers[0]
        if (pointer?.buttons[2]) {
            setState(applyTransform({ move: pointer.movement }, state))
        }
    }, [pointers])

    const onZoom = (event: any) => {
        const pointer = pointers[0]
        const factor = -Math.sign(event.deltaY) * 0.1

        if (pointer?.buttons[0]) {
            setState(
                applyTransform(
                    {
                        rotate: factor,
                    },
                    state,
                    pointer.position,
                ),
            )
        } else {
            setState(
                applyTransform(
                    {
                        scale: 1 + factor,
                    },
                    state,
                    pointer.position,
                ),
            )
        }
    }

    const transformString = `translate(${state.location.join(',')}) rotate(${
        (state.rotation / Math.PI) * 180
    }) scale(${state.scaling})`

    return (
        <Root>
            <svg width='100%' height='100%' onWheel={onZoom}>
                <g transform={transformString}>
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
