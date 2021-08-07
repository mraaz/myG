import React from 'react'
import { ignoreFunctions } from '../../../common/render'

export default class OnboardingStepModal extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  getLabelText = () => {
    if (this.props.step === 0) return "Welcome to myG - The Gamer's Platform, lets get into it!"
    if (this.props.step === 2) return "Gamer's are social creatures, let's find some friends/groups to follow!"
    if (this.props.step === 4) return "Nice, let's find some friends to connect with!"
    if (this.props.step === 5) {
      return (
        <span className='text'>
          <p>You are ready to go!</p>
          <p>Try to find some of your</p>
          <a href='/find-gamers/search' className='link clickable' onClick={() => this.props.setOnboardingStep(6)}>
            Friends,
          </a>
          <a href='/scheduledGames' className='link clickable' onClick={() => this.props.setOnboardingStep(6)}>
            Jump in to Matches
          </a>
          and
          <a href='/?at=communities' className='link clickable' onClick={() => this.props.setOnboardingStep(6)}>
            Join Communities
          </a>
          <p>
            <a href='/achievements/daily' className='link clickable' onClick={() => this.props.setOnboardingStep(6)}>
              Hint: Check out the Daily
            </a>
          </p>
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
          <div className='option clickable' onClick={this.props.skipOnboarding}>
            Skip
          </div>
          <div className='option clickable' onClick={() => this.props.setOnboardingStep(5)}>
            Next 2/2
          </div>
        </React.Fragment>
      )
    }
    if (this.props.step === 5) {
      return (
        <React.Fragment>
          <div
            className='option clickable'
            onClick={() => {
              this.props.setOnboardingStep(6)
              window.router.push(`/`)
            }}
          >
            Finish
          </div>
        </React.Fragment>
      )
    }
  }

  render() {
    if (![0, 2, 4, 5, 6].includes(this.props.step)) return null
    return (
      <div className='onboarding-step-modal'>
        <div className='image' style={{ backgroundImage: 'url(https://myG.gg/platform_images/Dashboard/logo.svg)' }} />
        <span className='label'>{this.getLabelText()}</span>
        <div className='options'>{this.getOptions()}</div>
      </div>
    )
  }
}
