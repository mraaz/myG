import React from 'react'
import Dropzone from 'react-dropzone'
import get from 'lodash.get'
import { getAssetUrl } from '../../../../common/assets'
import { ignoreFunctions } from '../../../../common/render'
import AsyncCreatableSelect from 'react-select/async-creatable'
import MyGSelect from '../../common/MyGSelect'
import MyGRateSlider from '../../common/MyGRateSlider'
import { Game_name_values, Disable_keys, Schedule_Game_Tags } from '../../Utility_Function'
import { Upload_to_S3, Remove_file } from '../../AWS_utilities'
import { fetchDynamicFields } from '../../../../integration/http/profile'
import notifyToast from '../../../../common/toast'
import { WithTooltip } from '../../Tooltip'

const MAIN_FIELDS_OPTIONS = [
  { value: 'Nickname', label: 'Nickname' },
  { value: 'Level', label: 'Level' },
  { value: 'Experience', label: 'Experience' },
  { value: 'Team', label: 'Team' },
]

const EXPERIENCE_OPTIONS = [
  { value: 'Less than 1 year', label: 'Less than 1 year' },
  { value: 'Less than 2 years', label: 'Less than 2 years' },
  { value: 'Less than 3 years', label: 'Less than 3 years' },
  { value: 'Less than 4 years', label: 'Less than 4 years' },
  { value: 'Less than 5 years', label: 'Less than 5 years' },
  { value: '5+ years', label: '5+ years' },
]

const LEVEL_OPTIONS = [
  { value: 'Pro Gamer', label: 'Pro Gamer' },
  { value: 'Semi Pro', label: 'Semi Pro' },
  { value: 'Casual', label: 'Casual' },
]

const commendationLevel = (commends) => {
  if (commends < 49) return 'Apprentice'
  if (commends < 99) return 'Elite'
  if (commends < 149) return 'Expert'
  if (commends < 199) return 'Hero'
  if (commends < 249) return 'Master'
  if (commends < 999) return 'Grand Master'
  return 'Ultimate Master'
}

export default class MainInfo extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    dynamicFields: [],
  }

  componentDidMount() {
    const gameId = get(this.props, 'experience.game.game_names_id')
    if (gameId) fetchDynamicFields(gameId).then((dynamicFields) => !dynamicFields.error && this.setState({ dynamicFields }))
    this.preventTabbingToCompose()
  }

  preventTabbingToCompose() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Tab' && !event.shiftKey) {
        const activeElement = document.activeElement
        const possibleElements = document.querySelectorAll('input, textarea, button')
        for (let i = 0; i < possibleElements.length; ++i) {
          const focusedElement = possibleElements[i]
          if (focusedElement === activeElement) {
            const nextElement = possibleElements[i + 1]
            if (nextElement.id === 'composeTextarea') {
              event.preventDefault()
            }
            break
          }
        }
      }
    })
  }

  scrollToBottom = () => {
    setTimeout(() => {
      document.getElementById('profile-game-main-info').scrollTop = 9999
    }, 0)
  }

  onSave = (canSave) => {
    if (canSave) return this.props.onUpdate()
    notifyToast('Sorry mate! Required fields not filled in.')
  }

  renderMainFields = () => {
    if (!get(this.props, 'experience.game.value')) return this.renderDisabledField('Main Fields', null)
    if (!this.props.isSelf) return null
    return (
      <div className='row'>
        <span className='hint'>Main Fields</span>
        <MyGSelect
          width={'75%'}
          innerWidth={'100%'}
          options={MAIN_FIELDS_OPTIONS}
          onChange={(mainFields) =>
            this.props.storeExperience({ mainFields: mainFields.length <= 3 ? mainFields : mainFields.slice(1, 4) })
          }
          value={this.props.experience.mainFields}
          isMulti
          isSearchable
        />
        <span className='post-hint'>(Max 3)</span>
      </div>
    )
  }

  renderDivider = () => {
    if (!this.props.isSelf) return null
    return <div className='divider' />
  }

  onTitleChange = async (input) => {
    const results = !!input && !!input.value && (await Game_name_values(input.value))
    const game = results && results[0] ? results[0] : input
    this.setState({ dynamicFields: [] })
    if (game) fetchDynamicFields(game.game_names_id).then((dynamicFields) => !dynamicFields.error && this.setState({ dynamicFields }))
    return this.props.storeExperience({ game })
  }

  loadTitleOptions = async (input) => {
    const results = await Game_name_values(input)
    return results.length ? results : [{ label: input, value: input }]
  }

  renderGameTitle = () => {
    if (!this.props.isSelf) return this.renderDisabledField('Game Title', (this.props.experience.game || {}).value)
    return (
      <div className='row'>
        <span className='hint'>Game Title</span>
        <div className='input-container-row viewGame__gameName game-title-select'>
          <AsyncCreatableSelect
            cacheOptions
            defaultOptions
            loadOptions={this.loadTitleOptions}
            onChange={(input) => this.onTitleChange(input)}
            isClearable
            value={this.props.experience.game}
            className='viewGame__name full-width'
            placeholder='Search, select or create game title'
            onInputChange={(inputValue) => (inputValue.length <= 88 ? inputValue : inputValue.substr(0, 88))}
            onKeyDown={(e) => Disable_keys(e)}
            isSearchable={true}
            classNamePrefix='filter'
            styles='background: red;'
            disabled={!this.props.isSelf}
          />
        </div>
      </div>
    )
  }

  renderTeamInput = () => {
    if (!get(this.props, 'experience.game.value') || !this.props.isSelf)
      return this.renderDisabledField('Team', (this.props.experience.team || {}).value)
    return (
      <div className='row'>
        <span className='hint'>Team</span>
        <div className='input-container-row'>
          <input
            className='input'
            value={this.props.experience.team || ''}
            onChange={(event) => this.props.storeExperience({ team: event.target.value })}></input>
        </div>
      </div>
    )
  }

  renderNicknameInput = () => {
    if (!get(this.props, 'experience.game.value') || !this.props.isSelf)
      return this.renderDisabledField('Nickname', (this.props.experience.nickname || {}).value)
    return (
      <div className='row'>
        <span className='hint'>Nickname</span>
        <div className='input-container-row'>
          <input
            className='input'
            value={this.props.experience.nickname || ''}
            onChange={(event) => this.props.storeExperience({ nickname: event.target.value })}></input>
        </div>
      </div>
    )
  }

  renderLevelInput = () => {
    if (!get(this.props, 'experience.game.value') || !this.props.isSelf)
      return this.renderDisabledField('Level', (this.props.experience.level || {}).value)
    return (
      <div className='row'>
        <span className='hint'>Level</span>
        <MyGSelect
          width={'75%'}
          innerWidth={'100%'}
          options={LEVEL_OPTIONS}
          onChange={(level) => this.props.storeExperience({ level })}
          value={this.props.experience.level}
        />
      </div>
    )
  }

  renderExperienceInput = () => {
    if (!get(this.props, 'experience.game.value') || !this.props.isSelf)
      return this.renderDisabledField('Experience', (this.props.experience.experience || {}).value)
    return (
      <div className='row'>
        <span className='hint'>Experience</span>
        <MyGSelect
          width={'75%'}
          innerWidth={'100%'}
          options={EXPERIENCE_OPTIONS}
          onChange={(experience) => this.props.storeExperience({ experience })}
          value={this.props.experience.experience}
        />
      </div>
    )
  }

  renderCommendationLabel = () => {
    if (this.props.isSelf) return null
    return (
      <div className='row'>
        <span className='hint'>Commends</span>
        <div className='input-container-row'>
          <input className='input' value={`${commendationLevel(this.props.experience.commends)}`} disabled={true}></input>
        </div>
      </div>
    )
  }

  onTagChange = async (tags) => {
    if (tags && tags.length)
      tags.forEach((tag) => {
        tag.label = tag.label.replace('Create tag: ', '')
      })
    return this.props.storeExperience({ tags })
  }

  loadTagOptions = async (input) => {
    const results = await Schedule_Game_Tags(input, get(this.props, 'experience.game.game_names_id'), true)
    return results.length ? results : [{ label: input ? `Create tag: ${input}` : 'Type in tag name', value: input }]
  }

  renderTagsInput = () => {
    if (!get(this.props, 'experience.game.value')) return this.renderDisabledField('Tags', null)
    if (!this.props.isSelf)
      return this.renderDisabledFieldList(
        'Tags',
        this.props.experience.tags.map((tag) => tag.value)
      )
    return (
      <div className='row'>
        <span className='hint'>Tags</span>
        <div className='input-container-row viewGame__gameName game-title-select'>
          <AsyncCreatableSelect
            cacheOptions
            defaultOptions
            loadOptions={this.loadTagOptions}
            onChange={(input) => this.onTagChange(input)}
            isClearable
            isMulti
            value={this.props.experience.tags}
            className='viewGame__name full-width'
            placeholder='Search, select or create game tags'
            onInputChange={(inputValue) => (inputValue.length <= 88 ? inputValue : inputValue.substr(0, 88))}
            onKeyDown={(e) => Disable_keys(e)}
            isSearchable={true}
            classNamePrefix='filter'
            styles='background: red;'
            disabled={!this.props.isSelf}
          />
        </div>
      </div>
    )
  }

  renderRateSlider = () => {
    if (!this.props.isSelf) return null
    return (
      <div className='row'>
        <span className='hint'>Rating</span>
        <MyGRateSlider rating={this.props.experience.rating} onRatingSelected={(rating) => this.props.storeExperience({ rating })} />
      </div>
    )
  }

  renderDynamicFields = () => {
    if (!this.state.dynamicFields || !this.state.dynamicFields.length) return null
    return this.state.dynamicFields.map((field) => {
      if (!this.props.isSelf && !get(this.props, `experience.dynamic.${field.id}`)) return null
      return (
        <div className='row'>
          {field.type === 'Multi' && this.renderMultiField(field)}
          {field.type === 'Single' && this.renderSingleField(field)}
          {field.type === 'Input' && this.renderInputField(field)}
        </div>
      )
    })
  }

  renderMultiField = (field) => {
    if (!this.props.isSelf)
      return this.renderDisabledField(
        field.label,
        get(this.props, `experience.dynamic.${field.id}`, []).map(({ value }) => value),
        true
      )
    return (
      <React.Fragment>
        <span className='hint'>{field.label}</span>
        <MyGSelect
          onFocus={this.scrollToBottom}
          width={'75%'}
          innerWidth={'100%'}
          options={field.values.map((value) => ({ value, label: value }))}
          placeholder={field.profile_placeholder}
          onChange={(value) => this.props.storeDynamicExperience({ [field.id]: value })}
          value={get(this.props, `experience.dynamic.${field.id}`)}
          isMulti
        />
      </React.Fragment>
    )
  }

  renderSingleField = (field) => {
    if (!this.props.isSelf)
      return this.renderDisabledField(
        field.label,
        (get(this.props, `experience.dynamic.${field.id}`, []) || []).map(({ value }) => value),
        true
      )
    return (
      <React.Fragment>
        <span className='hint'>{field.label}</span>
        <MyGSelect
          onFocus={this.scrollToBottom}
          width={'75%'}
          innerWidth={'100%'}
          options={(field.values || []).map((value) => ({ value, label: value }))}
          placeholder={field.profile_placeholder}
          onChange={(value) => this.props.storeDynamicExperience({ [field.id]: value })}
          value={get(this.props, `experience.dynamic.${field.id}`)}
        />
      </React.Fragment>
    )
  }

  renderInputField = (field) => {
    if (!get(this.props, 'experience.game.value') || !this.props.isSelf)
      return this.renderDisabledField(field.label, get(this.props, `experience.dynamic.${field.id}`), true)
    const validation = field.values && field.values[0] && new RegExp(field.values[0])
    const required = field.values && field.values[1]
    const isValid = validation ? validation.test(get(this.props, `experience.dynamic.${field.id}`)) : true
    const showLink = field.id === 'stats_link'
    return (
      <React.Fragment>
        <span className='hint'>{field.label}</span>
        {required && <span className='required'>*</span>}
        <div className='input-container-row'>
          <input
            className={`input${isValid ? '' : ' input-error'}`}
            value={get(this.props, `experience.dynamic.${field.id}`)}
            placeholder={field.profile_placeholder}
            onChange={(event) => this.props.storeDynamicExperience({ [field.id]: event.target.value })}></input>
        </div>
        {showLink && (
          <div
            className='icon-button clickable'
            style={{ backgroundImage: `url(https://myG.gg/platform_images/Profile/newWindow-icon.svg)` }}
            onClick={() => window.open(field.profile_placeholder, '_blank')}
          />
        )}
      </React.Fragment>
    )
  }

  onDrop = async (file, rejectedFiles) => {
    if (rejectedFiles.length) return notifyToast('Sorry mate! File rejected because of bad format or file size limit exceed (10mb).')
    if (!file.length) return
    this.props.storeExperience({ uploading: true })
    const uploadResult = await Upload_to_S3(file[0], file[0].name, 0, null)
    this.props.storeExperience({
      uploading: false,
      imageSource: uploadResult.data.Location,
      imageKey: uploadResult.data.Key,
      imageId: uploadResult.data.aws_key_id,
    })
  }

  onRemove = () => {
    if (this.props.experience.key) Remove_file(this.props.experience.key, this.props.experience.imageId)
    this.props.storeExperience({
      uploading: false,
      imageSource: null,
      imageKey: null,
      imageId: null,
    })
  }

  renderImageUpload = () => {
    if (!this.props.experience.game || !this.props.experience.game.value || this.props.experience.game.game_names_id) return null
    return (
      <div className='image-uploader'>
        <Dropzone
          onDrop={this.onDrop}
          maxFiles={1}
          minSize={0}
          maxSizeBytes={11185350}
          accept='image/jpeg,image/jpg,image/png,image/gif'
          disabled={this.props.experience.uploading}>
          <section className='inner-uploader'>
            <div className='text'>Drop your game image</div>
            <div className='images community-images-container'>
              <span className=' button photo-btn'>
                <img src='https://myG.gg/platform_images/Dashboard/BTN_Attach_Image.svg' />
              </span>
            </div>
            <div className='text'>
              Or <span>click here </span> to select
            </div>
            {this.props.experience.uploading && (
              <div className='text'>
                <span>Uploading... </span>
              </div>
            )}
            {this.props.experience.imageSource && (
              <React.Fragment>
                <img className='upload-preview-image' src={this.props.experience.imageSource} key={this.props.experience.imageSource} />
                <span className='remove-image clickable' onClick={this.onRemove}>
                  X
                </span>
              </React.Fragment>
            )}
          </section>
        </Dropzone>
      </div>
    )
  }

  renderImage = () => {
    const selectedGameImage = this.props.experience.game && this.props.experience.game.gameImg
    if (!this.props.experience.gameImage && !selectedGameImage) return null
    return <div className='banner' style={{ backgroundImage: `url(${this.props.experience.gameImage || selectedGameImage})` }} />
  }

  renderSave = () => {
    if (!this.props.isSelf) return null
    const { game, level, experience } = this.props.experience
    const hasInvalidDynamicFields = this.state.dynamicFields.some((field) => {
      if (field.type !== 'Input') return false
      const value = get(this.props, `experience.dynamic.${field.id}`)
      const validation = field.values && field.values[0] && new RegExp(field.values[0])
      const isRequiredAndMissing = field.values && field.values[1] && !value
      const isValid = validation ? validation.test(value) : true
      return isRequiredAndMissing || !isValid
    })
    this.props.hasInvalidDynamicFields(hasInvalidDynamicFields)
    const canSave = !!game && !!level && !!experience && !hasInvalidDynamicFields
    const buttonState = canSave ? '' : 'disabled'
    return (
      <div className='save-container'>
        {!!this.props.onboarding && (
          <div className={`save-button clickable`} onClick={this.props.skipOnboarding}>
            Skip
          </div>
        )}
        <div className={`save-button clickable ${buttonState}`} onClick={() => this.onSave(canSave)}>
          {this.props.onboarding ? 'Next 1/2' : 'Save'}
        </div>
      </div>
    )
  }

  renderClose = () => {
    if (this.props.onboarding) return null
    return (
      <div
        className='close-button clickable'
        style={{ backgroundImage: `url(${getAssetUrl('ic_profile_close')})` }}
        onClick={this.props.onClose}
      />
    )
  }

  renderDisabledField(title, value, skipRow) {
    let displayValue = 'Requires Game Title'
    if (!this.props.isSelf) displayValue = value
    if (!displayValue) return null
    const disabledValue = Array.isArray(displayValue) ? displayValue.join(', ') : displayValue
    const disabledField = (
      <React.Fragment>
        <span className='hint'>{title}</span>
        <div className='input-container-row'>
          <input className='input' value={disabledValue} disabled={true}></input>
        </div>
      </React.Fragment>
    )
    if (skipRow) return disabledField
    return <div className='row'>{disabledField}</div>
  }

  renderDisabledFieldList(title, values) {
    if (!values || !Array.isArray(values)) return null
    return (
      <div className='row'>
        <React.Fragment>
          <span className='hint'>{title}</span>
          <div className='input-container-row'>
            {values.map((value) => (
              <WithTooltip text={value} position={{ bottom: '80px', left: '-80px' }} disabled={value.length <= 9}>
                <span className='tag' key={value}>
                  {value.slice(0, 9) + (value.length > 9 ? '...' : '')}
                </span>
              </WithTooltip>
            ))}
          </div>
        </React.Fragment>
      </div>
    )
  }

  render() {
    return (
      <React.Fragment>
        <div id='profile-game-main-info' className='content'>
          {this.renderImageUpload()}
          {this.renderImage()}
          {this.renderMainFields()}
          {this.renderDivider()}
          {this.renderCommendationLabel()}
          {this.renderGameTitle()}
          {this.renderLevelInput()}
          {this.renderExperienceInput()}
          {this.renderTeamInput()}
          {this.renderNicknameInput()}
          {this.renderTagsInput()}
          {this.renderRateSlider()}
          {this.renderDynamicFields()}
          {this.renderSave()}
        </div>
        {this.renderClose()}
      </React.Fragment>
    )
  }
}
