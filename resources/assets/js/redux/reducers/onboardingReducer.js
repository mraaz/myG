import logger from '../../common/logger'

const initialState = {
  step: 6,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'REACT_ERROR':
      return initialState

    case 'GET_ONBOARDING_STEP_FULFILLED': {
      logger.log('ONBOARDING', `Redux -> Get Onboarding Step: `, action.payload, action.meta)
      return {
        ...state,
        step: action.payload.step,
      }
    }

    case 'SET_ONBOARDING_STEP_FULFILLED': {
      logger.log('ONBOARDING', `Redux -> Set Onboarding Step: `, action.payload, action.meta)
      return {
        ...state,
        step: action.payload.step,
      }
    }

    default:
      return state
  }
}
