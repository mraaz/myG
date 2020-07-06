import React from 'react'
import { connect } from 'react-redux'
import Divider from './Divider'
import Group from './Group'
import GroupCreation from '../GroupCreation'
import LoadingIndicator from '../../LoadingIndicator'
import { generateKeysSync as generateGroupKeys } from '../../../../integration/encryption'
import { uploadGroupIcon } from '../../../../integration/http/chat'
import { getAssetUrl } from '../../../../common/assets'
import { ignoreFunctions } from '../../../../common/render'
import { fetchGroupsPaginatedAction } from '../../../../redux/actions/paginationAction'

function compareLastMessages(c1, c2) {
  const m1 = (c1.messages || [])[(c1.messages || []).length - 1] || { createdAt: 0 }
  const m2 = (c2.messages || [])[(c2.messages || []).length - 1] || { createdAt: 0 }
  return new Date(m2.createdAt) - new Date(m1.createdAt)
}

class Groups extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      showingGroupCreation: false,
    }
    this.groupsListRef = React.createRef()
  }

  componentDidMount() {
    if (this.props.expanded) this.fetchGroups()
    document.addEventListener('scroll', this.handleScroll, { passive: true })
    document.addEventListener('wheel', this.handleScroll, { passive: true })
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll, false)
    document.removeEventListener('wheel', this.handleScroll, false)
  }

  handleScroll = () => {
    const groupsList = this.groupsListRef.current
    if (!groupsList) return
    const hasScrolledToBottom = groupsList.scrollHeight - groupsList.scrollTop === 200
    if (hasScrolledToBottom)
      this.setState(
        (previous) => ({ page: previous.page + 1 }),
        () => this.fetchGroups()
      )
  }

  fetchGroups() {
    this.props.fetchGroupsPaginated(this.state.page, this.props.gameId, !this.state.page)
  }

  expand = () => {
    if (!this.props.expanded) this.setState({ page: 0 }, () => this.fetchGroups())
    this.props.onExpand(this.props.expanded)
  }

  openChat = (contact) => {
    if (this.props.disconnected) return
    if (contact.chat.chatId) return this.props.openChat(contact.chat.chatId, contact.chat)
    this.props.createChat([contact.contactId], this.props.userId)
  }

  createGroup = async (icon, key, title, contacts, gameId) => {
    const { encryption } = generateGroupKeys()
    this.setState({ showingGroupCreation: false })
    const {
      value: {
        chat: { chatId },
      },
    } = await this.props.createChat(contacts, this.props.userId, title, icon, encryption, true, null, gameId)
    if (key) await uploadGroupIcon(chatId, key)
  }

  renderGroupButton = () => {
    return (
      <div>
        <div className='messenger-new-group-button clickable' onClick={() => this.setState({ showingGroupCreation: true })}>
          <div className='messenger-new-group-button-icon' style={{ backgroundImage: `url(${getAssetUrl('ic_chat_group_create')})` }} />
          Create Group
        </div>
        {!this.props.groups.length && (
          <div className='messenger-empty-message-container'>
            <p className='messenger-empty-message'>You aren't part of any group{this.props.inGame ? ' for this game' : ''} yet :(</p>
            <p className='messenger-empty-message'>You can find groups through matchmaking</p>
          </div>
        )}
        {this.state.showingGroupCreation && (
          <GroupCreation
            game={this.props.game}
            onCreate={this.createGroup}
            onCancel={() => this.setState({ showingGroupCreation: false })}
          />
        )}
      </div>
    )
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
    if (!this.props.loadingMore || !this.props.expanded || this.props.loading) return null
    return <div className='messenger-body-section-loader'>loading more...</div>
  }

  renderGroups = () => {
    if (!this.props.expanded || this.props.loading) return null
    return this.props.groups.map(this.renderGroup)
  }

  renderGroup = (group) => {
    return <Group {...this.props} group={group} />
  }

  render() {
    return Divider(
      'groups',
      this.props.expanded,
      () => this.expand(),
      () => {
        if (!this.props.groups.length) return this.renderGroupButton()
        return (
          <div>
            {this.renderGroupButton()}
            <div className='messenger-body-section-content' ref={this.groupsListRef}>
              {this.renderGroups()}
              {this.renderLoading()}
              {this.renderLoadingMore()}
            </div>
          </div>
        )
      }
    )
  }
}

export function mapStateToProps(state) {
  const groups = state.pagination.groups
  groups.forEach((group) => {
    const chat = state.chat.chats.find((chat) => chat.chatId === group.chatId) || {}
    group.messages = chat.messages || []
    group.privateKey = chat.privateKey
  })
  return {
    loading: state.pagination.loading,
    loadingMore: state.pagination.loadingMore,
    groups: groups.sort(compareLastMessages),
    chats: state.chat.chats,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchGroupsPaginated: (page, gameId, refresh) => dispatch(fetchGroupsPaginatedAction(page, gameId, refresh)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Groups)
