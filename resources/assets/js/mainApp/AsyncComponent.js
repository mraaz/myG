import Loadable from 'react-loadable'

const Home = Loadable({
  loader: () => import('./components/Home'),
  loading: function () {
    return null
  },
})

const Profile = Loadable({
  loader: () => import('./components/Profile'),
  loading: function () {
    return null
  },
})

const ProfileContainer = Loadable({
  loader: () => import('./components/Profile/Container'),
  loading: function () {
    return null
  },
})

const ScheduleGamesView = Loadable({
  loader: () => import('./components/scheduledGames/ScheduleGames'),
  loading: function () {
    return null
  },
})

const AddScheduleGames = Loadable({
  loader: () => import('./components/AddGame/AddGameContainer'),
  loading: function () {
    return null
  },
})

const CreateCommunity = Loadable({
  loader: () => import('./components/Community/AddCommunityContainer'),
  loading: function () {
    return null
  },
})

const LeftMenu = Loadable({
  loader: () => import('./components/LeftMenu'),
  loading: function () {
    return null
  },
})
const MessengerLoader = Loadable({
  loader: () => import('./components/Messenger/MessengerLoader'),
  loading: function () {
    return null
  },
})

const ChatUnreadMessages = Loadable({
  loader: () => import('./components/Messenger/ChatUnreadMessages'),
  loading: function () {
    return null
  },
})
const GuestLink = Loadable({
  loader: () => import('./components/Guest/Link'),
  loading: function () {
    return null
  },
})
const EncryptionParaphraseRegistration = Loadable({
  loader: () => import('./components/Messenger/EncryptionParaphraseRegistration'),
  loading: function () {
    return null
  },
})

const Posts = Loadable({
  loader: () => import('./components/Posts'),
  loading: function () {
    return null
  },
})
const LoadingComp = Loadable({
  loader: () => import('./components/LoadingComp'),
  loading: function () {
    return null
  },
})
const Dossier = Loadable({
  loader: () => import('./components/Dossier'),
  loading: function () {
    return null
  },
})

const IndividualPost = Loadable({
  loader: () => import('./components/IndividualPost'),
  loading: function () {
    return null
  },
})

const MyPosts = Loadable({
  loader: () => import('./components/MyPosts'),
  loading: function () {
    return null
  },
})
const MyHome = Loadable({
  loader: () => import('./components/MyHome'),
  loading: function () {
    return null
  },
})

const MySettings = Loadable({
  loader: () => import('./components/MySettings'),
  loading: function () {
    return null
  },
})

const SinglePost = Loadable({
  loader: () => import('./components/SinglePost'),
  loading: function () {
    return null
  },
})

const AdvancedSearch = Loadable({
  loader: () => import('./components/AdvancedSearch'),
  loading: function () {
    return null
  },
})

const MobileMenu = Loadable({
  loader: () => import('./components/MobileView/MobileMenu'),
  loading: function () {
    return null
  },
})

const EditScheduleGames = Loadable({
  loader: () => import('./components/EditGame/EditGameContainer'),
  loading: function () {
    return null
  },
})
const CommunityView = Loadable({
  loader: () => import('./components/CommunityView/CommunityView'),
  loading: function () {
    return null
  },
})

export {
  Home,
  Profile,
  ProfileContainer,
  LeftMenu,
  MessengerLoader,
  ChatUnreadMessages,
  GuestLink,
  EncryptionParaphraseRegistration,
  Posts,
  LoadingComp,
  AddScheduleGames,
  Dossier,
  IndividualPost,
  MyPosts,
  MyHome,
  MySettings,
  SinglePost,
  AdvancedSearch,
  ScheduleGamesView,
  CreateCommunity,
  EditScheduleGames,
  MobileMenu,
  CommunityView,
}
function newFunction() {
  return './components/MobileView/MobileMenuTop'
}
