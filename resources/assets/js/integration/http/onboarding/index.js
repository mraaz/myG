import axios from 'axios';

export function getOnboardingStep() {
  return axios.get('/api/onboarding/').then(response => response.data);
}

export function setOnboardingStep(step) {
  return axios.put(`/api/onboarding/${step}`).then(response => response.data);
}
