import React from 'react'
import { connect } from 'react-redux'
import Contact from './Contact'
import LoadingIndicator from '../../LoadingIndicator'
import { getAssetUrl } from '../../../../common/assets'
import { ignoreFunctions } from '../../../../common/render'
import { fetchContactsPaginatedAction } from '../../../../redux/actions/paginationAction'

class Section extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  static getDerivedStateFromProps(props, state) {
    const loadedAllContacts = props.contacts.length === props.contactsCount && props.contactsCount !== 0;
    if (loadedAllContacts) return { loadingMore: false };
    if (props.contacts.length > state.previousCount || state.page === 0 && state.previousCount > 10) {
      return { page: state.page + 1, previousCount: props.contacts.length, loadingMore: false }
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      previousCount: 0,
      loadingMore: false,
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
    const hasScrolledToBottom = contactsList.scrollHeight - contactsList.scrollTop === 200
    if (hasScrolledToBottom) this.onScroll();
  }

  onScroll = () => {
    const loadedAllContacts = this.props.contacts.length === this.props.contactsCount && this.props.contactsCount !== 0;
    if (loadedAllContacts || this.state.loadingMore) return;
    this.setState({ loadingMore: true }, this.fetchContacts);
  }

  fetchContacts = () => {
    this.props.fetchContactsPaginated(this.state.page, this.props.status, this.props.gameId, null, !this.state.page)
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

  renderLoadingMore = () => {
    if (!this.state.loadingMore || !this.props.expanded) return null
    return (
      <div className='messenger-loading-container' style={{ opacity: 0.5 }}>
        <p className='messenger-loading-hint-top'>hang on</p>
        <div className='messenger-loading-indicator'>
          <LoadingIndicator />
        </div>
        <p className='messenger-loading-hint-bottom'>loading more...</p>
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

  renderContact = (contact) => {
    return <Contact key={contact.contactId} {...this.props} contact={contact} />
  }

  render() {
    const chevronType = this.props.contacts.length && this.props.expanded ? 'down' : 'right'
    return (
      <div className='messenger-body-section' key={this.props.status}>
        <div className='messenger-body-section-header clickable' onClick={this.expand}>
          <p className='messenger-body-section-header-name'>
            {!!this.props.color && (
              <div style={{ width: 12, height: 12, marginRight: 8, backgroundColor: this.props.color, borderRadius: 1000 }} />
            )}
            {this.props.status}
          </p>
          <div className='messenger-body-section-header-info'>
            <span className='messenger-body-section-header-count'>({this.props.contacts.length || 0})</span>
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
    loading: state.pagination.contactsLoading,
    loadingMore: state.pagination.contactsLoadingMore,
    contactsCount: state.pagination.contactsCount,
    contacts,
    chats,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchContactsPaginated: (page, status, gameId, search, refresh) =>
      dispatch(fetchContactsPaginatedAction(page, status, gameId, search, refresh)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Section)
