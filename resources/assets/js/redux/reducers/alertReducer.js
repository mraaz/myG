
export default function reducer(state = {
  show: false,
}, action) {
  switch (action.type) {

    case "ALERT": {
      return {
        ...state,
        show: action.payload,
      };
    }

    default: return state;

  }
}