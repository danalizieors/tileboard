export const devices = ['mouse', 'pen', 'touch', 'unknown'] as const

export type Device = typeof devices[number]

type PointerAction = {
    type: 'enter' | 'move' | 'leave'
}

type ButtonAction = {
    type: 'down' | 'up'
    button: number
}

export type Action = PointerAction | ButtonAction

export type Buttons = [boolean, boolean, boolean, boolean, boolean]

export type Pointer = {
    id: number
    device: Device
    action: Action

    position: Cartesian
    movement: Cartesian
    buttons: Buttons

    dimensions: Cartesian
    pressure: number // 0 to 1
    tangential: number // -1 to 1
    tilt: Vector2 // -90 to 90
    twist: number // 0 to 359
}
