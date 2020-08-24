import React from 'react';
import { ignoreFunctions } from '../../../../common/render'
import DossierInfo from './info';
import DossierSocialHub from './social-hub';

export default class Dossier extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    tab: 'info',
  }

  componentDidMount() {
    this.setState({ tab: this.props.tab });
  }

  render() {
    return(
      <div id="profile-dossier">
          <div className="container">
            <div className="tabs">
              <div className={`tab clickable ${this.state.tab === 'info' ? 'selected' : 'unselected'}`}
                onClick={() => this.setState({ tab: 'info' })}
              >
                <p className="title">Information</p>
              </div>
              <div className={`tab clickable ${this.state.tab === 'social' ? 'selected' : 'unselected'}`}
                onClick={() => this.setState({ tab: 'social' })}
              >
                <p className="title">Social Hub</p>
              </div>
            </div>
            {this.state.tab === 'info' && <DossierInfo onClose={this.props.onClose} profile={this.props.profile} updateProfile={this.props.updateProfile} />}
            {this.state.tab === 'social' && <DossierSocialHub onClose={this.props.onClose} profile={this.props.profile} updateProfile={this.props.updateProfile} />}
        </div>
      </div>
    );
  }
}

