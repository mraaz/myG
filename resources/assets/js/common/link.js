import notifyToast from './toast'
import { fetchLink, acceptInvitation } from '../integration/http/chat'
import { store } from '../redux/Store'
import { fetchChatsAction } from '../redux/actions/chatAction'

export function handleLink(userId) {
  if (!window.location.href.includes('/link')) return
  const uuidMatcher = new RegExp(/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/)
  const url = window.location.href
  const uuid = Array.isArray(url.match(uuidMatcher)) ? url.match(uuidMatcher)[0] : null
  fetchLink(uuid).then(({ link }) => {
    if (!link) return notifyToast('The Group for this Link was not found :(')
    const isValid = !link.expiry || new Date(link.updatedAt).getTime() + link.expiry * 60 * 60 * 1000 >= Date.now()
    if (!isValid) return notifyToast('This Link has expired :(')
    const chatId = link.chatId
    acceptInvitation(chatId, [userId]).then((response) => {
      if (response.error === 'Contacts are Already in Chat.') return notifyToast('You are already in this Group!')
      store.dispatch(fetchChatsAction());
      return notifyToast('You have been added to this Group!!')
    })
  })
}
