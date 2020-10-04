import React from 'react';
import get from 'lodash.get';
import { getAssetUrl } from '../../../../common/assets';
import { ignoreFunctions } from '../../../../common/render'
import Dossier from '../Dossier';

export default class ProfileInfo extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    editing: false,
  }

  static getDerivedStateFromProps(props) {
    const isFriend = get(props, 'profile.isFriend') || false;
    const isSelf = get(props, 'profile.isSelf') || false;
    const visibilityEmail = get(props, 'profile.visibilityEmail') || 'secret'
    const canShowEmail = visibilityEmail === 'public' || (visibilityEmail === 'friends' && isFriend);
    const country = get(props, 'profile.country') || 'N/A';
    const team = get(props, 'profile.team') || 'N/A';
    const email = canShowEmail ? get(props, 'profile.email') || 'N/A' : 'Hidden';
    const relationship = get(props, 'profile.relationship') || 'N/A';
    const languagesArray = get(props, 'profile.languages') || [];
    const languages = languagesArray.length ? languagesArray.join(', ') : 'N/A';
    const mostPlayedGamesArray = get(props, 'profile.mostPlayedGames') || [];
    const mostPlayedGames = mostPlayedGamesArray.length ? mostPlayedGamesArray.join(', ') : 'N/A';
    return { country, mostPlayedGames, team, email, relationship, languages, isSelf };
  }

  renderPod = (title, value, alignment) => {
    return(
      <div className={`pod ${alignment}`}>
        {this.state.hovering === title && value.length > 25 && <div className="hover-value">{value}</div>}
        <p className="title">{title}</p>
        <p className="value" 
          onMouseOver={() => this.setState({ hovering: title })}
          onMouseLeave={() => this.setState({ hovering: null })}
        >
          {value.slice(0, 25)}{value.length > 25 ? '...' : ''}
        </p>
      </div>
    )
  }

  renderEditButton = () => {
    if (!this.state.isSelf) return null;
    return(
      <div className="settings-button-container">
        <div
          className='settings-button clickable'
          style={{ backgroundImage: `url(${getAssetUrl('ic_profile_settings')})` }}
          onClick={() => this.setState((previous) => ({ editing: !previous.editing }))}
        />
      </div>
    );
  }

  renderEditInfo = () => {
    if (!this.state.isSelf || !this.state.editing) return null;
    return <Dossier profile={this.props.profile} isSelf={this.state.isSelf} updateProfile={this.props.updateProfile} tab={'info'} onClose={() => this.setState({ editing: false })} />;
  }

  render() {
    return(
      <div id="profile-info">
        <div className="row">
          <div className="column left">
            {this.renderPod('Country', this.state.country, 'left')}
            {this.renderPod('Most played games', this.state.mostPlayedGames, 'left')}
          </div>
          <div className="column center">
            {this.renderPod('Professional Team', this.state.team, 'center')}
            {this.renderPod('Contact', this.state.email, 'center')}
          </div>
          <div className="column right">
            {this.renderPod('Languages', this.state.languages, 'right')}
            {this.renderPod('Relationship status', this.state.relationship, 'right')}
          </div>
        </div>
        {this.renderEditButton()}
        {this.renderEditInfo()}
      </div>
    );
  }
}

