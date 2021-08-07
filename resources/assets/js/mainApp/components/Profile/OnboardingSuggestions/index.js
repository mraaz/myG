import React from 'react';
import GamerSuggestions from '../GamerSuggestions';
import FollowerSuggestions from '../FollowerSuggestions';

export default class OnboardingSuggestions extends React.Component {
  state = {
    seeingFriendSuggestions: false,
  }

  onSetOnboardingStep = (step) => {
    if (this.state.seeingFriendSuggestions) this.props.setOnboardingStep(step);
    else this.setState({ seeingFriendSuggestions: true });
  }

  renderFollowerSuggestions() {
    return (
      <div id="profile">
        <FollowerSuggestions
          onboarding={this.props.onboarding}
          noTitle profile={this.props.profile}
          sendFriendRequest={this.props.sendFriendRequest}
          cancelFriendRequest={this.props.cancelFriendRequest}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          setOnboardingStep={this.onSetOnboardingStep}
          skipOnboarding={this.props.skipOnboarding}
        />
      </div>
    );
  }

  renderGamerSuggestions() {
    return (
      <div id="profile">
        <GamerSuggestions
          onboarding={this.props.onboarding}
          noTitle profile={this.props.profile}
          sendFriendRequest={this.props.sendFriendRequest}
          cancelFriendRequest={this.props.cancelFriendRequest}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          setOnboardingStep={this.onSetOnboardingStep}
          skipOnboarding={this.props.skipOnboarding}
        />
      </div>
    );
  }

  render() {
    if (this.state.seeingFriendSuggestions) return this.renderGamerSuggestions();
    return this.renderFollowerSuggestions();
  }
}
