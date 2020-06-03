import React from 'react'
import Divider from './Divider'
import Contact from './Contact'
import { STATUS_ENUM, compareStatus } from '../../../../common/status'
import { getAssetUrl } from '../../../../common/assets'

export default class Contacts extends React.PureComponent {
  state = {
    sectionExpanded: {
      recent: true,
      [STATUS_ENUM.ONLINE]: false,
      [STATUS_ENUM.PLAYING]: false,
      [STATUS_ENUM.AFK]: false,
      [STATUS_ENUM.OFFLINE]: false,
    },
  }

  compareLastMessages = (f1, f2) => {
    const m1 = (f1.chat.messages || [])[(f1.chat.messages || []).length - 1] || { createdAt: 0 }
    const m2 = (f2.chat.messages || [])[(f2.chat.messages || []).length - 1] || { createdAt: 0 }
    return new Date(m2.createdAt) - new Date(m1.createdAt)
  }

  renderSection(name, count, contacts, expanded) {
    const chevronType = contacts.length && expanded ? 'down' : 'right'
    return (
      <div className='messenger-body-section' key={name}>
        <div
          className='messenger-body-section-header clickable'
          onClick={() =>
            this.setState((previous) => ({
              sectionExpanded: {
                ...{
                  [STATUS_ENUM.ONLINE]: false,
                  [STATUS_ENUM.PLAYING]: false,
                  [STATUS_ENUM.AFK]: false,
                  [STATUS_ENUM.OFFLINE]: false,
                },
                [name]: !previous.sectionExpanded[name],
              },
            }))
          }>
          <p className='messenger-body-section-header-name'>{name}</p>
          <div className='messenger-body-section-header-info'>
            <p className='messenger-body-section-header-count'>{`(${count})`}</p>
            <div
              className='messenger-body-section-header-icon'
              style={{ backgroundImage: `url('${getAssetUrl(`ic_messenger_chevron_${chevronType}`)}')` }}
            />
          </div>
        </div>
        {!!contacts.length && expanded && <div className='messenger-body-section-content'>{contacts.map(this.renderContact)}</div>}
      </div>
    )
  }

  renderContact = (contact) => {
    return (
      <Contact
        contact={contact}
        messages={(contact.chat || {}).messages || []}
        userId={this.props.userId}
        privateKey={this.props.privateKey}
        disconnected={this.props.disconnected}
        openChat={this.props.openChat}
        createChat={this.props.createChat}
      />
    )
  }

  render() {
    return Divider(
      'friends',
      this.props.expanded,
      () => this.props.onExpand(this.props.expanded),
      () => {
        if (!this.props.contacts.length) {
          return (
            <div className='messenger-empty-message-container'>
              <p className='messenger-empty-message'>
                You haven't added any friends{this.props.inGame ? ' that play this game' : ''} yet :(
              </p>
              <p className='messenger-empty-message'>Try searching for players</p>
            </div>
          )
        }

        const sections = {}

        const contacts = this.props.contacts
          .slice(0)
          .sort((f1, f2) => compareStatus(f1.status, f2.status))
          .sort((f1, f2) => this.compareLastMessages(f1, f2))

        if (this.props.search.trim()) {
          const search = (name) => name.toLowerCase().includes(this.props.search.toLowerCase())
          sections['suggestions'] = contacts
            .slice(0)
            .filter((contact) => search(contact.name))
            .slice(0, 18)
        } else {
          sections['recent'] = contacts.filter((contact) => (contact.chat.messages || []).length).slice(0, 8)
          sections[STATUS_ENUM.ONLINE] = contacts.filter((contact) => contact.status === STATUS_ENUM.ONLINE)
          sections[STATUS_ENUM.PLAYING] = contacts.filter((contact) => contact.status === STATUS_ENUM.PLAYING)
          sections[STATUS_ENUM.AFK] = contacts.filter((contact) => contact.status === STATUS_ENUM.AFK)
          sections[STATUS_ENUM.OFFLINE] = contacts.filter((contact) => contact.status === STATUS_ENUM.OFFLINE)
        }

        return (
          <div className='messenger-body-section'>
            {!!this.props.search && this.renderSection('suggestions', sections['suggestions'].length, sections['suggestions'], true)}
            {!this.props.search &&
              this.renderSection('recent', sections['recent'].length, sections['recent'], this.state.sectionExpanded['recent'])}
            {!this.props.search &&
              this.renderSection(
                STATUS_ENUM.ONLINE,
                sections[STATUS_ENUM.ONLINE].length,
                sections[STATUS_ENUM.ONLINE],
                this.state.sectionExpanded[STATUS_ENUM.ONLINE]
              )}
            {!this.props.search &&
              this.renderSection(
                STATUS_ENUM.PLAYING,
                sections[STATUS_ENUM.PLAYING].length,
                sections[STATUS_ENUM.PLAYING],
                this.state.sectionExpanded[STATUS_ENUM.PLAYING]
              )}
            {!this.props.search &&
              this.renderSection(
                STATUS_ENUM.AFK,
                sections[STATUS_ENUM.AFK].length,
                sections[STATUS_ENUM.AFK],
                this.state.sectionExpanded[STATUS_ENUM.AFK]
              )}
            {!this.props.search &&
              this.renderSection(
                STATUS_ENUM.OFFLINE,
                sections[STATUS_ENUM.OFFLINE].length,
                sections[STATUS_ENUM.OFFLINE],
                this.state.sectionExpanded[STATUS_ENUM.OFFLINE]
              )}
          </div>
        )
      }
    )
  }
}
