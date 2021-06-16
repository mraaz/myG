import axios from 'axios'
import { convertToRaw } from 'draft-js'
import { extractHashtagsWithIndices } from '@draft-js-plugins/hashtag'

/**
 * Searches myG for users based on user inputted text, and a total return size.
 * This function does nothing to handle debounce timers, or any other query optimizations. Thus if this function is
 * spammed, the API is also.
 * @param {string} value The query text to search against.
 * @param {number} size The max query size, from position 0.
 * @returns {User[]} An array of Users best matching the query string.
 */
export const performUserSearch = (value, size) => {
  console.log('doing a search')
  return axios.get(`/api/search/gamers?query=${value}&from=${0}&size=${size}`).then((res) =>
    res.data.gamers.map((player) => ({
      name: player.alias,
      link: `/profile/${player.alias}`,
      avatar: player.image
    }))
  )
}

/**
 * Debounce Function, used to delay the activation of a function by a specified amount, or until cleared for a new request.
 * Does not handle throwing away out dated requests.
 * @param {*} callback The callback function to be delayed.
 * @param {*} delay The amount of time to delay the function by, in milliseconds.
 */
export const debounceFunction = (callback, delay) => {
  let timer
  return function () {
    let self = this
    let args = arguments
    clearTimeout(timer)
    timer = setTimeout(() => {
      callback.apply(self, args)
    }, delay)
  }
}

export const searchAndSave = async (value, maxSuggestions, callback) => {
  const suggestions = await performUserSearch(value, maxSuggestions)
  callback(value, suggestions)
}

export const extractPostIntoJson = async (editorState, preview_files, visibility, video, user_id, group_id) => {
  const content = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
  console.log('converted to raw JSON::', content)

  // Get Hashtags
  const tags = extractHashtagsWithIndices(content).map((tag) => tag.hashtag)
  const existingTagsPayload = await axios.post(`/api/HashTags/getMatchingHashTags`, {
    content: tags
  })
  const existingTags = existingTagsPayload.data.allMatchingTags
  const hashtags = createHashtagList(existingTags, tags)

  // Get Media URLs and AWS Keys
  let media_url = []
  let aws_key_id = []

  if (preview_files.length > 0) {
    for (let i = 0; i < preview_files.length; i++) {
      media_url = [...media_url, preview_files[i].src]
      // media_url.push(preview_files[i].src)
      aws_key_id = [...aws_key_id, preview_files[i].id]
      // aws_key_id.push(preview_files[i].id)
    }
  }

  return {
    content,
    hash_tags: JSON.stringify(hashtags),
    type: 'text',
    visibility,
    video,
    user_id,
    group_id,
    media_url: media_url.length > 0 ? JSON.stringify(media_url) : '',
    aws_key_id: aws_key_id.length > 0 ? aws_key_id : ''
  }
}

/**
 * Private Functions
 */

const createHashtagList = (existingTags, requestedTags) => {
  const existingTagNames = existingTags.map((tagObject) => tagObject.content)
  return requestedTags.map((tag) => {
    if (existingTagNames.includes(tag)) {
      // Use of find is safe as list confirmed to contain the tag
      return {
        value: tag,
        hash_tag_id: existingTags.find((tagObject) => tagObject.content === tag).id
      }
    }

    return {
      value: tag,
      hash_tag_id: null
    }
  })
}

export const isJson = (str) => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

/**
 * Object Type Descriptions
 */

/**
 * @typedef {Object} User
 * @property {string} name The name of the user.
 * @property {number} link The relative URL to that users profile page.
 * @property {number} avatar A link to the users profile image.
 */
