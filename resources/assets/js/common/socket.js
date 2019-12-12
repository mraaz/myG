import Ws from '@adonisjs/websocket-client'

export class SocketConnection {
  connect() {
    this.ws = Ws(`wss://myg.gg`).connect()
    return this
  }

  subscribe(channel, handler) {
    if (!this.ws) return setTimeout(() => this.subscribe(channel), 1000)
    const result = this.ws.subscribe(channel)
    result.on('event', (event) => handler(event))
    result.on('error', (error) => console.error('WS', error))
    return result
  }
}

export default new SocketConnection()
