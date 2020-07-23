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
}
