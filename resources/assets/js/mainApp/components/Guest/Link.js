import React from 'react'
import { connect } from 'react-redux'
import { registerGuestAction, setGuestLinkAction } from '../../../redux/actions/guestAction'
import { logoutAction } from '../../../redux/actions/userAction'
import { fetchLink } from '../../../integration/http/guest'
import { monitorChats, closeSubscriptions } from '../../../integration/ws/chat'
import notifyToast from '../../../common/toast'
import Chat from './Chat'
import Register from './Register'
import WindowFocusHandler from '../WindowFocusHandler'
import { getAssetUrl } from '../../../common/assets'
import { ignoreFunctions } from '../../../common/render'

class GuestLink extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    chatId: null,
    invalidLink: false,
    validLink: false,
    loaded: false,
    alias: '',
    aliasEmpty: false,
    windowFocused: false
  }

  componentDidMount() {
    this.props.logout()
    localStorage.clear()
    fetchLink(this.props.uuid).then(({ link }) => {
      if (!link) {
        this.setState({ invalidLink: true })
        return notifyToast("Invalid link mate! I searched and now I'm buggered...")
      }
      const isValid = !link.expiry || new Date(link.updatedAt).getTime() + link.expiry * 60 * 60 * 1000 >= Date.now()
      if (!isValid) {
        this.setState({ invalidLink: true })
        return notifyToast('This link has expired :(')
      }
      const chatId = link.chatId
      this.props.setGuestLink(`/link/${this.props.uuid}`)
      this.setState({ chatId, validLink: true })
    })
  }

  componentWillUnmount() {
    this.props.logout()
    localStorage.clear()
    closeSubscriptions()
  }

  componentDidUpdate() {
    if (!this.props.guestId || this.state.loaded || !this.state.validLink) return
    monitorChats(this.props.guestId, true)
    this.setState({ loaded: true })
  }

  onKeyPressed = (event) => {
    const code = event.keyCode || event.which
    const enterKeyCode = 13
    if (code === enterKeyCode) {
      event.preventDefault()
      this.registerGuest()
    }
  }

  registerGuest = () => {
    if (!this.state.alias.trim()) return this.setState({ aliasEmpty: true })
    this.props.registerGuest(this.state.chatId, this.state.alias, this.props.uuid)
  }

  renderChat = () => {
    const { guestId, chatId, kicked } = this.props
    const { loaded, validLink } = this.state
    if (!guestId || !chatId || kicked || !loaded || !validLink) return null
    return (
      <div className='messenger messenger-container'>
        <Chat
          key={chatId}
          userId={guestId}
          chatId={chatId}
          alias={`${this.state.alias} (Guest #${guestId})`}
          isGuest={true}
          windowFocused={this.state.windowFocused}
        />
        <Register />
      </div>
    )
  }

  renderNoLink() {
    if (!this.state.invalidLink) return null
    return (
      <div className='alias-container'>
        <p className='kicked-hint'>Sorry mate! This link has expired. :(</p>
        <div className='join clickable' onClick={() => window.router.replace('/')}>
          Login
        </div>
        <div className='register clickable' onClick={() => window.router.replace('/')}>
          Create a new Account
        </div>
      </div>
    )
  }

  renderKicked() {
    if (!this.props.kicked) return null
    return (
      <div className='alias-container'>
        <p className='kicked-hint'>Crikey! You have been kicked from this group :(</p>
        <div className='join clickable' onClick={() => window.router.replace('/')}>
          Login
        </div>
        <div className='register clickable' onClick={() => window.router.replace('/')}>
          Create a new Account
        </div>
      </div>
    )
  }

  renderAlias() {
    if (!this.state.validLink || this.state.loaded) return null
    return (
      <div className='alias-container'>
        <p className='hint'>Create an Alias</p>
        <input
          className={`input ${this.state.aliasEmpty ? 'error' : ''}`}
          placeholder='e.g. Star-Lord'
          type='text'
          autoComplete='off'
          value={this.state.alias}
          onChange={(event) => this.setState({ alias: event.target.value, aliasEmpty: false })}
          onKeyPress={this.onKeyPressed}
        ></input>
        <div className='join clickable' onClick={this.registerGuest}>
          JOIN CHAT
        </div>
        <div className='register clickable' onClick={() => window.router.replace('/')}>
          <div
            className='myg-icon'
            style={{
              backgroundImage: `url('https://myG.gg/platform_images/Dashboard/logo.svg')`,
              backgroundSize: 'inherit',
              backgroundColor: '#000'
            }}
          />
          Login
        </div>
        <div className='register clickable' onClick={() => window.router.replace('/')}>
          Create a new Account
        </div>
      </div>
    )
  }

  renderFocusMonitor = () => {
    return (
      <WindowFocusHandler onFocus={() => this.setState({ windowFocused: true })} onBlur={() => this.setState({ windowFocused: false })} />
    )
  }

  render() {
    return (
      <div id='guest-container' style={{ backgroundImage: `url(${getAssetUrl('background_guest')})` }}>
        {!!this.props.hasChat && this.renderChat()}
        {this.renderNoLink()}
        {this.renderKicked()}
        {this.renderAlias()}
        {this.renderFocusMonitor()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const hasChat = state.chat.chats.length
  return {
    hasChat,
    guestId: state.guest.guestId,
    chatId: state.guest.chatId,
    publicKey: state.guest.publicKey,
    privateKey: state.guest.privateKey,
    kicked: state.guest.kicked
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setGuestLink: (guestLink) => dispatch(setGuestLinkAction(guestLink)),
    registerGuest: (chatId, alias, uuid) => dispatch(registerGuestAction(chatId, alias, uuid)),
    logout: () => dispatch(logoutAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GuestLink)
