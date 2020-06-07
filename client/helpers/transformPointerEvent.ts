import { any, curry, equals, map, range } from 'ramda'
import { PointerEvent } from 'react'
import { Action, Buttons, Device, devices, Pointer } from '../types/Pointer'
import { is1 } from './bitwise'

const getDevice = (pointerType: string) =>
    any(equals(pointerType), devices) ? (pointerType as Device) : 'unknown'

const getButtonIndex = (button: number) => {
    switch (button) {
        case 1:
            return 2
        case 2:
            return 1
    }
    return button
}

const getAction: (event: PointerEvent) => Action = ({
    type,
    button,
    buttons,
}) => {
    switch (type) {
        case 'pointerenter':
            return { type: 'enter' }
        case 'pointerleave':
            return { type: 'leave' }
    }

    if (button === -1) return { type: 'move' }

    const index = getButtonIndex(button)

    return {
        type: is1(buttons, index) ? 'down' : 'up',
        button: index,
    }
}

const getRelativePosition: (event: PointerEvent) => Cartesian = (event) => {
    const { clientX, clientY } = event
    const { left, top } = event.currentTarget.getBoundingClientRect()

    return [clientX - left, clientY - top]
}

const getButtons = (buttons: number) =>
    map(curry(is1)(buttons), range(0, 5)) as Buttons

export const transformPointerEvent: (event: PointerEvent) => Pointer = (
    event,
) => ({
    id: event.pointerId,
    device: getDevice(event.pointerType),
    action: getAction(event),

    position: getRelativePosition(event),
    movement: [event.movementX, event.movementY],
    buttons: getButtons(event.buttons),

    dimensions: [event.width, event.height],
    pressure: event.pressure,
    tangential: event.tangentialPressure,
    tilt: [event.tiltX, event.tiltY],
    twist: event.twist,
})
