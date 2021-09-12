import React from 'react'
import Contact from './Contact'
import Group from './Group'
import LoadingIndicator from '../../LoadingIndicator'
import { ignoreFunctions } from '../../../../common/render'

export default class SearchResults extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    contacts: [],
    groups: []
  }

  static getDerivedStateFromProps(props) {
    const contacts = props.searchResults.contacts || []
    const groups = props.searchResults.groups || []
    const contactChats = props.chats.filter((chat) => !chat.isGroup)
    const chatsByContact = {}
    contactChats.forEach((chat) => {
      const contactId = (chat.contacts || []).filter((contactId) => contactId !== props.userId)[0]
      if (contactId) chatsByContact[contactId] = chat
    })
    contacts.forEach((contact) => (contact.chat = chatsByContact[contact.contactId]))
    groups.forEach((group) => {
      const chat = props.chats.find((chat) => chat.chatId === group.chatId) || {}
      group.messages = chat.messages || []
      group.privateKey = chat.privateKey
    })
    const games = props.search.trim()
      ? props.games
          .slice(0)
          .filter((game) => game.name.toLowerCase().includes(props.search.toLowerCase()))
          .sort((g1, g2) => g1.name.localeCompare(g2.name))
          .sort((g1, g2) => (g1.isFavorite === g2.isFavorite ? 0 : g1.isFavorite ? -1 : 1))
          .slice(0, 10)
      : []
    return {
      contacts: JSON.parse(JSON.stringify(contacts)),
      groups: JSON.parse(JSON.stringify(groups)),
      games: JSON.parse(JSON.stringify(games))
    }
  }

  renderLoading = () => {
    if (!this.props.search || !this.props.loading) return null
    return (
      <div className='messenger-search-no-results-container'>
        <p className='messenger-loading-hint-top'>Hang On</p>
        <div className='messenger-loading-indicator'>
          <LoadingIndicator />
        </div>
        <p className='messenger-loading-hint-bottom'>{`Searching for ${this.props.search}...`}</p>
      </div>
    )
  }

  renderEmpty = () => {
    if (!this.props.search || this.props.loading || this.state.contacts.length || this.state.groups.length || this.state.games.length)
      return null
    return (
      <div className='messenger-search-no-results-container'>
        <p className='messenger-search-no-results-title'>Cannot find any results</p>
        <p className='messenger-search-no-results-subtitle'>Try searching for something else</p>
      </div>
    )
  }

  renderContacts = () => {
    if (!this.state.contacts.length || !this.props.search || this.props.loading) return null
    return this.state.contacts.map(this.renderContact)
  }

  renderContact = (contact) => {
    return (
      <Contact
        key={contact.contactId}
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

  renderGroups = () => {
    if (!this.state.groups.length || this.props.loading) return null
    return this.state.groups.map(this.renderGroup)
  }

  renderGroup = (group) => {
    return <Group key={group.chatId} {...this.props} group={group} />
  }

  render() {
    if (!this.props.search) return null
    return (
      <div className='messenger-body-tab-content'>
        {this.renderContacts()}
        {this.renderGroups()}
        {this.renderLoading()}
        {this.renderEmpty()}
      </div>
    )
  }
}
