const initialState = {
  badges: [],
  redeemedBadges: 0,
  totalBadges: 50,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'REACT_ERROR': return initialState

    case 'FETCH_BADGES_FULFILLED': {
      return {
        ...state,
        badges: action.payload.badges,
        redeemedBadges: action.payload.redeemedTotal,
        totalBadges: action.payload.badgesTotal,
      }
    }

    case 'REDEEM_BADGE_FULFILLED': {
      return {
        ...state,
        badges: action.payload.badges,
        redeemedBadges: action.payload.redeemedTotal,
        totalBadges: action.payload.badgesTotal,
      }
    }

    default:
      return state
  }
}
