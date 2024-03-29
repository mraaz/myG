import Loadable from 'react-loadable'

const Home = Loadable({
  loader: () => import('./components/Home'),
  loading: function () {
    return null
  }
})

const ProfileContainer = Loadable({
  loader: () => import('./components/Profile/Container'),
  loading: function () {
    return null
  }
})

const ChatLinkContainer = Loadable({
  loader: () => import('./components/ChatLinkContainer'),
  loading: function () {
    return null
  }
})

const FindGamersContainer = Loadable({
  loader: () => import('./components/FindGamers/Container'),
  loading: function () {
    return null
  }
})

const ScheduleGamesView = Loadable({
  loader: () => import('./components/scheduledGames/ScheduleGames'),
  loading: function () {
    return null
  }
})

const AddScheduleGames = Loadable({
  loader: () => import('./components/AddGame/AddGameContainer'),
  loading: function () {
    return null
  }
})

const CreateCommunity = Loadable({
  loader: () => import('./components/Community/AddCommunityContainer'),
  loading: function () {
    return null
  }
})

const LeftMenu = Loadable({
  loader: () => import('./components/LeftMenu'),
  loading: function () {
    return null
  }
})
const MessengerLoader = Loadable({
  loader: () => import('./components/Messenger/MessengerLoader'),
  loading: function () {
    return null
  }
})

const ChatUnreadMessages = Loadable({
  loader: () => import('./components/Messenger/ChatUnreadMessages'),
  loading: function () {
    return null
  }
})
const GuestLink = Loadable({
  loader: () => import('./components/Guest/Link'),
  loading: function () {
    return null
  }
})
const GuestGame = Loadable({
  loader: () => import('./components/Guest/Game'),
  loading: function () {
    return null
  }
})
const GuestProfile = Loadable({
  loader: () => import('./components/Guest/Profile'),
  loading: function () {
    return null
  }
})
const GuestPost = Loadable({
  loader: () => import('./components/Guest/Post'),
  loading: function () {
    return null
  }
})
const GuestCommunity = Loadable({
  loader: () => import('./components/Guest/Community'),
  loading: function () {
    return null
  }
})
const GuestFindGamers = Loadable({
  loader: () => import('./components/Guest/FindGamers'),
  loading: function () {
    return null
  }
})
const EncryptionParaphraseRegistration = Loadable({
  loader: () => import('./components/Messenger/EncryptionParaphraseRegistration'),
  loading: function () {
    return null
  }
})
const AchievementsContainer = Loadable({
  loader: () => import('./components/Achievements/Container'),
  loading: function () {
    return null
  }
})
const Posts = Loadable({
  loader: () => import('./components/Posts'),
  loading: function () {
    return null
  }
})

const IndividualPost = Loadable({
  loader: () => import('./components/IndividualPost'),
  loading: function () {
    return null
  }
})

const MyPosts = Loadable({
  loader: () => import('./components/MyPosts'),
  loading: function () {
    return null
  }
})

const SinglePost = Loadable({
  loader: () => import('./components/SinglePost'),
  loading: function () {
    return null
  }
})

const HashTagList = Loadable({
  loader: () => import('./components/HashTagList'),
  loading: function () {
    return null
  }
})

const MobileMenu = Loadable({
  loader: () => import('./components/MobileView/MobileMenu'),
  loading: function () {
    return null
  }
})

const EditScheduleGames = Loadable({
  loader: () => import('./components/EditGame/EditGameContainer'),
  loading: function () {
    return null
  }
})

const CommunityView = Loadable({
  loader: () => import('./components/CommunityView/CommunityView'),
  loading: function () {
    return null
  }
})

const Onboarding = Loadable({
  loader: () => import('./components/Onboarding'),
  loading: function () {
    return null
  }
})

const Channel = Loadable({
  loader: () => import('./components/Channel'),
  loading: function () {
    return null
  }
})

const CreateTeam = Loadable({
  loader: () => import('./components/Teams/Create'),
  loading: function () {
    return null
  }
})

const GuestFeeds = Loadable({
  loader: () => import('./components/GuestFeeds'),
  loading: function () {
    return null
  }
})

export {
  Home,
  ProfileContainer,
  ChatLinkContainer,
  FindGamersContainer,
  AchievementsContainer,
  LeftMenu,
  MessengerLoader,
  ChatUnreadMessages,
  GuestLink,
  GuestGame,
  GuestProfile,
  GuestPost,
  GuestCommunity,
  GuestFindGamers,
  EncryptionParaphraseRegistration,
  Posts,
  AddScheduleGames,
  IndividualPost,
  MyPosts,
  SinglePost,
  ScheduleGamesView,
  CreateCommunity,
  EditScheduleGames,
  MobileMenu,
  CommunityView,
  Onboarding,
  Channel,
  HashTagList,
  CreateTeam,
  GuestFeeds
}
