import React from 'react'
import { ignoreFunctions } from '../../../../common/render'
import AsyncCreatableSelect from 'react-select/async-creatable';
import MyGSelect from '../../common/MyGSelect'
import { Disable_keys, Schedule_Game_Skills } from '../../Utility_Function'
import { WithTooltip } from '../../Tooltip'

const EXPERIENCE_OPTIONS = [
  { value: 'Less than 1 year', label: 'Less than 1 year' },
  { value: 'Less than 2 years', label: 'Less than 2 years' },
  { value: 'Less than 3 years', label: 'Less than 3 years' },
  { value: 'Less than 4 years', label: 'Less than 4 years' },
  { value: 'Less than 5 years', label: 'Less than 5 years' },
  { value: '5+ years', label: '5+ years' },
]

export default class Experience extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.props.state)
  }

  renderTeamInput = () => {
    return (
      <div className='row'>
        <span className='hint'>Team name</span>
        <div className='input-container-row'>
          <input
            className='input'
            value={this.props.experience.team}
            disabled={!this.props.isSelf}
            onChange={(event) => this.props.storeExperience(this.props.experience.id, { team: event.target.value })}></input>
        </div>
      </div>
    )
  }

  renderRoleInput = () => {
    return (
      <div className='row'>
        <span className='hint'>Role title</span>
        <div className='input-container-row'>
          <input
            className='input'
            value={this.props.experience.role}
            disabled={!this.props.isSelf}
            onChange={(event) => this.props.storeExperience(this.props.experience.id, { role: event.target.value })}></input>
        </div>
      </div>
    )
  }

  renderExperienceInput = () => {
    if (!this.props.isSelf) return this.renderDisabledField('Time in role', (this.props.experience.experience || {}).value)
    return (
      <div className='row'>
        <span className='hint'>Time in role</span>
        <MyGSelect
          width={'75%'}
          innerWidth={'100%'}
          options={EXPERIENCE_OPTIONS}
          onChange={(experience) => this.props.storeExperience(this.props.experience.id, { experience })}
          value={this.props.experience.experience}
          disabled={!this.props.isSelf}
        />
      </div>
    )
  }

  onSkillChange = async (skills) => {
    if (skills && skills.length)
      skills.forEach((skill) => {
        skill.label = skill.label.replace('Create skill: ', '')
      })
    return this.props.storeExperience(this.props.experience.id, { skills })
  }

  loadSkillsOptions = async (input) => {
    const results = await Schedule_Game_Skills(input)
    return results.length ? results : [{ label: input ? `Create skill: ${input}` : 'Type in skill name', value: input }]
  }

  renderSkillsInput = () => {
    if (!this.props.isSelf)
    return this.renderDisabledFieldList(
      'Skills',
      this.props.experience.skills.map((skill) => skill.value)
    )
    return (
      <div className='row'>
        <span className='hint'>Skills</span>
        <div className='input-container-row viewGame__gameName'>
          <AsyncCreatableSelect
            defaultOptions
            cacheOptions
            loadOptions={this.loadSkillsOptions}
            onChange={(input) => this.onSkillChange(input)}
            isClearable
            isMulti
            value={this.props.experience.skills}
            className='viewGame__name full-width'
            placeholder='Enter here your skills at this game'
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

  renderRemoveExperienceButton = () => {
    if (!this.props.isSelf) return null
    return (
      <div className='remove-experience-container'>
        <div className='remove-experience-button clickable' onClick={() => this.props.onRemoveExperience(this.props.experience.id)}>
          Remove Experience
        </div>
      </div>
    )
  }

  renderDisabledField(title, value) {
    if (!value) return null
    return (
      <div className='row'>
        <span className='hint'>{title}</span>
        <div className='input-container-row'>
          <input className='input' value={value} disabled={true}></input>
        </div>
      </div>
    )
  }

  renderDisabledFieldList(title, values) {
    if (!values || !Array.isArray(values)) return null
    return (
      <div className='row'>
        <React.Fragment>
          <span className='hint'>{title}</span>
          <div className='input-container-row'>
            {values.map((value) => (
              <WithTooltip text={value} position={{ bottom: "80px", left: '-80px' }} disabled={value.length <= 9}>
                <span className="tag" key={value}>{value.slice(0, 9) + (value.length > 9 ? '...' : '')}</span>
              </WithTooltip>
            ))}
          </div>
        </React.Fragment>
      </div>
    )
  }

  render() {
    return (
      <div id='profile-game-experience' className='content'>
        {this.renderTeamInput()}
        {this.renderRoleInput()}
        {this.renderExperienceInput()}
        {this.renderSkillsInput()}
        {this.renderRemoveExperienceButton()}
      </div>
    )
  }
}
