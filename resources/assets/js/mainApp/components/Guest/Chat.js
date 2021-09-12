import { connect } from 'react-redux'
import { Chat, mapStateToProps } from '../Messenger/Chat'
import {
  prepareChatAction,
  fetchMessagesAction,
  sendMessageAction,
  editMessageAction,
  deleteMessageAction,
  addReactionAction,
  removeReactionAction,
  updateChatStateAction,
  markLastReadGuestAction
} from '../../../redux/actions/guestAction'

function mapDispatchToProps(dispatch) {
  return {
    prepareChat: (chatId, userId) => dispatch(prepareChatAction(chatId, userId)),
    fetchMessages: (chatId, page) => dispatch(fetchMessagesAction(chatId, page)),
    sendMessage: (chatId, userId, alias, content, attachment, replyId, replyContent, replyBackup, unencryptedContent) =>
      dispatch(sendMessageAction(chatId, userId, alias, content, attachment, replyId, replyContent, replyBackup, unencryptedContent)),
    editMessage: (chatId, userId, messageId, content) => dispatch(editMessageAction(chatId, userId, messageId, content)),
    deleteMessage: (chatId, userId, messageId, origin) => dispatch(deleteMessageAction(chatId, userId, messageId, origin)),
    addReaction: (chatId, userId, messageId, reactionId, senderName) =>
      dispatch(addReactionAction(chatId, userId, messageId, reactionId, senderName)),
    removeReaction: (chatId, userId, messageId, reactionId) => dispatch(removeReactionAction(chatId, userId, messageId, reactionId)),
    updateChatState: (chatId, state) => dispatch(updateChatStateAction(chatId, state)),
    markLastReadGuest: (chatId, userId) => dispatch(markLastReadGuestAction(chatId, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
