import { editMessage } from '../integration/http/chat'
import { encryptMessage, decryptMessage } from '../integration/encryption'
import { sendMessage } from '../integration/http/chat'
import logger from './logger'

export function reEncryptMessages(messages, publicKey, privateKey) {
  logger.log('USER', `Re-Encrypting ${messages.length} messages.`)
  if (!messages.length) return
  messages
    .slice(0)
    .reverse()
    .forEach((message) => {
      const decrypted = decryptMessage(message.backup, privateKey)
      const encrypted = encryptMessage(decrypted, publicKey, privateKey)
      editMessage(message.chatId, message.messageId, { content: encrypted, backup: message.backup }, true)
    })
}

export function sendGroupKeys(chatId, userId, contacts, groupPrivateKey, userPrivateKey) {
  if (!groupPrivateKey) return
  logger.log(
    'CHAT',
    `Sending Group Keys for Chat ${chatId} to Contacts ${JSON.stringify(
      contacts.map((contact) => contact.contactId || contact.guestId || contact.userId)
    )}`
  )
  const serializedKey = JSON.stringify(groupPrivateKey)
  contacts.forEach((contact) => {
    const { contactId, publicKey, guestId } = contact
    const content = encryptMessage(serializedKey, publicKey, userPrivateKey)
    sendMessage(chatId, userId, '', { content, backup: '' }, contactId || guestId || contact.userId)
  })
}
