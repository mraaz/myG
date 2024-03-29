const SETTINGS_ENUMS = {
  MAIN: 'MAIN',
  ADVANCED: 'ADVANCED',
  INGAMEFIELD: 'INGAMEFIELD'
}

const styles = {
  container: 'add-game__container',
  edit__container: 'add-game__container edit__container',
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
  m: 'add-game__'
}

const EXPERIENCE_OPTIONS = [
  { value: 'Casual', label: 'Casual' },
  { value: 'Semi Pro', label: 'Semi Pro' },
  { value: 'Professional', label: 'Professional' }
]

const TIME_EXPERIENCE_OPTIONS = [
  { value: 'Less than 1 year', label: 'Less than 1 year' },
  { value: 'Less than 2 years', label: 'Less than 2 years' },
  { value: 'Less than 3 years', label: 'Less than 3 years' },
  { value: 'Less than 4 years', label: 'Less than 4 years' },
  { value: 'Less than 5 years', label: 'Less than 5 years' },
  { value: '5+ years', label: '5+ years' }
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
  { value: 'Central America', label: 'Central America' }
]

const PLATFORM_OPTIONS = [
  { value: 'PC', label: 'PC' },
  { value: 'XB', label: 'XB' },
  { value: 'PS', label: 'PS' },
  { value: 'Nintendo', label: 'Nintendo' },
  { value: 'Mobile', label: 'Mobile' },
  { value: 'Tabletop', label: 'Tabletop' }
]

const VISIBILITY_OPTIONS = [
  { value: 1, label: 'Public' },
  { value: 4, label: 'Private' }
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
  { value: 42, label: 'Unlimited' }
]

const LEVEL_OPTIONS = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
  { value: '7', label: '7' },
  { value: '8', label: '8' },
  { value: '9', label: '9' },
  { value: '10', label: '10' },
  { value: '11', label: '11' },
  { value: '12', label: '12' },
  { value: '13', label: '13' },
  { value: '14', label: '14' },
  { value: '15', label: '15' },
  { value: '16', label: '16' },
  { value: '17', label: '17' },
  { value: '18', label: '18' },
  { value: '19', label: '19' },
  { value: '20', label: '20' },
  { value: '21', label: '21' },
  { value: '22', label: '22' },
  { value: '23', label: '23' },
  { value: '24', label: '24' },
  { value: '25', label: '25' }
]

const LANGUAGE_OPTIONS = [
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
  { value: 'Vietnamese', label: 'Vietnamese' }
]

export {
  styles,
  SETTINGS_ENUMS,
  EXPERIENCE_OPTIONS,
  TIME_EXPERIENCE_OPTIONS,
  REGION_OPTIONS,
  PLATFORM_OPTIONS,
  VISIBILITY_OPTIONS,
  LIMIT_OPTIONS,
  LANGUAGE_OPTIONS,
  LEVEL_OPTIONS
}
