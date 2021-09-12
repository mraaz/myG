import React, { useEffect } from 'react'
import { dismissNotification } from '../../../common/chat'
import { formatAMPM } from '../../../common/date'

const ChatNotifications = ({ notifications, openChat }) => {
  if (!notifications || !notifications.length) return null
  const dynamicOpenChat = (chatId) => {
    openChat(chatId)
    const requiresRedirect = window.innerWidth <= 1365 && !window.location.href.includes('mobile-chat')
    if (requiresRedirect) window.router.push('/mobile-chat')
  }
  return (
    <div className='chat-notifications'>
      {notifications.map((notification, index) => (
        <ChatNotification key={index} {...notification} openChat={dynamicOpenChat} />
      ))}
    </div>
  )
}

const ChatNotification = ({ notificationId, chatId, title, content, received, openChat }) => {
  useEffect(() => setTimeout(() => dismissNotification(notificationId), 3000), [notificationId])
  return (
    <div className='chat-notification clickable' onClick={() => openChat(chatId)}>
      <div className='chat-notification-info'>
        <span className='chat-notification-title'>{title}</span>
        <span className='chat-notification-content'>{content}</span>
      </div>
      <span className='chat-notification-date'>{formatAMPM(received)}</span>
    </div>
  )
}

export default ChatNotifications
