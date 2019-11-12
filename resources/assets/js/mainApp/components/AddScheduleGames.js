import React, { Component } from "react"
import Select from 'react-select'
import ReactDOM from "react-dom"
import { Route, Redirect } from 'react-router'
import axios from "axios"
import DatePicker from "react-datepicker"
import moment from "moment"
import "react-datepicker/dist/react-datepicker.css"
import AsyncCreatableSelect from 'react-select/lib/AsyncCreatable'
import uuid from "uuid"

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
  { value: 'Earth', label: 'Earth' }
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
const expiry_options = [
  { value: '8 hours', label: '8 hours' },
  { value: '2 days', label: '2 days' },
  { value: '7 days', label: '7 days' },
  { value: '14 days', label: '14 days' },
  { value: '1 month', label: '1 month' }
]
const visibility_options = [
  { value: 1, label: 'Public' },
  { value: 2, label: 'Friends' },
  { value: 3, label: 'Group' },
  { value: 4, label: 'Hidden' }
]
const limit_options = [
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 20, label: '20' },
  { value: 25, label: '25' },
  { value: 30, label: '30' },
  { value: 40, label: '40' },
  { value: 50, label: '50' },
  { value: 100, label: '100' },
  { value: 42, label: 'Unlimited' }
]

const dota2_medal_ranks = [
  { value: 'Herald', label: 'Herald' },
  { value: 'Guardian', label: 'Guardian' },
  { value: 'Crusader', label: 'Crusader' },
  { value: 'Archon', label: 'Archon' },
  { value: 'Legend', label: 'Legend' },
  { value: 'Ancient', label: 'Ancient' },
  { value: 'Divine', label: 'Divine' },
  { value: 'Immortal', label: 'Immortal' }
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

export default class AddScheduleGames extends Component {
  constructor() {
    super()
    this.state = {
      selected_region: null,
      selected_experience: null,
      selected_platform: null,
      selected_expiry: null,
      selected_visibility: [{label: "Public", value: 1}],
      selected_limit: [{label: "Unlimited", value: 42}],
      startDate: moment(),
      endDate: null,
      game_name_box: "",
      description_box: "",
      other_box: "",
      tmp_expiry: "2 days",
      redirect_scheduleGames: false,
      refresh_addscheduleGames: false,
      txtAreaValue: "",
      show_fields_for_dota2: false,
      dota2_medal_ranks: null,
      dota2_server_regions: null,
      dota2_roles: null,
      show_default_fields_region: true,
      show_default_fields_experience: true,
      show_default_fields_platform: true,
      show_fields_for_clash_royale: false,
      clash_royale_trophy: null,
      just_one_time: true
    }
  }

  submitForm = async () => {
    if ( (this.state.game_name_box == "") || (this.state.game_name_box == null) ) {
      alert("Sorry mate! Game name can not be blank")
      return
    }
    if (this.state.startDate == null || this.state.startDate == undefined){
      alert("Sorry mate! Start date can not be empty")
      return
    }

    if (this.state.startDate.isSameOrAfter(this.state.endDate)) {
      alert("Sorry mate! End date needs to be AFTER start date")
      return
    }
    this.submitData()
    this.setState({refresh_addscheduleGames: true})
  }

  submitForm_moveaway = async () => {
    if ( (this.state.game_name_box == "") || (this.state.game_name_box == null) ){
      alert("Sorry mate! Game name can not be blank")
      return
    }

    if (this.state.startDate == null || this.state.startDate == undefined){
      alert("Sorry mate! Start date can not be empty")
      return
    }

    if (this.state.startDate.isSameOrAfter(this.state.endDate)) {
      alert("Sorry mate! End date needs to be AFTER start date")
      return
    }
    this.submitData()
    //this.setState({redirect_scheduleGames: true})
  }

  async submitData() {
    try {
      var myRegion = ""
      var myExperience = ""
      var myPlatform = ""
      var myVisibility = 1
      var myLimit = 42
      var myDota2_medal_ranks = ""
      var myDota2_server_regions = ""
      var myDota2_roles = ""
      var myClash_royale_trophies = ""
      var now = moment()
      var end_date = this.state.endDate


      if (this.state.selected_region !== null && this.state.selected_region.length !== 0){
        for (var i = 0; i < this.state.selected_region.length; i++){
         myRegion += this.state.selected_region[i].value + "; "
        }
        myRegion = myRegion.trim().replace(/; /g, ",").trim()
        myRegion = myRegion.replace(/;/g, "")
        myRegion = myRegion.replace(/,/g, ", ")
      }

      if (this.state.selected_experience !== null && this.state.selected_experience.length !== 0){
        for (var i = 0; i < this.state.selected_experience.length; i++){
         myExperience += this.state.selected_experience[i].value + "; "
        }
        myExperience = myExperience.trim().replace(/; /g, ",").trim()
        myExperience = myExperience.replace(/;/g, "")
        myExperience = myExperience.replace(/,/g, ", ")
      }

      if (this.state.selected_platform !== null && this.state.selected_platform.length !== 0){
        for (var i = 0; i < this.state.selected_platform.length; i++){
         myPlatform += this.state.selected_platform[i].value + "; "
        }
        myPlatform = myPlatform.trim().replace(/; /g, ",").trim()
        myPlatform = myPlatform.replace(/;/g, "")
        myPlatform = myPlatform.replace(/,/g, ", ")
      }

      if (this.state.endDate != null || this.state.endDate != undefined){
        now = moment(this.state.endDate)
        now.add(8,'hour')
      } else {
        now = moment(this.state.startDate)
        end_date = moment(now)
        end_date.add(18,'hour')
        now.add(18,'hour')
      }

      if (this.state.selected_visibility != null || this.state.selected_visibility != undefined){
        myVisibility = this.state.selected_visibility.value
      }

      if (this.state.selected_limit != null || this.state.selected_limit != undefined){
        myLimit = this.state.selected_limit.value
      }

      if (this.state.clash_royale_trophy != null || this.state.clash_royale_trophy != undefined){
        myClash_royale_trophies = this.state.clash_royale_trophy.value
      }

      if (this.state.dota2_medal_ranks !== null && this.state.dota2_medal_ranks.length !== 0){
        for (var i = 0; i < this.state.dota2_medal_ranks.length; i++){
         myDota2_medal_ranks += this.state.dota2_medal_ranks[i].value + "; "
        }
        myDota2_medal_ranks = myDota2_medal_ranks.trim().replace(/; /g, ",").trim()
        myDota2_medal_ranks = myDota2_medal_ranks.replace(/;/g, "")
        myDota2_medal_ranks = myDota2_medal_ranks.replace(/,/g, ", ")
      }

      if (this.state.dota2_server_regions !== null && this.state.dota2_server_regions.length !== 0){
        for (var i = 0; i < this.state.dota2_server_regions.length; i++){
         myDota2_server_regions += this.state.dota2_server_regions[i].value + "; "
        }
        myDota2_server_regions = myDota2_server_regions.trim().replace(/; /g, ",").trim()
        myDota2_server_regions = myDota2_server_regions.replace(/;/g, "")
        myDota2_server_regions = myDota2_server_regions.replace(/,/g, ", ")
      }

      if (this.state.dota2_roles !== null && this.state.dota2_roles.length !== 0){
        for (var i = 0; i < this.state.dota2_roles.length; i++){
         myDota2_roles += this.state.dota2_roles[i].value + "; "
        }
        myDota2_roles = myDota2_roles.trim().replace(/; /g, ",").trim()
        myDota2_roles = myDota2_roles.replace(/;/g, "")
        myDota2_roles = myDota2_roles.replace(/,/g, ", ")
      }


      // const now = moment()
      //
      // if(myEndDate !=""){
      //   myEndDate.add(12,'hour')
      //   now = myEndDate
      // }
      //
      // switch(this.state.tmp_expiry) {
      //   case '8 hours':
      //     now.add(8,'hour')
      //     break
      //   case '2 days':
      //     now.add(2,'day')
      //     break
      //   case '7 days':
      //     now.add(7,'day')
      //     break
      //   case '14 days':
      //     now.add(14,'day')
      //     break
      //   case '1 month':
      //     now.add(1,'month')
      //     break
      //   default:
      //     now.add(2,'day')
      // }

      const uuidv1 = require('uuid/v1')
      var tmp = uuidv1()

      if(!this.state.just_one_time){
        return
      }
      this.state.just_one_time = false

      const post = await axios.post('/api/ScheduleGame',{
        game_name_box: this.state.game_name_box.value,
        user_id: this.props.initialData.userInfo.id,
        selected_region: myRegion,
        selected_experience: myExperience,
        start_date_time: this.state.startDate,
        end_date_time: end_date,
        selected_platform: myPlatform,
        description_box: this.state.description_box,
        other_box: this.state.other_box,
        selected_expiry: now,
        visibility: myVisibility,
        limit: myLimit,
        accept_msg: this.state.txtAreaValue.trim(),
        dota2_medal_ranks: myDota2_medal_ranks,
        dota2_server_regions: myDota2_server_regions,
        dota2_roles: myDota2_roles,
        schedule_games_GUID: tmp,
        clash_royale_trophies: myClash_royale_trophies
      })
      if (myVisibility == 2){
        const getFriends = await axios.get('/api/friends/allmyFriends')
        for (var i=0; i < getFriends.data.showallMyFriends.length; i++){
          const post_game = axios.post('/api/notifications/addScheduleGame',{
            other_user_id: getFriends.data.showallMyFriends[i].friend_id,
            schedule_games_id: post.data.id
          })
        }
        window.location.href = '/myScheduledGames'
      } else {
        window.location.href = '/scheduledGames'
      }
    } catch(error){
      console.log(error)
    }
  }

  handleChange_Region = (selected_region) => {
    this.setState({ selected_region })
  }
  handleChange_Experience = (selected_experience) => {
    this.setState({ selected_experience })
  }
  handleChange_Platform = (selected_platform) => {
    this.setState({ selected_platform })
  }
  handleChange_Expiry = (selected_expiry) => {
    this.setState({ selected_expiry })
  }
  handleChange_Visibility = (selected_visibility) => {
    this.setState({ selected_visibility })
  }
  handleChange_Limit = (selected_limit) => {
    this.setState({ selected_limit })
  }
  handleChange_forStartdate = (date) => {
    this.setState({ startDate: date })
  }
  handleChange_forEnddate = (date) => {
    this.setState({ endDate: date })
  }
  handleChange = (e) => {
    this.setState({[e.target.id]: e.target.value})
  }

  handleChange_Clash_royale_trophy = (clash_royale_trophy) => {
    this.setState({ clash_royale_trophy })
  }


  handleChange_Dota2_medal_ranks = (dota2_medal_ranks) => {
    this.setState({ dota2_medal_ranks })
  }
  handleChange_Dota2_server_regions = (dota2_server_regions) => {
    this.setState({ dota2_server_regions })
  }
  handleChange_Dota2_roles = (dota2_roles) => {
    this.setState({ dota2_roles })
  }

  handleCreate_game_name = (inputValue: any) => {
    setTimeout(() => {
      const newOption = createOption(inputValue, null)
      this.setState({ game_name_box:  newOption })
    }, 300)
  }

  handleChange_for_gameName = (entered_name) => {
    this.setState({ game_name_box: entered_name })
    if (entered_name){
      if (entered_name.value == "Dota 2"){
        this.state.show_default_fields_experience = false
        this.state.show_default_fields_region = false
        this.state.show_default_fields_platform = false
        this.state.show_fields_for_clash_royale = false
        this.setState({show_fields_for_dota2: true})
      }
      else if (entered_name.value == "Clash Royale") {
        this.state.show_default_fields_experience = true
        this.state.show_default_fields_region = true
        this.state.show_default_fields_platform = false
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

  handleChange_txtArea = (e) => {
    this.setState({txtAreaValue: e.target.value})
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

  onKeyDown = e => {
    if (e.keyCode === 222 || e.keyCode === 191 || e.keyCode === 190 || e.keyCode === 220 || e.keyCode === 53 || e.keyCode === 51 || e.keyCode === 191) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  render() {
    if (this.state.redirect_scheduleGames === true) {
      window.location.href = '/scheduledGames'
    }
    if (this.state.refresh_addscheduleGames === true) {
      window.location.reload()
    }
      return (
        <div className="content-area addscheduleGames-page">
        <div id="header-2"><img src="https://mygame-media.s3-ap-southeast-2.amazonaws.com/headers/headers_v1-18.png" /></div>
          <div className="content">
            <div className="game-name">
              <div><label>Game Name: <span style={{color: "red"}}>*</span></label></div>
              <AsyncCreatableSelect
                cacheOptions
                defaultOptions
                isValidNewOption={isValidNewOption}
                loadOptions={this.getOptions}
                onChange={this.handleChange_for_gameName}
                onCreateOption={this.handleCreate_game_name}
                isClearable
                value={this.state.game_name_box}
                onBlur={this.onBlur_game_name}
                onFocus={this.onFocus_game_name}
                className="game_name_box"
                placeholder="Enter Game name"
                onInputChange={inputValue => (inputValue.length <= 88 ? inputValue : inputValue.substr(0, 88))}
                onKeyDown={this.onKeyDown}
              />
            </div>
            <div className="date-time">
              <div className="date-time-label"><label>Start<span style={{color: "red"}}>*</span> and End date:</label></div>
              {/*}<input type="text" className="start-date-box" placeholder="8 Nov 2018" />*/}
              <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange_forStartdate}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="lll"
                timeCaption="time"
                className="start-date-box"
                todayButton={"Today"}
                shouldCloseOnSelect={true}
                onBlur={this.onBlur_date_name}
                onFocus={this.onFocus_date_name}
              />
              <p>till</p>
              <DatePicker
                selected={this.state.endDate}
                onChange={this.handleChange_forEnddate}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="lll"
                timeCaption="time"
                className="end-date-box"
                todayButton={"Today"}
                shouldCloseOnSelect={true}
                onBlur={this.onBlur_date_name}
                onFocus={this.onFocus_date_name}
                minDate={this.state.startDate}
                maxDate={moment(this.state.startDate).add(7,'days')}
              />
              {/* maxDate = Don't think its just games, it could be post for LFG for clan */}
            </div>
            {this.state.show_default_fields_region && <div className="region">
              <label>Region:</label>
              <Select
                onChange={this.handleChange_Region}
                options={region_options}
                isMulti
                placeholder="Select your region/s"
                className="region-box"
                onBlur={this.onBlur_region_name}
                onFocus={this.onFocus_region_name}
              />
            </div>}
            {this.state.show_default_fields_experience && <div className="experience">
              <label>Experience:</label>
              <Select
                onChange={this.handleChange_Experience}
                options={experience_options}
                isMulti
                placeholder="Select experience level/s"
                className="experience-box"
                onBlur={this.onBlur_experience_name}
                onFocus={this.onFocus_experience_name}
              />
            </div>}
            {this.state.show_default_fields_platform && <div className="platform">
              <label>Platform:</label>
              <Select
                onChange={this.handleChange_Platform}
                options={platform_options}
                isMulti
                placeholder="Select which platform/s"
                className="platform-box"
                onBlur={this.onBlur_platform_name}
                onFocus={this.onFocus_platform_name}
              />
            </div>}
            {this.state.show_fields_for_clash_royale && <div className="clash_royale_trophy">
              <div className="clash_royale_trophy_header">
                <img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/game_icons/clash_royale_logo.png' height="23" width="23"/>
                <label>Trophies:</label>
              </div>
              <Select
                onChange={this.handleChange_Clash_royale_trophy}
                options={clash_royale_trophy}
                className="clash-royale-trophy"
                isClearable={true}
              />
            </div>}
            {this.state.show_fields_for_dota2 && <div className="dota2_medal_ranks">
              <div className="dota2_medal_ranks_header">
                <img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/game_icons/dota_2_logo.png' height="23" width="23"/>
                <label>Medal Ranks:</label>
              </div>
              <Select
                onChange={this.handleChange_Dota2_medal_ranks}
                options={dota2_medal_ranks}
                className="dota2-medal-ranks"
                isClearable={true}
                isMulti
              />
            </div>}
            {this.state.show_fields_for_dota2 && <div className="dota2_server_regions">
              <div className="dota2_server_regions_header">
                <img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/game_icons/dota_2_logo.png' height="23" width="23"/>
                <label>Server Regions:</label>
              </div>
              <Select
                onChange={this.handleChange_Dota2_server_regions}
                options={dota2_server_regions}
                className="dota2-server-regions"
                isClearable={true}
                isMulti
              />
            </div>}
            {this.state.show_fields_for_dota2 && <div className="dota2_roles">
              <div className="dota2_roles_header">
                <img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/game_icons/dota_2_logo.png' height="23" width="23"/>
                <label>Which roles do you need?</label>
              </div>
              <Select
                onChange={this.handleChange_Dota2_roles}
                options={dota2_roles}
                className="dota2-roles"
                isClearable={true}
                isMulti
              />
            </div>}
            <div className="description">
              <label>Description:</label>
              <input type="text" id="description_box" className="description-box" maxLength="254" placeholder="Any details for this game?" onBlur={this.onBlur_description_name} onFocus={this.onFocus_description_name} onChange={this.handleChange} value={this.state.post_description_box}/>
            </div>
            <div className="other">
              <label>Other Info:</label>
              <input type="text" id="other_box" className="other-box" maxLength="254" placeholder="Additional comments?" onBlur={this.onBlur_other_name} onFocus={this.onFocus_other_name} onChange={this.handleChange} value={this.state.other_box}/>
            </div>
            <div className="limit">
              <label>Max number of players:</label>
              <Select
                onChange={this.handleChange_Limit}
                options={limit_options}
                className="limit-box"
                defaultValue={[limit_options[8]]}
                isClearable={false}
                onBlur={this.onBlur_limit_name}
                onFocus={this.onFocus_limit_name}
              />
            </div>
            <div className="visibility">
              <label>Visibility:</label>
              <Select
                onChange={this.handleChange_Visibility}
                options={visibility_options}
                className="visibility-box"
                defaultValue={[visibility_options[0]]}
                isClearable={false}
                onBlur={this.onBlur_expiry_name}
                onFocus={this.onFocus_expiry_name}
              />
            </div>
            {/*<div className="expiry">
              <div><label>Post Expiry: <span style={{color: "red"}}>*</span></label></div>
              <Select
                onChange={this.handleChange_Expiry}
                options={expiry_options}
                className="expiry-box"
                defaultValue={[expiry_options[1]]}
                isClearable={false}
                onBlur={this.onBlur_expiry_name}
                onFocus={this.onFocus_expiry_name}
              />
            </div>*/}
            <div>
            </div>
            <div className="accept-msg">
              <label>Accept Message:</label>
              <textarea
                className="txtarea-accept"
                rows={8}
                cols={80}
                placeholder="Msg that will be sent to players when they accept this game invite"
                value={this.state.txtAreaValue}
                onChange={this.handleChange_txtArea}
                maxLength="254"
              />
            </div>
            <div className="buttons">
              <button className="save" type="button" onClick={this.submitForm_moveaway}>&nbsp;&nbsp;Create game&nbsp;&nbsp;</button>
              &nbsp;
              <button className="save-create" type="button" onClick={this.submitForm}>Save & Create Another</button>
            </div>
          </div>
        </div>
      )
  }
}
