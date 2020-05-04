
import React from "react";
import Game from './Game';
import { STATUS_ENUM, compareStatus } from '../../../../common/status';

export default class Games extends React.PureComponent {

  state = {
    expandedGame: null,
  }

  compareLastMessages = (f1, f2) => {
    const m1 = (f1.chat.messages || [])[(f1.chat.messages || []).length - 1] || { createdAt: 0 };
    const m2 = (f2.chat.messages || [])[(f2.chat.messages || []).length - 1] || { createdAt: 0 };
    return new Date(m2.createdAt) - new Date(m1.createdAt);
  }

  renderGame(id, name, icon, color, onlineInfo, contacts, groups, expanded) {
    const chevronType = (contacts.length && expanded) ? 'down' : 'right';
    return (
      <div key={id} className="messenger-body-section" style={{ backgroundColor: color }}>
        <div className="messenger-body-section-header clickable" style={{ backgroundColor: color }}
          onClick={() => this.setState(previous => ({ expandedGame: previous.expandedGame === name ? null : name }),
            () => this.props.onExpand(this.state.expandedGame ? false : this.props.expanded))
          }
        >
          <div className="messenger-body-game-section" style={{ backgroundColor: color }}>
            <div
              className="messenger-game-icon"
              style={{ backgroundImage: `url('${icon}')` }}
            />
            <p className="messenger-body-section-header-name">{name}</p>
          </div>
          <div className="messenger-body-section-header-info">
            <p className="messenger-body-section-online-count">{onlineInfo}</p>
            <div
              className="messenger-body-section-header-icon"
              style={{ backgroundImage: `url('https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Chat/ic_messenger_chevron_${chevronType}.svg')` }}
            />
          </div>
        </div>
        {this.props.expanded && expanded && <Game
          userId={this.props.userId}
          privateKey={this.props.privateKey}
          contacts={contacts}
          groups={groups}
          search={this.props.search}
          disconnected={this.props.disconnected}
          openChat={this.props.openChat}
          createChat={this.props.createChat}
        />}
      </div >
    );
  }

  render() {
    if (!this.props.games.length) return null;

    const sections = [];

    let games = this.props.games.slice(0)
      .sort((g1, g2) => g1.name.localeCompare(g2.name))
      .sort((g1, g2) => g1.isFavorite === g2.isFavorite ? 0 : g1.isFavorite ? -1 : 1);

    const groups = this.props.groups;
    const contacts = this.props.contacts.slice(0)
      .sort((f1, f2) => compareStatus(f1.status, f2.status))
      .sort((f1, f2) => this.compareLastMessages(f1, f2));

    if (this.props.search.trim()) {
      const search = (name) => name.toLowerCase().includes(this.props.search.toLowerCase());
      games = games.slice(0)
        .filter(game => search(game.name))
        .slice(0, 10);
    }

    const colors = ['#EB333D', '#AF093F', '#A82DB1', '#162B84', '#3E57C1', '#029EBC', '#118137', '#05BC45', '#CE9003', '#8D7514'];
    games.slice(0, 10).forEach((game, index) => {
      const gameContacts = contacts.filter(contact => contact.games.find(contactGame => contactGame.gameId === game.gameId));
      const gameGroups = groups.filter(groups => groups.gameId === game.gameId);
      const onlineCount = gameContacts.filter(contact => contact.status === STATUS_ENUM.ONLINE).length;
      const onlineInfo = `${onlineCount}/${gameContacts.length} online`;
      sections.push({
        id: game.gameId,
        name: game.name,
        icon: game.icon,
        color: colors[index],
        contacts: gameContacts,
        groups: gameGroups,
        onlineInfo,
      })
    });

    return (
      <div className="messenger-body-section">
        {sections.map(section => this.renderGame(section.id, section.name, section.icon, section.color, section.onlineInfo, section.contacts, section.groups, this.state.expandedGame === section.name))}
      </div>
    );
  }

}