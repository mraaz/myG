import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { setEncryptionPinAction } from '../../../redux/actions/encryptionAction'
import { ignoreFunctions } from '../../../common/render'

class EncryptionParaphraseRegistration extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  componentDidMount() {
    const pin = this.props.routeProps.match.params.encryption
    const persist = this.props.routeProps.location.search.split('?persist=')[1] === 'true'
    this.props.setEncryptionPin(pin, persist)
    window.router.replace('/')
  }

  render() {
    return null
  }
}

export function mapStateToProps(state) {
  return {
    pin: state.encryption.pin
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setEncryptionPin: (pin, persist) => dispatch(setEncryptionPinAction(pin, persist))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EncryptionParaphraseRegistration))
