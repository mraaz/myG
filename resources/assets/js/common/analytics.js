import logger from './logger'
import { store } from '../redux/Store'

function pushEvent(event) {
  const { userId, alias } = store.getState().user
  event.userId = userId
  event.alias = alias
  if (window.dataLayer) window.dataLayer.push(event)
  logger.log('ANALYTICS', 'New GA Event: ', event)
}

export const GoogleAnalytics = {
  // A caught JS error on React
  caughtReactError({ error, errorInfo }) {
    pushEvent({
      event: 'caughtReactError',
      error,
      errorInfo,
    })
  },

  // A recent message in the context window was clicked to open a chat
  chatRecentMessageClicked({ messageId }) {
    pushEvent({
      event: 'chatRecentMessageClicked',
      messageId,
    })
  },

  // A contact in the context window was clicked to open a chat
  chatContactClicked({ contactId }) {
    pushEvent({
      event: 'chatContactClicked',
      contactId,
    })
  },

  // A group in the context window was clicked to open a chat
  chatGroupClicked({ chatId }) {
    pushEvent({
      event: 'chatGroupClicked',
      chatId,
    })
  },

  // A chat group was created
  chatGroupCreated() {
    pushEvent({
      event: 'chatGroupCreated',
    })
  },

  // A chat message was sent
  chatMessageSent({ chatId }) {
    pushEvent({
      event: 'chatMessageSent',
      chatId,
    })
  },
}
