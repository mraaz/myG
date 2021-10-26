import { CHANNEL, checkFlag } from '../../common/flags'

const styles = {
  container: 'my-left-menu__container',
  itemBox: 'my-left-menu__item-box',
  internalItemBox: 'my-left-menu__internal-item-box',
  userDetailsBox: 'my-left-menu__user-details-box',
  userDetailsBoxCollapsed: 'my-left-menu__user-details-box-collapsed',
  sidebarItemText: 'my-left-menu__sidebar-item-text',
  logout: 'my-left-menu__logout',
  menuCollapsed: 'my-left-menu__menu-collapsed',
  subItemContainer: 'my-left-menu__sub-item-container',
  subItemText: 'my-left-menu__sub-item-text',
  sideBarItemIcon: 'my-left-menu__sidebar-item-icon',
  logoSectionContainer: 'my-left-menu__logo-section-container',
  logoButton: 'my-left-menu__toggle-button',
  notificationIcon: 'my-left-menu__notification-icon',
  notificationIconCollapsed: 'my-left-menu__notification-icon-collapsed',
  notificationContainer: 'my-left-menu__notification_container',
  notificationContainerCollapsed: 'my-left-menu__notification-container-collapsed',
  userDp: 'my-left-menu__user-dp',
  userInfo: 'my-left-menu__user-info',
  userAlias: 'my-left-menu__user-alias',
  logoCollapsed: 'my-left-menu__logo-collapsed',
  settingsIcon: 'my-left-menu__settings-icon',
  toggleIcon: 'my-left-menu__toggle-icon',
  clickable: 'my-left-menu__clickable',
  line: 'my-left-menu__line',
  notificationArea: 'my-left-menu__notification-area',
  logoutArea: 'my-left-menu__logout-area'
}

const sideBarItems = {
  SEARCH: {
    id: 'SEARCH',
    header: 'Search',
    icon: 'https://myG.gg/platform_images/Dashboard/btn_Search.svg',
    cta: '/advancedSearch',
    expanded: false,
    subItems: [
      {
        header: 'Looking for <b>Games (LFG)</b>',
        cta: '/scheduledGames'
      },
      {
        header: 'Find <b>Gamers</b>',
        cta: '/find-gamers/search'
      }
    ]
  },
  NEW_GAME: {
    id: 'NEW_GAME',
    header: 'Create',
    icon: 'https://myG.gg/platform_images/Dashboard/btn_New_Game.svg',
    cta: '/addScheduleGames',
    expanded: false,
    subItems: [
      {
        header: 'Schedule <b>Game</b>',
        cta: '/addScheduleGames'
      },
      {
        header: 'Create <b>Community</b>',
        cta: '/community/create'
      }
    ]
  },
  FEED: {
    id: 'FEED',
    header: 'Dashboard',
    icon: 'https://myG.gg/platform_images/Dashboard/btn_Feed.svg',
    cta: '/',
    expanded: false
  },
  PROFILE: {
    id: 'PROFILE',
    header: 'Profile',
    icon: 'https://myG.gg/platform_images/Dashboard/btn_Profile.svg',
    cta: '/profile',
    expanded: false
  },
  ACHIEVEMENTS: {
    id: 'ACHIEVEMENTS',
    header: 'Achievements',
    icon: 'https://myG.gg/platform_images/Dashboard/btn_Network.svg',
    cta: '/achievements/badges',
    expanded: false
  }
}

const sideBarItemsOrder = ['SEARCH', 'NEW_GAME', 'FEED', 'PROFILE', 'ACHIEVEMENTS']

if (checkFlag(CHANNEL)) {
  sideBarItems['CHANNEL'] = {
    id: 'CHANNEL',
    header: 'myG Chat',
    icon: 'https://myG.gg/platform_images/Dashboard/Viw.svg',
    cta: '/myg-chat',
    expanded: false
  }
  sideBarItemsOrder.push('CHANNEL')
}

const logoutButton = {
  header: 'Logout',
  cta: '',
  icon: 'https://myG.gg/platform_images/Dashboard/Logout_Icon.svg',
  isExpandable: false,
  subItems: [
    {
      header: '',
      cta: ''
    },
    {
      header: '',
      cta: ''
    }
  ]
}

export { styles, sideBarItems, logoutButton, sideBarItemsOrder }
