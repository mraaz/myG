const initialState = {
  badges: [],
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'REACT_ERROR': return initialState

    case 'FETCH_BADGES_FULFILLED': {
      return {
        ...state,
        badges: action.payload.badges,
      }
    }

    default:
      return state
  }
}
