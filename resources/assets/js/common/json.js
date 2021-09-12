/**
 * Tests a string to see if it is valid JSON, returning true if it is, otherwise false.
 *
 * @param {string} str The potential JSON
 * @returns {boolean} true if `potentialJsonString` is valid JSON, otherwise false
 */
export const isJSON = (str) => {
  try {
    JSON.parse(str)
  } catch (error) {
    return false
  }
  return true
}
