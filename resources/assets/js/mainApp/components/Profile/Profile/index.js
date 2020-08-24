import React from 'react';
import get from 'lodash.get';
import { connect } from 'react-redux'
import { ignoreFunctions } from '../../../../common/render'
import { fetchProfileInfoAction, updateProfileInfoAction } from '../../../../redux/actions/profileAction';
import Banner from '../Banner';
import ProfileInfo from '../Info';

export class Profile extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  componentDidMount() {
    this.props.fetchProfile(this.props.alias);
  }

  render() {
    console.log('profile: ', this.props.profile);
    return(
      <div id="profile">
        <Banner profile={this.props.profile} />
        <ProfileInfo profile={this.props.profile} updateProfile={this.props.updateProfile} />
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const profile = get(state, `profile.profiles[${props.alias}]`, {});
  return {
    profile
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchProfile: (alias) => dispatch(fetchProfileInfoAction(alias)),
    updateProfile: (alias, updates) => dispatch(updateProfileInfoAction(alias, updates)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
