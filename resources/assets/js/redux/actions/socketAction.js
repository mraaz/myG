
export function onConnectionStateChangedAction(connected) {
  return {
      type: 'SOCKET_CONNECTION_STATE_CHANGED',
      payload: { connected },
  }
}
