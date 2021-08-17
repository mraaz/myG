import React from 'react';
import { connect } from 'react-redux'
import { ignoreFunctions } from '../../../common/render'
import { getOnboardingStepAction, setOnboardingStepAction } from '../../../redux/actions/onboardingAction';
import { showMessengerAlert } from '../../../common/alert';
import OnboardingStepModal from './stepModal';
import Profile from '../Profile/Profile';

export class Onboarding extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  componentDidMount() {
    this.props.getOnboardingStep();
  }

  skipOnboarding = () => {
    showMessengerAlert('Mate, are you sure?', () => {
      this.props.setOnboardingStep(6);
      window.router.push(`/profile/${this.props.alias}`);
    }, null, 'Make it so')
  }

  render() {
    if (this.props.step >= 6) return null;
    return(
      <div id="onboarding">
        <OnboardingStepModal step={this.props.step} setOnboardingStep={this.props.setOnboardingStep} skipOnboarding={this.skipOnboarding}  />
        <Profile alias={this.props.alias} onboarding={true} step={this.props.step} setOnboardingStep={this.props.setOnboardingStep} skipOnboarding={this.skipOnboarding} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    alias: state.user.alias,
    step: state.onboarding.step,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getOnboardingStep: () => dispatch(getOnboardingStepAction()),
    setOnboardingStep: (step) => dispatch(setOnboardingStepAction(step)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Onboarding)
