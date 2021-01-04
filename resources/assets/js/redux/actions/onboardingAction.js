import { getOnboardingStep, setOnboardingStep } from '../../integration/http/onboarding'

export function getOnboardingStepAction() {
  return {
    type: 'GET_ONBOARDING_STEP',
    payload: getOnboardingStep(),
  }
}

export function setOnboardingStepAction(step) {
  return {
    type: 'SET_ONBOARDING_STEP',
    payload: setOnboardingStep(step),
  }
}
