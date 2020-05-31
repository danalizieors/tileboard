import WebSocket from 'ws'

const server = new WebSocket.Server({ port: 3000 }, () =>
    console.log('Server started!'),
)

server.on('connection', (connection: WebSocket) => {
    console.log('Connection established!')

    connection.on('message', (message: WebSocket.Data) => {
        const data = JSON.parse(message as string)
        console.log(`Received: ${JSON.stringify(data)}`)
        connection.send(JSON.stringify({ status: 'received' }))
    })

    connection.on('close', () => {
        console.log('Connection closed!')
    })
})
