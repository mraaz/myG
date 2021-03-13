import React from 'react';
import axios from 'axios';
import get from 'lodash.get';
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import { ignoreFunctions } from '../../../../common/render'
import { fetchProfileInfoAction, updateProfileInfoAction, updateProfileGameAction, commendUserAction, deleteExperienceAction, sendFriendRequestAction, cancelFriendRequestAction, followAction, unfollowAction } from '../../../../redux/actions/profileAction';
import Banner from '../Banner';
import ProfileInfo from '../Info';
import Sponsors from '../Sponsors';
import GameExperiences from '../GameExperiences';
import GamerSuggestions from '../GamerSuggestions';
import MyPosts from '../../MyPosts'
import PostsFromUser from '../../PostsFromUser'
import EditGameExperience from '../GameExperiences/edit';

export class Profile extends React.Component {
  constructor(){
    super()
    this.contentAreaRef = React.createRef()
    window.addEventListener('scroll', this.handleScroll, true)
    this.lastScrollY = 0
  }
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  componentDidMount() {
    if (!this.props.onboarding) document.title = `myG - ${this.props.alias}`;
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

  handleScroll = () => {
    this.lastScrollY = window.scrollY
    let offsetWidth = 0
    if (this.contentAreaRef.current && this.contentAreaRef.current.offsetWidth) {
      offsetWidth = this.contentAreaRef.current.offsetWidth ? this.contentAreaRef.current.offsetWidth : 0
    }
    window.requestAnimationFrame(() => {
      if (this.lastScrollY > 200 && this.contentAreaRef.current && this.contentAreaRef.current.style) {
        document.getElementById('main-sidebar').style.position = 'fixed'
        // Required padding to prevent infinite loop of styling

        const w = document.getElementById('main-sidebar').offsetWidth - 80
        if (window.innerWidth > 768) {
          this.contentAreaRef.current.style.paddingTop = '170px'
          // document.getElementById('content-container').style.marginLeft = '80px'
          document.getElementById('content-container').style.paddingLeft = '80px'
          this.contentAreaRef.current.style.paddingLeft = `${w}px`
        }
        // Exit early to make this less confusing
        return
      }

      if (this.contentAreaRef.current) {
        this.contentAreaRef.current.removeAttribute('style')
      }
      document.getElementById('main-sidebar').removeAttribute('style')
      document.getElementById('content-container').removeAttribute('style')
    })
  }

  render() {
    if (this.props.profile.error) return <Redirect push to={`/profile/${this.props.userAlias}`} />;
    if (!this.props.foundProfile || this.props.profile.loading) return null;
    const profileSponsors = this.props.profile.sponsors || [];
    const sponsorsPositions = [{ id: 'empty-1' }];
    sponsorsPositions.push({ id: this.props.level >= 5 ? 'empty-2' : 'empty-locked-2' });
    const sponsorsIndexes = this.props.profile.isSelf ? sponsorsPositions : null;
    const sponsors = sponsorsIndexes ? sponsorsIndexes.map((sponsor, index) => profileSponsors[index] || sponsor) : profileSponsors;

    if (this.props.onboarding) {
      if (this.props.step === 1) {
        return(
          <div id="profile" ref={this.contentAreaRef}>
            <EditGameExperience
              onboarding={this.props.onboarding}
              alias={this.props.alias}
              profile={this.props.profile}
              isSelf={this.props.profile.isSelf}
              updateGame={this.props.updateGame}
              setOnboardingStep={this.props.setOnboardingStep}
              skipOnboarding={this.props.skipOnboarding}
            />
          </div>
        );
      }
      if (this.props.step === 3) {
        return(
          <div id="profile" ref={this.contentAreaRef}>
            <GamerSuggestions
              onboarding={this.props.onboarding}
              noTitle profile={this.props.profile}
              sendFriendRequest={this.props.sendFriendRequest}
              cancelFriendRequest={this.props.cancelFriendRequest}
              follow={this.props.follow}
              unfollow={this.props.unfollow}
              setOnboardingStep={this.props.setOnboardingStep}
              skipOnboarding={this.props.skipOnboarding}
            />
          </div>
        );
      }
      return null;
    }
    return(
      <div id="profile" ref={this.contentAreaRef}>
        <Banner profile={this.props.profile} updateProfile={this.props.updateProfile} />
        <ProfileInfo alias={this.props.alias} profile={this.props.profile} updateProfile={this.props.updateProfile} />
        {/*  {!!sponsors.length && <Sponsors isSelf={this.props.profile.isSelf} alias={this.props.alias} profile={this.props.profile} sponsors={sponsors} refetchSponsors={() => this.props.fetchProfile(this.props.alias)} />} */}
        <GameExperiences userId={this.props.userId} selectedGame={this.props.gameId} commendUser={this.commendUser} deleteExperience={this.deleteExperience} alias={this.props.alias} profile={this.props.profile} updateGame={this.props.updateGame} />
        {!!this.props.profile.isSelf && <GamerSuggestions profile={this.props.profile} sendFriendRequest={this.props.sendFriendRequest} cancelFriendRequest={this.props.cancelFriendRequest} follow={this.props.follow} unfollow={this.props.unfollow}  /> }
        {!!this.props.profile.isSelf && <MyPosts initialData={this.props.initialData} /> }
        {!this.props.profile.isSelf && <PostsFromUser initialData={this.props.initialData} profile={this.props.profile} /> }
      </div>
    );
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}

function mapStateToProps(state, props) {
  const profile = get(state, `profile.profiles[${props.alias}]`, {});
  return {
    userId: state.user.userId,
    level: (state.user.userTransactionStates || {}).user_level,
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
    sendFriendRequest: (alias, id) => dispatch(sendFriendRequestAction(alias, id)),
    cancelFriendRequest: (alias, id) => dispatch(cancelFriendRequestAction(alias, id)),
    follow: (alias, id) => dispatch(followAction(alias, id)),
    unfollow: (alias, id) => dispatch(unfollowAction(alias, id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
