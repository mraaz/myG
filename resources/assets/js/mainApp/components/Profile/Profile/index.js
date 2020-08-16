import React from 'react';
import get from 'lodash.get';
import { connect } from 'react-redux'
import { ignoreFunctions } from '../../../../common/render'
import { fetchProfileInfoAction } from '../../../../redux/actions/profileAction';
import Banner from '../Banner';

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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
