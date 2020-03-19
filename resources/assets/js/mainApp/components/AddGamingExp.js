import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Redirect } from 'react-router'
import axios from 'axios'
import Select from 'react-select'
import CreatableSelect from 'react-select/lib/Creatable'
import AsyncCreatableSelect from 'react-select/lib/AsyncCreatable'
import Modal from 'react-modal'
import { toast } from 'react-toastify'

import { Game_name_values, Disable_keys, Toast_style, Game_name_Tags } from './Utility_Function'

Modal.setAppElement('#app')

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

const rating_options = [
  { value: 1, label: '1 star' },
  { value: 2, label: '2 stars' },
  { value: 3, label: '3 stars' },
  { value: 4, label: '4 stars' },
  { value: 5, label: '5 stars' },
]

const status_options = [
  { value: 'Actively Gaming', label: 'Actively Gaming' },
  { value: 'Sometimes...', label: 'Sometimes...' },
  { value: 'Moved On', label: 'Moved On' },
]

type State = {
  options: [{ [string]: string }],
  options_tags: [{ [string]: string }],
  value: string | void,
  value_tags: string | void,
}

const createOption = (label: string, game_names_id: string) => ({
  label,
  value: label,
  game_names_id,
})

export default class AddGamingExp extends Component<*, State> {
  constructor() {
    super()
    this.state = {
      shouldCloseOnOverlayClick_: true,
      show_info_box: false,
      show_game_name_info_box: false,
      show_status_info_box: false,
      game_name_box: '',
      status_box: '',
      experience_box: '',
      played_box: '',
      ratings_box: '',
      comments_box: '',
      link_box: '',
      isLoading_tags: false,
      options_tags: '',
      value_tags: [],
      newValueCreated_tags: [],
      isLoading: false,
      options: '',
      value: [],
      newValueCreated: [],
      comments_chkbox: false,
      link_chkbox: false,
      just_one_time: true,
      redirect_profile: false,
      key: 1,
    }
  }

  handleCloseModal = () => {
    this.setState({ redirect_profile: true })
  }

  testModal = (e) => {
    this.setState({ shouldCloseOnOverlayClick_: false })
  }

  handleChange_Experience = (experience_box) => {
    this.setState({ experience_box })
    this.setState({ shouldCloseOnOverlayClick_: false })
  }

  handleChange_Status = (status_box) => {
    this.setState({ status_box })
    this.setState({ shouldCloseOnOverlayClick_: false })
  }

  handleChange_Played = (played_box) => {
    this.setState({ played_box })
    this.setState({ shouldCloseOnOverlayClick_: false })
  }

  handleChange_Ratings = (ratings_box) => {
    this.setState({ ratings_box })
    this.setState({ shouldCloseOnOverlayClick_: false })
  }

  toggleChange_comments = () => {
    this.setState({
      comments_chkbox: !this.state.comments_chkbox,
    })
    this.setState({ shouldCloseOnOverlayClick_: false })
  }

  toggleChange_link = () => {
    this.setState({
      link_chkbox: !this.state.link_chkbox,
    })
    this.setState({ shouldCloseOnOverlayClick_: false })
  }
  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value })
    this.setState({ shouldCloseOnOverlayClick_: false })
  }
  handleChange2 = (value: any) => {
    this.setState(
      {
        value,
      },
      () => {
        this.loadDefaultValues(value)
      }
    )
    this.setState({ shouldCloseOnOverlayClick_: false })
  }
  handleChange3 = (value_tags: any) => {
    this.setState({ value_tags })
    this.setState({ shouldCloseOnOverlayClick_: false })
  }

  loadDefaultValues = async () => {
    try {
      if (this.state.value != null) {
        if (this.state.value.game_names_id != null && this.state.value.game_names_id != undefined && this.state.value.game_names_id != '') {
          var results = await Game_name_Tags('', this.state.value.game_names_id)
          this.setState({ options_tags: results })
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  submitForm = async () => {
    var myExperience = ''
    var myPlayed = ''
    var myRatings = ''
    var myTags = ''

    if (this.state.value == '' || this.state.value == null) {
      toast.success(<Toast_style text={'Sorry mate! Game name can not be blank'} />)
      return
    }

    if (this.state.status_box == '' || this.state.status_box == null) {
      toast.success(<Toast_style text={'Sorry mate! Status name can not be blank'} />)
      return
    }

    if (/['/.%#$,;`\\]/.test(this.state.value.value)) {
      toast.success(<Toast_style text={'Sorry mate! Game name can not have invalid fields'} />)
      return
    }

    if (this.state.experience_box != null || this.state.experience_box != undefined) {
      myExperience = this.state.experience_box.value
    }
    if (this.state.played_box != null || this.state.played_box != undefined) {
      myPlayed = this.state.played_box.value
    }

    if (this.state.ratings_box != null || this.state.ratings_box != undefined) {
      myRatings = this.state.ratings_box.value
    }

    if (this.state.value_tags !== null && this.state.value_tags.length !== 0) {
      if (myTags == null) {
        myTags = ''
      }
      for (var i = 0; i < this.state.value_tags.length; i++) {
        if (/['/.%#$,;`\\]/.test(this.state.value_tags[i].label)) {
          toast.success(<Toast_style text={'Sorry mate! Tags can not have invalid fields'} />)
          return
        }
        myTags += this.state.value_tags[i].label.trim() + '; '
      }
      myTags = myTags
        .trim()
        .replace(/; /g, ',')
        .trim()
      myTags = myTags.replace(/;/g, '')
      myTags = myTags.replace(/,/g, ', ')
    }

    this.state.comments_box == undefined ? undefined : (this.state.comments_box = this.state.comments_box.trim())
    this.state.link_box == undefined ? undefined : (this.state.link_box = this.state.link_box.trim())

    if (!this.state.just_one_time) {
      return
    }
    this.state.just_one_time = false

    try {
      const post = await axios.post('/api/GameExperiences', {
        game_name: this.state.value.value,
        experience: myExperience,
        comments: this.state.comments_box,
        status: this.state.status_box.value,
        played: myPlayed,
        link: this.state.link_box,
        ratings: myRatings,
        tags: myTags,
      })
      this.handleCloseModal()
    } catch (error) {
      console.log(error)
    }
  }

  handleCreate = (inputValue: any) => {
    setTimeout(() => {
      const { value, newValueCreated } = this.state
      const newOption = createOption(inputValue, null)
      this.setState({ value: newOption })
      this.setState({ value_tags: '' })
      this.setState({ newValueCreated: [...newValueCreated, newOption.label] })
      this.setState({ newValueCreated_tags: [] })
    }, 300)
  }

  handleCreate2 = (inputValue: any) => {
    if (inputValue.length > 88) {
      toast.success(<Toast_style text={'Sorry mate! Tag length is too long.'} />)
      return
    }
    setTimeout(() => {
      const { options_tags, value_tags, newValueCreated_tags } = this.state
      const newOption = createOption(inputValue, null)
      this.setState({ options_tags: [...options_tags, newOption] })
      this.setState({ value_tags: [...value_tags, newOption] })
      this.setState({
        newValueCreated_tags: [...newValueCreated_tags, newOption.label],
      })
    }, 300)
  }

  getOptions(inputValue) {
    return Game_name_values(inputValue)
  }

  getOptions_tags = (inputValue) => {
    const self = this
    const getInitialData = async function(inputValue) {
      try {
        var results = await Game_name_Tags(inputValue, self.state.value.game_names_id)
        self.setState({ options_tags: results })
      } catch (error) {
        console.log(error)
      }
    }

    if (this.state.value != null) {
      if (this.state.value.game_names_id != null && this.state.value.game_names_id != undefined && this.state.value.game_names_id != '') {
        getInitialData(inputValue)
      }
    }
  }

  onKeyDown = (e) => {
    Disable_keys(e)
  }

  render() {
    if (this.state.redirect_profile) {
      const { match } = this.props.routeProps
      var tmp = `/profile/${match.params.alias}`
      return <Redirect push to={tmp} />
    }

    const { isLoading, options, value, options_tags, value_tags } = this.state
    return (
      <div className='content-area addGamingExp-page'>
        <Modal
          isOpen={true}
          onRequestClose={(event) => {
            // Ignore react-modal esc-close handling
            if (event.type === 'keydown' && event.keyCode === 27 && this.state.shouldCloseOnOverlayClick_ === false) {
              return
            } else {
              this.handleCloseModal()
            }
          }}
          shouldCloseOnOverlayClick={this.state.shouldCloseOnOverlayClick_}
          className='addGamingModal'
          overlayClassName='Overlay'>
          Add Gaming Interest:
          <i className='fas fa-times' onClick={this.handleCloseModal}></i>
          <div className='gName_txtBox'>
            <p>
              Game Name <span style={{ color: 'red' }}>*</span>
            </p>
            <AsyncCreatableSelect
              cacheOptions
              loadOptions={this.getOptions}
              isClearable
              onChange={this.handleChange2}
              value={value}
              className='game_name_box'
              onCreateOption={this.handleCreate}
              onInputChange={(inputValue) => (inputValue.length <= 88 ? inputValue : inputValue.substr(0, 88))}
              placeholder='Enter in a Game title'
              onKeyDown={this.onKeyDown}
            />
          </div>
          <div className='status'>
            <p>
              Status <span style={{ color: 'red' }}>*</span>
            </p>
            <Select onChange={this.handleChange_Status} options={status_options} placeholder='Set your status' className='status_box' />
          </div>
          <div className='experience'>
            <p>Experience:</p>
            <Select
              onChange={this.handleChange_Experience}
              options={experience_options}
              placeholder='Select experience level'
              className='experience_box'
            />
          </div>
          <div className='played'>
            <p>Time Played:</p>
            <Select
              onChange={this.handleChange_Played}
              options={played_options}
              placeholder='Select time played'
              className='played_box'
              defaultValue={[{ label: 'Less than 1 year', value: 1 }]}
            />
          </div>
          <div className='ratings'>
            <p>Ratings:</p>
            <Select
              onChange={this.handleChange_Ratings}
              options={rating_options}
              placeholder='Select game ratings'
              className='ratings_box'
            />
          </div>
          <div className='options_checkbox'>
            <p>Show Link box and/or Comments box</p>
            <input id='link_ChkBox' type='checkbox' defaultChecked={this.state.link_chkbox} onChange={this.toggleChange_link} /> Link
            <input
              id='comments_ChkBox'
              type='checkbox'
              defaultChecked={this.state.comments_chkbox}
              onChange={this.toggleChange_comments}
            />{' '}
            Comments
          </div>
          <div className='tag_txtBox'>
            <p>
              <span style={{ color: 'green' }}>T</span>
              <span style={{ color: 'dodgerblue' }}>a</span>
              <span style={{ color: 'red' }}>g</span>
              <span style={{ color: 'gold' }}>s</span> (Keywords that identify <span style={{ color: 'green' }}>y</span>
              <span style={{ color: 'dodgerblue' }}>o</span>
              <span style={{ color: 'red' }}>u</span>
              <span style={{ color: 'gold' }}>r</span> unique experience with this game. Max 250 chars)
            </p>
            <CreatableSelect
              onChange={this.handleChange3}
              options={this.state.options_tags}
              isClearable
              value={value_tags}
              className='tag_name_box'
              isMulti
              onKeyDown={this.onKeyDown}
              onInputChange={this.getOptions_tags}
              placeholder='Search, Select or create Tags'
            />
          </div>
          {this.state.link_chkbox == false ? (
            <div className='link_txtBox'></div>
          ) : (
            <div className='link_txtBox'>
              <p>Link</p>
              <input type='text' id='link_box' className='link_box' maxLength='50' onChange={this.handleChange} />
            </div>
          )}
          {this.state.comments_chkbox == false ? (
            <div className='comments'></div>
          ) : (
            <div className='comments'>
              <p>Comments</p>
              <textarea
                id='comments_box'
                className='comments_box'
                rows={8}
                cols={80}
                defaultValue={''}
                maxLength='254'
                onChange={this.handleChange}
              />
            </div>
          )}
          <div className='save-btn'>
            <button className='save' onClick={this.submitForm}>
              Save
            </button>
          </div>
        </Modal>
      </div>
    )
  }
}
