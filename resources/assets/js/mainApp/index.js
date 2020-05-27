// --- One way to disable adonis websocket logs.
const log = console.log
console.log = function () {
  if (arguments[0] && arguments[0].includes && arguments[0].includes('adonis:websocket')) return
  if (log.apply) log.apply(console, arguments)
  else log(Array.prototype.slice.apply(arguments).join(' '))
}
window.console = console
// --- One way to disable adonis websocket logs.

import '@babel/polyfill'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '../redux/Store'
import { loadUserInfoToReduxStore } from '../common/user';

import {
  Home,
  Profile,
  ScheduleGames,
  MyScheduledGames,
  LeftMenu,
  MessengerLoader,
  ChatUnreadMessages,
  EncryptionParaphraseRegistration,
  GuestLink,
  SearchHeader,
  ComposeSection,
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
  ScheduledGamePost,
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
  PlayerList,
  GroupMain,
  ScheduledGamesApprovals,
  GroupHome,
  MyApprovals,
  Member_lists,
  ArchivedScheduledGames,
  AllSearchResults,
} from './AsyncComponent'

class Layout extends Component {
  constructor() {
    super()
    this.state = {
      name: 'Raaz',
    }
  }
  componentDidMount() {
    const self = this
    const getInitialData = async function () {
      try {
        const initialData = await axios.get('/api/initialApp')

        if (initialData.data.userInfo == 1981 && !window.location.href.includes('/link')) {
          window.location.href = '/'
        }

        self.setState({
          initialData: initialData.data,
        })

        loadUserInfoToReduxStore(initialData.data.userInfo);

      } catch (error) {
        console.log(error)
      }
    }
    getInitialData()

    window.addEventListener('focus', this.onFocus)
  }

  componentWilUnmount() {
    window.removeEventListener('focus', this.onFocus)
  }

  onFocus = () => {
    window.document.title = 'myG'
  }

  renderRouter = () => {
    return (
      <Router>
        <div className='app-container home-page'>
          <div className='dashboard-main-container'>
            <LeftMenu initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData} />
            <section id='content-container'>
              {/* <SearchHeader /> */}
              <Switch>
                <Route
                  exact
                  path='/'
                  component={(props) => (
                    <Home
                      routeProps={props}
                      initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData}
                      key={Math.random()}
                    />
                  )}
                />

                <Route
                  exact
                  path='/link/:uuid'
                  component={(props) => (
                    <Home
                      routeProps={props}
                      initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData}
                      key={Math.random()}
                    />
                  )}
                />

                <Route
                  exact
                  path='/profile/:alias'
                  component={(props) => (
                    <Profile
                      routeProps={props}
                      initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData}
                      key={Math.random()}
                    />
                  )}
                />

                <Route
                  exact
                  path='/myPosts/'
                  component={(props) => (
                    <MyHome
                      routeProps={props}
                      initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData}
                      key={Math.random()}
                    />
                  )}
                />

                <Route
                  exact
                  path='/post/:id'
                  component={(props) => (
                    <SinglePost
                      routeProps={props}
                      initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData}
                      key={Math.random()}
                    />
                  )}
                />

                <Route
                  exact
                  path='/profile/'
                  component={(props) => (
                    <Profile
                      routeProps={props}
                      initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData}
                      key={Math.random()}
                    />
                  )}
                />

                <Route
                  exact
                  path='/profile/:alias/edit/dossier'
                  component={(props) => (
                    <Dossier
                      routeProps={props}
                      initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData}
                      key={Math.random()}
                    />
                  )}
                />

                <Route
                  exact
                  path='/profile/:alias/upload/profile'
                  component={(props) => (
                    <UploadPic
                      routeProps={props}
                      initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData}
                      key={Math.random()}
                    />
                  )}
                />

                <Route
                  exact
                  path='/profile/:alias/upload/bg_profile'
                  component={(props) => (
                    <UploadPic
                      routeProps={props}
                      initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData}
                      key={Math.random()}
                    />
                  )}
                />

                <Route
                  exact
                  path='/profile/:alias/upload/img_profile'
                  component={(props) => (
                    <UploadPic
                      routeProps={props}
                      initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData}
                      key={Math.random()}
                    />
                  )}
                />

                <Route
                  exact
                  path='/profile/:alias/add/gamingexp'
                  component={(props) => (
                    <AddGamingExp
                      routeProps={props}
                      initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData}
                      key={Math.random()}
                    />
                  )}
                />

                <Route
                  exact
                  path='/profile/:alias/edit/gamingexp/:game_id'
                  component={(props) => (
                    <EditGamingExp
                      routeProps={props}
                      initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData}
                      key={Math.random()}
                    />
                  )}
                />

                <Route
                  exact
                  path='/profile/:alias/add/esportsExp'
                  component={(props) => (
                    <AddEsportsExp
                      routeProps={props}
                      initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData}
                      key={Math.random()}
                    />
                  )}
                />

                <Route
                  exact
                  path='/profile/:alias/edit/esportsExp/:esportsExp_id'
                  component={(props) => (
                    <EditEsportsExp
                      routeProps={props}
                      initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData}
                      key={Math.random()}
                    />
                  )}
                />

                <Route
                  exact
                  path='/scheduledGames'
                  component={(props) => (
                    <ScheduleGames
                      routeProps={props}
                      initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData}
                      key={Math.random()}
                    />
                  )}
                />

                <Route
                  exact
                  path='/scheduledGames/:id'
                  component={(props) => (
                    <ScheduleGames
                      routeProps={props}
                      initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData}
                      key={Math.random()}
                    />
                  )}
                />

                <Route
                  exact
                  path='/myScheduledGames'
                  component={(props) => (
                    <MyScheduledGames
                      routeProps={props}
                      initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData}
                      key={Math.random()}
                    />
                  )}
                />

                <Route
                  exact
                  path='/addScheduleGames'
                  component={(props) => (
                    <AddScheduleGames
                      routeProps={props}
                      initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData}
                      key={Math.random()}
                    />
                  )}
                />

                <Route
                  exact
                  path='/invitation'
                  component={(props) => (
                    <Invitation
                      routeProps={props}
                      initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData}
                      key={Math.random()}
                    />
                  )}
                />

                <Route
                  exact
                  path='/notifications'
                  component={(props) => (
                    <Notifications
                      routeProps={props}
                      initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData}
                      key={Math.random()}
                    />
                  )}
                />

                <Route
                  exact
                  path='/messages'
                  component={(props) => (
                    <ChatUnreadMessages
                      routeProps={props}
                      initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData}
                      key={Math.random()}
                    />
                  )}
                />

                <Route
                  exact
                  path='/myFriends'
                  component={(props) => (
                    <MyFriends
                      routeProps={props}
                      initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData}
                      key={Math.random()}
                    />
                  )}
                />

                <Route
                  exact
                  path='/mySettings'
                  component={(props) => (
                    <MySettings
                      routeProps={props}
                      initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData}
                      key={Math.random()}
                    />
                  )}
                />

                <Route
                  exact
                  path='/advancedSearch'
                  component={(props) => (
                    <AdvancedSearch
                      routeProps={props}
                      initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData}
                      key={Math.random()}
                    />
                  )}
                />

                <Route
                  exact
                  path='/advancedSearch/:id/:table'
                  component={(props) => (
                    <AdvancedSearch
                      routeProps={props}
                      initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData}
                      key={Math.random()}
                    />
                  )}
                />

                <Route
                  exact
                  path='/playerList/:schedule_games_GUID'
                  component={(props) => (
                    <PlayerList
                      routeProps={props}
                      initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData}
                      key={Math.random()}
                    />
                  )}
                />

                <Route
                  exact
                  path='/archive_playerList/:archive_id'
                  component={(props) => (
                    <PlayerList
                      routeProps={props}
                      initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData}
                      key={Math.random()}
                    />
                  )}
                />

                <Route
                  exact
                  path='/groups/'
                  component={(props) => (
                    <GroupMain
                      routeProps={props}
                      initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData}
                      key={Math.random()}
                    />
                  )}
                />

                <Route
                  exact
                  path='/groups/:id'
                  component={(props) => (
                    <GroupHome
                      routeProps={props}
                      initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData}
                      key={Math.random()}
                    />
                  )}
                />

                <Route
                  exact
                  path='/scheduledGamesApprovals/:id'
                  component={(props) => (
                    <ScheduledGamesApprovals
                      routeProps={props}
                      initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData}
                      key={Math.random()}
                    />
                  )}
                />

                <Route
                  exact
                  path='/myApprovals/:id'
                  component={(props) => (
                    <MyApprovals
                      routeProps={props}
                      initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData}
                      key={Math.random()}
                    />
                  )}
                />

                <Route
                  exact
                  path='/groups/:id/members'
                  component={(props) => (
                    <Member_lists
                      routeProps={props}
                      initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData}
                      key={Math.random()}
                    />
                  )}
                />

                <Route
                  exact
                  path='/archived_scheduledGames/:id'
                  component={(props) => (
                    <ArchivedScheduledGames
                      routeProps={props}
                      initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData}
                      key={Math.random()}
                    />
                  )}
                />

                <Route
                  exact
                  path='/search/:keywords'
                  component={(props) => (
                    <AllSearchResults
                      routeProps={props}
                      initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData}
                      key={Math.random()}
                    />
                  )}
                />

                <Route
                  exact
                  path='/setEncryptionParaphrase/:encryption'
                  component={props => <EncryptionParaphraseRegistration routeProps={props} key={Math.random()} />}
                />

                <Route render={() => <h3> Oops! I couldn't find that </h3>} />
              </Switch>
            </section>
            <MessengerLoader
              profileImage={this.state.initialData && this.state.initialData.userInfo.profile_img}
              userId={this.state.initialData && this.state.initialData.userInfo.id}
              alias={this.state.initialData && this.state.initialData.userInfo.alias}
              publicKey={this.state.initialData && this.state.initialData.userInfo.public_key}
              loading={!this.state.initialData}
            />
          </div>
        </div>
      </Router>
    )
  }

  renderGuestLink = () => {
    const uuidMatcher = new RegExp(/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/)
    const url = window.location.href
    const uuid = Array.isArray(url.match(uuidMatcher)) ? url.match(uuidMatcher)[0] : null
    return <GuestLink uuid={uuid} />
  }

  render() {
    const guestLink = this.state.initialData && window.location.href.includes('/link') && this.state.initialData.userInfo === 1981
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ToastContainer
            autoClose={8000}
            draggablePercent={60}
            hideProgressBar={false}
            className='toast-container'
            toastClassName='dark-toast'
          />
          {!guestLink && this.renderRouter()}
          {guestLink && this.renderGuestLink()}
        </PersistGate>
      </Provider>
    )
  }
}

const app = document.getElementById('app')

ReactDOM.render(<Layout />, app)
