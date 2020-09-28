// --- One way to disable adonis websocket logs.
const log = console.log
console.log = function() {
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
import ErrorHandler from './components/ErrorHandler'
import { store, persistor } from '../redux/Store'
import { loadUserInfoToReduxStore } from '../common/user'
import { FeatureEnabled, FeatureDisabled, PROFILE_V2 } from '../common/flags'
import 'bootstrap/dist/css/bootstrap.min.css'

import {
  Home,
  Profile,
  ProfileContainer,
  LeftMenu,
  MessengerLoader,
  ChatUnreadMessages,
  EncryptionParaphraseRegistration,
  GuestLink,
  Posts,
  LoadingComp,
  AddScheduleGames,
  MySettings,
  SinglePost,
  IndividualEsportsExperience,
  AdvancedSearch,
  ScheduledGamesApprovals,
  ScheduleGamesView,
  CreateCommunity,
  EditScheduleGames,
  MobileMenu,
  CommunityView,
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
    const getInitialData = async function() {
      try {
        const initialData = await axios.get('/api/initialApp')
        window.PORT = initialData.data.port
        window.LOGS_ON = initialData.data.logsOn || ''
        window.FEATURES_ON = initialData.data.featuresOn || ''

        if (window.LOGS_ON.includes('EXPLAIN')) {
          const whyDidYouRender = require('@welldone-software/why-did-you-render')
          whyDidYouRender(React)
        }

        if (initialData.data.userInfo == 1981 && !window.location.href.includes('/link')) {
          window.location.href = '/'
        }

        self.setState({
          initialData: initialData.data,
        })

        loadUserInfoToReduxStore(initialData.data.userInfo)
      } catch (error) {
        console.log(error)
      }
    }
    getInitialData()

    window.addEventListener('focus', this.onFocus)
    this.registerServiceWorker()
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
                  path='/profile/:alias'
                  component={(props) => (
                    <React.Fragment>
                      <FeatureEnabled allOf={[PROFILE_V2]}>
                        <ProfileContainer
                          routeProps={props}
                          initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData}
                          key={Math.random()}
                        />
                      </FeatureEnabled>

                      <FeatureDisabled anyOf={[PROFILE_V2]}>
                        <Profile
                          routeProps={props}
                          initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData}
                          key={Math.random()}
                        />
                      </FeatureDisabled>
                    </React.Fragment>
                  )}
                />

                <Route
                  exact
                  path='/profile/:alias/game/:gameId'
                  component={(props) => (
                    <React.Fragment>
                      <FeatureEnabled allOf={[PROFILE_V2]}>
                        <ProfileContainer
                          routeProps={props}
                          initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData}
                          key={Math.random()}
                        />
                      </FeatureEnabled>
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
                  path='/setEncryptionParaphrase/:encryption'
                  component={(props) => <EncryptionParaphraseRegistration routeProps={props} key={Math.random()} />}
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
      <ErrorHandler>
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
      </ErrorHandler>
    )
  }
}

const app = document.getElementById('app')

ReactDOM.render(<Layout />, app)
