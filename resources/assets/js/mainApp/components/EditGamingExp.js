import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Redirect } from 'react-router'
import axios from 'axios'
import Select from 'react-select'
import CreatableSelect from 'react-select/lib/Creatable'
import AsyncCreatableSelect from 'react-select/lib/AsyncCreatable'
import Modal from 'react-modal'
import { toast } from 'react-toastify'
import SweetAlert from 'react-bootstrap-sweetalert'
import { Game_name_values, Disable_keys, Toast_style } from './Utility_Function'

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

export default class EditGamingExp extends Component<*, State> {
  constructor() {
    super()
    self = this
    this.state = {
      shouldCloseOnOverlayClick_: true,
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
      intial_trigger: true,
      edit_game_name: '',
      just_one_time: true,
      redirect_: false,
      alert: null,
    }
  }

  handleCloseModal = () => {
    this.setState({ redirect_: true })
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
    self.setState({ value })
    this.onBlur_game_name(value)
    this.setState({ shouldCloseOnOverlayClick_: false })
  }
  handleChange3 = (value_tags: any) => {
    this.setState({ value_tags })
    this.setState({ shouldCloseOnOverlayClick_: false })
  }

  delete_exp = () => {
    const { match } = this.props.routeProps

    try {
      const myGame = axios.get(`/api/GameExperiences/delete/${match.params.game_id}`)
    } catch (error) {
      console.log(error)
    }
    this.handleCloseModal()
  }

  submitForm = async () => {
    var myExperience = ''
    var myPlayed = ''
    var myRatings = ''
    var myTags = ''
    var myStatus = ''

    if (this.state.value == '' || this.state.value == null) {
      toast.success(<Toast_style text={'Sorry mate! Game Name can not be blank'} />)
      return
    }

    if (this.state.status_box == '' && this.state.status_box == null) {
      toast.success(<Toast_style text={'Sorry mate! Status can not be blank'} />)
      return
    } else {
      if (this.state.status_box.label != null) {
        myStatus = this.state.status_box.label
      } else {
        myStatus = this.state.status_box
      }
    }

    if (/['/.%#$,;`\\]/.test(this.state.value.value)) {
      toast.success(<Toast_style text={'Sorry mate! Game name can not have invalid fields'} />)
      return
    }

    if (this.state.experience_box != null && this.state.experience_box != undefined && this.state.experience_box.length != 0) {
      if (this.state.experience_box.value != null) {
        myExperience = this.state.experience_box.value
      } else {
        myExperience = this.state.experience_box
      }
    }

    if (this.state.played_box != null && this.state.played_box != undefined && this.state.played_box.length != 0) {
      myPlayed = this.state.played_box.value
    }
    if (this.state.ratings_box != null && this.state.ratings_box != undefined && this.state.ratings_box.length != 0) {
      if (this.state.ratings_box.value != null) {
        myRatings = this.state.ratings_box.value
      } else {
        myRatings = this.state.ratings_box
      }
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
        myTags += this.state.value_tags[i].label + '; '
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
      const { match } = this.props.routeProps
      const post = await axios.post(`/api/GameExperiences/${match.params.id}/${match.params.game_id}`, {
        game_name: this.state.value.value,
        experience: myExperience,
        comments: this.state.comments_box,
        status: myStatus,
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

  componentWillMount() {
    const { match } = this.props.routeProps
    const self = this

    const getGamingExp = async function() {
      try {
        const myGame = await axios.get(`/api/GameExperiences/${match.params.id}/${match.params.game_id}`)

        self.state.edit_game_name = myGame.data.myGameExperience[0].game_name

        const gameName = await axios.get(`/api/GameName/${self.state.edit_game_name}`)
        const game_newOption = createOption(myGame.data.myGameExperience[0].game_name, gameName.data.getOne[0].id)

        var allTags
        allTags = await axios.get(`/api/Tags/${gameName.data.getOne[0].id}`)

        var x
        for (x = 0; x < allTags.data.allTags.length; x++) {
          const anotherOption = createOption(allTags.data.allTags[x].tag)
          let { options_tags } = self.state
          if (x == 0) {
            options_tags = ''
          }
          self.state.options_tags = [...options_tags, anotherOption]
        }

        self.state.myGame = myGame.data.myGameExperience[0]

        switch (myGame.data.myGameExperience[0].played) {
          case 1:
            self.state.myGame.played_label = 'Less than 1 year'
            self.state.myGame.played_value = 1
            break
          case 2:
            self.state.myGame.played_label = 'Less than 2 years'
            self.state.myGame.played_value = 2
            break
          case 3:
            self.state.myGame.played_label = 'Less than 3 years'
            self.state.myGame.played_value = 3
            break
          case 4:
            self.state.myGame.played_label = 'Less than 4 years'
            self.state.myGame.played_value = 4
            break
          case 5:
            self.state.myGame.played_label = 'Less than 5 years'
            self.state.myGame.played_value = 5
            break
          case 42:
            self.state.myGame.played_label = '5+ years'
            self.state.myGame.played_value = 42
            break
          default:
            self.state.myGame.played_label = 'Less than 1 year'
            self.state.myGame.played_value = 1
        }

        if (self.state.myGame !== undefined) {
          var arrTags = ''
          const { tags } = self.state.myGame
          var tmp = []

          if (tags != null && tags != '') {
            arrTags = tags.split(',')

            var i

            for (i = 0; i < arrTags.length; i++) {
              const newOption = createOption(arrTags[i])
              tmp.push(newOption)
            }
            self.state.value_tags = tmp
          }
        }
        self.setState({ value: game_newOption })
      } catch (error) {
        console.log(error)
      }
    }
    getGamingExp()
  }

  onBlur_game_name = (value) => {
    const getInitialData = async function() {
      try {
        var allTags
        self.setState({ options_tags: '' })
        self.setState({ value_tags: '' })
        if (value != null) {
          if (value.game_names_id != null && value.game_names_id != undefined) {
            allTags = await axios.get(`/api/Tags/${value.game_names_id}`)
          } else {
            return
          }
        } else {
          return
        }

        var i
        for (i = 0; i < allTags.data.allTags.length; i++) {
          const newOption = createOption(allTags.data.allTags[i].tag)
          let { options_tags } = self.state
          if (i == 0) {
            options_tags = ''
          }
          self.setState({
            options_tags: [...options_tags, newOption],
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
    getInitialData()
  }

  getOptions(inputValue) {
    return Game_name_values(inputValue)
  }

  onKeyDown = (e) => {
    Disable_keys(e)
  }

  showAlert() {
    const getAlert = () => (
      <SweetAlert
        danger
        showCancel
        title='Are you sure you wish to delete this Gaming Experience?'
        confirmBtnText='Make it so!'
        confirmBtnBsStyle='danger'
        focusCancelBtn={true}
        focusConfirmBtn={false}
        showCloseButton={true}
        onConfirm={() => this.hideAlert('true')}
        onCancel={() => this.hideAlert('false')}>
        You will not be able to recover this entry!
      </SweetAlert>
    )

    this.setState({
      alert: getAlert(),
    })
  }

  hideAlert(text) {
    this.setState({
      alert: null,
    })
    if (text == 'true') {
      this.delete_exp()
    }
  }

  render() {
    if (this.state.redirect_) {
      const { match } = this.props.routeProps
      var tmp = `/profile/${match.params.alias}`
      return <Redirect push to={tmp} />
    }
    if (this.state.myGame !== undefined) {
      const { isLoading, options, value, isLoading_tags, options_tags, value_tags, edit_game_name } = this.state
      const { game_name, experience, comments, played_label, played_value, status, link, tags, ratings } = this.state.myGame
      var comments_chkbox_state = false
      var link_chkbox_state = false

      if (this.state.intial_trigger) {
        this.setState({ game_name_box: game_name })
        this.setState({ experience_box: experience })
        this.setState({ comments_box: comments })
        this.setState({ played_box: played_value })
        this.setState({ status_box: status })
        this.setState({ link_box: link })
        this.setState({ ratings_box: ratings })
        this.setState({ intial_trigger: false })

        if (comments != '' && comments != null) {
          this.setState({ comments_chkbox: true })
          comments_chkbox_state = true
        }
        if (link != '' && link != null) {
          this.setState({ link_chkbox: true })
          link_chkbox_state = true
        }
      }
      return (
        <div className='content-area addGamingExp-page'>
          {this.state.alert}
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
            Edit Gaming Experience:
            <i className='fas fa-times' onClick={this.handleCloseModal}></i>
            <div className='gName_txtBox'>
              <p>
                Game Name <span style={{ color: 'red' }}>*</span>
              </p>
              <AsyncCreatableSelect
                cacheOptions
                defaultOptions
                loadOptions={this.getOptions}
                isClearable
                onChange={this.handleChange2}
                className='game_name_box'
                onCreateOption={this.handleCreate}
                onInputChange={(inputValue) => (inputValue.length <= 88 ? inputValue : inputValue.substr(0, 88))}
                defaultValue={[{ label: game_name, value: game_name }]}
                onKeyDown={this.onKeyDown}
                value={this.state.value}
              />
            </div>
            <div className='status'>
              <p>
                Status <span style={{ color: 'red' }}>*</span>
              </p>
              <Select
                onChange={this.handleChange_Status}
                options={status_options}
                placeholder='Set your status'
                className='status_box'
                defaultValue={[{ label: status, value: status }]}
              />
            </div>
            <div className='experience'>
              <p>Experience:</p>
              <Select
                onChange={this.handleChange_Experience}
                options={experience_options}
                placeholder='Select experience level'
                className='experience_box'
                defaultValue={[{ label: experience, value: experience }]}
              />
            </div>
            <div className='played'>
              <p>Time Played:</p>
              <Select
                onChange={this.handleChange_Played}
                options={played_options}
                placeholder='Select time played'
                className='played_box'
                defaultValue={[{ label: played_label, value: played_value }]}
              />
            </div>
            <div className='ratings'>
              <p>Ratings:</p>
              <Select
                onChange={this.handleChange_Ratings}
                options={rating_options}
                placeholder='Select game ratings'
                className='ratings_box'
                defaultValue={[{ label: ratings, value: ratings }]}
              />
            </div>
            <div className='options_checkbox'>
              <p>Show Link box and/or Comments box</p>
              <input id='link_ChkBox' type='checkbox' defaultChecked={link_chkbox_state} onChange={this.toggleChange_link} /> Link
              <input
                id='comments_ChkBox'
                type='checkbox'
                defaultChecked={comments_chkbox_state}
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
                options={options_tags}
                onCreateOption={this.handleCreate2}
                isClearable
                isDisabled={isLoading_tags}
                isLoading={isLoading_tags}
                className='tag_name_box'
                isMulti
                onInputChange={(inputValue) => (inputValue.length <= 250 ? inputValue : inputValue.substr(0, 250))}
                value={value_tags}
                onKeyDown={this.onKeyDown}
              />
            </div>
            {this.state.link_chkbox == false ? (
              <div className='link_txtBox'></div>
            ) : (
              <div className='link_txtBox'>
                <p>Link</p>
                <input
                  type='text'
                  id='link_box'
                  className='link_box'
                  maxLength='50'
                  defaultValue={`${link}`}
                  onChange={this.handleChange}
                />
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
                  defaultValue={`${comments}`}
                  maxLength='254'
                  onChange={this.handleChange}
                />
              </div>
            )}
            <div></div>
            <div></div>
            <div></div>
            <div className='save-btn'>
              <button className='delete' onClick={() => this.showAlert()}>
                Delete
              </button>
              &nbsp;
              <button className='save' onClick={this.submitForm}>
                Save
              </button>
            </div>
          </Modal>
        </div>
      )
    } else {
      return <div className='content-area addGamingExp-page'>Loading</div>
    }
  }
}
