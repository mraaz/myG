import React, { Component } from 'react'
import { Redirect } from 'react-router'
import axios from 'axios'
import IndividualGroups from './IndividualGroups'

import GroupOpenModal from './GroupOpenModal'

import Autosuggest from 'react-autosuggest'
import AutosuggestHighlightMatch from 'autosuggest-highlight/match'
import AutosuggestHighlightParse from 'autosuggest-highlight/parse'

var playersDB = []

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim())

  if (escapedValue === '') {
    return []
  }

  const regex = new RegExp('\\b' + escapedValue, 'i')

  return playersDB.filter((person) => regex.test(getSuggestionValue(person)))
}

function getSuggestionValue(suggestion) {
  return `${suggestion.name}`
}

function renderSuggestion(suggestion, { query }) {
  const suggestionText = `${suggestion.name}`
  const matches = AutosuggestHighlightMatch(suggestionText, query)
  const parts = AutosuggestHighlightParse(suggestionText, matches)

  return (
    <span className='suggestion-content'>
      <span
        className='suggestion-user-img'
        style={{
          backgroundImage: `url('${suggestion.group_img}')`,
        }}></span>
      <span className='name'>
        {parts.map((part, index) => {
          const className = part.highlight ? 'highlight' : null

          return (
            <span className={className} key={index}>
              {part.text}
            </span>
          )
        })}
      </span>
    </span>
  )
}

export default class GroupMain extends Component {
  constructor() {
    super()
    self = this
    this.state = {
      collapse: true,
      collapseesports: true,
      friendStatus: 0, //0: Not friend, 1: Friends, 2:Friend request pending,
      friendTxt: '',
      myPage: false,
      bFileModalOpen: false,
      profile_attr: '',
      show_bio: false,
      value: '',
      suggestions: [],
      redirect_: false,
      redirect_link: '',
    }

    this.callbackFileModalClose = this.callbackFileModalClose.bind(this)
    this.addGroup = this.addGroup.bind(this)
    this.callbackFileModalConfirm = this.callbackFileModalConfirm.bind(this)
  }

  componentDidMount() {
    const self = this

    const getmyGroups = async function() {
      try {
        const getmyGroups = await axios.get('/api/groups/view')
        self.setState({
          myGroups: getmyGroups.data.myGroups,
        })
      } catch (error) {
        console.log(error)
      }
    }

    const getGroups_im_in = async function() {
      try {
        const getGroups_im_in = await axios.get('/api/usergroup/view')
        self.setState({
          groups_im_in: getGroups_im_in.data.groups_im_in,
        })
      } catch (error) {
        console.log(error)
      }
    }

    getGroups_im_in()
    getmyGroups()
  }

  callbackFileModalClose() {
    this.setState({
      bFileModalOpen: false,
    })
  }

  addGroup() {
    this.setState({
      bFileModalOpen: true,
    })
  }

  callbackFileModalConfirm(src) {
    this.setState({
      bFileModalOpen: false,
    })
  }

  onChange = (event, { newValue }) => {
    if (newValue == '') {
      if (this.timeout) clearTimeout(this.timeout)
      playersDB = []
      this.setState({
        suggestions: [],
        value: '',
      })
    } else {
      this.setState({
        value: newValue,
      })
    }
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  //Timeout ensures we query the DB when the user pauses typing, not querying every stroke
  onSuggestionsFetchRequested = ({ value }) => {
    const self = this

    if (this.timeout) clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      getPlayerInfo()
    }, 300)

    const getPlayerInfo = async function() {
      try {
        const groupSearchResults = await axios.get(`/api/groups/${value}/groupSearchResults`)
        playersDB = groupSearchResults.data.groupSearchResults
        self.setState({
          suggestions: getSuggestions(value),
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    })
  }

  onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    this.state.redirect_link = suggestion.id
    this.setState({ redirect_: true })
  }

  showmyGroups = () => {
    if (this.state.myGroups != undefined) {
      return this.state.myGroups.map((item, index) => {
        return <IndividualGroups groups={item} key={index} user={this.props.initialData} />
      })
    }
  }

  showGroupsimin = () => {
    if (this.state.groups_im_in != undefined) {
      return this.state.groups_im_in.map((item, index) => {
        return <IndividualGroups groups={item} key={index} user={this.props.initialData} />
      })
    }
  }

  render() {
    if (this.state.redirect_) {
      var tmp = `/groups/${this.state.redirect_link}`
      return <Redirect push to={tmp} />
    }
    const { value, suggestions } = this.state

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Search for Groups',
      value,
      onChange: this.onChange,
    }
    return (
      <section id='group-page'>
        <GroupOpenModal
          bOpen={this.state.bFileModalOpen}
          callbackClose={this.callbackFileModalClose}
          callbackConfirm={this.callbackFileModalConfirm}></GroupOpenModal>
        <div className='content-area group-page'>
          <div className='padding-container'>
            <div className='groups-grey-container'>
              <h3>Groups</h3>
              <div className='add-group'>
                <i className='fas fa-plus-circle' onClick={() => this.addGroup()}></i>
              </div>
              <div className='padding-container'></div>
              <div className='group-search-box'>
                <Autosuggest
                  suggestions={suggestions}
                  onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                  onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                  getSuggestionValue={getSuggestionValue}
                  renderSuggestion={renderSuggestion}
                  onSuggestionSelected={this.onSuggestionSelected}
                  inputProps={inputProps}
                />
              </div>
            </div>
          </div>
          <div className='padding-container'>
            <div className='mygroups-grey-container'>
              <h3>myGroups</h3>
              <div className='icon' onClick={this.clickedDropdown}>
                <i className='fas fa-chevron-down' />
              </div>
              <div className='padding-container'></div>
              <div className='my-groups'>
                <div className='indent'></div>
                {this.showmyGroups()}
              </div>
            </div>
          </div>
          <div className='padding-container'>
            <div className='groups-im-in-grey-container'>
              <h3>Groups I'm in</h3>
              <div className='icon' onClick={this.clickedDropdown}>
                <i className='fas fa-chevron-down' />
              </div>
              <div className='padding-container'></div>
              <div className='groups-im-in'>
                <div className='indent'></div>
                {this.showGroupsimin()}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
