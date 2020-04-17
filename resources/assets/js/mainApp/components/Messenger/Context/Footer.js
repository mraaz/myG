
import React from "react";

export default class Footer extends React.PureComponent {

  state = {
    changingStatus: false,
  }

  setStatus = (status) => {
    this.props.updateStatus(status, true);
    this.setState({ changingStatus: false });
  }

  renderStatusChanger() {
    if (!this.state.changingStatus) return;
    return (
      <div className="messenger-settings-status">
        <p className="messenger-settings-status-indicator messenger-settings-status-option clickable messenger-footer-status-online"
          onMouseDown={() => this.setStatus('online')}
        >online</p>
        <p className="messenger-settings-status-indicator messenger-settings-status-option clickable messenger-footer-status-playing"
          onMouseDown={() => this.setStatus('playing')}
        >playing</p>
        <p className="messenger-settings-status-indicator messenger-settings-status-option clickable messenger-footer-status-afk"
          onMouseDown={() => this.setStatus('afk')}
        >afk</p>
        <p className="messenger-settings-status-indicator messenger-settings-status-option clickable messenger-footer-status-offline"
          onMouseDown={() => this.setStatus('offline')}
        >invisible</p>
      </div>
    );
  }

  render() {
    return (
      <div className={`messenger-footer-container`}>
        <div className="messenger-footer">
          <div className="messenger-footer-icon-container">
            <div
              className="messenger-footer-icon"
              style={{ backgroundImage: `url('${this.props.profileImage}')` }}
            />
            <div
              tabIndex={0}
              className={`messenger-footer-status-indicator messenger-footer-status-${this.props.status} clickable`}
              onClick={() => this.setState(previous => ({ changingStatus: !previous.changingStatus }))}
              onBlur={() => setTimeout(() => this.setState({ changingStatus: false }), 100)}
            >
              {this.props.status === 'offline' ? 'invisible' : this.props.status}
            </div>
            <div className="messenger-settings-status-container">
              {this.renderStatusChanger()}
            </div>
          </div>
          <div className="messenger-footer-search-bar">
            <input
              className="messenger-settings-search-field"
              type="text"
              placeholder="Search"
              value={this.props.search}
              onChange={event => this.props.onSearch(event.target.value)}
            />
            <div className="messenger-settings-search-button"
              style={{ backgroundImage: `url(/assets/svg/ic_messenger_search.svg)` }}
            />
          </div>
          <div
            className="messenger-footer-settings-button clickable"
            style={{ backgroundImage: `url(/assets/svg/ic_messenger_settings.svg)` }}
            onClick={this.props.onSettingsClicked}
          ></div>
        </div>
      </div>
    );
  }

}