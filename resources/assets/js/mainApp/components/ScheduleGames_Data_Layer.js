import React, { Component } from "react"
import ReactDOM from "react-dom"
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from "react-router-dom"
import axios from "axios"
import moment from "moment"
import ScheduledGamePost from "./ScheduledGamePost"

export default class ScheduleGames_Data_Layer extends Component {
  constructor() {
    super()
    this.state = {
      db_row_counter: -10,
      show_prev: false,
      show_more: false,
      just_one_time: true
    }
  }

  componentWillMount(){

    const self = this

    const {match} = this.props.props.props.routeProps

    const getExactData = async function(){
      try{
        const onescheduledGames = await axios.get(`/api/ScheduleGame/filtered_by_one/${match.params.id}`)
        self.setState({
          allscheduledGames: onescheduledGames.data.latestScheduledGames
        })
      } catch (error){
        console.log(error)
      }
    }

    if (match.params.id != undefined && match.params.id != "" ){
      getExactData(), () => {
        this.state.just_one_time = false
      }
    } else{
      this.fetchMoreData(), () => {
        this.state.just_one_time = false
      }

    }
  }

  fetchMoreData = () => {

    this.setState({
      db_row_counter: this.state.db_row_counter + 10
    }, () => {
      this.pullData()
      if (this.state.db_row_counter > 9){
        this.setState({show_prev: true})
      }
    })
    window.scrollTo(0, 0)
  }

  fetchPrevData = () => {
    this.setState({
      db_row_counter: this.state.db_row_counter - 10
    }, () => {
      this.pullData()
      if (this.state.db_row_counter < 11){
        this.setState({show_prev: false})
      }
    })
    window.scrollTo(0, 0)
  }

  async pullData() {
    //create SQL Statement and send it through
    //At the server end construct the statement and execute
    console.log("pulling");
    var myGame_name_box = "1981`^"
    var myRegion = "1981`^"
    var myExperience = "1981`^"
    var myPlatform = "1981`^"
    var myDescription_box = "1981`^"
    var myOther_box = "1981`^"
    var myWhenDate = "1981`^"
    var startDate = moment().subtract(5, 'seconds').utc().format('YYYY-MM-DDTHH:mm:ss')
    var tmp_endDate = moment().utc()
    var endDate
    var myVisibility = 1
    var dota2_medal_ranks = "1981`^"
    var dota2_server_regions = "1981`^"
    var dota2_roles = "1981`^"
    var clash_royale_trophies = "1981`^"
    var myLimit = this.state.db_row_counter
    var check_full_games = this.props.isChecked

    if (this.props.visibility_box != undefined && this.props.visibility_box != null && this.props.visibility_box != ""){
      myVisibility = this.props.visibility_box.value
    }

    if (this.props.selected_region != undefined && this.props.selected_region != null && this.props.selected_region != ""){
      myRegion = this.props.selected_region.value
    }
    if (this.props.selected_experience != undefined && this.props.selected_experience != null && this.props.selected_experience != ""){
      myExperience = this.props.selected_experience.value
    }
    if (this.props.selected_platform != undefined && this.props.selected_platform != null && this.props.selected_platform != ""){
      myPlatform = this.props.selected_platform.value
    }

    if (this.state.dota2_medal_ranks != undefined && this.state.dota2_medal_ranks != null && this.state.dota2_medal_ranks != ""){
      dota2_medal_ranks = this.state.dota2_medal_ranks.value
    }

    if (this.state.dota2_server_regions != undefined && this.state.dota2_server_regions != null && this.state.dota2_server_regions != ""){
      dota2_server_regions = this.state.dota2_server_regions.value
    }

    if (this.state.dota2_roles != undefined && this.state.dota2_roles != null && this.state.dota2_roles != ""){
      dota2_roles = this.state.dota2_roles.value
    }

    if (this.state.clash_royale_trophies != undefined && this.state.clash_royale_trophies != null && this.state.clash_royale_trophies != ""){
      clash_royale_trophies = this.state.clash_royale_trophies.value
    }

    if (this.props.when != undefined && this.props.when != null ){
      switch(this.props.when.value) {
        case 'Now-ish':
          endDate = tmp_endDate.add(4,'hour').format('YYYY-MM-DDTHH:mm:ss')
          break
        case '8 hours':
          endDate = tmp_endDate.add(8,'hour').format('YYYY-MM-DDTHH:mm:ss')
          break
        case '2 days':
          endDate = tmp_endDate.add(2,'day').format('YYYY-MM-DDTHH:mm:ss')
          break
        case '7 days':
          endDate = tmp_endDate.add(7,'day').format('YYYY-MM-DDTHH:mm:ss')
          break
        case '14 days':
          endDate = tmp_endDate.add(14,'day').format('YYYY-MM-DDTHH:mm:ss')
          break
        default:
          endDate = tmp_endDate.add(2000,'years').format('YYYY-MM-DDTHH:mm:ss')
      }
      myWhenDate = endDate
    } else {
      endDate = tmp_endDate.add(2000,'years').format('YYYY-MM-DDTHH:mm:ss')
    }

    if ( (this.props.props.game_name_box != null) && (this.props.props.game_name_box != "") ) {
      myGame_name_box = this.props.props.game_name_box.value
    }

    if (this.props.description_box != "" && this.props.description_box != undefined){
      myDescription_box = this.props.description_box
    }

    //BUG: Without this, it keeps old posts. not sure why, so doing a hard reset
    this.setState({
      allscheduledGames: []
    })

    try{
      const allscheduledGames = await axios.get(`/api/ScheduleGame/filtered/${myLimit}/${myGame_name_box}/${myRegion}/${myExperience}/${myPlatform}/${myDescription_box}/${myOther_box}/${startDate}/${endDate}/${myWhenDate}/${myVisibility}/${dota2_medal_ranks}/${dota2_server_regions}/${dota2_roles}/${clash_royale_trophies}/${check_full_games}`)
      if (allscheduledGames.data.latestScheduledGames[0].length > 10 ){
        this.setState({
          show_more: true
        })
        allscheduledGames.data.latestScheduledGames[0].pop()
      }else {
        this.setState({
          show_more: false
        })
      }
      this.setState({
        allscheduledGames: allscheduledGames.data.latestScheduledGames[0]
      })
    } catch (error){
      console.log(error)
    }
  }

  showLatestPosts = () => {
    if(this.state.allscheduledGames != undefined){
      return this.state.allscheduledGames.map((item, index) => {
       return <ScheduledGamePost schedule_game={item} key={index} user={this.props.initialData} />
      })
    }
  }

  render() {
    //onsole.log(this.props);

    if (this.state.allscheduledGames !== undefined){
      return (
        <section id="posts">
          <div className="content-area scheduleGames-page">
            {this.showLatestPosts()}
            {this.state.show_prev && <div className="prev_pls" onClick={this.fetchPrevData}>
              {'<'}- Previous
            </div>}
            {this.state.show_more && <div className="more_pls" onClick={this.fetchMoreData}>
              Next ->
            </div>}
          </div>
        </section>
      )
    }
    else {
      return (
        <div className="content-area scheduleGames-page">
          Loading
        </div>
      )
    }
  }
}
