import get from 'lodash.get'
import logger from '../../common/logger'
import ProfileSchema from '../schema/profile'

const initialState = {
  profiles: {},
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'REACT_ERROR':
      return initialState

    case 'FETCH_PROFILE_INFO_PENDING': {
      const alias = action.meta.alias
      const profiles = addProfile(state, alias)
      profiles[alias].set({ loading: true })
      return {
        ...state,
        profiles,
      }
    }

    case 'FETCH_PROFILE_INFO_FULFILLED': {
      logger.log('PROFILE', `Redux -> Fetched profile info for ${action.meta.alias}: `, action.payload)
      const alias = action.meta.alias
      const profiles = addProfile(state, alias)
      profiles[alias].set(get(action, 'payload.profile'))
      profiles[alias].set({ error: get(action, 'payload.error') })
      return {
        ...state,
        profiles,
      }
    }

    case 'FETCH_PROFILE_INFO_REJECTED': {
      logger.log('PROFILE', `Redux -> Failed to fetch profile info for ${action.meta.alias}: `, action.payload)
      const error = get(action, 'payload.error')
      const alias = action.meta.alias
      const profiles = addProfile(state, alias)
      profiles[alias].set({ error: error || action.payload })
      return {
        ...state,
        profiles,
      }
    }

    default:
      return state
  }
}

function addProfile(state, alias) {
  const profiles = JSON.parse(JSON.stringify(state.profiles))
  if (!profiles[alias]) profiles[alias] = new ProfileSchema()
  else profiles[alias] = new ProfileSchema(profiles[alias])
  return profiles
}
