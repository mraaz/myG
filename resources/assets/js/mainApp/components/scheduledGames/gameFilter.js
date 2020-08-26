/*
 * Author : nitin Tyagi
 * github  : https://github.com/realinit
 * Email : nitin.1992tyagi@gmail.com
 */
import React, { Component, Fragment } from 'react'
import axios from 'axios'

import AsyncCreatableSelect from 'react-select/lib/AsyncCreatable'
import Select from 'react-select'
import { Game_name_values, Disable_keys, Schedule_Game_Tags, Toast_style, Game_name_Tags } from '../Utility_Function'
import { toast } from 'react-toastify'

import {
  region_options,
  visibility_options,
  date_options,
  platform_options,
  experience_options,
  getExtraFilterOprion,
  properCase,
  yes_no_options,
  language_options,
} from './option'

const queryMapping = {
  0: 'one',
  1: 'two',
  2: 'three',
  3: 'four',
  4: 'five',
}

const valueMapping = ['value_one', 'value_two', 'value_three', 'value_four', 'value_five']

export default class ScheduleGames extends Component {
  constructor() {
    super()
    this.state = {
      game_name_box: null,
      default: true,
      games: false,
      just_one_time: true,
      filterName: '',
      showSaveFilterInput: false,
      filterTypeArray: ['game_name'],
      showFilterType: false,
      showFilters: false,
      showOverlay: false,
      filterValueArray: {},
      options_tags: '',
      value_tags: '',
    }
    this.filterGroup = {
      game_name: 'Game Title',
      region: 'Region',
      tags: 'Tags',
      experience: 'Experience Level',
      start_time: 'Start Time',
      platform: 'Platform',
      description: 'Description',
      mic: 'Mic required?',
      eighteen_plus: '18+',
      language: 'Language',
    }
    this.constantFilterGroup = {
      game_name: 'Game Title',
      region: 'Region',
      tags: 'Tags',
      experience: 'Experience Level',
      start_time: 'Start Time',
      platform: 'Platform',
      description: 'Description',
      mic: 'Mic required?',
      eighteen_plus: '18+',
      language: 'Language',
    }
    this.constantFilter = [
      'game_name',
      'region',
      'tags',
      'experience',
      'start_time',
      'platform',
      'description',
      'mic',
      'eighteen_plus',
      'language',
    ]
    this.filterNameRef = React.createRef()
  }

  componentDidMount() {
    const getInitialData = async () => {
      try {
        let results = await Schedule_Game_Tags()
        this.setState({ options_tags: results })
      } catch (error) {
        console.log(error)
      }
    }
    this.getFilter()
    getInitialData()
  }

  handleDropDownChange = async (entered_name, name) => {
    const { filterValueArray = {}, filterTypeArray } = this.state
    const { additional_info = false, game_names_id = '', value = '' } = entered_name || {}

    let results = null
    if (entered_name && entered_name.value) {
      results = await Game_name_values(entered_name.value)
    }

    if (results) {
      filterValueArray['game_name'] = results[0].value
      filterValueArray['game_name_value'] = results[0]
    } else {
      filterValueArray['game_name'] = entered_name
      filterValueArray['game_name_value'] = entered_name
      this.filterGroup = this.constantFilterGroup
    }

    // if (entered_name != null && entered_name != undefined) {
    //   filterValueArray['game_name'] = entered_name.value
    // } else {
    //   filterValueArray['game_name'] = entered_name
    //   this.filterGroup = this.constantFilterGroup
    // }

    let additional_info_data = {}

    if (additional_info) {
      const getAllExtraFilters = await axios.get(`/api/ScheduleGame/getHeader_ALL/${game_names_id}`)
      additional_info_data = getAllExtraFilters.data.additional_info_data
      const allKeys = Object.keys(additional_info_data)
      allKeys.length > 0 &&
        allKeys.forEach((key) => {
          this.filterGroup[key] = properCase(key)
        })
    } else {
      let additional_info_data = {}
      let allKeys = { ...this.filterGroup }
      let keys = {}
      if (Object.keys(allKeys).length > 0) {
        Object.keys(allKeys).forEach((key) => {
          if (this.constantFilter.includes(key)) {
            keys[key] = allKeys[key]
          }
        })
      }
      this.filterGroup = { ...keys }
    }

    this.setState(
      {
        game_name: filterValueArray['game_name'],
        default: false,
        games: false,
        filterValueArray,
        additional_info_data,
        extraFields: {},
      },
      () => {
        this.props.handleChange(
          {
            game_name: filterValueArray['game_name'],
            default: false,
            games: false,
          },
          name
        )
      }
    )
  }
  handleTagsChange = (value_tags = [], name) => {
    const { filterValueArray = {} } = this.state
    filterValueArray['tags'] = value_tags
    this.setState({ value_tags, filterValueArray }, () => {
      const tags = this.getTagsValue([...value_tags])
      this.props.handleChange({ tags: value_tags }, name)
    })
  }
  handleChange_region = (region, name) => {
    const { filterValueArray = {} } = this.state
    filterValueArray['region'] = region
    this.setState(
      {
        region,
        filterValueArray,
      },
      () => {
        this.props.handleChange({ region }, name)
      }
    )
  }

  handleChange_experience = (experience, name) => {
    const { filterValueArray = {} } = this.state
    filterValueArray['experience'] = experience
    this.setState(
      {
        experience,
        filterValueArray,
      },
      () => {
        this.props.handleChange({ experience }, name)
      }
    )
  }
  handleChange_platform = (platform, name) => {
    const { filterValueArray = {} } = this.state
    filterValueArray['platform'] = platform
    this.setState(
      {
        platform,
        filterValueArray,
      },
      () => {
        this.props.handleChange({ platform }, name)
      }
    )
  }
  handleChange_time = (start_time, name) => {
    const { filterValueArray = {} } = this.state
    filterValueArray['start_time'] = start_time
    this.setState(
      {
        start_time,
        filterValueArray,
      },
      () => {
        this.props.handleChange({ start_time }, name)
      }
    )
  }

  handleChange_description = (e, name) => {
    const description = e.target.value
    const { filterValueArray = {} } = this.state
    filterValueArray['description'] = description
    this.setState(
      {
        description,
        filterValueArray,
      },
      () => {
        this.props.handleChange({ description }, name)
      }
    )
  }

  handleChange_other = (e, name) => {
    const other_box = e.target.value
    const { filterValueArray = {} } = this.state
    filterValueArray['other'] = other_box
    this.setState(
      {
        other_box,
        filterValueArray,
      },
      () => {
        this.props.handleChange({ other_box }, name)
      }
    )
  }

  handleChange_mic = (mic, name) => {
    const { filterValueArray = {} } = this.state
    filterValueArray['mic'] = mic
    this.setState(
      {
        mic,
        filterValueArray,
      },
      () => {
        this.props.handleChange({ mic }, name)
      }
    )
  }

  handleChange_eighteen_plus = (eighteen_plus, name) => {
    const { filterValueArray = {} } = this.state
    filterValueArray['eighteen_plus'] = eighteen_plus
    this.setState(
      {
        eighteen_plus,
        filterValueArray,
      },
      () => {
        this.props.handleChange({ eighteen_plus }, name)
      }
    )
  }

  handleChange_language = (language, name) => {
    const { filterValueArray = {} } = this.state
    filterValueArray['language'] = language
    this.setState(
      {
        language,
        filterValueArray,
      },
      () => {
        this.props.handleChange({ language }, name)
      }
    )
  }

  handleChange_visibility = (visibility_box, name) => {
    this.setState(
      {
        visibility_box,
      },
      () => {
        this.props.handleChange({ visibility_box }, name)
      }
    )
  }

  async getOptions(inputValue) {
    return Game_name_values(inputValue)
  }

  getOptions_tags = (inputValue) => {
    const getInitialData = async (inputValue) => {
      try {
        let results = await Schedule_Game_Tags(inputValue)
        this.setState({ options_tags: results })
      } catch (error) {
        console.log(error)
      }
    }
    getInitialData(inputValue)
  }
  getTagsValue = (value_tags = []) => {
    return value_tags.map((d) => d.value)
  }

  getFilter = async () => {
    try {
      const getAllSavedFilters = await axios.get('/api/SavedFiltersScheduleGameController/getAllSavedFilters')
      const savedFiltersObj = getAllSavedFilters.data.allFilters
      const additional_info = getAllSavedFilters.data.additional_info
      const additional_info_data_savedFilter = getAllSavedFilters.data.additional_info_data
      if (additional_info) {
        this.setState({ additional_info_data_savedFilter, savedFiltersObj })
      } else {
        this.setState({ savedFiltersObj, additional_info_data_savedFilter: {} })
      }
    } catch (error) {
      console.log(error)
    }
  }

  onKeyDown = (e) => {
    Disable_keys(e)
  }

  handleClearFilterClick = () => {
    this.setState(
      {
        filterTypeArray: ['game_name'],
        showFilterType: false,
        showFilters: false,
        showSaveFilterInput: false,
        showOverlay: false,
        other: '',
        description: '',
        when: '',
        platform: '',
        experience: '',
        region: '',
        game_name: '',
        value_tags: '',
        filterValueArray: {},
        extraFields: {},
        filterValueArray: {},
        tags: [],
        eighteen_plus: null,
        mic: null,
        language: null,
      },
      () => {
        this.filterGroup = this.constantFilterGroup
        this.props.handleChange({ ...this.state, tags: '' }, '')
      }
    )
  }

  handleSaveFilterClick = async () => {
    const { filterName = '', isRequesting = false, filterTypeArray = [], filterValueArray = {} } = this.state
    if (!filterName) {
      toast.error(<Toast_style text={'Hmmm, sorry those characters are not allowed'} />)
      return
    }
    if (isRequesting) {
      toast.warn(<Toast_style text={'Requeeeeesting, please wait....'} />)
      return
    }
    this.setState({ isRequesting: true })
    const payload = {}
    const extraFields = {}
    const constantFilter = [...this.constantFilter]
    filterTypeArray.forEach((key) => {
      if (constantFilter.includes(key)) {
        payload[key] = filterValueArray[key] || ''
      } else {
        extraFields[key] = filterValueArray[key] || ''
      }
    })
    if (Object.keys(extraFields).length > 0) {
      Object.keys(extraFields).forEach((key, index) => {
        let value = ''
        if (Array.isArray(filterValueArray[key]) && filterValueArray[key].length > 0) {
          value = filterValueArray[key].map((v) => v.value)
        } else if (typeof filterValueArray[key] == 'object') {
          value = filterValueArray[key].value
        }
        payload[`value_${queryMapping[index]}`] = { [key]: value }
      })
    }

    try {
      const saveFilter = await axios.post('/api/SavedFiltersScheduleGameController', {
        name: filterName,
        payload,
      })
      if (saveFilter.data == 'ER_DUP_ENTRY') {
        toast.error(<Toast_style text={'Oopsie! This name already exists.'} />)
        this.setState({ isRequesting: false })
      } else {
        toast.success(<Toast_style text={`Sweeet, filter ${filterName} was created successfully.`} />)
        this.setState({ showSaveFilterInput: false, isRequesting: false, filterName: '', showOverlay: false })
        this.getFilter()
      }
    } catch (error) {
      this.setState({ isRequesting: false })
      console.log(error)
    }
  }

  handleSaveFilterAction = () => {
    this.setState({ showSaveFilterInput: true, showOverlay: true })
    setTimeout(() => {
      this.filterNameRef.current.focus()
    }, 10)
  }
  handleCloseSaveFilterInput = () => {
    this.setState({ showSaveFilterInput: false })
  }

  handleSavedFilterChange = () => {
    this.setState({ showFilters: !this.state.showFilters, showFilterType: false, showOverlay: true })
  }
  handleAddFilterChange = () => {
    this.setState({ showFilterType: !this.state.showFilterType, showFilters: false, showOverlay: true })
  }
  handleSaveFilterName = (e) => {
    const filterName = e.target.value
    const isVaid = /['/.%#$,;`\\]/.test(filterName)
    if (!isVaid) {
      if (filterName.length < 250) {
        this.setState({ filterName })
      } else {
        toast.error(<Toast_style text={'Sigh, You can not enter more than 250 Char.'} />)
      }
    } else {
      toast.error(<Toast_style text={'Hmmm, sorry those characters are not allowed'} />)
    }
  }
  handleFilterTypeClick = (k) => {
    if (k != 'game_name') {
      const { filterTypeArray = [], showFilterType } = this.state
      if (!filterTypeArray.includes(k)) {
        filterTypeArray.push(k)
        this.setState({ filterTypeArray, showFilterType: !showFilterType, showOverlay: false })
      } else {
        const filterType = filterTypeArray.filter((name) => name != k)
        this.setState({ filterTypeArray: filterType, showFilterType: !showFilterType, showOverlay: false })
      }
    }
  }

  handleSavedFilterClick = (data, ad_info) => {
    let { extraFields = {} } = this.state
    const { payload = {} } = data
    const JsonPayload = JSON.parse(payload)
    const filterTypeArray = []
    let filterValueArray = {}
    Object.keys(JsonPayload).forEach((key) => {
      if ((JsonPayload.hasOwnProperty(key) && JsonPayload[key] !== false) || key == 'game_name' || JsonPayload[key] === '') {
        if (!valueMapping.includes(key)) {
          filterTypeArray.push(key)
          filterValueArray[key] = JsonPayload[key]
        } else {
          const extraKeys = JsonPayload[key]
          const extraFields_key = Object.keys(extraKeys)[0]
          if (extraFields_key) {
            const extraFields_value = Object.values(extraKeys)[0]
            if (Array.isArray(extraFields_value) && extraFields_value.length > 0) {
              let value = []
              extraFields_value.forEach((item) => {
                value.push({ value: item, label: item })
              })
              extraFields = { ...extraFields, [extraFields_key]: value }
            } else {
              extraFields = { ...extraFields, [extraFields_key]: { value: extraFields_value, label: extraFields_value } }
            }
            filterTypeArray.push(extraFields_key)
          }
          filterValueArray = { ...filterValueArray, ...extraFields }
        }
      }
    })
    if (Object.keys(ad_info).length > 0) {
      const allKeys = Object.keys(ad_info)
      allKeys.length > 0 &&
        allKeys.forEach((key) => {
          this.filterGroup[key] = properCase(key)
        })
    }

    this.setState(
      { filterTypeArray, filterValueArray, showFilters: false, showOverlay: false, additional_info_data: ad_info, extraFields },
      () => {
        this.props.handleChange({ ...filterValueArray }, '')
      }
    )
  }

  handleEditFilterType = (e, id, inputValue) => {
    e.preventDefault()
    e.stopPropagation()
    const showFilterTypeInput = {}
    showFilterTypeInput[id] = true
    this.setState({ showFilterTypeInput, inputValue, showOverlay: true })
  }
  handleSavefilterInputChnage = (e, id, filterPayload) => {
    e.stopPropagation()
    const inputValue = e.target.value
    this.setState({ inputValue, filterId: id, filterPayload })
  }

  editFilterInputKeyDown = (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      return
    }
    if (e.key === 'Escape') {
      this.setState({ showSaveFilterInput: false, isRequesting: false, filterName: '', showOverlay: false })
    }

    if (e.key === 'Enter') {
      event.preventDefault()
      event.stopPropagation()
      this.handleSaveFilterClick()
    }
  }

  handleInputKeyDown = (e) => {
    e.stopPropagation()
    if (e.key === 'Enter' && e.shiftKey) {
      return
    }
    if (e.key === 'Escape') {
      this.setState({
        showFilterTypeInput: {},
        inputValue: '',
      })
    }

    if (e.key === 'Enter') {
      event.preventDefault()
      event.stopPropagation()
      this.update_Filter_Name()
    }
  }

  update_Filter_Name = async () => {
    const { inputValue = '', filterId = '', filterPayload = '' } = this.state
    if (!inputValue) {
      toast.error(<Toast_style text={'Mate, please enter filter name first.'} />)
      return
    }
    try {
      const saveFilter = await axios.post('/api/SavedFiltersScheduleGameController/updateFilter', {
        id: filterId,
        name: inputValue,
        payload: JSON.parse(filterPayload),
      })
      if (saveFilter.data == 'ER_DUP_ENTRY') {
        toast.error(<Toast_style text={'Oopsie! Name already exists.'} />)
        this.setState({ isRequesting: false })
      } else {
        toast.success(<Toast_style text={`Sweeet, filter ${inputValue} was updated successfully.`} />)
        this.setState({ showFilterTypeInput: {}, inputValue: '' })
        this.getFilter()
      }
    } catch (error) {
      console.log(error)
    }
  }

  handleDeleteFilterType = async (e, id) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      const deleteFilter = await axios.post('/api/SavedFiltersScheduleGameController/deleteFilter', {
        id,
      })
      if (deleteFilter) {
        this.setState({ showFilters: false, showOverlay: false })
        this.getFilter()
      }
    } catch (error) {
      console.log(error)
    }
  }

  handleOverlayClick = () => {
    this.setState({
      showFilterTypeInput: {},
      showFilterType: false,
      showFilters: false,
      showSaveFilterInput: false,
      showOverlay: false,
    })
  }

  handleAdditionalInfoChange = (data, key, type) => {
    const { filterValueArray = {}, extraFields = {} } = this.state
    filterValueArray[key] = data
    extraFields[key] = data

    this.setState(
      {
        extraFields,
        filterValueArray,
      },
      () => {
        this.props.handleChange({ extraFields }, key)
      }
    )
  }

  render() {
    const {
      savedFilter,
      addFilter,
      filterName = '',
      showSaveFilterInput,
      isRequesting = '',
      filterTypeArray,
      showFilterType,
      showFilters,
      savedFiltersObj = [],
      showFilterTypeInput = [],
      inputValue = '',
      showOverlay = false,
      filterValueArray = {},
      additional_info_data = {},
      extraFields = {},
      additional_info_data_savedFilter = {},
      game_name_box,
    } = this.state

    if (this.props.initialData == 'loading') {
      return <h1>Loading</h1>
    }
    return (
      <Fragment>
        <div className='viewGame__header'>
          <div className='title'>Find Matches</div>
        </div>
        <div className='viewGame__filter'>
          <div className='filter__label'>Filter by</div>
          <div className='viewGame__filter-section'>
            <div className='row'>
              {filterTypeArray.map((k) => {
                if (k == 'game_name') {
                  // const value = game_name_box ? game_name_box : filterValueArray[k] ? filterValueArray[k] : null
                  //const value = filterValueArray[k] ? { value: filterValueArray[k], label: filterValueArray[k] } : null
                  return (
                    <div className='col-md-6'>
                      <div className='viewGame__gameName'>
                        <div className='viewGame__label'>{this.filterGroup[k]}</div>
                        <AsyncCreatableSelect
                          cacheOptions
                          defaultOptions
                          isValidNewOption={() => false}
                          loadOptions={this.getOptions}
                          onChange={(data) => this.handleDropDownChange(data, k)}
                          isClearable
                          value={filterValueArray['game_name_value']}
                          className='viewGame__name'
                          placeholder='Search or Select Game Title'
                          onInputChange={(inputValue) => (inputValue.length <= 88 ? inputValue : inputValue.substr(0, 88))}
                          onKeyDown={this.onKeyDown}
                          isSearchable={true}
                          classNamePrefix='filter'
                        />
                      </div>
                    </div>
                  )
                } else if (k == 'tags') {
                  const value = this.state.value_tags || filterValueArray['tags']
                  return (
                    <div className='col-md-6'>
                      <div className='viewGame__gameName'>
                        <div className='viewGame__label'>{this.filterGroup[k]}</div>
                        <Select
                          onChange={(data) => this.handleTagsChange(data, k)}
                          options={this.state.options_tags}
                          isClearable
                          value={value}
                          className='viewGame__name'
                          isMulti
                          onKeyDown={this.onKeyDown}
                          onInputChange={this.getOptions_tags}
                          placeholder='Search or Select Tags'
                          classNamePrefix='filter'
                        />
                      </div>
                    </div>
                  )
                } else if (k == 'region') {
                  return (
                    <div className='col-md-6'>
                      <div className='viewGame__gameName'>
                        <div className='viewGame__label'>{this.filterGroup[k]}</div>
                        <Select
                          onChange={(data) => this.handleChange_region(data, 'region')}
                          options={region_options}
                          placeholder='Select your region'
                          name='region-box'
                          isClearable
                          className='viewGame__name'
                          classNamePrefix='filter'
                          value={filterValueArray['region']}
                        />
                      </div>
                    </div>
                  )
                } else if (k == 'experience') {
                  return (
                    <div className='col-md-6'>
                      <div className='viewGame__gameName'>
                        <div className='viewGame__label'>{this.filterGroup[k]}</div>
                        <Select
                          onChange={this.handleChange_experience}
                          options={experience_options}
                          placeholder='Select experience level'
                          name='experience-box'
                          isClearable
                          className='viewGame__name'
                          classNamePrefix='filter'
                          value={filterValueArray['experience']}
                        />
                      </div>
                    </div>
                  )
                } else if (k == 'platform') {
                  return (
                    <div className='col-md-6'>
                      <div className='viewGame__gameName'>
                        <div className='viewGame__label'>{this.filterGroup[k]}</div>
                        <Select
                          onChange={this.handleChange_platform}
                          options={platform_options}
                          placeholder='Select which platform'
                          name='platform-box'
                          isClearable
                          className='viewGame__name'
                          classNamePrefix='filter'
                          value={filterValueArray['platform']}
                        />
                      </div>
                    </div>
                  )
                } else if (k == 'start_time') {
                  return (
                    <div className='col-md-6'>
                      <div className='viewGame__gameName'>
                        <div className='viewGame__label'>{this.filterGroup[k]}</div>
                        <Select
                          onChange={this.handleChange_time}
                          options={date_options}
                          placeholder='Start Date?'
                          name='date-time-box'
                          isClearable
                          className='viewGame__name'
                          classNamePrefix='filter'
                          value={filterValueArray['start_date']}
                        />
                      </div>
                    </div>
                  )
                } else if (k == 'description') {
                  return (
                    <div className='col-md-6'>
                      <div className='viewGame__gameName'>
                        <div className='viewGame__label'>{this.filterGroup[k]}</div>
                        <input
                          type='text'
                          className='viewGame__name__input'
                          onChange={this.handleChange_description}
                          value={this.state.description_box || filterValueArray['description']}
                          placeholder='Description'
                        />
                      </div>
                    </div>
                  )
                } else if (k == 'mic') {
                  return (
                    <div className='col-md-6'>
                      <div className='viewGame__gameName'>
                        <div className='viewGame__label'>{this.filterGroup[k]}</div>
                        <Select
                          onChange={this.handleChange_mic}
                          options={yes_no_options}
                          placeholder='Mic required?'
                          name='platform-box'
                          isClearable
                          className='viewGame__name'
                          classNamePrefix='filter'
                          value={filterValueArray['mic']}
                        />
                      </div>
                    </div>
                  )
                } else if (k == 'eighteen_plus') {
                  return (
                    <div className='col-md-6'>
                      <div className='viewGame__gameName'>
                        <div className='viewGame__label'>{this.filterGroup[k]}</div>
                        <Select
                          onChange={this.handleChange_eighteen_plus}
                          options={yes_no_options}
                          placeholder='18+ event?'
                          name='platform-box'
                          isClearable
                          className='viewGame__name'
                          classNamePrefix='filter'
                          value={filterValueArray['eighteen_plus']}
                        />
                      </div>
                    </div>
                  )
                } else if (k == 'language') {
                  return (
                    <div className='col-md-6'>
                      <div className='viewGame__gameName'>
                        <div className='viewGame__label'>{this.filterGroup[k]}</div>
                        <Select
                          onChange={this.handleChange_language}
                          options={language_options}
                          placeholder='Search which language/s'
                          name='platform-box'
                          isClearable
                          className='viewGame__name'
                          classNamePrefix='filter'
                          value={filterValueArray['language']}
                        />
                      </div>
                    </div>
                  )
                } else if (k == 'other') {
                  return (
                    <div className='col-md-6'>
                      <div className='viewGame__gameName'>
                        <div className='viewGame__label'>{this.filterGroup[k]}</div>
                        <input
                          type='text'
                          className='viewGame__name__input'
                          onChange={this.handleChange_other}
                          value={this.state.other_box || filterValueArray['other']}
                          placeholder='Any Other stuff'
                        />
                      </div>
                    </div>
                  )
                } else if (k == 'visibility') {
                  return (
                    <div className='col-md-6'>
                      <div className='viewGame__gameName'>
                        <div className='viewGame__label'>{this.filterGroup[k]}</div>
                        <Select
                          onChange={this.handleChange_visibility}
                          options={visibility_options}
                          placeholder='Select visibility'
                          name='visibility-box'
                          isClearable
                          className='viewGame__name'
                          classNamePrefix='filter'
                          value={this.state.visibility || filterValueArray['visibility']}
                        />
                      </div>
                    </div>
                  )
                } else if (Object.keys(additional_info_data).length > 0) {
                  const field_data = additional_info_data[k] || {}
                  return (
                    <div className='col-md-6'>
                      <div className='viewGame__gameName'>
                        <div className='viewGame__label'>{field_data.label || ''}</div>
                        <Select
                          onChange={(data) => this.handleAdditionalInfoChange(data, k, field_data.type)}
                          options={getExtraFilterOprion(field_data.value)}
                          isClearable
                          value={extraFields[k] || ''}
                          className='viewGame__name'
                          isMulti={field_data.type == 'Single' ? false : true}
                          onKeyDown={this.onKeyDown}
                          placeholder={`${field_data.placeholder || ''}`}
                          classNamePrefix='filter'
                        />
                      </div>
                    </div>
                  )
                }
              })}
            </div>

            {filterTypeArray.length > 1 && (
              <div className='saveFilterAction__section'>
                <button type='button' disabled={isRequesting} className='saveFilter__button' onClick={this.handleSaveFilterAction}>
                  Save Filter
                </button>
                {showSaveFilterInput && (
                  <div className='saveFilterInput__container'>
                    <div className='input_name'>
                      <div className='input__label'>Filter Name</div>
                      <input
                        type='text'
                        ref={this.filterNameRef}
                        value={filterName}
                        placeholder='Name your filter'
                        onChange={this.handleSaveFilterName}
                        autoComplete={+new Date()}
                        maxLength='250'
                        onKeyDown={this.editFilterInputKeyDown}
                      />
                    </div>
                    <button
                      type='button'
                      disabled={isRequesting || !filterName}
                      className='filter__save_button'
                      onClick={this.handleSaveFilterClick}>
                      Save
                    </button>
                    <div className='filterInput__close' onClick={this.handleCloseSaveFilterInput}>
                      X
                    </div>
                  </div>
                )}
                <div className='clearFilter' onClick={this.handleClearFilterClick}>
                  Clear
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='viewGame__addMoreFilter'>
          <div className='savedFilter__option'>
            <div className='filter__header' onClick={this.handleSavedFilterChange}>
              Saved Filter
            </div>
            <img
              src={' https://mygame-media.s3.amazonaws.com/platform_images/View+Game/Down+Carrot.svg'}
              onClick={this.handleSavedFilterChange}
            />
            {showFilters && (
              <div className='filterType__group'>
                <div className='filterType__head'>Saved Filters</div>
                <div className='filterType__body'>
                  {savedFiltersObj.length > 0 &&
                    savedFiltersObj.map((k) => {
                      return (
                        <div className={`filterType__name`} key={`${k.id}_${k.name}`}>
                          {!showFilterTypeInput[k.id] ? (
                            <div
                              style={{ padding: '9px', paddingRight: '42px' }}
                              title={k.name}
                              onClick={(e) => this.handleSavedFilterClick(k, additional_info_data_savedFilter)}>
                              {k.name}
                            </div>
                          ) : (
                            <div style={{ padding: '9px' }}>
                              <input
                                type='text'
                                id={k.id}
                                className='filter__Input'
                                onChange={(e) => this.handleSavefilterInputChnage(e, k.id, k.payload)}
                                value={inputValue}
                                onKeyDown={this.handleInputKeyDown}
                              />
                            </div>
                          )}

                          {!showFilterTypeInput[k.id] && (
                            <div className='deleteFilter' onClick={(e) => this.handleDeleteFilterType(e, k.id)}>
                              <img src='https://mygame-media.s3.amazonaws.com/platform_images/View+Game/X+icon.svg' />
                            </div>
                          )}
                          {!showFilterTypeInput[k.id] && (
                            <div className='editFilter' onClick={(e) => this.handleEditFilterType(e, k.id, k.name)}>
                              <img src='https://mygame-media.s3.amazonaws.com/platform_images/View+Game/edit-tools.svg' />
                            </div>
                          )}
                        </div>
                      )
                    })}
                </div>
              </div>
            )}
          </div>
          <div className='filter_dot'></div>
          <div className='addFilter__option'>
            <div className='filter__header' onClick={this.handleAddFilterChange}>
              Add Filter
            </div>
            <img
              src={' https://mygame-media.s3.amazonaws.com/platform_images/View+Game/Down+Carrot.svg'}
              onClick={this.handleAddFilterChange}
            />
            {showFilterType && (
              <div className='filterType__group'>
                <div className='filterType__head'>Add Filters</div>
                <div className='filterType__body'>
                  {Object.keys(this.filterGroup).map((k) => {
                    return (
                      <div
                        className={`filterType__name  ${filterTypeArray.includes(k) ? 'selected' : ''}`}
                        style={{ padding: '9px' }}
                        key={k}
                        onClick={(e) => this.handleFilterTypeClick(k)}>
                        {this.filterGroup[k]}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
          {showOverlay && <div className='filter__overlay' onClick={this.handleOverlayClick}></div>}
        </div>
      </Fragment>
    )
  }
}
