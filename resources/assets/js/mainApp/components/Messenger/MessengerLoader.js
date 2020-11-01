import React from 'react'
import { connect } from 'react-redux'

import Messenger from './Messenger'
import LoadingIndicator from '../LoadingIndicator'

import { prepareMessengerAction } from '../../../redux/actions/chatAction'
import { ignoreFunctions } from '../../../common/render'

class MessengerLoader extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    loaded: false,
  }

  componentDidMount() {
    this.prepareMessenger();
  }

  componentDidUpdate() {
    this.prepareMessenger();
  }

  prepareMessenger = () => {
    if (!this.state.loaded && !this.props.loading) {
      this.props.prepareMessenger(this.props.userId, this.props.alias, this.props.pin, this.props.privateKey, this.props.publicKey)
      this.setState({ loaded: true })
    }
  }

  render() {
    if (!this.state.loaded || this.props.preparingMessenger) {
      return (
        <section id='messenger'>
          <div className='messenger-loading-container'>
            <p className='messenger-loading-hint-top'>Hang On</p>
            <div className='messenger-loading-indicator'>
              <LoadingIndicator />
            </div>
            <p className='messenger-loading-hint-bottom'>Loading Messenger...</p>
          </div>
        </section>
      )
    }
    return (
      <Messenger
        profileImage={this.props.profileImage}
        userId={this.props.userId}
        alias={this.props.alias}
        publicKey={this.props.publicKey}
      />
    )
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
  return {
    prepareMessenger: (userId, alias, pin, privateKey, publicKey) =>
      dispatch(prepareMessengerAction(userId, alias, pin, privateKey, publicKey)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessengerLoader)
