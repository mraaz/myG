import React from 'react';
import axios from 'axios';
import get from 'lodash.get';
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import { ignoreFunctions } from '../../../../common/render'
import { fetchProfileInfoAction, updateProfileInfoAction, updateProfileGameAction, commendUserAction, deleteExperienceAction } from '../../../../redux/actions/profileAction';
import Banner from '../Banner';
import ProfileInfo from '../Info';
import Sponsors from '../Sponsors';
import GameExperiences from '../GameExperiences';
import GamerSuggestions from '../GamerSuggestions';
import MyPosts from '../../MyPosts'
import PostsFromUser from '../../PostsFromUser'

export class Profile extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  componentDidMount() {
    document.title = `myG - ${this.props.alias}`;
    this.props.fetchProfile(this.props.alias);
  }

  componentDidUpdate(previous) {
    if (this.props.profile.profileId && !previous.profile.profileId) {
      this.registerConnection();
    }
  }

  registerConnection() {
    const { isSelf, isFriend, profileId } = this.props.profile;
    if (isSelf || isFriend || !profileId) return null;
    axios.get(`/api/connections/i_am_viewing_this_profile/${profileId}`);
  }

  commendUser = (gameExperienceId) => {
    this.props.commendUser(this.props.alias, gameExperienceId);
  }

  deleteExperience = (gameExperienceId) => {
    this.props.deleteExperience(this.props.alias, gameExperienceId);
  }

  render() {
    if (this.props.profile.error) return <Redirect push to={`/profile/${this.props.userAlias}`} />;
    if (!this.props.foundProfile || this.props.profile.loading) return null;
    const profileSponsors = this.props.profile.sponsors || [];
    const sponsorsIndexes = this.props.profile.isSelf ? [{ id: 'empty-1' }, { id: 'empty-2' }] : null;
    const sponsors = sponsorsIndexes ? sponsorsIndexes.map((sponsor, index) => profileSponsors[index] || sponsor) : profileSponsors;
    return(
      <div id="profile">
        <Banner profile={this.props.profile} updateProfile={this.props.updateProfile} />
        <ProfileInfo alias={this.props.alias} profile={this.props.profile} updateProfile={this.props.updateProfile} />
        {!!sponsors.length && <Sponsors alias={this.props.alias} profile={this.props.profile} sponsors={sponsors} refetchSponsors={() => this.props.fetchProfile(this.props.alias)} />}
        <GameExperiences userId={this.props.userId} selectedGame={this.props.gameId} commendUser={this.commendUser} deleteExperience={this.deleteExperience} alias={this.props.alias} profile={this.props.profile} updateGame={this.props.updateGame} />
        {!!this.props.profile.isSelf && <GamerSuggestions /> }
        {!!this.props.profile.isSelf && <MyPosts initialData={this.props.initialData} /> }
        {!this.props.profile.isSelf && <PostsFromUser initialData={this.props.initialData} profile={this.props.profile} /> }
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
