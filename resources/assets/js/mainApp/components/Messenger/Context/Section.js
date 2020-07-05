import React from 'react'
import { connect } from 'react-redux'
import Contact from './Contact'
import LoadingIndicator from '../../LoadingIndicator'
import { getAssetUrl } from '../../../../common/assets'
import { ignoreFunctions } from '../../../../common/render'
import { fetchContactsPaginatedAction } from '../../../../redux/actions/paginationAction'

function compareLastMessages(f1, f2) {
  const c1 = f1.chat || {}
  const c2 = f2.chat || {}
  const m1 = (c1.messages || [])[(c1.messages || []).length - 1] || { createdAt: 0 }
  const m2 = (c2.messages || [])[(c2.messages || []).length - 1] || { createdAt: 0 }
  return new Date(m2.createdAt) - new Date(m1.createdAt)
}

class Section extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  constructor(props) {
    super(props)
    this.state = {
      page: 0,
    }
    this.contactsListRef = React.createRef()
  }

  componentDidMount() {
    if (this.props.expanded) this.fetchContacts()
    document.addEventListener('scroll', this.handleScroll, { passive: true })
    document.addEventListener('wheel', this.handleScroll, { passive: true })
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll, false)
    document.removeEventListener('wheel', this.handleScroll, false)
  }

  handleScroll = () => {
    const contactsList = this.contactsListRef.current
    if (!contactsList) return
    console.log(contactsList.scrollHeight, contactsList.scrollTop, contactsList.scrollHeight - contactsList.scrollTop)
    const hasScrolledToBottom = contactsList.scrollHeight - contactsList.scrollTop === 200
    if (hasScrolledToBottom)
      this.setState(
        (previous) => ({ page: previous.page + 1 }),
        () => this.fetchContacts()
      )
  }

  fetchContacts() {
    this.props.fetchContactsPaginated(this.state.page, this.props.status, this.props.gameId, !this.state.page)
  }

  expand = () => {
    if (!this.props.expanded) this.setState({ page: 0 }, () => this.fetchContacts())
    this.props.onSectionExpanded()
  }

  renderLoading = () => {
    if (!this.props.expanded || !this.props.loading) return null
    return (
      <div className='messenger-loading-container'>
        <p className='messenger-loading-hint-top'>Hang On</p>
        <div className='messenger-loading-indicator'>
          <LoadingIndicator />
        </div>
        <p className='messenger-loading-hint-bottom'>Looking for Friends...</p>
      </div>
    )
  }

  renderEmpty = () => {
    if (this.props.contacts.length || !this.props.expanded || this.props.loading) return null
    return (
      <div className='messenger-empty-message-container'>
        <p className='messenger-empty-message'>There aren't any friends here :(</p>
        <p className='messenger-empty-message'>Try searching for players</p>
      </div>
    )
  }

  renderContacts = () => {
    if (!this.props.contacts.length || !this.props.expanded || this.props.loading) return null
    return this.props.contacts.map(this.renderContact)
  }

  renderLoadingMore = () => {
    if (!this.props.loadingMore || !this.props.expanded || this.props.loading) return null
    return <div className='messenger-body-section-loader'>loading more...</div>
  }

  renderContact = (contact) => {
    return (
      <Contact
        contact={contact}
        messagesLength={((contact.chat || {}).messages || []).length}
        userId={this.props.userId}
        privateKey={this.props.privateKey}
        disconnected={this.props.disconnected}
        openChat={this.props.openChat}
        createChat={this.props.createChat}
      />
    )
  }

  render() {
    const chevronType = this.props.contacts.length && this.props.expanded ? 'down' : 'right'
    return (
      <div className='messenger-body-section' key={this.props.status}>
        <div className='messenger-body-section-header clickable' onClick={this.expand}>
          <p className='messenger-body-section-header-name'>{this.props.status}</p>
          <div className='messenger-body-section-header-info'>
            <div
              className='messenger-body-section-header-icon'
              style={{ backgroundImage: `url('${getAssetUrl(`ic_messenger_chevron_${chevronType}`)}')` }}
            />
          </div>
        </div>
        <div className='messenger-body-section-content' ref={this.contactsListRef}>
          {this.renderLoading()}
          {this.renderEmpty()}
          {this.renderContacts()}
          {this.renderLoadingMore()}
        </div>
      </div>
    )
  }
}

export function mapStateToProps(state, props) {
  const chats = state.chat.chats.filter((chat) => !chat.isGroup)
  const chatsByContact = {}
  chats.forEach((chat) => {
    const contactId = chat.contacts.filter((contactId) => contactId !== props.userId)[0]
    chatsByContact[contactId] = chat
  })
  const contacts = state.pagination[props.status] || []
  contacts.forEach((contact) => (contact.chat = chatsByContact[contact.contactId]))
  return {
    loading: state.pagination.loading,
    loadingMore: state.pagination.loadingMore,
    contacts: contacts.sort(compareLastMessages),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchContactsPaginated: (page, status, gameId, refresh) => dispatch(fetchContactsPaginatedAction(page, status, gameId, refresh)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Section)
