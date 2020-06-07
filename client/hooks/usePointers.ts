import { PointerEvent } from 'react'
import { transformPointerEvent } from '../helpers/transformPointerEvent'
import { Action, Pointer } from '../types/Pointer'
import { useBoundedMapper } from './useBoundedMapper'

type Signature = (
    onChange: (event: Pointer) => void,
) => (event: PointerEvent) => void

export const usePointers: Signature = (onChange) => {
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

    return (event) => {
        const transformed = transformPointerEvent(event)
        const remapped = remapId(transformed)

        onChange(remapped)
    }
}
