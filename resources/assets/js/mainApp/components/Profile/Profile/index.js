import React from 'react';
import get from 'lodash.get';
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import { ignoreFunctions } from '../../../../common/render'
import { fetchProfileInfoAction, updateProfileInfoAction, updateProfileGameAction, commendUserAction, deleteExperienceAction } from '../../../../redux/actions/profileAction';
import Banner from '../Banner';
import ProfileInfo from '../Info';
import GameExperiences from '../GameExperiences';
import GamerSuggestions from '../GamerSuggestions';
import MyPosts from '../../MyPosts'

export class Profile extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  componentDidMount() {
    document.title = `myG - Profile ${this.props.alias}`;
    this.props.fetchProfile(this.props.alias);
  }

  commendUser = (gameExperienceId) => {
    this.props.commendUser(this.props.alias, gameExperienceId);
  }

  deleteExperience = (gameExperienceId) => {
    this.props.deleteExperience(this.props.alias, gameExperienceId);
  }

  render() {
    if (this.props.profile.error) return <Redirect push to={`/profile/${this.props.userAlias}`} />;
    return(
      <div id="profile">
        <Banner profile={this.props.profile} updateProfile={this.props.updateProfile} />
        <ProfileInfo alias={this.props.alias} profile={this.props.profile} updateProfile={this.props.updateProfile} />
        <GameExperiences userId={this.props.userId} selectedGame={this.props.gameId} commendUser={this.commendUser} deleteExperience={this.deleteExperience} alias={this.props.alias} profile={this.props.profile} updateGame={this.props.updateGame} />
        <GamerSuggestions />
        <MyPosts initialData={this.props.initialData} />
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const profile = get(state, `profile.profiles[${props.alias}]`, {});
  return {
    userId: state.user.userId,
    profile,
    foundProfile: !!Object.keys(profile).length,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchProfile: (alias) => dispatch(fetchProfileInfoAction(alias)),
    updateProfile: (alias, updates) => dispatch(updateProfileInfoAction(alias, updates)),
    updateGame: (alias, updates) => dispatch(updateProfileGameAction(alias, updates)),
    commendUser: (alias, gameExperienceId) => dispatch(commendUserAction(alias, gameExperienceId)),
    deleteExperience: (alias, gameExperienceId) => dispatch(deleteExperienceAction(alias, gameExperienceId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
