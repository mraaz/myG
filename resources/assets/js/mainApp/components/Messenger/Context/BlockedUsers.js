
import React from "react";

export default class BlockedUsers extends React.PureComponent {

  unblockUser = (user) => {
    this.props.unblockUser(user.userId);
  }

  renderBlockedUser = (user) => {
    return (
      <div key={user.userId} className="messenger-settings-blocked-users-row">
        {user.alias}
        <div className="messenger-settings-blocked-user-button clickable" onClick={() => this.unblockUser(user)}>
          unblock
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="messenger-settings-encryption-container">
        <p className="messenger-settings-encryption-title">Blocked Gamers</p>
        {!this.props.blockedUsers.length && (
          <p className="messenger-settings-encryption-subtitle">
            There is no one on this list yet.
          </p>
        )}
        <div className="messenger-settings-blocked-users-list">
          {this.props.blockedUsers.map(this.renderBlockedUser)}
        </div>
      </div>
    );
  }

}