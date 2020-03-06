
import React from 'react';
import { connect } from 'react-redux';
import { registerGuestAction } from '../../../redux/actions/guestAction';

class GuestLink extends React.PureComponent {

  componentDidMount() {
    if (!this.props.id) this.props.registerGuest();
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
    id: state.guest.id,
    publicKey: state.guest.publicKey,
    privateKey: state.guest.privateKey,
  }
}

function mapDispatchToProps(dispatch) {
  return ({
    registerGuest: () => dispatch(registerGuestAction()),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(GuestLink);
