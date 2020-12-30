import React from 'react'
import Recents from './Recents'
import Contacts from './Contacts'
import Groups from './Groups'
import { getAssetUrl } from '../../../../common/assets'
import { ignoreFunctions } from '../../../../common/render'

export default class General extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    dividerExpanded: {
      recents: true,
      friends: false,
      groups: false,
    },
  }

  renderRecents = () => {
    return (
      <Recents
        userId={this.props.userId}
        privateKey={this.props.privateKey}
        disconnected={this.props.disconnected}
        openChat={this.props.openChat}
        createChat={this.props.createChat}
        expanded={this.state.dividerExpanded.recents}
        onExpand={(expanded) => this.setState({ dividerExpanded: { recents: !expanded, friends: false, groups: false } })}
      />
    )
  }

  renderContacts = () => {
    return (
      <Contacts
        userId={this.props.userId}
        privateKey={this.props.privateKey}
        disconnected={this.props.disconnected}
        openChat={this.props.openChat}
        createChat={this.props.createChat}
        contactCount={this.props.contactCount}
        expanded={this.state.dividerExpanded.friends}
        onExpand={(expanded) => this.setState({ dividerExpanded: { recents: false, friends: !expanded, groups: false } })}
      />
    )
  }

  renderGroups = () => {
    return (
      <Groups
        userId={this.props.userId}
        privateKey={this.props.privateKey}
        disconnected={this.props.disconnected}
        openChat={this.props.openChat}
        createChat={this.props.createChat}
        expanded={this.state.dividerExpanded.groups}
        onExpand={(expanded) => this.setState({ dividerExpanded: { recents: false, friends: false, groups: !expanded } })}
      />
    )
  }

  render() {
    if (this.props.search) return null
    return (
      <div key={'general'} className='messenger-body-section' style={{ backgroundColor: '#40494C' }}>
        <div
          className='messenger-body-section-header clickable'
          style={{ backgroundColor: '#40494C' }}
          onClick={() => this.props.onExpand(this.props.expanded)}>
          <div className='messenger-body-game-section' style={{ backgroundColor: '#40494C' }}>
            <div
              className='messenger-game-icon'
              style={{
                backgroundImage: `url('https://myG.gg/platform_images/Dashboard/logo.svg')`,
                backgroundSize: 'inherit',
                backgroundColor: '#000',
              }}
            />
            <p className='messenger-body-section-header-name'>General</p>
          </div>
          <div className='messenger-body-section-header-info'>
            <div
              className='messenger-body-section-header-icon'
              style={{ backgroundImage: `url('${getAssetUrl(`ic_messenger_chevron_${this.props.expanded ? 'down' : 'right'}`)}')` }}
            />
          </div>
        </div>

        {this.props.expanded && (
          <div className='messenger-body-tab-content'>
            {this.renderRecents()}
            {this.renderContacts()}
            {this.renderGroups()}
          </div>
        )}
      </div>
    )
  }
}
