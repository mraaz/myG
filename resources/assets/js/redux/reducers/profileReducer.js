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

    case 'UPDATE_PROFILE_INFO_FULFILLED': {
      logger.log('PROFILE', `Redux -> Updated profile info for ${action.meta.alias}: `, action.payload)
      const alias = action.meta.alias
      const profiles = addProfile(state, alias)
      profiles[alias].set(get(action, 'payload.profile'))
      profiles[alias].set({ error: get(action, 'payload.error') })
      return {
        ...state,
        profiles,
      }
    }

    case 'SEND_FRIEND_REQUEST_FULFILLED': {
      logger.log('PROFILE', `Redux -> Sent friend request for ${action.meta.alias}`)
      const alias = action.meta.alias
      const profiles = addProfile(state, alias)
      profiles[alias].set({ hasSentFriendRequest: true })
      return {
        ...state,
        profiles,
      }
    }

    case 'CONFIRM_FRIEND_REQUEST_FULFILLED': {
      logger.log('PROFILE', `Redux -> Confirm friend request for ${action.meta.alias}`)
      const alias = action.meta.alias
      const profiles = addProfile(state, alias)
      profiles[alias].set({ isFriend: true, hasSentFriendRequest: false })
      return {
        ...state,
        profiles,
      }
    }


    case 'UNFRIEND_FULFILLED': {
      logger.log('PROFILE', `Redux -> Unfriended ${action.meta.alias}`)
      const alias = action.meta.alias
      const profiles = addProfile(state, alias)
      profiles[alias].set({ isFriend: false, hasSentFriendRequest: false })
      return {
        ...state,
        profiles,
      }
    }

    case 'FOLLOW_FULFILLED': {
      logger.log('PROFILE', `Redux -> Followed ${action.meta.alias}`)
      const alias = action.meta.alias
      const profiles = addProfile(state, alias)
      profiles[alias].set({ isFollower: true })
      return {
        ...state,
        profiles,
      }
    }

    case 'UNFOLLOW_FULFILLED': {
      logger.log('PROFILE', `Redux -> Unfollowed ${action.meta.alias}`)
      const alias = action.meta.alias
      const profiles = addProfile(state, alias)
      profiles[alias].set({ isFollower: false })
      return {
        ...state,
        profiles,
      }
    }

    case 'UPLOAD_PROFILE_IMAGE_FULFILLED': {
      logger.log('PROFILE', `Redux -> Updated profile image for ${action.meta.alias}: `, action.meta.image)
      const alias = action.meta.alias
      const image = action.meta.image
      const profiles = addProfile(state, alias)
      profiles[alias].set({ image })
      return {
        ...state,
        profiles,
      }
    }

    case 'UPLOAD_PROFILE_BACKGROUND_FULFILLED': {
      logger.log('PROFILE', `Redux -> Updated profile background for ${action.meta.alias}: `, action.meta.background)
      const alias = action.meta.alias
      const background = action.meta.background
      const profiles = addProfile(state, alias)
      profiles[alias].set({ background })
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
