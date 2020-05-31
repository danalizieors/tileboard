import Sockette from 'sockette'

const { hostname } = document.location

type MessageHandler = (message: MessageEvent) => void

const state = {
    subscribers: [] as MessageHandler[],
}

export const subscribe = (handler: MessageHandler) => {
    state.subscribers = [...state.subscribers, handler]
}

export const unsubscribe = (handler: MessageHandler) => {
    state.subscribers = state.subscribers.filter(
        (subscriber) => subscriber === handler,
    )
}

export const connection = new Sockette(`ws://${hostname}:3000`, {
    onmessage: (message) => {
        state.subscribers.forEach((subscriber) => subscriber(message))
    },
})
