import midi from 'midi'

const output = new midi.Output()

output.openVirtualPort('tileboard')

export const send = (message: number[]) => {
    output.sendMessage(message)
}
