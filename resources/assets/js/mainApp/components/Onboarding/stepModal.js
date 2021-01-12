import React from 'react'
import { ignoreFunctions } from '../../../common/render'

export default class OnboardingStepModal extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  getLabelText = () => {
    if (this.props.step === 0) return 'Start adding the game you most play'
    if (this.props.step === 2) return 'Now, add some friends to start to connect'
    if (this.props.step === 4) {
      return (
        <span className="text">
          <p>You are ready to go!</p>
          <p>Try to find some of your</p>
          <a href='/find-gamers/search' className='link clickable' onClick={() => this.props.setOnboardingStep(5)}>
            Friends
          </a>
          <a href='/scheduledGames' className='link clickable' onClick={() => this.props.setOnboardingStep(5)}>
            Matches
          </a>
          and
          <a href='/?at=communities' className='link clickable' onClick={() => this.props.setOnboardingStep(5)}>
            Communities
          </a>
          <p>This will help you to integrate!</p>
          <p />
          <p>May the force be with you!</p>
        </span>
      )
    }
  }

  getOptions = () => {
    if (this.props.step === 0) {
      return (
        <React.Fragment>
          <div className='option clickable' onClick={this.props.skipOnboarding}>Skip</div>
          <div className='option clickable' onClick={() => this.props.setOnboardingStep(1)}>Next 1/2</div>
        </React.Fragment>
      )
    }
    if (this.props.step === 2) {
      return (
        <React.Fragment>
          <div className='option clickable' onClick={this.props.skipOnboarding}>Skip</div>
          <div className='option clickable' onClick={() => this.props.setOnboardingStep(3)}>Next 2/2</div>
        </React.Fragment>
      )
    }
    if (this.props.step === 4) {
      return (
        <React.Fragment>
          <div className='option clickable' onClick={() => {
            this.props.setOnboardingStep(5);
            window.router.push(`/`);
          }}>Finish</div>
        </React.Fragment>
      )
    }
  }

  render() {
    if (![0, 2, 4].includes(this.props.step)) return null;
    return (
      <div className='onboarding-step-modal'>
        <div className='image' style={{ backgroundImage: 'url(https://myg.gg/platform_images/Dashboard/logo.svg)' }} />
        <span className='label'>{this.getLabelText()}</span>
        <div className='options'>{this.getOptions()}</div>
      </div>
    )
  }
}
