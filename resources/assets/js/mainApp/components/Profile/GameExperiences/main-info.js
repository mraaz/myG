import React from 'react'
import Dropzone from 'react-dropzone'
import get from 'lodash.get'
import { getAssetUrl } from '../../../../common/assets'
import { ignoreFunctions } from '../../../../common/render'
import AsyncCreatableSelect from 'react-select/lib/AsyncCreatable'
import MyGSelect from '../../common/MyGSelect'
import { Game_name_values, Disable_keys, Schedule_Game_Tags } from '../../Utility_Function'
import { Upload_to_S3, Remove_file } from '../../AWS_utilities'
import { notifyToast } from '../../../../common/toast'
import { fetchDynamicFields } from '../../../../integration/http/profile'

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
  }

  onSave = () => {
    const { game, level, experience } = this.props.experience
    if (!game || !level || !experience) return
    this.props.onUpdate()
  }

  renderMainFields = () => {
    if (!this.props.isSelf)
      return this.renderDisabledField('Main Fields', this.props.experience.mainFields.map((field) => field.value).join(', '))
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
    return <div className='divider' />
  }

  onTitleChange = async (input) => {
    const results = !!input && !!input.value && (await Game_name_values(input.value))
    const game = results && results[0] ? results[0] : input
    this.setState({ dynamicFields: [] })
    fetchDynamicFields(game.game_names_id).then((dynamicFields) => !dynamicFields.error && this.setState({ dynamicFields }))
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
        <div className='input-container-row viewGame__gameName'>
          <AsyncCreatableSelect
            defaultOptions
            isValidNewOption={() => false}
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
    return (
      <div className='row'>
        <span className='hint'>Team</span>
        <div className='input-container-row'>
          <input
            className='input'
            value={this.props.experience.team}
            disabled={!this.props.isSelf}
            onChange={(event) => this.props.storeExperience({ team: event.target.value })}></input>
        </div>
      </div>
    )
  }

  renderNicknameInput = () => {
    return (
      <div className='row'>
        <span className='hint'>Nickname</span>
        <div className='input-container-row'>
          <input
            className='input'
            value={this.props.experience.nickname}
            disabled={!this.props.isSelf}
            onChange={(event) => this.props.storeExperience({ nickname: event.target.value })}></input>
        </div>
      </div>
    )
  }

  renderLevelInput = () => {
    if (!this.props.isSelf) return this.renderDisabledField('Level', (this.props.experience.level || {}).value)
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
    if (!this.props.isSelf) return this.renderDisabledField('Experience', (this.props.experience.experience || {}).value)
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
    return (
      <div className='row'>
        <div className='input-container-row' style={{ width: '87%', marginTop: '12px' }}>
          <input className='input' value={`${commendationLevel(this.props.experience.commends)}`} disabled={true}></input>
        </div>
      </div>
    )
  }

  onTagChange = async (tags) => {
    return this.props.storeExperience({ tags })
  }

  loadTagOptions = async (input) => {
    const results = await Schedule_Game_Tags(input)
    return results.length ? results : [{ label: input, value: input }]
  }

  renderTagsInput = () => {
    if (!this.props.isSelf) return this.renderDisabledField('Tags', this.props.experience.tags.map((tag) => tag.value).join(', '))
    return (
      <div className='row'>
        <span className='hint'>Tags</span>
        <div className='input-container-row viewGame__gameName'>
          <AsyncCreatableSelect
            defaultOptions
            isValidNewOption={() => false}
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

  renderDynamicFields = () => {
    if (!this.props.isSelf) return null
    if (!this.state.dynamicFields || !this.state.dynamicFields.length) return null
    return this.state.dynamicFields.map((field) => (
      <div className='row'>
        {field.type === 'Multi' && this.renderMultiField(field)}
        {field.type === 'Single' && this.renderSingleField(field)}
        {field.type === 'Input' && this.renderInputField(field)}
      </div>
    ))
  }

  renderMultiField = (field) => {
    return (
      <React.Fragment>
        <span className='hint'>{field.label}</span>
        <MyGSelect
          width={'75%'}
          innerWidth={'100%'}
          options={field.values.map((value) => ({ value, label: value }))}
          placeholder={field.placeholder}
          onChange={(value) => this.props.storeDynamicExperience({ [field.id]: value })}
          value={get(this.props, `experience.dynamic.${field.id}`)}
          isMulti
        />
      </React.Fragment>
    )
  }

  renderSingleField = (field) => {
    return (
      <React.Fragment>
        <span className='hint'>{field.label}</span>
        <MyGSelect
          width={'75%'}
          innerWidth={'100%'}
          options={field.values.map((value) => ({ value, label: value }))}
          placeholder={field.placeholder}
          onChange={(value) => this.props.storeDynamicExperience({ [field.id]: value })}
          value={get(this.props, `experience.dynamic.${field.id}`)}
        />
      </React.Fragment>
    )
  }

  renderInputField = (field) => {
    const validation = field.values && field.values[0] && new RegExp(field.values[0])
    const required = field.values && field.values[1]
    const isValid = validation ? validation.test(get(this.props, `experience.dynamic.${field.id}`)) : true
    return (
      <React.Fragment>
        <span className='hint'>{field.label}</span>
        {required && <span className='required'>*</span>}
        <div className='input-container-row'>
          <input
            className={`input${isValid ? '' : ' input-error'}`}
            value={get(this.props, `experience.dynamic.${field.id}`)}
            placeholder={field.placeholder}
            onChange={(event) => this.props.storeDynamicExperience({ [field.id]: event.target.value })}></input>
        </div>
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
                <img src='https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/BTN_Attach_Image.svg' />
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
    if (!this.props.experience.gameImage) return null
    return <div className='banner' style={{ backgroundImage: `url(${this.props.experience.gameImage})` }} />
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
    const buttonState = game && level && experience && !hasInvalidDynamicFields ? 'clickable' : 'disabled'
    return (
      <div className='save-container'>
        <div className={`save-button ${buttonState}`} onClick={() => buttonState === 'clickable' && this.onSave()}>
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
        onClick={this.props.onClose}
      />
    )
  }

  renderDisabledField(title, value) {
    return (
      <div className='row'>
        <span className='hint'>{title}</span>
        <div className='input-container-row'>
          <input className='input' value={value} disabled={true}></input>
        </div>
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
          {this.renderDynamicFields()}
          {this.renderSave()}
        </div>
        {this.renderClose()}
      </React.Fragment>
    )
  }
}
