import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { withRouter, Link } from 'react-router-dom'
import Autosuggest from 'react-autosuggest'
import AutosuggestHighlightMatch from 'autosuggest-highlight/match'
import AutosuggestHighlightParse from 'autosuggest-highlight/parse'
import { Disable_keys } from './Utility_Function'

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
  return `${suggestion.first}`
}

function renderSuggestion(suggestion, { query }) {
  const suggestionText = `${suggestion.first}`
  const matches = AutosuggestHighlightMatch(suggestionText, query)
  const parts = AutosuggestHighlightParse(suggestionText, matches)

  return (
    <span className='suggestion-content'>
      <span
        className='suggestion-user-img'
        style={{
          backgroundImage: `url('${suggestion.profile_img}')`,
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

class SearchHeader extends Component {
  constructor() {
    super()
    this.timeout = 0
    this.state = {
      myFriendRequestNo: 0,
      value: '',
      suggestions: [],
      redirect_: false,
    }
  }

  componentDidMount() {
    const self = this

    const getFriendnoti = async function() {
      try {
        const getFriendnoti = await axios.get('/api/notifications/myFriendRequests')
        self.setState({
          myFriendRequestNo: getFriendnoti.data.checkMyFriends[0].no_of_my_notiFriends,
        })

        const myRequests = await axios.get('/api/notifications/myRequests')
        self.setState({
          myRequests: myRequests.data.number_of_notis,
        })
      } catch (error) {
        console.log(error)
      }
    }
    getFriendnoti()
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
        const getPlayerInfo = await axios.post('/api/user/playerSearchResults', {
          alias: value,
        })
        playersDB = getPlayerInfo.data.playerSearchResults
        playersDB.push({
          first: 'See all results for ' + `${value}`,
          last: `${value}`,
          profile_img: 'https://s3-ap-southeast-2.amazonaws.com/mygame-media/default_user/new-user-profile-picture.png',
          id: -1,
        })
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
    this.setState({
      suggestions: [],
      value: '',
    })
    if (suggestion.id == -1) {
      this.props.history.push(`/invitation/${suggestion.last}`)
    } else {
      this.props.history.push(`/profile/${suggestion.id}`)
    }
  }

  onKeyDown = (e) => {
    Disable_keys(e)
  }

  render() {
    const { value, suggestions } = this.state

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Search for players',
      value,
      onChange: this.onChange,
      onKeyDown: this.onKeyDown,
    }
    return (
      <div className='search-header'>
        <div className='search-box'>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            onSuggestionSelected={this.onSuggestionSelected}
            inputProps={inputProps}
            onKeyDown={this.onKeyDown}
          />
          <div className='icon-section'>
            <div className='noti'>
              <Link to='/notifications'>
                <i className='fas fa-bell' />
              </Link>
              <div className={`noti-number ${this.state.myRequests > 0 ? 'active' : ''}`}> {this.state.myRequests}</div>
            </div>
            <div className='comments'>
              <i className='fas fa-comment' />
              <div className='noti-number'>3</div>
            </div>
            <div className='user'>
              <Link to='/invitation'>
                <i className='fas fa-user' />
              </Link>
              <div className={`noti-number ${this.state.myFriendRequestNo > 0 ? 'active' : ''}`}> {this.state.myFriendRequestNo}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(SearchHeader)
