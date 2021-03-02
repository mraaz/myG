import React from 'react'
import { ignoreFunctions } from '../../../common/render'

export default class OnboardingStepModal extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  getLabelText = () => {
    if (this.props.step === 0) return "Welcome to myG - The Gamer's Platform, lets get into it!"
    if (this.props.step === 2) return "Gamer's are social creatures, let's find some friends!"
    if (this.props.step === 4) {
      return (
        <span className='text'>
          <p>You are ready to go!</p>
          <p>Try to find some of your</p>
          <a href='/find-gamers/search' className='link clickable' onClick={() => this.props.setOnboardingStep(5)}>
            Friends,
          </a>
          <a href='/scheduledGames' className='link clickable' onClick={() => this.props.setOnboardingStep(5)}>
            Jump in to Matches
          </a>
          and
          <a href='/?at=communities' className='link clickable' onClick={() => this.props.setOnboardingStep(5)}>
            Join Communities
          </a>
          <p>Hint: Check out the Daily</p>
          <p />
          <p>GLHF</p>
        </span>
      )
    }
  }

  getOptions = () => {
    if (this.props.step === 0) {
      return (
        <React.Fragment>
          <div className='option clickable' onClick={this.props.skipOnboarding}>
            Skip
          </div>
          <div className='option clickable' onClick={() => this.props.setOnboardingStep(1)}>
            Next 1/2
          </div>
        </React.Fragment>
      )
    }
    if (this.props.step === 2) {
      return (
        <React.Fragment>
          <div className='option clickable' onClick={this.props.skipOnboarding}>
            Skip
          </div>
          <div className='option clickable' onClick={() => this.props.setOnboardingStep(3)}>
            Next 2/2
          </div>
        </React.Fragment>
      )
    }
    if (this.props.step === 4) {
      return (
        <React.Fragment>
          <div
            className='option clickable'
            onClick={() => {
              this.props.setOnboardingStep(5)
              window.router.push(`/`)
            }}>
            Finish
          </div>
        </React.Fragment>
      )
    }
  }

  render() {
    if (![0, 2, 4].includes(this.props.step)) return null
    return (
      <div className='onboarding-step-modal'>
        <div className='image' style={{ backgroundImage: 'url(https://cdn.myG.gg/platform_images/Dashboard/logo.svg)' }} />
        <span className='label'>{this.getLabelText()}</span>
        <div className='options'>{this.getOptions()}</div>
      </div>
    )
  }
}
