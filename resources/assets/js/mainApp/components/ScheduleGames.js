import React, { Component } from "react"
import Select from 'react-select'
import ReactDOM from "react-dom"
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from "react-router-dom"
import axios from "axios"
import moment from "moment"
import AsyncCreatableSelect from 'react-select/lib/AsyncCreatable'
import ScheduledGamePost from "./ScheduledGamePost"

const region_options = [
  { value: 'North America', label: 'North America' },
  { value: 'Europe', label: 'Europe' },
  { value: 'Asia', label: 'Asia' },
  { value: 'Russia', label: 'Russia' },
  { value: 'South America', label: 'South America' },
  { value: 'Oceania', label: 'Oceania' },
  { value: 'Middle East', label: 'Middle East' },
  { value: 'Africa', label: 'Africa' },
  { value: 'Central America', label: 'Central America' },
  { value: '', label: 'Earth' }
]
const experience_options = [
  { value: 'Casual', label: 'Casual' },
  { value: 'Semi Pro', label: 'Semi Pro' },
  { value: 'Professional', label: 'Professional' }
]
const platform_options = [
  { value: 'Any', label: 'Any' },
  { value: 'PC', label: 'PC' },
  { value: 'XB', label: 'XB' },
  { value: 'PS', label: 'PS' },
  { value: 'Nintendo', label: 'Nintendo' },
  { value: 'Mobile', label: 'Mobile' },
  { value: 'Tabletop', label: 'Tabletop' }
]
const date_options = [
  { value: 'Now-ish', label: 'Now-ish' },
  { value: '8 hours', label: '8 hours' },
  { value: '2 days', label: '2 days' },
  { value: '7 days', label: '7 days' },
  { value: '14 days', label: '14 days' }
]
const visibility_options = [
  { value: 1, label: 'Public' },
  { value: 2, label: 'Friends' },
  { value: 3, label: 'Group' }
]

const dota2_medal_ranks = [
  { value: 'Herald', label: 'Herald' },
  { value: 'Guardian', label: 'Guardian' },
  { value: 'Crusader', label: 'Crusader' },
  { value: 'Archon', label: 'Archon' },
  { value: 'Legend', label: 'Legend' },
  { value: 'Divine', label: 'Divine' }
]

const dota2_server_regions = [
  { value: 'EU West', label: 'EU West' },
  { value: 'EU East', label: 'EU East' },
  { value: 'EU North', label: 'EU North' },
  { value: 'Poland', label: 'Poland' },
  { value: 'Spain', label: 'Spain' },
  { value: 'US Northwest', label: 'US Northwest' },
  { value: 'US Northeast', label: 'US Northeast' },
  { value: 'US Northcentral', label: 'US Northcentral' },
  { value: 'US Southwest', label: 'US Southwest' },
  { value: 'Australia', label: 'Australia' },
  { value: 'Brazil', label: 'Brazil' },
  { value: 'Chile', label: 'Chile' },
  { value: 'Emirates', label: 'Emirates' },
  { value: 'India', label: 'India' },
  { value: 'India East', label: 'India East' },
  { value: 'Peru', label: 'Peru' },
  { value: 'Japan', label: 'Japan' },
  { value: 'Hong Kong', label: 'Hong Kong' },
  { value: 'Singapore', label: 'Singapore' },
  { value: 'South Africa', label: 'South Africa' },
  { value: 'China Shanghai', label: 'China Shanghai' },
  { value: 'China Guangzhou', label: 'China Guangzhou' },
  { value: 'China Tianjin', label: 'China Tianjin' },
  { value: 'China TC Zhejiang', label: 'China TC Zhejiang' },
  { value: 'China UC', label: 'China UC' },
  { value: 'China UC 2', label: 'China UC 2' },
  { value: 'China TC Wuhan', label: 'China TC Wuhan' },
]

const dota2_roles = [
  { value: 'Position 1', label: 'Position 1' },
  { value: 'Position 2', label: 'Position 2' },
  { value: 'Position 3', label: 'Position 3' },
  { value: 'Position 4', label: 'Position 4' },
  { value: 'Position 5', label: 'Position 5' }
]

const clash_royale_trophy = [
  { value: '1000', label: '> 1000' },
  { value: '2000', label: '> 2000' },
  { value: '3000', label: '> 3000' },
  { value: '4000', label: '> 4000' },
  { value: '5000', label: '> 5000' },
  { value: 'competitive', label: 'Competitive' }
]

const createOption = (label: string, game_names_id: string) => ({
label,
  value: label,
  game_names_id,
})

function isValidNewOption(
  inputValue,
  selectValue,
  selectOptions
) {
  return !(
    !inputValue ||
    selectValue.some(option => compareOption(inputValue, option)) ||
    selectOptions.some(option => compareOption(inputValue, option))
  );
}

const compareOption = (inputValue, option) => {
  const candidate =
    typeof inputValue === "string" ? inputValue.toLowerCase() : inputValue;
  if (typeof option.value === "string") {
    if (option.value.toLowerCase() === candidate) {
      return true;
    }
  }
  if (typeof option.label === "string") {
    if (option.label.toLowerCase() === candidate) {
      return true;
    }
  }
  return option.value === candidate || option.label === candidate;
};

export default class ScheduleGames extends Component {
  constructor() {
    super()
    this.state = {
      selected_region: null,
      selected_experience: null,
      selected_platform: null,
      game_name_box: null,
      description_box: "",
      other_box: "",
      visibility_box: null,
      when: null,
      tmp_time: "",
      show_fields_for_dota2: false,
      dota2_medal_ranks: null,
      dota2_server_regions: null,
      dota2_roles: null,
      clash_royale_trophies: null,
      show_fields_for_clash_royale: false,
      show_default_fields_region: true,
      show_default_fields_experience: true,
      show_default_fields_platform: true,
      db_row_counter: -10,
      show_prev: false,
      show_more: false,
      show_full_games: false,
      isChecked: true
    }
  }

  moveaway = () => {
    window.location.href = '/addscheduleGames'
  }

  componentWillMount(){

    const self = this

    const {match} = this.props.routeProps

    // const getInitialData = async function(){
    //   var myGame_name_box = "1981`^"
    //   var myRegion = "1981`^"
    //   var myExperience = "1981`^"
    //   var myPlatform = "1981`^"
    //   var myDescription_box = "1981`^"
    //   var myOther_box = "1981`^"
    //   var myWhenDate = "1981`^"
    //   var startDate = moment().subtract(5, 'seconds').utc().format('YYYY-MM-DDTHH:mm:ss')
    //   var tmp_endDate = moment().utc()
    //   var endDate = tmp_endDate.add(2000,'years').format('YYYY-MM-DDTHH:mm:ss')
    //   var myVisibility = 1
    //   var dota2_medal_ranks = "1981`^"
    //   var dota2_server_regions = "1981`^"
    //   var dota2_roles = "1981`^"
    //   var clash_royale_trophies = "1981`^"
    //   var myLimit = self.state.db_row_counter
    //
    //   try{
    //     //const allscheduledGames = await axios.get('/api/ScheduleGame')
    //     const allscheduledGames = await axios.get(`/api/ScheduleGame/filtered/${myLimit}/${myGame_name_box}/${myRegion}/${myExperience}/${myPlatform}/${myDescription_box}/${myOther_box}/${startDate}/${endDate}/${myWhenDate}/${myVisibility}/${dota2_medal_ranks}/${dota2_server_regions}/${dota2_roles}/${clash_royale_trophies}`)
    //     //self.state.allscheduledGames = allscheduledGames.data.latestScheduledGames[0]
    //     self.setState({
    //       allscheduledGames: allscheduledGames.data.latestScheduledGames[0]
    //     })
    //   } catch (error){
    //     console.log(error)
    //   }
    // }

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
      getExactData()
    } else{
      //getInitialData()
      this.fetchMoreData()
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

  handleChange_Region = (selected_region) => {
    this.setState({
      selected_region
    }, () => {
      this.pullData()
    })
  }
  handleChange_Experience = (selected_experience) => {
    this.setState({
      selected_experience
    }, () => {
      this.pullData()
    })
  }
  handleChange_Platform = (selected_platform) => {
    this.setState({
      selected_platform
    }, () => {
      this.pullData()
    })
  }
  handleChange_time = (when) => {
    this.setState({
      when
    }, () => {
      this.pullData()
    })
  }

  handleChange_game_name = (entered_name) => {
    this.setState({
      game_name_box: entered_name
    }, () => {
      this.pullData()
    })
    if (entered_name){
      if (entered_name.value == "Dota 2"){
        this.state.show_default_fields_experience = false
        this.state.show_default_fields_region = false
        this.state.show_default_fields_platform = false
        this.state.show_fields_for_clash_royale = false
        this.setState({show_fields_for_dota2: true})
      } else if (entered_name.value == "Clash Royale") {
        this.state.show_default_fields_platform = false
        this.state.show_default_fields_experience = true
        this.state.show_default_fields_region = true
        this.state.show_fields_for_dota2 = false
        this.setState({show_fields_for_clash_royale: true})
      }else {
        this.state.show_default_fields_experience = true
        this.state.show_default_fields_region = true
        this.state.show_default_fields_platform = true
        this.state.show_fields_for_clash_royale = false
        this.setState({show_fields_for_dota2: false})
      }
    }else {
      this.state.show_default_fields_experience = true
      this.state.show_default_fields_region = true
      this.state.show_default_fields_platform = true
      this.state.show_fields_for_clash_royale = false
      this.setState({show_fields_for_dota2: false})
    }
  }

  handleChange_description = (e) => {
    this.setState({
      description_box: e.target.value
    }, () => {
      this.pullData()
    })
  }

  handleChange_other = (e) => {
    this.setState({
      other_box: e.target.value
    }, () => {
      this.pullData()
    })
  }

  handleChange_Visibility = (visibility_box) => {
    this.setState({
      visibility_box
    }, () => {
      this.pullData()
    })
  }

  handleChange_Clash_royale_trophies = (clash_royale_trophies) => {
    this.setState({
      clash_royale_trophies
    }, () => {
      this.pullData()
    })
  }

  handleChange_Dota2_medal_ranks = (dota2_medal_ranks) => {
    this.setState({
      dota2_medal_ranks
    }, () => {
      this.pullData()
    })
  }
  handleChange_Dota2_server_regions = (dota2_server_regions) => {
    this.setState({
      dota2_server_regions
    }, () => {
      this.pullData()
    })
  }
  handleChange_Dota2_roles = (dota2_roles) => {
    this.setState({
      dota2_roles
    }, () => {
      this.pullData()
    })
  }

  toggleChange = () => {
   this.setState({
    isChecked: !this.state.isChecked,
    db_row_counter: 0
   }, () => {
     this.pullData()
   })
 }

  showLatestPosts = () => {
    if(this.state.allscheduledGames != undefined){
      // let filteredResults = this.state.allscheduledGames.filter(
      //   (result) => {
      //     var myRegion = ""
      //     var myExperience = ""
      //     var myPlatform = ""
      //
      //     //**** As per bug: https://github.com/mraaz/myGame/issues/9 I have changed the filters to be single, as a result, I've commented out this code
      //     // Once the bug is fixed we can uncomment the code     ****
      //
      //     // if (this.state.selected_region !== null && this.state.selected_region.length !== 0){
      //     //   for (var i = 0; i < this.state.selected_region.length; i++){
      //     //    myRegion += this.state.selected_region[i].value + "; "
      //     //   }
      //     //   myRegion = myRegion.trim().replace(/; /g, ",").trim()
      //     //   myRegion = myRegion.replace(/;/g, "")
      //     //   myRegion = myRegion.replace(/,/g, ", ")
      //     // }
      //     if (this.state.selected_region != null || this.state.selected_region != undefined){
      //       myRegion = this.state.selected_region.value
      //     }
      //     if (this.state.selected_experience != null || this.state.selected_experience != undefined){
      //       myExperience = this.state.selected_experience.value
      //     }
      //     if (this.state.selected_platform != null || this.state.selected_platform != undefined){
      //       myPlatform = this.state.selected_platform.value
      //     }
      //
      //     // if (this.state.selected_experience !== null && this.state.selected_experience.length !== 0){
      //     //   for (var i = 0; i < this.state.selected_experience.length; i++){
      //     //    myExperience += this.state.selected_experience[i].value + "; "
      //     //   }
      //     //   myExperience = myExperience.trim().replace(/; /g, ",").trim()
      //     //   myExperience = myExperience.replace(/;/g, "")
      //     //   myExperience = myExperience.replace(/,/g, ", ")
      //     // }
      //     // if (this.state.selected_platform !== null && this.state.selected_platform.length !== 0){
      //     //   for (var i = 0; i < this.state.selected_platform.length; i++){
      //     //    myPlatform += this.state.selected_platform[i].value + "; "
      //     //   }
      //     //   myPlatform = myPlatform.trim().replace(/; /g, ",").trim()
      //     //   myPlatform = myPlatform.replace(/;/g, "")
      //     //   myPlatform = myPlatform.replace(/,/g, ", ")
      //     // }
      //     if (this.state.when != null || this.state.when != undefined){
      //       this.state.tmp_time = this.state.when.value
      //     }
      //     const now = moment()
      //     switch(this.state.tmp_time) {
      //       case 'Now-ish':
      //         now.add(4,'hour')
      //         break
      //       case '8 hours':
      //         now.add(8,'hour')
      //         break
      //       case '2 days':
      //         now.add(2,'day')
      //         break
      //       case '7 days':
      //         now.add(7,'day')
      //         break
      //       case '14 days':
      //         now.add(14,'day')
      //         break
      //       default:
      //         now.add(2000,'years')
      //     }
      //     const myDate = moment(result.end_date_time)
      //
      //     return result.game_name.toLowerCase().indexOf(this.state.game_name_box.toLowerCase()) !== -1
      //      && result.description.toLowerCase().indexOf(this.state.description_box.toLowerCase()) !== -1
      //      && result.other.toLowerCase().indexOf(this.state.other_box.toLowerCase()) !== -1
      //      && result.region.indexOf(myRegion) !== -1
      //      && result.experience.indexOf(myExperience) !== -1
      //      && result.platform.indexOf(myPlatform) !== -1
      //      && myDate.isSameOrBefore(now)
      //   }
      // )
      return this.state.allscheduledGames.map((item, index) => {
       return <ScheduledGamePost schedule_game={item} key={index} user={this.props.initialData} />
      })
    }
  }

  async pullData() {
    //create SQL Statement and send it through
    //At the server end construct the statement and execute
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
    var check_full_games = this.state.isChecked

    if (this.state.visibility_box != undefined && this.state.visibility_box != null && this.state.visibility_box != ""){
      myVisibility = this.state.visibility_box.value
    }

    if (this.state.selected_region != undefined && this.state.selected_region != null && this.state.selected_region != ""){
      myRegion = this.state.selected_region.value
    }
    if (this.state.selected_experience != undefined && this.state.selected_experience != null && this.state.selected_experience != ""){
      myExperience = this.state.selected_experience.value
    }
    if (this.state.selected_platform != undefined && this.state.selected_platform != null && this.state.selected_platform != ""){
      myPlatform = this.state.selected_platform.value
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

    if (this.state.when != undefined && this.state.when != null ){
      switch(this.state.when.value) {
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

    if ( (this.state.game_name_box != null) && (this.state.game_name_box != "") ) {
      myGame_name_box = this.state.game_name_box.value
    }

    if (this.state.description_box != "" && this.state.description_box != undefined){
      myDescription_box = this.state.description_box
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

  async getOptions(inputValue) {
    if ( (inputValue == "") || (inputValue == undefined) ){
      return []
    }
    try{
      inputValue = inputValue.trimStart()
      const getGameName = await axios.get(`/api/GameNames/${inputValue}/gameSearchResults`)
      var results =  getGameName.data.gameSearchResults[0].filter(i =>
        i.game_name.toLowerCase().includes(inputValue.toLowerCase()));
      var newArr = []
      var i, newOption
      if (results.length != 0){
        for(i=0; i < results.length; i++){
          if ( (results[i].game_img != '') && (results[i].game_img != null) ){
            newOption = createOption(results[i].game_name, results[i].id )
            newOption.label = <img src={results[i].game_img}/>
          }else {
            newOption = createOption(results[i].game_name, results[i].id )
          }
          newArr.push(newOption)
        }
      } else {
        return []
      }
      return newArr
    } catch(error){
      console.log(error)
    }
  }

  render() {
    if (this.state.allscheduledGames !== undefined){
      const { selectedOption } = this.state

      return (
        <section id="posts">
          <div className="content-area scheduleGames-page">
          <div id="header-2"><img src="https://mygame-media.s3-ap-southeast-2.amazonaws.com/headers/headers_v1-17.png" /></div>
            <div className="filterMenu">
              <div className="game-name">
                <AsyncCreatableSelect
                  cacheOptions
                  defaultOptions
                  isValidNewOption={isValidNewOption}
                  loadOptions={this.getOptions}
                  onChange={this.handleChange_game_name}
                  isClearable
                  value={this.state.game_name_box}
                  className="game-name-box"
                  placeholder="Game name"
                  onInputChange={inputValue => (inputValue.length <= 88 ? inputValue : inputValue.substr(0, 88))}
                />
              </div>
              {this.state.show_default_fields_region && <div className="region">
                <Select
                  onChange={this.handleChange_Region}
                  options={region_options}
                  placeholder="Select your region"
                  name="region-box"
                  isClearable
                />
              </div>}
              {this.state.show_default_fields_experience && <div className="experience">
                <Select
                  onChange={this.handleChange_Experience}
                  options={experience_options}
                  placeholder="Select experience level"
                  name="experience-box"
                  isClearable
                />
              </div>}
              {this.state.show_default_fields_platform && <div className="platform">
                <Select
                  onChange={this.handleChange_Platform}
                  options={platform_options}
                  placeholder="Select which platform"
                  name="platform-box"
                  isClearable
                />
              </div>}
              {this.state.show_fields_for_clash_royale && <div className="clash_royale_trophies">
                <Select
                  onChange={this.handleChange_Clash_royale_trophies}
                  options={clash_royale_trophy}
                  className="clash-royale-trophies"
                  isClearable={true}
                  placeholder="Trophies"
                />
              </div>}
              {this.state.show_fields_for_dota2 && <div className="dota2_medal_ranks">
                <Select
                  onChange={this.handleChange_Dota2_medal_ranks}
                  options={dota2_medal_ranks}
                  className="dota2-medal-ranks"
                  isClearable={true}
                  placeholder="Rank"
                />
              </div>}
              {this.state.show_fields_for_dota2 && <div className="dota2_server_regions">
                <Select
                  onChange={this.handleChange_Dota2_server_regions}
                  options={dota2_server_regions}
                  className="dota2-server-regions"
                  isClearable={true}
                  placeholder="Region"
                />
              </div>}
              {this.state.show_fields_for_dota2 && <div className="dota2_roles">
                <Select
                  onChange={this.handleChange_Dota2_roles}
                  options={dota2_roles}
                  className="dota2-roles"
                  isClearable={true}
                  placeholder="Role"
                />
              </div>}
              <div className="date-time">
                <Select
                  onChange={this.handleChange_time}
                  options={date_options}
                  placeholder="When?"
                  name="date-time-box"
                  isClearable
                />
              </div>
              <div className="description">
                <input type="text" className="description-box" onChange={this.handleChange_description} value={this.state.description_box} placeholder="Description" />
              </div>
              <div className="other">
                <input type="text" className="other-box" onChange={this.handleChange_other} value={this.state.other_box} placeholder="Any Other stuff" />
              </div>
              <div className="visibility">
                <Select
                  onChange={this.handleChange_Visibility}
                  options={visibility_options}
                  placeholder="Select visibility"
                  name="visibility-box"
                  isClearable
                />
              </div>
              <div className="button">
                <div className="plus-button" onClick={this.moveaway}>
                  <i className="fas fa-plus" />
                </div>
                <div className="full-game">
                  <input type="checkbox" defaultChecked={this.state.isChecked} onChange={this.toggleChange} />&nbsp;Exclude Full Games?
                </div>
              </div>
            </div>
            <div className="gap">
            </div>
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
