
import React from "react";
import { connect } from 'react-redux';

import Messenger from './Messenger';
import LoadingIndicator from '../LoadingIndicator';

import { prepareMessengerAction } from '../../../redux/actions/chatAction';

class MessengerLoader extends React.PureComponent {

  state = {
    loaded: false,
  }

  componentDidUpdate() {
    if (!this.state.loaded && !this.props.loading) {
      this.props.prepareMessenger(this.props.pin, this.props.privateKey, this.props.publicKey);
      this.setState({ loaded: true });
    }
  }

  render() {
    if (!this.state.loaded || this.props.preparingMessenger) {
      return (
        <section id="messenger">
          <div className="messenger-loading-container">
            <p className="messenger-loading-hint-top">Hang On</p>
            <div className="messenger-loading-indicator">
              <LoadingIndicator />
            </div>
            <p className="messenger-loading-hint-bottom">Loading Messenger...</p>
          </div>
        </section>
      );
    }
    return <Messenger
      profileImage={this.props.profileImage}
      userId={this.props.userId}
      publicKey={this.props.publicKey}
    />;
  }

}

function mapStateToProps(state) {
  return {
    preparingMessenger: state.chat.preparingMessenger,
    pin: state.encryption.pin,
    privateKey: state.encryption.privateKey,
  }
}

function mapDispatchToProps(dispatch) {
  return ({
    prepareMessenger: (pin, privateKey, publicKey) => dispatch(prepareMessengerAction(pin, privateKey, publicKey)),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(MessengerLoader);