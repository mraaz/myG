import Ws from '@adonisjs/websocket-client';

export class SocketConnection {
  connect() {
    this.ws = Ws(`ws://localhost:3333/`).connect();

    this.ws.on('open', () => {
      console.log('Connection initialized')
    });

    this.ws.on('close', () => {
      console.log('Connection closed')
    });

    return this
  }

  subscribe(channel, handler) {
    if (!this.ws) {
      setTimeout(() => this.subscribe(channel), 1000)
    } else {
      const result = this.ws.subscribe(channel);

      result.on('event', event => {
        console.log('Incoming', event);
        handler(event)
      });

      result.on('error', (error) => {
        console.error(error)
      });

      return result
    }
  }
}

export default new SocketConnection()
