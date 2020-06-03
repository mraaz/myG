import { store } from '../redux/Store'
import { setAsFriendAction, removeFriendAction, fetchContactAction } from '../redux/actions/userAction'
import { forceDeleteChat } from '../integration/http/chat'

export function setAsFriendRedux(friendId) {
  store.dispatch(setAsFriendAction(friendId))
  store.dispatch(fetchContactAction(friendId))
}

export function removeFriendRedux(friendId) {
  store.dispatch(removeFriendAction(friendId))
  const chat = store.getState().chat.chats.find((chat) => !chat.isGroup && chat.contacts.includes(friendId))
  if (chat && chat.chatId) forceDeleteChat(chat.chatId)
}
