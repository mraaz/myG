import React, { Component } from "react"
import Select from 'react-select'
import ReactDOM from "react-dom"
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from "react-router-dom"

import ScheduledGamePost from "./ScheduledGamePost"
import { PullDataFunction } from "./ScheduleGames_Pull_Data"

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

const dota2_medal_ranks = [
  { value: 'Herald', label: 'Herald' },
  { value: 'Guardian', label: 'Guardian' },
  { value: 'Crusader', label: 'Crusader' },
  { value: 'Archon', label: 'Archon' },
  { value: 'Legend', label: 'Legend' },
  { value: 'Divine', label: 'Divine' }
]

const experience_options = [
  { value: 'Casual', label: 'Casual' },
  { value: 'Semi Pro', label: 'Semi Pro' },
  { value: 'Professional', label: 'Professional' }
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

export default class ScheduleGames_Dota2 extends Component {
  constructor() {
    super()
    this.state = {
      game_name_box: "",
      selected_experience: null,
      description_box: "",
      other_box: "",
      visibility_box: null,
      when: null,
      isChecked: true,
      db_row_counter: 0,
      show_prev: false,
      show_more: false,
      dota2_medal_ranks: null,
      dota2_server_regions: null,
      dota2_roles: null
    }
  }

  moveaway = () => {
    window.location.href = '/addscheduleGames'
  }

  componentWillMount(){
    this.state.game_name_box = this.props.game_name_box
    this.call_PullDataFunc()
  }

  call_PullDataFunc = async () => {
    var tmp_allscheduledGames = await PullDataFunction(this.state)
    this.setState({
      allscheduledGames: []
    })

    if (tmp_allscheduledGames.data.latestScheduledGames.length > 10 ){
      this.setState({
        show_more: true
      })
      tmp_allscheduledGames.data.latestScheduledGames.pop()
    }else {
      this.setState({
        show_more: false
      })
    }
    this.setState({
      allscheduledGames: tmp_allscheduledGames.data.latestScheduledGames
    })
  }

  fetchMoreData = () => {
    this.setState({
      db_row_counter: this.state.db_row_counter + 10
    }, () => {
      this.call_PullDataFunc()
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
      this.call_PullDataFunc()
      if (this.state.db_row_counter < 9){
        this.setState({show_prev: false})
      }
    })
    window.scrollTo(0, 0)
  }

  handleChange_experience = (selected_experience) => {
    this.setState({
      selected_experience,
    }, () => {
      this.call_PullDataFunc()
    })
  }

  handleChange_time = (when) => {
    this.setState({
      when,
    }, () => {
      this.call_PullDataFunc()
    })
  }

  handleChange_description = (e) => {
    this.setState({
      description_box: e.target.value,
    }, () => {
      this.call_PullDataFunc()
    })
  }

  handleChange_other = (e) => {
    this.setState({
      other_box: e.target.value,
    }, () => {
      this.call_PullDataFunc()
    })
  }

  handleChange_visibility = (visibility_box) => {
    this.setState({
      visibility_box,
    }, () => {
      this.call_PullDataFunc()
    })
  }

  handleChange_Dota2_medal_ranks = (dota2_medal_ranks) => {
    this.setState({
      dota2_medal_ranks
    }, () => {
      this.call_PullDataFunc()
    })
  }
  handleChange_Dota2_server_regions = (dota2_server_regions) => {
    this.setState({
      dota2_server_regions
    }, () => {
      this.call_PullDataFunc()
    })
  }
  handleChange_Dota2_roles = (dota2_roles) => {
    this.setState({
      dota2_roles
    }, () => {
      this.call_PullDataFunc()
    })
  }

  toggleChange = () => {
    this.setState({
      isChecked: !this.state.isChecked,
      db_row_counter: 0
    }, () => {
      this.call_PullDataFunc()
    })
  }

  showLatestPosts = () => {
    if(this.state.allscheduledGames != undefined){
      return this.state.allscheduledGames.map((item, index) => {
       return <ScheduledGamePost schedule_game={item} key={index} user={this.props.props.initialData} />
      })
    }
  }

  render() {
    return (
      <section id="posts">
        <div className="content-area scheduleGames-page">
          <div className="filterMenu">
            <div className="dota2_medal_ranks">
              <Select
                onChange={this.handleChange_Dota2_medal_ranks}
                options={dota2_medal_ranks}
                className="dota2-medal-ranks"
                isClearable={true}
                placeholder="Rank"
              />
            </div>
            <div className="dota2_server_regions">
              <Select
                onChange={this.handleChange_Dota2_server_regions}
                options={dota2_server_regions}
                className="dota2-server-regions"
                isClearable={true}
                placeholder="Region"
              />
            </div>
            <div className="dota2_roles">
              <Select
                onChange={this.handleChange_Dota2_roles}
                options={dota2_roles}
                className="dota2-roles"
                isClearable={true}
                placeholder="Role"
              />
            </div>
            <div className="experience">
              <Select
                onChange={this.handleChange_experience}
                options={experience_options}
                placeholder="Select experience level"
                name="experience-box"
                isClearable
              />
            </div>
            <div className="date-time">
              <Select
                onChange={this.handleChange_time}
                options={date_options}
                placeholder="Start Date?"
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
                onChange={this.handleChange_visibility}
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
}
