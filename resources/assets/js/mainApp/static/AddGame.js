const SETTINGS_ENUMS = {
  MAIN: 'MAIN',
  ADVANCED: 'ADVANCED',
}

const styles = {
  container: 'add-game__container',
  fieldTitle: 'add-game__field-title',
  mainContainer: 'add-game__main-container',
  menuContainer: 'add-game__menu-container',
  menuText: 'add-game__menu-text',
  menuTextSelected: 'add-game__menu-text-selected',
  menuLine: 'add-game__menu_line',
  menuLineHighlighted: 'add-game__menu_line_highlighted',
  optionalMainContainer: 'add-game__optional-main-container',
  optionalEndContainer: 'add-game__optional-end-container',
  optionalText: 'add-game__optional-text',
  optionalCircle: 'add-game__optional-circle',
  sliderContainer: 'add-game__slider-container',
  footerContainer: 'add-game__footer-container',
  footerCancelButton: 'add-game__footer-cancel-button',
  footerDeleteButton: 'add-game__footer-delete-button',
  footerSubmitButton: 'add-game__footer-submit-button',
  footerSubmitButtonLight: 'add-game__footer-submit-button-light',
  mainViewContainer: 'add-game__main-view-container',
  optionalViewContainer: 'add-game__optional-view-container',
  optionalHeaderContainer: 'add-game__optional-header-container',
  optionalViewFields: 'add-game__optional-view-fields',
  listedHeader: 'add-game__listed__header',
  listedShareText: 'add-game__listed__share-text',
  listedOrText: 'add-game__listed__or-text',
  listedTopContentContainer: 'add-game__listed__top-content-container',
  listedBottomContentContainer: 'add-game__listed__bottom-content-container',
  sideBall: 'add-game__side-ball',
  sideLine: 'add-game__side-line',
  sideLineContainer: 'add-game__side-line-container',
  m: 'add-game__',
}

const EXPERIENCE_OPTIONS = [
  { value: 'Casual', label: 'Casual' },
  { value: 'Semi Pro', label: 'Semi Pro' },
  { value: 'Professional', label: 'Professional' },
]

const REGION_OPTIONS = [
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

const PLATFORM_OPTIONS = [
  { value: 'PC', label: 'PC' },
  { value: 'XB', label: 'XB' },
  { value: 'PS', label: 'PS' },
  { value: 'Nintendo', label: 'Nintendo' },
  { value: 'Mobile', label: 'Mobile' },
  { value: 'Tabletop', label: 'Tabletop' },
]

const VISIBILITY_OPTIONS = [
  { value: 1, label: 'Public' },
  { value: 4, label: 'Private' },
]
const LIMIT_OPTIONS = [
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 20, label: '20' },
  { value: 25, label: '25' },
  { value: 30, label: '30' },
  { value: 40, label: '40' },
  { value: 50, label: '50' },
  { value: 100, label: '100' },
  { value: 42, label: 'Unlimited' },
]

const CLASH_ROYAL_TROPHY = [
  { value: '1000', label: '> 1000' },
  { value: '2000', label: '> 2000' },
  { value: '3000', label: '> 3000' },
  { value: '4000', label: '> 4000' },
  { value: '5000', label: '> 5000' },
  { value: 'competitive', label: 'Competitive' },
]

const DOTA2_MEDAL_RANKS = [
  { value: 'Herald', label: 'Herald' },
  { value: 'Guardian', label: 'Guardian' },
  { value: 'Crusader', label: 'Crusader' },
  { value: 'Archon', label: 'Archon' },
  { value: 'Legend', label: 'Legend' },
  { value: 'Ancient', label: 'Ancient' },
  { value: 'Divine', label: 'Divine' },
  { value: 'Immortal', label: 'Immortal' },
]

const DOTA2_ROLES = [
  { value: 'Position 1', label: 'Position 1' },
  { value: 'Position 2', label: 'Position 2' },
  { value: 'Position 3', label: 'Position 3' },
  { value: 'Position 4', label: 'Position 4' },
  { value: 'Position 5', label: 'Position 5' },
]

const DOTA2_SERVER_REGIONS = [
  { value: 'EU West', label: 'EU West' },
  { value: 'EU East', label: 'EU East' },
  { value: 'EU North', label: 'EU North' },
  { value: 'Poland', label: 'Poland' },
  { value: 'Spain', label: 'Spain' },
  { value: 'US Northwest', label: 'US Northwest' },
  { value: 'US Northeast', label: 'US Northeast' },
  { value: 'US Northcentral', label: 'US Northcentral' },
  { value: 'US Southwest', label: 'US Southwest' },
  { value: 'Australia', label: 'Australia' },
  { value: 'Brazil', label: 'Brazil' },
  { value: 'Chile', label: 'Chile' },
  { value: 'Emirates', label: 'Emirates' },
  { value: 'India', label: 'India' },
  { value: 'India East', label: 'India East' },
  { value: 'Peru', label: 'Peru' },
  { value: 'Japan', label: 'Japan' },
  { value: 'Hong Kong', label: 'Hong Kong' },
  { value: 'Singapore', label: 'Singapore' },
  { value: 'South Africa', label: 'South Africa' },
  { value: 'China Shanghai', label: 'China Shanghai' },
  { value: 'China Guangzhou', label: 'China Guangzhou' },
  { value: 'China Tianjin', label: 'China Tianjin' },
  { value: 'China TC Zhejiang', label: 'China TC Zhejiang' },
  { value: 'China UC', label: 'China UC' },
  { value: 'China UC 2', label: 'China UC 2' },
  { value: 'China TC Wuhan', label: 'China TC Wuhan' },
]

export {
  styles,
  SETTINGS_ENUMS,
  EXPERIENCE_OPTIONS,
  REGION_OPTIONS,
  PLATFORM_OPTIONS,
  VISIBILITY_OPTIONS,
  LIMIT_OPTIONS,
  CLASH_ROYAL_TROPHY,
  DOTA2_MEDAL_RANKS,
  DOTA2_ROLES,
  DOTA2_SERVER_REGIONS,
}
