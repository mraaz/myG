import React from 'react'
import Dropzone from 'react-dropzone'
import { getAssetUrl } from '../../../../common/assets'
import { ignoreFunctions } from '../../../../common/render'
import AsyncCreatableSelect from 'react-select/lib/AsyncCreatable'
import MyGSelect from '../../common/MyGSelect'
import { Game_name_values, Disable_keys, Schedule_Game_Tags } from '../../Utility_Function'
import { Upload_to_S3, Remove_file } from '../../AWS_utilities'
import { notifyToast } from '../../../../common/toast'

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

export default class MainInfo extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.props.state)
  }

  onSave = () => {
    const { game, level, experience } = this.props.experience
    if (!game || !level || !experience) return
    this.props.onUpdate()
  }

  renderMainFields = () => {
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
    return this.props.storeExperience({ game })
  }

  loadTitleOptions = async (input) => {
    const results = await Game_name_values(input)
    return results.length ? results : [{ label: input, value: input }]
  }

  renderGameTitle = () => {
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
            onChange={(event) => this.props.storeExperience({ nickname: event.target.value })}></input>
        </div>
      </div>
    )
  }

  renderLevelInput = () => {
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

  onTagChange = async (tags) => {
    return this.props.storeExperience({ tags })
  }

  loadTagOptions = async (input) => {
    const results = await Schedule_Game_Tags(input)
    return results.length ? results : [{ label: input, value: input }]
  }

  renderTagsInput = () => {
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
          />
        </div>
      </div>
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

  renderSave = () => {
    const { game, level, experience } = this.props.experience
    const buttonState = game && level && experience ? 'clickable' : 'disabled'
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
        onClick={this.props.onClose}
      />
    )
  }

  render() {
    return (
      <React.Fragment>
        <div id='profile-game-main-info' className='content'>
          {this.renderImageUpload()}
          {this.renderMainFields()}
          {this.renderDivider()}
          {this.renderGameTitle()}
          {this.renderLevelInput()}
          {this.renderExperienceInput()}
          {this.renderTeamInput()}
          {this.renderNicknameInput()}
          {this.renderTagsInput()}
          {this.renderSave()}
        </div>
        {this.renderClose()}
      </React.Fragment>
    )
  }
}
