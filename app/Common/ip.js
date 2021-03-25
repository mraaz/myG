function getIp(request) {
  const { headers, connection, socket } = request
  const connectionSocket = connection && connection.socket
  console.log(headers, '<<<headers')
  return (
    (headers && headers['x-original-forwarded-for']) ||
    (connection && connection.remoteAddress) ||
    (socket && socket.remoteAddress) ||
    (connectionSocket && connectionSocket.remoteAddress) ||
    null
  )
}

module.exports = { getIp }
