
import React from 'react';
import { connect } from 'react-redux';
import { registerGuestAction } from '../../../redux/actions/guestAction';
import { logoutAction } from '../../../redux/actions/userAction';
import { fetchLink } from "../../../integration/http/guest";
import { monitorChats, closeSubscription } from '../../../integration/ws/chat';
import notifyToast from '../../../common/toast';
import Chat from './Chat';
import Register from './Register';

class GuestLink extends React.PureComponent {

  state = {
    chatId: null,
    validLink: false,
    loaded: false,
    alias: '',
    aliasEmpty: false,
  }

  componentDidMount() {
    this.props.logout();
    localStorage.clear();
    fetchLink(this.props.uuid).then(({ link }) => {
      if (!link) return notifyToast('The Group for this Link was not found :(');
      const isValid = !link.expiry || ((new Date(link.updatedAt).getTime() + (link.expiry * 60 * 60 * 1000)) >= Date.now());
      if (!isValid) return notifyToast('This Link has expired :(');
      const chatId = link.chatId;
      this.setState({ chatId, validLink: true });
    });
  }

  componentWillUnmount() {
    this.props.logout();
    localStorage.clear();
    closeSubscription();
  }

  componentDidUpdate() {
    if (!this.props.guestId || this.state.loaded || !this.state.validLink) return;
    monitorChats(this.props.guestId, true);
    this.setState({ loaded: true });
  }

  registerGuest = () => {
    if (!this.state.alias.trim()) return this.setState({ aliasEmpty: true });
    this.props.registerGuest(this.state.chatId, this.state.alias);
  }

  renderChat = () => {
    const { guestId, chatId, kicked } = this.props;
    const { loaded, validLink } = this.state;
    if (!guestId || !chatId || kicked || !loaded || !validLink) return null;
    return (
      <div id="messenger" className="messenger-container">
        <Chat
          key={chatId}
          userId={guestId}
          chatId={chatId}
          alias={`Guest #${guestId}`}
          isGuest={true}
        />
        <Register />
      </div>
    );
  }

  renderKicked() {
    if (!this.props.kicked) return null;
    return (
      <div className="kicked">
        You have been kicked from this Group
      </div>
    );
  }

  renderAlias() {
    if (!this.state.validLink || this.props.loaded) return null;
    return (
      <div className="alias-container">
        <p className="hint">Create an Alias</p>
        <input
          className={`input ${this.state.aliasEmpty ? 'error' : ''}`}
          placeholder="E.g. John McGamer"
          type="text"
          value={this.state.alias}
          onChange={event => this.setState({ alias: event.target.value, aliasEmpty: false })}
        ></input>
        <div className="join clickable" onClick={this.registerGuest}>JOIN CHAT</div>
        <div className="register clickable" onClick={() => window.location.replace('/')}>Create a new Account</div>
      </div>
    );
  }

  render() {
    return (
      <div id="guest-container"
        style={{ backgroundImage: `url(/assets/image/img/guest_background.jpg)` }}
      >
        {!!this.props.hasChat && this.renderChat()}
        {this.renderKicked()}
        {this.renderAlias()}
      </div>
    );
  }

}

function mapStateToProps(state) {
  const hasChat = state.chat.chats.length;
  return {
    hasChat,
    guestId: state.guest.guestId,
    chatId: state.guest.chatId,
    publicKey: state.guest.publicKey,
    privateKey: state.guest.privateKey,
    kicked: state.guest.kicked,
  }
}

function mapDispatchToProps(dispatch) {
  return ({
    registerGuest: (chatId, alias) => dispatch(registerGuestAction(chatId, alias)),
    logout: () => dispatch(logoutAction()),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(GuestLink);
