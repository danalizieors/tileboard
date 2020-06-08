import { PointerEvent, useState } from 'react'
import { transformPointerEvent } from '../helpers/transformPointerEvent'
import { Action, Pointer } from '../types/Pointer'
import { useBoundedMapper } from './useBoundedMapper'

type Signature = () => [Record<number, Pointer>, (event: PointerEvent) => void]

export const usePointers: Signature = () => {
    const [pointers, setPointers] = useState<Record<number, Pointer>>({})
    const { insert, find, remove } = useBoundedMapper()

    const mapId = (id: number, { type }: Action) => {
        switch (type) {
            case 'enter':
                return insert(id)
            case 'leave':
                return remove(id)
        }
        return find(id)
    }

    const remapId = (event: Pointer) => ({
        ...event,
        id: mapId(event.id, event.action),
    })

    const onEvent = (event: PointerEvent) => {
        const transformed = transformPointerEvent(event)
        const remapped = remapId(transformed)

        setPointers({
            ...pointers,
            [remapped.id]: remapped,
        })
    }

    return [pointers, onEvent]
}
