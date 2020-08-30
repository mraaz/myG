import Loadable from 'react-loadable'

const Home = Loadable({
  loader: () => import('./components/Home'),
  loading: function() {
    return null
  },
})

const Profile = Loadable({
  loader: () => import('./components/Profile'),
  loading: function() {
    return null
  },
})

const ProfileContainer = Loadable({
  loader: () => import('./components/Profile/Container'),
  loading: function() {
    return null
  },
})

const ScheduleGamesView = Loadable({
  loader: () => import('./components/scheduledGames/ScheduleGames'),
  loading: function() {
    return null
  },
})

const AddScheduleGames = Loadable({
  loader: () => import('./components/AddGame/AddGameContainer'),
  loading: function() {
    return null
  },
})

const CreateCommunity = Loadable({
  loader: () => import('./components/Community/AddCommunityContainer'),
  loading: function() {
    return null
  },
})

const EditScheduleGames = Loadable({
  loader: () => import('./components/EditGame/EditGameContainer'),
  loading: function() {
    return null
  },
})

const LeftMenu = Loadable({
  loader: () => import('./components/LeftMenu'),
  loading: function() {
    return null
  },
})
const MessengerLoader = Loadable({
  loader: () => import('./components/Messenger/MessengerLoader'),
  loading: function() {
    return null
  },
})

const ChatUnreadMessages = Loadable({
  loader: () => import('./components/Messenger/ChatUnreadMessages'),
  loading: function() {
    return null
  },
})
const GuestLink = Loadable({
  loader: () => import('./components/Guest/Link'),
  loading: function() {
    return null
  },
})
const EncryptionParaphraseRegistration = Loadable({
  loader: () => import('./components/Messenger/EncryptionParaphraseRegistration'),
  loading: function() {
    return null
  },
})
const SearchHeader = Loadable({
  loader: () => import('./components/SearchHeader'),
  loading: function() {
    return null
  },
})

const Posts = Loadable({
  loader: () => import('./components/Posts'),
  loading: function() {
    return null
  },
})
const LoadingComp = Loadable({
  loader: () => import('./components/LoadingComp'),
  loading: function() {
    return null
  },
})
const Dossier = Loadable({
  loader: () => import('./components/Dossier'),
  loading: function() {
    return null
  },
})
const AddGamingExp = Loadable({
  loader: () => import('./components/AddGamingExp'),
  loading: function() {
    return null
  },
})
const EditGamingExp = Loadable({
  loader: () => import('./components/EditGamingExp'),
  loading: function() {
    return null
  },
})
const IndividualPost = Loadable({
  loader: () => import('./components/IndividualPost'),
  loading: function() {
    return null
  },
})
const IndividualComment = Loadable({
  loader: () => import('./components/IndividualComment'),
  loading: function() {
    return null
  },
})
const IndividualReply = Loadable({
  loader: () => import('./components/IndividualReply'),
  loading: function() {
    return null
  },
})
const MyPosts = Loadable({
  loader: () => import('./components/MyPosts'),
  loading: function() {
    return null
  },
})
const MyHome = Loadable({
  loader: () => import('./components/MyHome'),
  loading: function() {
    return null
  },
})
const MyComposeSection = Loadable({
  loader: () => import('./components/MyComposeSection'),
  loading: function() {
    return null
  },
})
const Invitation = Loadable({
  loader: () => import('./components/Invitation'),
  loading: function() {
    return null
  },
})
const IndividualInvitation = Loadable({
  loader: () => import('./components/IndividualInvitation'),
  loading: function() {
    return null
  },
})
const MyFriends = Loadable({
  loader: () => import('./components/MyFriends'),
  loading: function() {
    return null
  },
})
const IndividualFriend = Loadable({
  loader: () => import('./components/IndividualFriend'),
  loading: function() {
    return null
  },
})
const MySettings = Loadable({
  loader: () => import('./components/MySettings'),
  loading: function() {
    return null
  },
})
const IndividualGamingExperience = Loadable({
  loader: () => import('./components/IndividualGamingExperience'),
  loading: function() {
    return null
  },
})
const UploadPic = Loadable({
  loader: () => import('./components/UploadPic'),
  loading: function() {
    return null
  },
})
const Notifications = Loadable({
  loader: () => import('./components/Notifications'),
  loading: function() {
    return null
  },
})
const IndividualNotification = Loadable({
  loader: () => import('./components/IndividualNotification'),
  loading: function() {
    return null
  },
})
const SinglePost = Loadable({
  loader: () => import('./components/SinglePost'),
  loading: function() {
    return null
  },
})
const IndividualEsportsExperience = Loadable({
  loader: () => import('./components/IndividualEsportsExperience'),
  loading: function() {
    return null
  },
})
const AddEsportsExp = Loadable({
  loader: () => import('./components/AddEsportsExp'),
  loading: function() {
    return null
  },
})
const EditEsportsExp = Loadable({
  loader: () => import('./components/EditEsportsExp'),
  loading: function() {
    return null
  },
})
const IndividualPlayer = Loadable({
  loader: () => import('./components/IndividualPlayer'),
  loading: function() {
    return null
  },
})
const AdvancedSearch = Loadable({
  loader: () => import('./components/AdvancedSearch'),
  loading: function() {
    return null
  },
})
const GroupMain = Loadable({
  loader: () => import('./components/Community/GroupMain'),
  loading: function() {
    return null
  },
})
const ScheduledGamesApprovals = Loadable({
  loader: () => import('./components/ScheduledGamesApprovals'),
  loading: function() {
    return null
  },
})
const GroupHome = Loadable({
  loader: () => import('./components/GroupHome'),
  loading: function() {
    return null
  },
})
const MyApprovals = Loadable({
  loader: () => import('./components/MyApprovals'),
  loading: function() {
    return null
  },
})
const Member_lists = Loadable({
  loader: () => import('./components/Member_lists'),
  loading: function() {
    return null
  },
})
const ArchivedScheduledGames = Loadable({
  loader: () => import('./components/ArchivedScheduledGames'),
  loading: function() {
    return null
  },
})
const AllSearchResults = Loadable({
  loader: () => import('./components/AllSearchResults'),
  loading: function() {
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
  SearchHeader,
  Posts,
  LoadingComp,
  AddScheduleGames,
  Dossier,
  AddGamingExp,
  EditGamingExp,
  IndividualPost,
  IndividualComment,
  IndividualReply,
  MyPosts,
  MyHome,
  MyComposeSection,
  Invitation,
  IndividualInvitation,
  MyFriends,
  IndividualFriend,
  IndividualGamingExperience,
  MySettings,
  UploadPic,
  Notifications,
  IndividualNotification,
  SinglePost,
  IndividualEsportsExperience,
  AddEsportsExp,
  EditEsportsExp,
  AdvancedSearch,
  IndividualPlayer,
  GroupMain,
  ScheduledGamesApprovals,
  GroupHome,
  MyApprovals,
  Member_lists,
  ArchivedScheduledGames,
  AllSearchResults,
  ScheduleGamesView,
  CreateCommunity,
  EditScheduleGames,
}
