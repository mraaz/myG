import "@babel/polyfill";
import React, { Component } from "react"
import ReactDOM from "react-dom"
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from "react-router-dom"
import axios from "axios"
import Home from "./components/Home"
import Profile from "./components/Profile"
import ScheduleGames from "./components/ScheduleGames"
import MyScheduledGames from "./components/MyScheduledGames"
import LeftMenu from "./components/LeftMenu"
import Messenger from "./components/Messenger"
import SearchHeader from "./components/SearchHeader"
import ComposeSection from "./components/ComposeSection"
import Posts from "./components/Posts"
import LoadingComp from "./components/LoadingComp"
import AddScheduleGames from "./components/AddScheduleGames"
import Dossier from "./components/Dossier"
import AddGamingExp from "./components/AddGamingExp"
import EditGamingExp from "./components/EditGamingExp"
import IndividualPost from "./components/IndividualPost"
import IndividualComment from "./components/IndividualComment"
import IndividualReply from "./components/IndividualReply"
import MyPosts from "./components/MyPosts"
import MyHome from "./components/MyHome"
import MyComposeSection from "./components/MyComposeSection"
import Invitation from "./components/Invitation"
import IndividualInvitation from "./components/IndividualInvitation"
import MyFriends from "./components/MyFriends"
import IndividualFriend from "./components/IndividualFriend"
import ScheduledGamePost from "./components/ScheduledGamePost"
import MySettings from "./components/MySettings"
import IndividualGamingExperience from "./components/IndividualGamingExperience"
import UploadPic from "./components/UploadPic"
import Notifications from "./components/Notifications"
import IndividualNotification from "./components/IndividualNotification"
import SinglePost from "./components/SinglePost"
import IndividualEsportsExperience from "./components/IndividualEsportsExperience"
import AddEsportsExp from "./components/AddEsportsExp"
import EditEsportsExp from "./components/EditEsportsExp"
import AdvancedSearch from "./components/AdvancedSearch"
import IndividualPlayer from "./components/IndividualPlayer"
import PlayerList from "./components/PlayerList"
import GroupMain from "./components/GroupMain"
import ScheduledGamesApprovals from "./components/ScheduledGamesApprovals"
import GroupHome from "./components/GroupHome"
import MyApprovals from "./components/MyApprovals"
import Member_lists from "./components/Member_lists"
import ArchivedScheduledGames from "./components/ArchivedScheduledGames"


class Layout extends Component {
  constructor() {
    super()
    this.state = {
      name: "Raaz",
    }
  }
  componentWillMount() {
    const self = this
    const getInitialData = async function () {
      try {
        const initialData = await axios.get('/api/initialApp')

        if (initialData.data.userInfo == 1981) {
          window.location.href = "/"
        }

        self.setState({
          initialData: initialData.data
        })

      } catch (error) {
        console.log(error)
      }
    }
    getInitialData()
  }

  render() {
    return (
      <Router>
        <div className="app-container home-page">
          <LeftMenu initialData={(this.state.initialData == undefined) ? 'loading' : this.state.initialData} />
          <section id="content-container">
            <SearchHeader />
            <Switch>
              <Route exact path="/" component={(props) => <Home routeProps={props}
                initialData={(this.state.initialData == undefined) ? 'loading' : this.state.initialData} />} />

              <Route exact path="/profile/:id" component={(props) => <Profile routeProps={props}
                initialData={(this.state.initialData == undefined) ? 'loading' : this.state.initialData} />} />

              <Route exact path="/myPosts/" component={(props) => <MyHome routeProps={props}
                initialData={(this.state.initialData == undefined) ? 'loading' : this.state.initialData} />} />

              <Route exact path="/post/:id" component={(props) => <SinglePost routeProps={props}
                initialData={(this.state.initialData == undefined) ? 'loading' : this.state.initialData} />} />

              <Route exact path="/profile/:id/edit/dossier" component={(props) => <Dossier routeProps={props}
                initialData={(this.state.initialData == undefined) ? 'loading' : this.state.initialData} />} />

              <Route exact path="/profile/:id/upload/profile" component={(props) => <UploadPic routeProps={props}
                initialData={(this.state.initialData == undefined) ? 'loading' : this.state.initialData} />} />

              <Route exact path="/profile/:id/upload/bg_profile" component={(props) => <UploadPic routeProps={props}
                initialData={(this.state.initialData == undefined) ? 'loading' : this.state.initialData} />} />

              <Route exact path="/profile/:id/upload/img_profile" component={(props) => <UploadPic routeProps={props}
                initialData={(this.state.initialData == undefined) ? 'loading' : this.state.initialData} />} />

              <Route exact path="/profile/:id/add/gamingexp" component={(props) => <AddGamingExp routeProps={props}
                initialData={(this.state.initialData == undefined) ? 'loading' : this.state.initialData} />} />

              <Route exact path="/profile/:id/edit/gamingexp/:game_id" component={(props) => <EditGamingExp routeProps={props}
                initialData={(this.state.initialData == undefined) ? 'loading' : this.state.initialData} />} />

              <Route exact path="/profile/:id/add/esportsExp" component={(props) => <AddEsportsExp routeProps={props}
                initialData={(this.state.initialData == undefined) ? 'loading' : this.state.initialData} />} />

              <Route exact path="/profile/:id/edit/esportsExp/:esportsExp_id" component={(props) => <EditEsportsExp routeProps={props}
                initialData={(this.state.initialData == undefined) ? 'loading' : this.state.initialData} />} />

              <Route exact path="/scheduledGames" component={(props) => <ScheduleGames routeProps={props}
                initialData={(this.state.initialData == undefined) ? 'loading' : this.state.initialData} />} />

              <Route exact path="/scheduledGames/:id" component={(props) => <ScheduleGames routeProps={props}
                initialData={(this.state.initialData == undefined) ? 'loading' : this.state.initialData} />} />

              <Route exact path="/myScheduledGames" component={(props) => <MyScheduledGames routeProps={props}
                initialData={(this.state.initialData == undefined) ? 'loading' : this.state.initialData} />} />

              <Route exact path="/addScheduleGames" component={(props) => <AddScheduleGames routeProps={props}
                initialData={(this.state.initialData == undefined) ? 'loading' : this.state.initialData} />} />

              <Route exact path="/invitation" component={(props) => <Invitation routeProps={props}
                initialData={(this.state.initialData == undefined) ? 'loading' : this.state.initialData} />} />

              <Route exact path="/notifications" component={(props) => <Notifications routeProps={props}
                initialData={(this.state.initialData == undefined) ? 'loading' : this.state.initialData} />} />

              <Route exact path="/myFriends" component={(props) => <MyFriends routeProps={props}
                initialData={(this.state.initialData == undefined) ? 'loading' : this.state.initialData} />} />

              <Route exact path="/mySettings" component={(props) => <MySettings routeProps={props}
                initialData={(this.state.initialData == undefined) ? 'loading' : this.state.initialData} />} />

              <Route exact path="/advancedSearch" component={(props) => <AdvancedSearch routeProps={props}
                initialData={(this.state.initialData == undefined) ? 'loading' : this.state.initialData} />} />

              <Route exact path="/advancedSearch/:id/:table" component={(props) => <AdvancedSearch routeProps={props}
                initialData={(this.state.initialData == undefined) ? 'loading' : this.state.initialData} />} />

              <Route exact path="/playerList/:id" component={(props) => <PlayerList routeProps={props}
                initialData={(this.state.initialData == undefined) ? 'loading' : this.state.initialData} />} />

              <Route exact path="/archive_playerList/:archive_id" component={(props) => <PlayerList routeProps={props}
                initialData={(this.state.initialData == undefined) ? 'loading' : this.state.initialData} />} />

              <Route exact path="/groups/" component={(props) => <GroupMain routeProps={props}
                initialData={(this.state.initialData == undefined) ? 'loading' : this.state.initialData} />} />

              <Route exact path="/groups/:id" component={(props) => <GroupHome routeProps={props}
                initialData={(this.state.initialData == undefined) ? 'loading' : this.state.initialData} />} />

              <Route exact path="/scheduledGamesApprovals/:id" component={(props) => <ScheduledGamesApprovals routeProps={props}
                initialData={(this.state.initialData == undefined) ? 'loading' : this.state.initialData} />} />

              <Route exact path="/myApprovals/:id" component={(props) => <MyApprovals routeProps={props}
                initialData={(this.state.initialData == undefined) ? 'loading' : this.state.initialData} />} />

              <Route exact path="/groups/:id/members" component={(props) => <Member_lists routeProps={props}
                initialData={(this.state.initialData == undefined) ? 'loading' : this.state.initialData} />} />

              <Route exact path="/archived_scheduledGames/:id" component={(props) => <ArchivedScheduledGames routeProps={props}
                initialData={(this.state.initialData == undefined) ? 'loading' : this.state.initialData} />} />
            </Switch>
          </section>
          <Messenger
            userId={this.state.initialData && this.state.initialData.userInfo.id}
            loading={!this.state.initialData}
          />
        </div>
      </Router>
    )
  }
}

const app = document.getElementById("app")

ReactDOM.render(<Layout />, app)
