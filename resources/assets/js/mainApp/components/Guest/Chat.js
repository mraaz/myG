import { connect } from 'react-redux';
import { Chat, mapStateToProps } from '../Messenger/Chat';
import { prepareChatAction, fetchMessagesAction, sendMessageAction, updateChatStateAction } from '../../../redux/actions/guestAction';

function mapDispatchToProps(dispatch) {
  return ({
    prepareChat: (chatId, userId) => dispatch(prepareChatAction(chatId, userId)),
    fetchMessages: (chatId, page) => dispatch(fetchMessagesAction(chatId, page)),
    sendMessage: (chatId, userId, alias, content) => dispatch(sendMessageAction(chatId, userId, alias, content)),
    updateChatState: (chatId, state) => dispatch(updateChatStateAction(chatId, state)),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);