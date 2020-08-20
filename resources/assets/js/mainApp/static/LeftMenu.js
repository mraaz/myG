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
  logoutArea: 'my-left-menu__logout-area',
}

const sideBarItems = {
  SEARCH: {
    id: 'SEARCH',
    header: 'Search',
    icon: 'https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/btn_Search.svg',
    cta: '/advancedSearch',
    expanded: false,
    subItems: [
      {
        header: 'Find <b>Matches</b>',
        cta: '/scheduledGames',
      },
      {
        header: 'Find <b>Gamers</b>',
        cta: '/',
      },
    ],
  },
  NEW_GAME: {
    id: 'NEW_GAME',
    header: 'Create',
    icon: 'https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/btn_New_Game.svg',
    cta: '/addScheduleGames',
    expanded: false,
    subItems: [
      {
        header: 'Create <b>Match</b>',
        cta: '/addScheduleGames',
      },
      {
        header: 'Create <b>Community</b>',
        cta: '/community/create',
      },
    ],
  },
  FEED: {
    id: 'FEED',
    header: 'Dashboard',
    icon: 'https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/btn_Feed.svg',
    cta: '/',
    expanded: false,
  },
  PROFILE: {
    id: 'PROFILE',
    header: 'Profile',
    icon: 'https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/btn_Profile.svg',
    cta: '/profile',
    expanded: false,
  },
  NETWORK: {
    id: 'NETWORK',
    header: 'Network',
    icon: 'https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/btn_Network.svg',
    cta: '/groups',
    expanded: false,
  },
}

const sideBarItemsOrder = ['SEARCH', 'NEW_GAME', 'FEED', 'PROFILE', 'NETWORK']

const sideBarItemsList = [
  {
    id: 'SEARCH',
    header: 'Search',
    icon: 'https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/btn_Search.svg',
    cta: '',
    isExpandable: true,
    subItems: [
      {
        header: '',
        cta: '',
      },
      {
        header: '',
        cta: '',
      },
    ],
  },
  {
    id: 'NEW_GAME',
    header: 'New Game',
    icon: 'https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/btn_New_Game.svg',
    cta: '',
    isExpandable: true,
    subItems: [
      {
        header: '',
        cta: '',
      },
      {
        header: '',
        cta: '',
      },
    ],
  },
  {
    id: 'FEED',
    header: 'Feed',
    icon: 'https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/btn_Feed.svg',
    cta: '',
    isExpandable: false,
    subItems: [
      {
        header: '',
        cta: '',
      },
      {
        header: '',
        cta: '',
      },
    ],
  },
  {
    id: 'PROFILE',
    header: 'Profile',
    icon: 'https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/btn_Profile.svg',
    cta: '',
    isExpandable: false,
    subItems: [
      {
        header: '',
        cta: '',
      },
      {
        header: '',
        cta: '',
      },
    ],
  },
  {
    id: 'NETWORK',
    header: 'Network',
    icon: 'https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/btn_Network.svg',
    cta: '',
    isExpandable: false,
    subItems: [
      {
        header: '',
        cta: '',
      },
      {
        header: '',
        cta: '',
      },
    ],
  },
]

const logoutButton = {
  header: 'Logout',
  cta: '',
  icon: 'https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/Logout_Icon.svg',
  isExpandable: false,
  subItems: [
    {
      header: '',
      cta: '',
    },
    {
      header: '',
      cta: '',
    },
  ],
}

export { styles, sideBarItems, logoutButton, sideBarItemsOrder }
