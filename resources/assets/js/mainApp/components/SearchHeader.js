import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { withRouter, Link } from 'react-router-dom'
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
  return `${suggestion.first} ${suggestion.last}`
}

function renderSuggestion(suggestion, { query }) {
  const suggestionText = `${suggestion.first} ${suggestion.last}`
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

  componentWillMount() {
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
        const getPlayerInfo = await axios.get(`/api/user/${value}/playerSearchResults`)
        playersDB = getPlayerInfo.data.playerSearchResults
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
    const tmp = suggestion.id
    this.setState({
      suggestions: [],
      value: '',
    })
    this.props.history.push(`/profile/${tmp}`)
  }

  onKeyDown = (e) => {
    if (
      e.keyCode === 222 ||
      e.keyCode === 191 ||
      e.keyCode === 190 ||
      e.keyCode === 220 ||
      e.keyCode === 53 ||
      e.keyCode === 51 ||
      e.keyCode === 191
    ) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  render() {
    const { value, suggestions } = this.state
    //console.log(this.props)

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
