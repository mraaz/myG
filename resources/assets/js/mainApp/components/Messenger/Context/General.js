
import React from "react";
import Contacts from './Contacts';
import Groups from './Groups';
import { STATUS_ENUM } from '../../../../common/status';
import { getAssetUrl } from "../../../../common/assets";

export default class General extends React.PureComponent {

  state = {
    dividerExpanded: {
      friends: true,
      groups: false,
    },
  }

  renderContacts = () => {
    return <Contacts
      userId={this.props.userId}
      privateKey={this.props.privateKey}
      contacts={this.props.contacts}
      search={this.props.search}
      disconnected={this.props.disconnected}
      openChat={this.props.openChat}
      createChat={this.props.createChat}
      expanded={this.state.dividerExpanded.friends}
      onExpand={(expanded) => this.setState({ dividerExpanded: { friends: !expanded, groups: false } })}
    />
  }

  renderGroups = () => {
    return <Groups
      userId={this.props.userId}
      privateKey={this.props.privateKey}
      contacts={this.props.contacts}
      groups={this.props.groups}
      search={this.props.search}
      disconnected={this.props.disconnected}
      openChat={this.props.openChat}
      createChat={this.props.createChat}
      expanded={this.state.dividerExpanded.groups}
      onExpand={(expanded) => this.setState({ dividerExpanded: { groups: !expanded, friends: false } })}
    />
  }

  render() {
    const color = '#40494C';
    const chevronType = this.props.expanded ? 'down' : 'right';
    const onlineCount = this.props.contacts.filter(contact => contact.status === STATUS_ENUM.ONLINE).length;
    const onlineInfo = `${onlineCount}/${this.props.contacts.length} online`;
    return (
      <div key={'general'} className="messenger-body-section" style={{ backgroundColor: color }}>

        <div className="messenger-body-section-header clickable" style={{ backgroundColor: color }}
          onClick={() => this.props.onExpand(this.props.expanded)}
        >
          <div className="messenger-body-game-section" style={{ backgroundColor: color }}>
            <div
              className="messenger-game-icon"
              style={{
                backgroundImage: `url('https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/logo.svg')`,
                backgroundSize: 'inherit',
                backgroundColor: '#000'
              }}
            />
            <p className="messenger-body-section-header-name">General</p>
          </div>
          <div className="messenger-body-section-header-info">
            <p className="messenger-body-section-online-count">{onlineInfo}</p>
            <div
              className="messenger-body-section-header-icon"
              style={{ backgroundImage: `url('${getAssetUrl(`ic_messenger_chevron_${chevronType}`)}')` }}
            />
          </div>
        </div>

        {this.props.expanded && (
          <div className="messenger-body-section-content">
            {this.renderContacts()}
            {this.renderGroups()}
          </div>
        )}

      </div >
    );
  }

}