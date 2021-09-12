import Ws from '@adonisjs/websocket-client'

export class SocketConnection {
  connect() {
    const protocol = window.location.href.includes('localhost') ? 'ws://' : 'wss://'
    const url = window.location.href.includes('localhost') ? `localhost:${window.PORT}` : 'myg.gg'
    this.ws = Ws(`${protocol}${url}`).connect()
    return this
  }

  subscribe(channel, handler) {
    if (!this.ws) return setTimeout(() => this.subscribe(channel), 1000)
    const subscription = this.ws.getSubscription(channel)
    if (subscription) return subscription
    const result = this.ws.subscribe(channel)
    result.on('event', (event) => handler(event))
    result.on('error', (error) => {
      console.error('WS', channel, error, error && error.message)
    })
    return result
  }
}

export default new SocketConnection()
