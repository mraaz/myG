import React from 'react'
import Contacts from './Contacts'
import Groups from './Groups'
import { ignoreFunctions } from '../../../../common/render'

export default class Game extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    dividerExpanded: {
      friends: true,
      groups: false,
    },
  }

  renderContacts = () => {
    return (
      <Contacts
        userId={this.props.userId}
        privateKey={this.props.privateKey}
        contacts={this.props.contacts}
        search={this.props.search}
        disconnected={this.props.disconnected}
        openChat={this.props.openChat}
        createChat={this.props.createChat}
        inGame={true}
        expanded={this.state.dividerExpanded.friends}
        onExpand={(expanded) => this.setState({ dividerExpanded: { friends: !expanded, groups: false } })}
      />
    )
  }

  renderGroups = () => {
    return (
      <Groups
        userId={this.props.userId}
        game={this.props.game}
        privateKey={this.props.privateKey}
        contacts={this.props.contacts}
        groups={this.props.groups}
        search={this.props.search}
        disconnected={this.props.disconnected}
        openChat={this.props.openChat}
        createChat={this.props.createChat}
        inGame={true}
        expanded={this.state.dividerExpanded.groups}
        onExpand={(expanded) => this.setState({ dividerExpanded: { groups: !expanded, friends: false } })}
      />
    )
  }

  render() {
    return (
      <div className='messenger-body-section-content'>
        {this.renderContacts()}
        {this.renderGroups()}
      </div>
    )
  }
}
