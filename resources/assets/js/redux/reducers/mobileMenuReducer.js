import logger from '../../common/logger'

const initialState = {
  mobileMenuIsActive: false,
  mobileMenuIsTop: true,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'REACT_ERROR': return initialState

    case 'SHOW_MOBILE_MENU': {
      logger.log('Mobile Menu', `Redux -> Show the mobile menu `, action.meta)
      return {
        ...state,
        mobileMenuIsActive: true,
      }
    }

    case 'CLOSE_MOBILE_MENU': {
      logger.log('Mobile Menu', `Redux -> Hide the mobile menu `, action.meta)
      return {
        ...state,
        mobileMenuIsActive: false,
      }
    }

    case 'TOP_OF_SCREEN_MOBILE_MENU': {
      logger.log('Mobile Menu', `Redux -> Indicates if ScrollY is position 0 `, action.payload, action.meta)
      return {
        ...state,
        mobileMenuIsTop: action.payload,
      }
    }

    default:
      return state
  }
}
