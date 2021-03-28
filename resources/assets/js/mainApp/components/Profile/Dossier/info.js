import React from 'react'
import get from 'lodash.get'
import scriptLoader from 'react-async-script-loader'
import AsyncCreatableSelect from 'react-select/async-creatable'
import PlacesAutocomplete from 'react-places-autocomplete'
import { Game_name_values, Disable_keys, getGameLabel } from '../../Utility_Function'
import { getAssetUrl } from '../../../../common/assets'
import MyGCheckbox from '../../common/MyGCheckbox'
import MyGSelect from '../../common/MyGSelect'
import { LANGUAGE_OPTIONS } from '../../../static/AddGame'
import { ignoreFunctions } from '../../../../common/render'
import { showMessengerAlert } from '../../../../common/alert'

export class DossierInfo extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    name: '',
    alias: '',
    email: '',
    country: '',
    mostPlayedGames: [{}, {}, {}],
    relationship: {},
    languages: [],
    visibilityName: 'secret',
    visibilityEmail: 'secret',
    visibilityCountry: 'secret',
    lookingForWork: false,
    hasMic: false,
    underage: true,
  }

  componentDidMount() {
    this.setState(this.getProfile())
  }

  getProfile = () => {
    const firstName = get(this.props, 'profile.firstName') || ''
    const lastName = get(this.props, 'profile.lastName') || ''
    const name = `${firstName} ${lastName}`.trim()
    const alias = get(this.props, 'profile.alias') || ''
    const email = get(this.props, 'profile.email') || ''
    const team = get(this.props, 'profile.team') || ''
    const country = get(this.props, 'profile.country') || ''
    const hasMic = get(this.props, 'profile.hasMic')
    const underage = get(this.props, 'profile.underage')
    const relationshipValue = get(this.props, 'profile.relationship') || ''
    const relationship = { label: relationshipValue, value: relationshipValue }
    const languages = (get(this.props, 'profile.languages') || []).map((language) => ({ label: language, value: language }))
    const mostPlayedGames = (get(this.props, 'profile.mostPlayedGames') || []).map((game) => ({
      gameName: game,
      gameNameValue: { label: game, value: game },
    }))
    const visibilityName = get(this.props, 'profile.visibilityName') || 'secret'
    const visibilityEmail = get(this.props, 'profile.visibilityEmail') || 'secret'
    const visibilityCountry = get(this.props, 'profile.visibilityCountry') || 'secret'
    const lookingForWork = get(this.props, 'profile.lookingForWork') || false
    return {
      name,
      alias,
      email,
      team,
      country,
      hasMic,
      underage,
      mostPlayedGames,
      relationship,
      languages,
      visibilityName,
      visibilityEmail,
      visibilityCountry,
      lookingForWork,
    }
  }

  getUpdates = () => {
    const updates = {}
    const profile = this.getProfile()
    if (profile.name !== this.state.name) {
      const nameParts = this.state.name.split(' ') || []
      updates.firstName = nameParts.length > 2 ? nameParts.slice(0, nameParts.length - 1).join(' ') : nameParts[0]
      updates.lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : ''
    }
    if (profile.team !== this.state.team) updates.team = this.state.team
    if (profile.country !== this.state.country) updates.country = this.state.country
    if (profile.hasMic !== this.state.hasMic) updates.hasMic = this.state.hasMic
    if (profile.underage !== this.state.underage) updates.underage = this.state.underage
    if (JSON.stringify(profile.languages) !== JSON.stringify(this.state.languages))
      updates.languages = this.state.languages.map((language) => language.value)
    if (JSON.stringify(profile.mostPlayedGames) !== JSON.stringify(this.state.mostPlayedGames.map((game) => game.gameName)))
      updates.mostPlayedGames = this.state.mostPlayedGames.map((game) => game.gameName)
    if (JSON.stringify(profile.relationship) !== JSON.stringify(this.state.relationship))
      updates.relationship = this.state.relationship.value || this.state.relationship
    if (profile.visibilityName !== this.state.visibilityName) updates.visibilityName = this.state.visibilityName
    if (profile.visibilityEmail !== this.state.visibilityEmail) updates.visibilityEmail = this.state.visibilityEmail
    if (profile.visibilityCountry !== this.state.visibilityCountry) updates.visibilityCountry = this.state.visibilityCountry
    if (profile.lookingForWork !== this.state.lookingForWork) updates.lookingForWork = this.state.lookingForWork
    return updates
  }

  onSave = () => {
    if (!this.state.name) return
    const updates = this.getUpdates() || {}
    const hasPendingChanges = Object.keys(updates).length
    if (hasPendingChanges) this.props.updateProfile(this.state.alias, updates)
    this.props.onClose()
  }

  onClose = () => {
    const updates = this.getUpdates() || {}
    const hasPendingChanges = Object.keys(updates).length
    if (hasPendingChanges)
      showMessengerAlert('You have unsaved changes, are you sure you want to close?', this.props.onClose, null, 'Make it so')
    else this.props.onClose()
  }

  renderNameInput = () => {
    return (
      <div className='row'>
        <span className='hint'>Name</span>
        <div className='input-container'>
          <input className='input' value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })}></input>
        </div>
        <div className='options'>
          <MyGCheckbox
            checked={this.state.visibilityName === 'public'}
            onClick={() => this.setState({ visibilityName: 'public' })}
            labelText='Public'
          />
          <MyGCheckbox
            checked={this.state.visibilityName === 'friends'}
            onClick={() => this.setState({ visibilityName: 'friends' })}
            labelText='Friends'
          />
          <MyGCheckbox
            checked={this.state.visibilityName === 'secret'}
            onClick={() => this.setState({ visibilityName: 'secret' })}
            labelText='Secret'
          />
        </div>
      </div>
    )
  }

  renderAliasInput = () => {
    return (
      <div className='row'>
        <span className='hint'>Alias</span>
        <div className='input-container'>
          <input
            disabled
            className='input'
            value={this.state.alias}
            onChange={(event) => this.setState({ alias: event.target.value })}></input>
        </div>
      </div>
    )
  }

  renderEmailInput = () => {
    return (
      <div className='row'>
        <span className='hint'>E-mail</span>
        <div className='input-container'>
          <input
            className='input'
            disabled
            value={this.state.email}
            onChange={(event) => this.setState({ email: event.target.value })}></input>
        </div>
        <div className='options'>
          <MyGCheckbox
            checked={this.state.visibilityEmail === 'public'}
            onClick={() => this.setState({ visibilityEmail: 'public' })}
            labelText='Public'
          />
          <MyGCheckbox
            checked={this.state.visibilityEmail === 'friends'}
            onClick={() => this.setState({ visibilityEmail: 'friends' })}
            labelText='Friends'
          />
          <MyGCheckbox
            checked={this.state.visibilityEmail === 'secret'}
            onClick={() => this.setState({ visibilityEmail: 'secret' })}
            labelText='Secret'
          />
        </div>
      </div>
    )
  }

  renderTeamInput = () => {
    return (
      <div className='row'>
        <span className='hint'>Team</span>
        <div className='input-container'>
          <input className='input' value={this.state.team} onChange={(event) => this.setState({ team: event.target.value })}></input>
        </div>
        <div className='options'>
          <MyGCheckbox
            checked={this.state.lookingForWork}
            onClick={(lookingForWork) => this.setState({ lookingForWork })}
            labelText='Open to jobs opportunities'
          />
        </div>
      </div>
    )
  }

  handleDropDownChange = async (index, input) => {
    const results = !!input && !!input.value && (await Game_name_values(input.value))
    if (!results) return
    const gameName = results[0] ? results[0].value : input && input.value
    const gameNameValue = results[0] ? results[0] : input
    return this.setState((previous) => {
      const mostPlayedGames = JSON.parse(JSON.stringify(previous.mostPlayedGames))
      if (!mostPlayedGames[0]) mostPlayedGames.push({})
      if (!mostPlayedGames[1]) mostPlayedGames.push({})
      if (!mostPlayedGames[2]) mostPlayedGames.push({})
      mostPlayedGames[index] = { gameName, gameNameValue }
      return { mostPlayedGames }
    })
  }

  loadOptions = async (input) => {
    const defaultResponse = [{ label: input, value: input, gameName: input, gameNameValue: { label: input, value: input } }]
    const results = await Game_name_values(input)
    if (!results || !results.length) return defaultResponse
    const currentGames = (this.state.mostPlayedGames || []).map(({ gameName }) => gameName)
    return results.filter((result) => !currentGames.includes(result.value))
  }

  renderGameInput = (index) => {
    const mostPlayedGames = this.state.mostPlayedGames || [];
    const game = mostPlayedGames[index];
    const value = get(game, 'gameName');
    return (
      <div className='row'>
        <span className='hint'>Game #{index + 1}</span>
        <div className='input-container-row game-title-select'>
          <AsyncCreatableSelect
            cacheOptions
            defaultOptions
            isValidNewOption={() => false}
            loadOptions={this.loadOptions}
            onChange={(input) => this.handleDropDownChange(index, input)}
            value={value && { label: value, value: value }}
            className='viewGame__name full-width'
            placeholder='Search, select or create game title'
            onInputChange={(inputValue) => (inputValue ? (inputValue.length <= 88 ? inputValue : inputValue.substr(0, 88)) : '')}
            onKeyDown={(e) => Disable_keys(e)}
            isSearchable={true}
            classNamePrefix='filter'
            styles='background: red;'
          />
        </div>
      </div>
    )
  }

  renderCountryInput = () => {
    return (
      <div className='row'>
        <span className='hint'>Country</span>
        <PlacesAutocomplete
          value={this.state.country}
          onChange={(country) => this.setState({ country })}
          onSelect={(country) => this.setState({ country })}
          searchOptions={{ types: ['(regions)'] }}>
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div className='input-container country'>
              <input
                {...getInputProps({
                  placeholder: 'Search Places ...',
                  className: 'input',
                })}
              />
              {!!suggestions && suggestions.length > 0 && (
                <div className='autocomplete-dropdown-container'>
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => {
                    const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item'
                    const style = { backgroundColor: suggestion.active ? '#fff' : '#151b26', cursor: 'pointer' }
                    return (
                      <div {...getSuggestionItemProps(suggestion, { className, style })}>
                        <span>{suggestion.description}</span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </PlacesAutocomplete>
        <div className='options'>
          <MyGCheckbox
            checked={this.state.visibilityCountry === 'public'}
            onClick={() => this.setState({ visibilityCountry: 'public' })}
            labelText='Public'
          />
          <MyGCheckbox
            checked={this.state.visibilityCountry === 'friends'}
            onClick={() => this.setState({ visibilityCountry: 'friends' })}
            labelText='Friends'
          />
          <MyGCheckbox
            checked={this.state.visibilityCountry === 'secret'}
            onClick={() => this.setState({ visibilityCountry: 'secret' })}
            labelText='Secret'
          />
        </div>
      </div>
    )
  }

  renderLanguagesInput = () => {
    return (
      <div className='row'>
        <span className='hint'>Languages</span>
        <MyGSelect
          options={LANGUAGE_OPTIONS}
          onChange={(languages) => this.setState({ languages: languages.length <= 3 ? languages : languages.slice(1, 4) })}
          value={this.state.languages}
          isMulti
          isSearchable
        />
        <span className='post-hint'>(Max 3)</span>
      </div>
    )
  }

  renderRelationshipInput = () => {
    return (
      <div className='row'>
        <span className='hint'>Relationship Status</span>
        <MyGSelect
          options={[
            { label: 'Waiting for Player 2', value: 'Waiting for Player 2' },
            { label: 'Game in progress', value: 'Game in progress' },
          ]}
          onChange={(relationship) => this.setState({ relationship })}
          value={this.state.relationship}
        />
      </div>
    )
  }

  renderHasMicInput = () => {
    return (
      <div className='row'>
        <span className='hint'>I have Mic?</span>
        <MyGCheckbox checked={this.state.hasMic} onClick={() => this.setState((previous) => ({ hasMic: !previous.hasMic }))} labelText='' />
      </div>
    )
  }

  rendeUnderageInput = () => {
    return (
      <div className='row'>
        <span className='hint'>18+</span>
        <MyGCheckbox
          checked={!this.state.underage}
          onClick={() => this.setState((previous) => ({ underage: !previous.underage }))}
          labelText=''
        />
      </div>
    )
  }

  renderDivider = () => {
    return <div className='divider' />
  }

  renderGameHeader = () => {
    return (
      <div className='renderGameHeader'>
        <span className='hint'>Games you are currently playing...</span>
      </div>
    )
  }

  renderSave = () => {
    const buttonState = this.state.name ? 'clickable' : 'disabled'
    return (
      <div className='save-container'>
        <div className={`save-button ${buttonState}`} onClick={this.onSave}>
          Save
        </div>
      </div>
    )
  }

  renderClose = () => {
    return (
      <div
        className='close-button clickable'
        style={{ backgroundImage: `url(${getAssetUrl('ic_profile_close')})` }}
        onClick={this.onClose}
      />
    )
  }

  render() {
    if (!this.props.isScriptLoadSucceed) return null
    return (
      <React.Fragment>
        <div className='content'>
          <div className='fields'>
            {this.renderNameInput()}
            {this.renderAliasInput()}
            {this.renderEmailInput()}
            {this.renderDivider()}
            {this.renderTeamInput()}
            {this.renderCountryInput()}
            {this.renderLanguagesInput()}
            {this.renderRelationshipInput()}
            {this.renderHasMicInput()}
            {this.rendeUnderageInput()}
            {this.renderDivider()}
            {this.renderGameHeader()}
            {this.renderGameInput(0)}
            {this.renderGameInput(1)}
            {this.renderGameInput(2)}
          </div>
          {this.renderSave()}
        </div>
        {this.renderClose()}
      </React.Fragment>
    )
  }
}

const GoogleMapsUrl = 'https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyDf3hgYx463MIz995EhEiJRjgAuFrzPyaA'
export default scriptLoader([GoogleMapsUrl])(DossierInfo)
