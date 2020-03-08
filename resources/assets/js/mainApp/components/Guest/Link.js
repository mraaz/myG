
import React from 'react';
import { connect } from 'react-redux';
import { registerGuestAction } from '../../../redux/actions/guestAction';
import { logoutAction } from '../../../redux/actions/userAction';
import { fetchLink } from "../../../integration/http/chat";
import { monitorChats, closeSubscription } from '../../../integration/ws/chat';
import { toast } from 'react-toastify';
import Chat from '../Messenger/Chat';

class GuestLink extends React.PureComponent {

  state = {
    loaded: false,
  }

  componentDidMount() {
    this.props.logout();
    fetchLink(this.props.uuid).then(({ link }) => {
      if (!link) return toast.error('The Group for this Link was not found :(');
      const isValid = !link.expiry || ((new Date(link.updatedAt).getTime() + (link.expiry * 60 * 60 * 1000)) >= Date.now());
      if (!isValid) return toast.error('This Link has expired :(');
      const chatId = link.chatId;
      this.props.registerGuest(chatId);
    });
  }

  componentWillUnmount() {
    closeSubscription();
  }

  componentDidUpdate() {
    if (!this.props.guestId || this.state.loaded) return;
    monitorChats(this.props.guestId);
    this.setState({ loaded: true });
  }

  renderChat = () => {
    const { guestId, chatId } = this.props;
    if (!guestId || !chatId) return null;
    return (
      <div id="messenger" className="messenger-container">
        <div className="messenger-chat-bar">
          <Chat
            key={chatId}
            userId={guestId}
            chatId={chatId}
          />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div id="guest-container"
        style={{ backgroundImage: `url(/assets/image/img/guest_background.jpg)` }}
      >
        {this.renderChat()}
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    guestId: state.guest.guestId,
    chatId: state.guest.chatId,
    publicKey: state.guest.publicKey,
    privateKey: state.guest.privateKey,
  }
}

function mapDispatchToProps(dispatch) {
  return ({
    registerGuest: (chatId) => dispatch(registerGuestAction(chatId)),
    logout: () => dispatch(logoutAction()),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(GuestLink);
