import { PointerEvent } from 'react'
import { useBoundedMapper } from './useBoundedMapper'

export const processPointerEvent = (event: PointerEvent) => {
    var { left, top } = event.currentTarget.getBoundingClientRect()

    return {
        id: event.pointerId,
        device: event.pointerType,
        type: event.type,
        /*width: event.width,
        height: event.height,
        pressure: event.pressure,
        tangentialPressure: event.tangentialPressure,
        tilt: [event.tiltX, event.tiltY],
        twist: event.twist,
        buttons: event.buttons,*/
        position: [event.clientX - left, event.clientY - top],
        /* movement: [event.movementX, event.movementY],*/
    }
}

export const usePointers = (onEvent: any) => {
    const { insert, find, remove } = useBoundedMapper()

    const mapId = (id: number, type: string) => {
        switch (type) {
            case 'pointerenter':
                return insert(id)
            case 'pointerleave':
                return remove(id)
        }
        return find(id)
    }

    const remapEventId = (event: any) => ({
        ...event,
        id: mapId(event.id, event.type),
    })

    return (event: PointerEvent) => {
        const processed = processPointerEvent(event)
        const remapped = remapEventId(processed)

        onEvent(remapped)
    }
}
