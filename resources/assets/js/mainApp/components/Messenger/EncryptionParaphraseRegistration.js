import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { setEncryptionPinAction } from '../../../redux/actions/encryptionAction';

class EncryptionParaphraseRegistration extends React.PureComponent {

  componentDidMount() {
    const pin = this.props.routeProps.match.params.encryption;
    if (!this.props.pin) this.props.setEncryptionPin(pin);
    window.location.replace('/');
  }

  render() {
    return null;
  }

}

export function mapStateToProps(state) {
  return {
    pin: state.encryption.pin,
  }
}

function mapDispatchToProps(dispatch) {
  return ({
    setEncryptionPin: (pin) => dispatch(setEncryptionPinAction(pin)),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EncryptionParaphraseRegistration));
