import logger from '../../common/logger'

const initialState = {
  showMobileMenu: false,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'REACT_ERROR': return initialState

    case 'SHOW_MENU': {
      logger.log('Mobile Menu', `Redux -> Force show/hide mobile menu `, action.payload, action.meta)
      return {
        ...state,
        showMobileMenu: action.payload,
      }
    }

    default:
      return state
  }
}