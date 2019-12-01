import React, { Component } from 'react'
import Select from 'react-select'
import ReactDOM from 'react-dom'
import { Route } from 'react-router'
import axios from 'axios'
import AsyncSelect from 'react-select/lib/Async'
import CreatableSelect from 'react-select/lib/Creatable'
import AdvancedSearchPost from './AdvancedSearchPost'
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from 'react-country-region-selector'

const table_options = [
  { value: 'Gaming Experience', label: 'Gaming Experience' },
  { value: 'Esports Experience', label: 'Esports Experience' },
]
const status_options = [
  { value: 'Actively Gaming', label: 'Actively Gaming' },
  { value: 'Sometimes...', label: 'Sometimes...' },
  { value: 'Moved On', label: 'Moved On' },
]
const experience_options = [
  { value: 'Casual', label: 'Casual' },
  { value: 'Semi Pro', label: 'Semi Pro' },
  { value: 'Professional', label: 'Professional' },
]
const played_options = [
  { value: 1, label: 'Less than 1 year' },
  { value: 2, label: 'Less than 2 years' },
  { value: 3, label: 'Less than 3 years' },
  { value: 4, label: 'Less than 4 years' },
  { value: 5, label: 'Less than 5 years' },
  { value: 42, label: '5+ years' },
]
const commendation_options = [
  { value: 'Apprentice', label: 'Apprentice' },
  { value: 'Elite', label: 'Elite' },
  { value: 'Expert', label: 'Expert' },
  { value: 'Hero', label: 'Hero' },
  { value: 'Master', label: 'Master' },
  { value: 'Grand Master', label: 'Grand Master' },
]
const rating_options = [
  { value: 1, label: '1 star' },
  { value: 2, label: '2 stars' },
  { value: 3, label: '3 stars' },
  { value: 4, label: '4 stars' },
  { value: 5, label: '5 stars' },
]

const e_played_options = [
  { value: 1, label: 'Less than 3 months' },
  { value: 2, label: 'Less than 6 months' },
  { value: 3, label: 'Less than 1 year' },
  { value: 4, label: 'Less than 2 years' },
  { value: 5, label: 'Less than 3 years' },
  { value: 42, label: '3+ years' },
]

type State = {
  options: [{ [string]: string }],
  options_tags: [{ [string]: string }],
  value: string | void,
  value_tags: string | void,
}

const createOption = (label: string, game_names_id: string) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ''),
  game_names_id,
})

export default class AdvancedSearch extends Component<*, State> {
  constructor() {
    super()
    this.state = {
      selected_table: '',
      selected_experience: null,
      selected_platform: null,
      role_title_box: '',
      team_name_box: '',
      other_box: '',
      when: null,
      tmp_time: '',
      value: '',
      status_box: '',
      played_box: '',
      ratings_box: '',
      commendation_box: '',
      options_tags: '',
      value_tags: [],
      newValueCreated_tags: [],
      country_: '',
      time_role_box: '',
    }
  }

  componentWillMount() {
    const self = this

    var myGame_name_box = '1981`^'
    var myStatus = '1981`^'
    var myExperience = '1981`^'
    var myPlayed = '1981`^'
    var myRatings = '1981`^'
    var myCommendation = '1981`^'
    var myTags = '1981`^'
    var myCountry = '1981`^'

    const { match } = this.props.routeProps

    this.state.selected_table = {
      label: 'Gaming Experience',
      value: 'Gaming Experience',
    }

    if (match.params.id != undefined && match.params.id != '') {
      this.handleCreate2(match.params.id)
      if (match.params.table == 'Esports Experience') {
        this.state.selected_table = {
          label: 'Esports Experience',
          value: 'Esports Experience',
        }
      }
    }

    const getInitialData = async function() {
      try {
        const allGameExperiences = await axios.get(
          `/api/GameExperiences/filtered/${myGame_name_box}/${myStatus}/${myExperience}/${myPlayed}/${myRatings}/${myCommendation}/${myTags}/${myCountry}`
        )
        self.setState({
          allGameExperiences: allGameExperiences.data.latestGameExperiences[0],
        })
      } catch (error) {
        console.log(error)
      }
    }
    getInitialData()
  }

  handleChange_GameName = (value: any) => {
    this.setState(
      {
        value,
      },
      () => {
        this.pullData()
      }
    )
    this.onBlur_game_name(value)
  }

  handleChange3 = (value_tags: any) => {
    this.setState(
      {
        value_tags,
      },
      () => {
        this.pullData()
      }
    )
  }

  handleChange_table = (selected_table) => {
    this.setState(
      {
        selected_table,
        value_tags: '',
      },
      () => {
        this.pullData()
      }
    )
  }

  handleChange_Experience = (selected_experience) => {
    this.setState(
      {
        selected_experience,
      },
      () => {
        this.pullData()
      }
    )
  }

  handleChange_Status = (status_box) => {
    this.setState(
      {
        status_box,
      },
      () => {
        this.pullData()
      }
    )
  }

  handleChange_Played = (played_box) => {
    this.setState(
      {
        played_box,
      },
      () => {
        this.pullData()
      }
    )
  }

  handleChange_Ratings = (ratings_box) => {
    this.setState(
      {
        ratings_box,
      },
      () => {
        this.pullData()
      }
    )
  }

  handleChange_Commendation = (commendation_box) => {
    this.setState(
      {
        commendation_box,
      },
      () => {
        this.pullData()
      }
    )
  }

  selectCountry(val) {
    this.setState(
      {
        country_: val,
      },
      () => {
        this.pullData()
      }
    )
  }

  handleChange_e_status = (eStatus_box) => {
    this.setState(
      {
        eStatus_box,
      },
      () => {
        this.pullData()
      }
    )
  }

  handleChange_role_title = (e) => {
    this.setState(
      {
        role_title_box: e.target.value,
      },
      () => {
        this.pullData()
      }
    )
  }

  handleChange_team_name = (e) => {
    this.setState(
      {
        team_name_box: e.target.value,
      },
      () => {
        this.pullData()
      }
    )
  }

  handleChange_Time_role = (time_role_box) => {
    this.setState(
      {
        time_role_box,
      },
      () => {
        this.pullData()
      }
    )
  }

  showLatestPosts = () => {
    if (this.state.allGameExperiences != undefined) {
      return this.state.allGameExperiences.map((item, index) => {
        var table = true
        if (this.state.selected_table.value != 'Gaming Experience') {
          table = false
        }
        return (
          <AdvancedSearchPost
            game_experience={item}
            key={index}
            table={table}
            user={this.props.initialData}
          />
        )
      })
    }
  }

  async pullData() {
    var myTable = ''

    var myGame_name_box = '1981`^'
    var myStatus = '1981`^'
    var myExperience = '1981`^'
    var myPlayed = '1981`^'
    var myRatings = '1981`^'
    var myTags = '1981`^'
    var myCommendation = '1981`^'
    var myCountry = '1981`^'
    var myRole_title = '1981`^'
    var myTeam_name = '1981`^'
    var myTime_role = '1981`^'

    if (
      this.state.selected_table != '' &&
      this.state.selected_table != undefined &&
      this.state.selected_table.length != 0
    ) {
      myTable = this.state.selected_table.label
    }

    if (
      this.state.selected_experience != null &&
      this.state.selected_experience != undefined &&
      this.state.selected_experience.length != 0
    ) {
      myExperience = this.state.selected_experience.label
    }

    if (
      this.state.value != null &&
      this.state.value != '' &&
      this.state.value.length != 0
    ) {
      myGame_name_box = this.state.value.label.trim()
    }

    if (
      this.state.status_box != '' &&
      this.state.status_box != null &&
      this.state.status_box.length != 0
    ) {
      myStatus = this.state.status_box.label
    }

    if (
      this.state.played_box != '' &&
      this.state.played_box != null &&
      this.state.played_box.length != 0
    ) {
      myPlayed = this.state.played_box.value
    }

    if (
      this.state.ratings_box != '' &&
      this.state.ratings_box != null &&
      this.state.ratings_box.length != 0
    ) {
      myRatings = this.state.ratings_box.value
    }

    if (
      this.state.commendation_box != '' &&
      this.state.commendation_box != null &&
      this.state.commendation_box.length != 0
    ) {
      myCommendation = this.state.commendation_box.value
    }

    if (
      this.state.country_ != '' &&
      this.state.country_ != null &&
      this.state.country_.length != 0
    ) {
      myCountry = this.state.country_
    }

    if (this.state.value_tags !== null && this.state.value_tags.length !== 0) {
      for (var i = 0; i < this.state.value_tags.length; i++) {
        myTags += this.state.value_tags[i].label + '; '
      }
      myTags = myTags
        .trim()
        .replace(/; /g, ',')
        .trim()
      myTags = myTags.replace(/;/g, '')
      myTags = myTags.replace(/,/g, ', ')
    }

    if (
      this.state.role_title_box != '' &&
      this.state.role_title_box != undefined
    ) {
      myRole_title = this.state.role_title_box
    }

    if (
      this.state.team_name_box != '' &&
      this.state.team_name_box != undefined
    ) {
      myTeam_name = this.state.team_name_box
    }

    if (
      this.state.time_role_box != '' &&
      this.state.time_role_box != null &&
      this.state.time_role_box.length != 0
    ) {
      myTime_role = this.state.time_role_box.value
    }

    if (myTable == 'Gaming Experience') {
      try {
        const allGameExperiences = await axios.get(
          `/api/GameExperiences/filtered/${myGame_name_box}/${myStatus}/${myExperience}/${myPlayed}/${myRatings}/${myCommendation}/${myTags}/${myCountry}`
        )

        this.setState({
          allGameExperiences: allGameExperiences.data.latestGameExperiences[0],
        })
      } catch (error) {
        console.log(error)
      }
    } else if (myTable == 'Esports Experience') {
      const alleSportsExperiences = await axios.get(
        `/api/esports_experiences/filtered/${myGame_name_box}/${myRole_title}/${myTeam_name}/${myTime_role}/${myTags}/${myCountry}`
      )

      this.setState({
        allGameExperiences: alleSportsExperiences.data.latestGameExperiences[0],
      })
    }
  }

  handleCreate2 = (inputValue: any) => {
    setTimeout(() => {
      const { options_tags, value_tags, newValueCreated_tags } = this.state
      const newOption = createOption(inputValue, null)
      this.setState({ options_tags: [...options_tags, newOption] })
      this.setState({ value_tags: [...value_tags, newOption] })
      this.setState({
        newValueCreated_tags: [...newValueCreated_tags, newOption.label],
      })
      this.pullData()
    }, 300)
  }

  async getOptions(inputValue) {
    if (inputValue == '' || inputValue == undefined) {
      return []
    }
    try {
      inputValue = inputValue.trimStart()
      const getGameName = await axios.get(
        `/api/GameNames/${inputValue}/gameSearchResults`
      )
      var results = getGameName.data.gameSearchResults[0].filter((i) =>
        i.game_name.toLowerCase().includes(inputValue.toLowerCase())
      )
      var newArr = []
      var i, newOption
      if (results.length != 0) {
        for (i = 0; i < results.length; i++) {
          newOption = createOption(results[i].game_name, results[i].id)
          newArr.push(newOption)
        }
      } else {
        return []
      }
      return newArr
    } catch (error) {
      console.log(error)
    }
  }

  onBlur_game_name = (value) => {
    const self = this

    const getInitialData = async function() {
      try {
        var allTags
        self.setState({ options_tags: '' })
        self.setState({ value_tags: '' })
        if (value != null) {
          if (value.game_names_id != null && value.game_names_id != undefined) {
            allTags = await axios.get(`/api/Tags/${value.game_names_id}`)
          } else {
            return
          }
        } else {
          return
        }

        var i
        for (i = 0; i < allTags.data.allTags.length; i++) {
          const newOption = createOption(allTags.data.allTags[i].tag)
          let { options_tags } = self.state
          if (i == 0) {
            options_tags = ''
          }
          self.setState({
            options_tags: [...options_tags, newOption],
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
    getInitialData()
  }

  render() {
    if (this.state.allGameExperiences !== undefined) {
      var show_gaming_exp = true

      if (this.state.selected_table.label == 'Esports Experience') {
        show_gaming_exp = false
      }
      return (
        <section id='posts'>
          <div className='content-area advancedSearch-page'>
            <div id='header-2'>
              <img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/headers/headers_v1-12.png' />
            </div>
            <div className='filterMenu'>
              <div className='row-one'>
                <div className='table-name'>
                  <Select
                    onChange={this.handleChange_table}
                    options={table_options}
                    placeholder='Select which table'
                    name='table-box'
                    defaultValue={this.state.selected_table}
                  />
                </div>
                <div className='game-name'>
                  <AsyncSelect
                    cacheOptions
                    defaultOptions
                    loadOptions={this.getOptions}
                    isClearable
                    onChange={this.handleChange_GameName}
                    value={this.state.value}
                    className='game-name-box'
                    placeholder='Game name'
                    onInputChange={(inputValue) =>
                      inputValue.length <= 88
                        ? inputValue
                        : inputValue.substr(0, 88)
                    }
                  />
                </div>
              </div>

              {show_gaming_exp && (
                <div className='gaming-experience'>
                  <div className='row-two'>
                    <div className='status'>
                      <Select
                        onChange={this.handleChange_Status}
                        options={status_options}
                        placeholder='Select status'
                        name='status-box'
                        isClearable
                      />
                    </div>
                    <div className='experience'>
                      <Select
                        onChange={this.handleChange_Experience}
                        options={experience_options}
                        placeholder='Select experience level'
                        name='experience-box'
                        isClearable
                      />
                    </div>
                    <div className='played'>
                      <Select
                        onChange={this.handleChange_Played}
                        options={played_options}
                        placeholder='Select time played'
                        className='played-box'
                        isClearable
                      />
                    </div>
                    <div className='ratings'>
                      <Select
                        onChange={this.handleChange_Ratings}
                        options={rating_options}
                        placeholder='Select game ratings'
                        className='ratings-box'
                        isClearable
                      />
                    </div>
                    <div className='commendation'>
                      <Select
                        onChange={this.handleChange_Commendation}
                        options={commendation_options}
                        placeholder='Select commendation'
                        className='commendation-box'
                        isClearable
                      />
                    </div>
                    <div className='tag_txtBox'>
                      <CreatableSelect
                        onChange={this.handleChange3}
                        options={this.state.options_tags}
                        onCreateOption={this.handleCreate2}
                        isClearable
                        value={this.state.value_tags}
                        className='tag-name-box'
                        placeholder='Tags'
                        isMulti
                        defaultValue={this.state.value_tags}
                        onInputChange={(inputValue) =>
                          inputValue.length <= 250
                            ? inputValue
                            : inputValue.substr(0, 250)
                        }
                      />
                    </div>
                    <div className='location'>
                      <CountryDropdown
                        value={this.state.country_}
                        onChange={(val) => this.selectCountry(val)}
                        valueType='full'
                        style={{
                          fontSize: 15.2,
                          width: '88%',
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {!show_gaming_exp && (
                <div className='esports-experience'>
                  <div className='row-two'>
                    <div className='role-title'>
                      <input
                        type='text'
                        className='role-title-box'
                        onChange={this.handleChange_role_title}
                        value={this.state.role_title_box}
                        placeholder='Role Title'
                      />
                    </div>
                    <div className='team-name'>
                      <input
                        type='text'
                        className='team-name-box'
                        onChange={this.handleChange_team_name}
                        value={this.state.team_name_box}
                        placeholder='Team Name'
                      />
                    </div>
                    <div className='e-played'>
                      <Select
                        onChange={this.handleChange_Time_role}
                        options={e_played_options}
                        placeholder='Time in Role'
                        className='e-played-box'
                        isClearable
                      />
                    </div>
                    <div className='skill-txtBox'>
                      <CreatableSelect
                        onChange={this.handleChange3}
                        options={this.state.options_tags}
                        onCreateOption={this.handleCreate2}
                        isClearable
                        value={this.state.value_tags}
                        className='skill-name-box'
                        placeholder='Skills'
                        isMulti
                        onInputChange={(inputValue) =>
                          inputValue.length <= 250
                            ? inputValue
                            : inputValue.substr(0, 250)
                        }
                      />
                    </div>
                    <div className='location'>
                      <CountryDropdown
                        value={this.state.country_}
                        onChange={(val) => this.selectCountry(val)}
                        valueType='full'
                        style={{
                          fontSize: 15.2,
                          width: '88%',
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            {this.showLatestPosts()}
          </div>
        </section>
      )
    } else {
      return <div className='content-area scheduleGames-page'>Loading</div>
    }
  }
}
