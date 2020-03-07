
import React from 'react';
import { connect } from 'react-redux';
import { registerGuestAction } from '../../../redux/actions/guestAction';
import { fetchLink } from "../../../integration/http/chat";

class GuestLink extends React.PureComponent {

  componentDidMount() {
    fetchLink(this.props.uuid).then(({ link }) => {
      if (!link) return toast.error('The Group for this Link was not found :(');
      const isValid = !link.expiry || ((new Date(link.updatedAt).getTime() + (link.expiry * 60 * 60 * 1000)) >= Date.now());
      if (!isValid) return toast.error('This Link has expired :(');
      const chatId = link.chatId;
      this.props.registerGuest(chatId);
    });
  }

  render() {
    return (
      <div className="messenger-link-guest-container"
        style={{ backgroundImage: `url(/assets/image/img/guest_background.jpg)` }}
      >
        
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    guestId: state.guest.guestId,
    publicKey: state.guest.publicKey,
    privateKey: state.guest.privateKey,
  }
}

function mapDispatchToProps(dispatch) {
  return ({
    registerGuest: (chatId) => dispatch(registerGuestAction(chatId)),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(GuestLink);
