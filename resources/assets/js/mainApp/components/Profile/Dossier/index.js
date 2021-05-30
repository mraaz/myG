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
    this.setState({ tab: !this.props.isSelf ? 'social' : this.props.tab });
  }

  render() {
    return(
      <div id="profile-dossier">
          <div className="container zIndex">
            <div className="tabs">
              {this.props.isSelf && this.state.tab !== 'social-view' && (
                <div className={`tab clickable ${this.state.tab === 'info' ? 'selected' : 'unselected'}`}
                onClick={() => this.setState({ tab: 'info' })}
                >
                  <p className="title">Information</p>
                </div>
              )}
              <div className={`tab clickable ${this.state.tab === 'social' || this.state.tab === 'social-view' ? 'selected' : 'unselected'}`}
                onClick={() => this.setState({ tab: 'social' })}
              >
                <p className="title">Social Hub</p>
                {this.state.tab === 'social-view' && this.props.isSelf &&  (
                  <div
                    className='share-button clickable'
                    style={{ right: '90px' }}
                    onClick={() => this.setState({ tab: 'social' })}>
                    Edit
                  </div>
                )}
              </div>
            </div>
            {this.state.tab === 'info' && <DossierInfo onClose={this.props.onClose} isSelf={this.props.isSelf} profile={this.props.profile} updateProfile={this.props.updateProfile} />}
            {(this.state.tab === 'social' || this.state.tab === 'social-view') && <DossierSocialHub onClose={this.props.onClose} isSelf={this.state.tab !== 'social-view' && this.props.isSelf} profile={this.props.profile} updateProfile={this.props.updateProfile} />}
        </div>
      </div>
    );
  }
}

