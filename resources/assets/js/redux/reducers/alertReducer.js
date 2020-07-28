const initialState = {
  show: false,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'REACT_ERROR': return initialState

    case 'ALERT': {
      return {
        ...state,
        show: action.payload,
      }
    }

    default:
      return state
  }
}
