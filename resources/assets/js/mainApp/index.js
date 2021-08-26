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
import { Redirect } from 'react-router'
import { Router, Route, Switch ,BrowserRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import LanguageProvider from './components/Languages/LanguageProvider';
import ErrorHandler from './components/ErrorHandler'

import PopupAlert from './components/PopupAlert'
import Bubbles from './components/Bubbles'
import LevelUp from './components/LevelUp'
import { Update_ip_settings } from './components/Utility_Function'

import { store, persistor } from '../redux/Store'
import { loadUserInfoToReduxStore } from '../common/user'
import { fetchNotifications } from '../common/notifications'
import { registerAccess } from '../integration/http/quests';
import 'bootstrap/dist/css/bootstrap.min.css'

import {
  Home,
  ProfileContainer,
  AchievementsContainer,
  ChatLinkContainer,
  FindGamersContainer,
  LeftMenu,
  MessengerLoader,
  ChatUnreadMessages,
  EncryptionParaphraseRegistration,
  GuestLink,
  GuestGame,
  GuestProfile,
  GuestPost,
  GuestCommunity,
  GuestFindGamers,
  Posts,
  AddScheduleGames,
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
  GuestFeeds,
} from './AsyncComponent'
import { fetchShortLink } from '../integration/http/links'
import { Fragment } from 'react'

const guestRoutes = ['/link', '/scheduledGames', '/find-gamers/search', '/profile', '/post', '/community', '/s/','/guest'];

class Layout extends Component {
  constructor() {
    super()
    this.state = {
      name: 'Raaz',
      once: false,
      hasLink: false,
      link: null,
      refreshGuestLink:false
    }
  }

  refreshme = () =>{
this.setState({refreshGuestLink:true})
  }
  componentDidMount() {
    window.localStorage.removeItem("unlockedByCheatCode");
    window.localStorage.removeItem("extraSeatsCode");
    if (!window.router) window.router = createBrowserHistory();
    const getInitialData = async () => {
      try {
        const initialData = await axios.get('/api/initialApp')

        if (!this.state.once)
          this.setState({ once: true })

        const loggedOut = initialData.data.userInfo == 1981;
        
        const isOnGuestRoute = guestRoutes.some((route) => window.location.href.includes(route));
        if (loggedOut && !isOnGuestRoute) {
          window.location.href = '/logout'
        }

        const shortLinkCode = window.location.href.split('/s/')[1];
        if (shortLinkCode) {
          this.setState({ hasLink: true });
          const link = await fetchShortLink(shortLinkCode);
          this.setState({ link }, () => {
            window.location.href = (this.state.link.includes('http') ? this.state.link : `${window.location.protocol}//${this.state.link}`);
          });
        }

        await axios.post('/api/userStatTransaction/login_sync', {
          login: 'LOGIN',
        })

        if (initialData.data.userInfo.has_additional != '1') {
          Update_ip_settings()
        }

        window.PORT = initialData.data.port
        window.LOGS_ON = initialData.data.logsOn || ''
        window.FEATURES_ON = initialData.data.featuresOn || ''
        window.PREVENT_RELOAD = initialData.data.preventReload || ''

        if (window.LOGS_ON.includes('EXPLAIN')) {
          const whyDidYouRender = require('@welldone-software/why-did-you-render')
          whyDidYouRender(React)
        }

        this.setState({ initialData: initialData.data })
        loadUserInfoToReduxStore({ ...initialData.data.userInfo, isAdmin: initialData.data.isAdmin })
        if (!loggedOut) {
          fetchNotifications()
          registerAccess()
        }
        const needsToRedirectToProfile = ['/profile', '/profile/'].includes(window.location.pathname);
        if (needsToRedirectToProfile) window.router.push(`/profile/${initialData.data.userInfo.alias}`);
      } catch (error) {
        console.log(error)
      }
    }
    getInitialData();
    window.addEventListener('focus', this.onFocus);
    this.registerServiceWorker();
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', this.onBackButtonEvent);
  }
  onBackButtonEvent = (e) => {
    e.preventDefault();
    this.refreshme()
  }
  componentWilUnmount() {
    window.removeEventListener('focus', this.onFocus)
  }

  onFocus = () => {
    window.document.title = 'myG'
  }

  registerServiceWorker = async () => {
    if (!('serviceWorker' in navigator)) throw new Error('No Service Worker support!')
    if (!('PushManager' in window)) throw new Error('No Push API Support!')
    const swRegistration = await navigator.serviceWorker.register('service.js')
    const permission = await window.Notification.requestPermission()
    if (permission !== 'granted') throw new Error('Permission not granted for Notification')
    window.notifier = swRegistration
  }

  renderRouter = () => {
    if (this.state.hasLink && !this.state.link) return null;
    return (
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
                  path='/guest'
                  component={(props) => (
                    <GuestFeeds
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
                    <ChatLinkContainer
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
                    <React.Fragment>
                      <ProfileContainer
                        routeProps={props}
                        initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData}
                        key={Math.random()}
                      />
                    </React.Fragment>
                  )}
                />

                <Route
                  exact
                  path='/profile/:alias/game/:gameId'
                  component={(props) => (
                    <React.Fragment>
                      <ProfileContainer
                        routeProps={props}
                        initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData}
                        key={Math.random()}
                      />
                    </React.Fragment>
                  )}
                />

                <Route
                  exact
                  path='/myg-chat'
                  component={() => (
                    <React.Fragment>
                      <Channel page channelId="main" key={Math.random()} />
                    </React.Fragment>
                  )}
                />

                <Route
                  exact
                  path='/achievements/:route'
                  component={(props) => (
                    <React.Fragment>
                      <AchievementsContainer
                        routeProps={props}
                        initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData}
                        key={Math.random()}
                      />
                    </React.Fragment>
                  )}
                />

                <Route
                  exact
                  path='/find-gamers/:route'
                  component={(props) => (
                    <React.Fragment>
                      <FindGamersContainer
                        routeProps={props}
                        initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData}
                        key={Math.random()}
                      />
                    </React.Fragment>
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
                  path='/hashtag/:content'
                  component={(props) => (
                    <HashTagList
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
                    <ScheduleGamesView
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
                    <ScheduleGamesView
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
                  path='/editScheduleGames/:id'
                  component={(props) => (
                    <EditScheduleGames
                      routeProps={props}
                      initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData}
                      key={Math.random()}
                    />
                  )}
                />

                <Route
                  exact
                  path='/community/create'
                  component={(props) => (
                    <CreateCommunity
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
                  path='/mobile-chat'
                  component={() => (
                    <MessengerLoader
                      mobile
                      profileImage={this.state.initialData && this.state.initialData.userInfo.profile_img}
                      userId={this.state.initialData && this.state.initialData.userInfo.id}
                      alias={this.state.initialData && this.state.initialData.userInfo.alias}
                      publicKey={this.state.initialData && this.state.initialData.userInfo.public_key}
                      loading={!this.state.initialData}
                      key={Math.random()}
                    />
                  )}
                />

                <Route
                  exact
                  path='/community/:name'
                  component={(props) => (
                    <CommunityView
                      routeProps={props}
                      initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData}
                      key={Math.random()}
                    />
                  )}
                />

                <Route
                  exact
                  path='/setEncryptionParaphrase/:encryption'
                  component={(props) => <EncryptionParaphraseRegistration routeProps={props} key={Math.random()} />}
                />

                <Route
                  exact
                  path='/createTeam'
                  component={() => (
                    <CreateTeam
                      userId={this.state.initialData && this.state.initialData.userInfo.id}
                      alias={this.state.initialData && this.state.initialData.userInfo.alias}
                      loading={!this.state.initialData}
                      key={Math.random()}
                    />
                  )}
                />

                <Route render={() => {this.state.hasLink ? null : <h3> Oops! I couldn't find that </h3>}} />
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

          <div className='mobile-main-container'>
            <MobileMenu
              initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData}
              key={Math.random()}
            />
            <Switch>
              <Route
                exact
                path='/posts/'
                component={(props) => (
                  <Posts
                    routeProps={props}
                    initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData}
                    key={Math.random()}
                  />
                )}
              />
            </Switch>

          </div>
        </div>
    )
  }

  renderGuestLink = () => {
    const uuidMatcher = new RegExp(/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/)
    const url = window.location.href
    const uuid = Array.isArray(url.match(uuidMatcher)) ? url.match(uuidMatcher)[0] : null
    return <GuestLink uuid={uuid} />
  }

  renderGuestGame = () => {
    const uuidMatcher = new RegExp(/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/)
    const url = window.location.href
    const uuid = Array.isArray(url.match(uuidMatcher)) ? url.match(uuidMatcher)[0] : null
    return <GuestGame uuid={uuid} />
  }

  renderGuestProfile = () => {
    const alias = location.pathname.split('/profile/')[1];
    return <GuestProfile alias={alias} />;
  }

  renderGuestPost = () => {
    const id = location.pathname.split('/post/')[1];
    return <GuestPost id={id} refreshme={this.refreshme} />;
  }

  renderGuestCommunity = () => {
    const id = location.pathname.split('/community/')[1];
    return <GuestCommunity id={id} />;
  }

  renderGuestFindGamers = () => {
    return <GuestFindGamers />;
  }
  renderGuestFeeds = () => {
    return <GuestFeeds />;
  }

  renderGuestRouter = () => {
    const guestLink = window.location.href.includes('/link');
    const guestGame = window.location.href.includes('/scheduledGames');
    const guestProfile = window.location.href.includes('/profile');
    const guestPost = window.location.href.includes('/post');
    const guestCommunity = window.location.href.includes('/community');
    const guestFindGamers = window.location.href.includes('/find-gamers/search');
    const guest = window.location.href.includes('/guest');
    if (!window.router) window.router = createBrowserHistory();
    if (this.state.hasLink && !this.state.link) return null;
    return (
      <Fragment>
        {guestLink && this.renderGuestLink()}
        {guestGame && this.renderGuestGame()}
        {guestProfile && this.renderGuestProfile()}
        {guestPost && this.renderGuestPost()}
        {guestCommunity && this.renderGuestCommunity()}
        {guestFindGamers && this.renderGuestFindGamers()}
        {guest && this.renderGuestFeeds()}
      </Fragment>
    );
  }

  render() {
    const isGuest = this.state.initialData && this.state.initialData.userInfo === 1981;
    const isOnGuestRoute = isGuest && guestRoutes.some((route) => window.location.href.includes(route));
    if (!window.router) window.router = createBrowserHistory();
    return (
      <ErrorHandler>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
          <BrowserRouter history={window.router} >
            <LanguageProvider>
              <PopupAlert />
              <ToastContainer
                autoClose={8000}
                draggablePercent={60}
                hideProgressBar={false}
                className='toast-container'
                toastClassName='dark-toast'
              />
              
              {!isOnGuestRoute && <Onboarding />}
              {!isOnGuestRoute && <Bubbles />}
              {!isOnGuestRoute && <LevelUp />}
              {!isOnGuestRoute && this.renderRouter()}
              {isOnGuestRoute && this.renderGuestRouter()}
              
            </LanguageProvider>
            </BrowserRouter>
          </PersistGate>
        </Provider>
      </ErrorHandler>
    )
  }
}

const app = document.getElementById('app')

ReactDOM.render(<Layout />, app)
