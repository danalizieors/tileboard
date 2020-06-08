import React, { createContext, useContext } from 'react'
import { usePointers } from '../hooks/usePointers'
import { Pointer } from '../types/Pointer'

const PointersContext = createContext<Record<number, Pointer>>({})

export const usePointersContext = () => useContext(PointersContext)

export const withPointersProvider = <T extends keyof JSX.IntrinsicElements>(
    Element: T,
) => (props: JSX.IntrinsicElements[T]) => {
    const [pointers, onEvent] = usePointers()

    const AnyElement = Element as any

    return (
        <PointersContext.Provider value={pointers}>
            <AnyElement
                onPointerEnter={onEvent}
                onPointerDown={onEvent}
                onPointerMove={onEvent}
                onPointerUp={onEvent}
                onPointerLeave={onEvent}
                {...props}
            >
                {props.children}
            </AnyElement>
        </PointersContext.Provider>
    )
}
