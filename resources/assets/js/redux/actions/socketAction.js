
export function onConnectionStateChangedAction(disconnected) {
  return {
      type: 'SOCKET_CONNECTION_STATE_CHANGED',
      payload: { disconnected },
  }
}
