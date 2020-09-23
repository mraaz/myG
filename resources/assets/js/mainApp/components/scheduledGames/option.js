/*
 * Author : nitin Tyagi
 * github  : https://github.com/realinit
 * Email : nitin.1992tyagi@gmail.com
 */
const region_options = [
  { value: 'North America', label: 'North America' },
  { value: 'Europe', label: 'Europe' },
  { value: 'Asia', label: 'Asia' },
  { value: 'Russia', label: 'Russia' },
  { value: 'South America', label: 'South America' },
  { value: 'Oceania', label: 'Oceania' },
  { value: 'Middle East', label: 'Middle East' },
  { value: 'Africa', label: 'Africa' },
  { value: 'Central America', label: 'Central America' },
]
const experience_options = [
  { value: 'Casual', label: 'Casual' },
  { value: 'Semi Pro', label: 'Semi Pro' },
  { value: 'Professional', label: 'Professional' },
]
const platform_options = [
  { value: 'PC', label: 'PC' },
  { value: 'XB', label: 'XB' },
  { value: 'PS', label: 'PS' },
  { value: 'Nintendo', label: 'Nintendo' },
  { value: 'Mobile', label: 'Mobile' },
  { value: 'Tabletop', label: 'Tabletop' },
]
const date_options = [
  { value: 'Now-ish', label: 'Now-ish' },
  { value: '8 hours', label: 'Up to 8 hours' },
  { value: '2 days', label: 'Up to 2 days' },
  { value: '7 days', label: 'Up to 7 days' },
  { value: '14 days', label: 'Up to 14 days' },
]
const visibility_options = [
  { value: 1, label: 'Public' },
  { value: 2, label: 'Friends' },
  { value: 3, label: 'Group' },
]
const prefilledFilter_option = [
  { value: 0, label: 'All myGames' },
  { value: 1, label: 'my Hosted Games' },
  { value: 2, label: 'myGames (Participating)' },
  { value: 3, label: 'myGames (Awaiting Approval)' },
]
const yes_no_options = [
  { value: 1, label: 'Fo sho!' },
  { value: 0, label: 'Meh' },
]

const language_options = [
  { value: 'English', label: 'English' },
  { value: 'Arabic', label: 'Arabic' },
  { value: 'Bahasa', label: 'Bahasa' },
  { value: 'Bengali', label: 'Bengali' },
  { value: 'Bisaya', label: 'Bisaya' },
  { value: 'Bulgarian', label: 'Bulgarian' },
  { value: 'Burmese', label: 'Burmese' },
  { value: 'Chinese', label: 'Chinese' },
  { value: 'Croatian', label: 'Croatian' },
  { value: 'Czech', label: 'Czech' },
  { value: 'Danish', label: 'Danish' },
  { value: 'Dutch', label: 'Dutch' },
  { value: 'Estonian', label: 'Estonian' },
  { value: 'Finnish', label: 'Finnish' },
  { value: 'French', label: 'French' },
  { value: 'German', label: 'German' },
  { value: 'Greek', label: 'Greek' },
  { value: 'Hebrew', label: 'Hebrew' },
  { value: 'Hindi', label: 'Hindi' },
  { value: 'Hungarian', label: 'Hungarian' },
  { value: 'Italian', label: 'Italian' },
  { value: 'Korean', label: 'Korean' },
  { value: 'Latvian', label: 'Latvian' },
  { value: 'Lithuanian', label: 'Lithuanian' },
  { value: 'Malay', label: 'Malay' },
  { value: 'Marathi', label: 'Marathi' },
  { value: 'Mongolian', label: 'Mongolian' },
  { value: 'Nihongo', label: 'Nihongo' },
  { value: 'Norwegian', label: 'Norwegian' },
  { value: 'Polish', label: 'Polish' },
  { value: 'Portuguese', label: 'Portuguese' },
  { value: 'Punjabi', label: 'Punjabi' },
  { value: 'Romanian', label: 'Romanian' },
  { value: 'Russian', label: 'Russian' },
  { value: 'Serbian', label: 'Serbian' },
  { value: 'Slovak', label: 'Slovak' },
  { value: 'Slovenian', label: 'Slovenian' },
  { value: 'Spanish', label: 'Spanish' },
  { value: 'Swedish', label: 'Swedish' },
  { value: 'Tagalog', label: 'Tagalog' },
  { value: 'Turkish', label: 'Turkish' },
  { value: 'Ukrainian', label: 'Ukrainian' },
  { value: 'Urdu', label: 'Urdu' },
  { value: 'Vietnamese', label: 'Vietnamese' },
]

const getExtraFilterOprion = (arg) => {
  const data = arg && arg.length > 0 ? arg.split(',') : []
  return data.map((item) => {
    const val = item ? item.trim() : ''
    return { value: val, label: val }
  })
}

const properCase = (str) => {
  let strArr = str.split('_')
  let arr = []
  for (var x = 0; x < strArr.length; x++) {
    arr.push(strArr[x].charAt(0).toUpperCase() + strArr[x].slice(1))
  }
  return arr.join(' ')
}

module.exports = {
  region_options,
  experience_options,
  platform_options,
  date_options,
  visibility_options,
  getExtraFilterOprion,
  properCase,
  prefilledFilter_option,
  yes_no_options,
  language_options,
}
