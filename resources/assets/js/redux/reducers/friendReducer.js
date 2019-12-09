

export default function reducer(state = {
  friends: [],
}, action) {
  switch (action.type) {

      case "FETCH_FRIENDS_FULFILLED": {
          console.log(`Redux -> Fetched Friends: `, action.payload);
          const friends = action.payload.friends;
          return {
              ...state,
              friends,
          };
      }

      default: return state;

  }
}