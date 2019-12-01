import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Redirect } from 'react-router'
import axios from 'axios'
import Select from 'react-select'
import CreatableSelect from 'react-select/lib/Creatable'
import AsyncCreatableSelect from 'react-select/lib/AsyncCreatable'
import Modal from 'react-modal'

Modal.setAppElement('#app')

const email_options = [
  { value: 'Yes', label: 'Yes' },
  { value: 'No', label: 'No' },
]

const played_options = [
  { value: 1, label: 'Less than 3 months' },
  { value: 2, label: 'Less than 6 months' },
  { value: 3, label: 'Less than 1 year' },
  { value: 4, label: 'Less than 2 years' },
  { value: 5, label: 'Less than 3 years' },
  { value: 42, label: '3+ years' },
]

const status_options = [
  {
    value: 'Actively looking for a team',
    label: 'Actively looking for a team',
  },
  { value: 'Maybe looking for a team', label: 'Maybe looking for a team' },
  { value: 'Do not disturb please!', label: 'Do not disturb please!' },
]

type State = {
  options_ardour: [{ [string]: string }],
  options_tags: [{ [string]: string }],
  options_game_name: [{ [string]: string }],
  value_ardour: string | void,
  value_tags: string | void,
  value_game_name: string | void,
}

const createOption = (label: string, game_names_id: string) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ''),
  game_names_id,
})

export default class AddEsportsExp extends Component<*, State> {
  constructor() {
    super()
    self = this
    this.state = {
      shouldCloseOnOverlayClick_: true,
      show_info_box: false,
      show_email_info_box: false,
      show_status_info_box: false,
      show_role_title_info_box: false,
      show_game_name_info_box: false,
      status_box: [{ label: '', value: '' }],
      email_box: [{ label: '', value: '' }],
      played_box: '',
      career_highlights_box: '',
      team_name_box: '',
      role_title_box: '',
      achievements_box: '',
      isLoading_tags: false,
      isLoading_ardour: false,
      isLoading_game_name: false,
      options_tags: '',
      options_ardour: '',
      options_game_name: '',
      value_tags: [],
      value_game_name: [],
      value_ardour: [],
      newValueCreated_ardour: [],
      newValueCreated_game_name: [],
      newValueCreated_tags: [],
      name_trigger: false,
      createEsportsPost: true,
      intial_trigger: true,
      just_one_time: true,
      redirect_profile: false,
    }
  }

  handleCloseModal = () => {
    this.setState({ redirect_profile: true })
  }

  testModal = (e) => {
    this.setState({ shouldCloseOnOverlayClick_: false })
  }

  handleChange_email = (email_box) => {
    this.setState({ email_box })
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

  handleChange_ardour = (value_ardour: any) => {
    self.setState({ value_ardour })
    this.setState({ shouldCloseOnOverlayClick_: false })
  }
  handleChange_game_name = (value_game_name: any) => {
    this.setState({ value_game_name })
    this.onBlur_game_name(value_game_name)
    this.setState({ shouldCloseOnOverlayClick_: false })
  }
  handleChange3 = (value_tags: any) => {
    this.setState({ value_tags })
    this.setState({ shouldCloseOnOverlayClick_: false })
  }

  submitForm = async () => {
    var myardour = ''
    var myPlayed = 1
    var myTags = ''
    var _OGstatus = true
    var uShallNotPass = false
    var ardourNgame_name_same_same = false

    if (
      this.state.status_box.label == '' ||
      this.state.status_box.label == null
    ) {
      alert('Sorry mate! Status can not be blank')
      return
    }

    if (
      this.state.email_box.label == '' ||
      this.state.email_box.label == null
    ) {
      alert('Sorry mate! Email can not be blank')
      return
    }

    if (
      this.state.played_box.value != '' &&
      this.state.played_box.value != undefined
    ) {
      myPlayed = this.state.played_box.value
    }

    if (this.state.team_name_box.trim() != '') {
      uShallNotPass = true
    } else if (this.state.achievements_box.trim() != '') {
      uShallNotPass = true
    } else if (myTags != '') {
      uShallNotPass = true
    } else if (this.state.role_title_box != '') {
      uShallNotPass = true
    } else if (this.state.value_game_name.length != 0) {
      uShallNotPass = true
    }

    if (this.state.value_game_name == null) {
      this.state.value_game_name = []
    }

    if (
      (this.state.role_title_box == '' || this.state.role_title_box == null) &&
      uShallNotPass
    ) {
      alert('Sorry mate! Role title can not be blank')
      return
    } else if (this.state.value_game_name.length == 0 && uShallNotPass) {
      alert('Sorry mate! Game name can not be blank')
      return
    }

    if (
      this.state.value_ardour !== null &&
      this.state.value_ardour.length !== 0
    ) {
      for (var i = 0; i < this.state.value_ardour.length; i++) {
        myardour += this.state.value_ardour[i].label + '; '
      }
      myardour = myardour
        .trim()
        .replace(/; /g, ',')
        .trim()
      myardour = myardour.replace(/;/g, '')
      myardour = myardour.replace(/,/g, ', ')
    }

    //If you created a new game and you have selected it then and only then will we save this to the DB

    if (this.state.newValueCreated_ardour != '') {
      var i
      var j
      for (i = 0; i < this.state.newValueCreated_ardour.length; i++) {
        for (j = 0; j < this.state.value_ardour.length; j++) {
          if (
            this.state.value_ardour[j].label ==
            this.state.newValueCreated_ardour[i]
          ) {
            try {
              const post = await axios.post('/api/GameNames', {
                game_name: this.state.newValueCreated_ardour[i],
              })
              if (
                this.state.newValueCreated_ardour[i] ==
                this.state.value_game_name.label
              ) {
                ardourNgame_name_same_same = true
                newGame_name = post.data.game_name
                newGameID = post.data.id
              }
            } catch (error) {
              console.log(error)
            }
            break
          }
        }
      }
    }

    //If you created a new game and you have selected it then and only then will we save this to the DB

    var newGame_name = ''
    var newGameID = ''

    if (
      this.state.newValueCreated_game_name != '' &&
      ardourNgame_name_same_same == false
    ) {
      var i
      for (i = 0; i < this.state.newValueCreated_game_name.length; i++) {
        if (
          this.state.value_game_name.label ==
          this.state.newValueCreated_game_name[i]
        ) {
          try {
            const post = await axios.post('/api/GameNames', {
              game_name: this.state.value_game_name.label,
            })
            newGame_name = post.data.game_name
            newGameID = post.data.id
          } catch (error) {
            console.log(error)
          }
          break
        }
      }
    }

    //If you created a new tag and you have selected it then and only then will we save this to the DB
    if (this.state.newValueCreated_tags != '') {
      var i
      var j
      var tmpnewGameID = ''
      if (this.state.value_game_name.game_names_id == null) {
        tmpnewGameID = newGameID
      } else {
        tmpnewGameID = this.state.value_game_name.game_names_id
      }
      for (i = 0; i < this.state.newValueCreated_tags.length; i++) {
        for (j = 0; j < this.state.value_tags.length; j++) {
          if (
            this.state.value_tags[j].label == this.state.newValueCreated_tags[i]
          ) {
            try {
              if (tmpnewGameID != '') {
                const post = await axios.post('/api/Tags', {
                  game_names_id: tmpnewGameID,
                  tag: this.state.newValueCreated_tags[i],
                })
              }
            } catch (error) {
              console.log(error)
            }
            break
          }
        }
      }
    }

    if (this.state.value_tags !== null && this.state.value_tags.length !== 0) {
      for (var i = 0; i < this.state.value_tags.length; i++) {
        myTags += this.state.value_tags[i].label + '; '
      }
      myTags = myTags
        .trim()
        .replace(/; /g, ',')
        .trim()
      myTags = myTags.replace(/;/g, '')
      myTags = myTags.replace(/,/g, ', ')
    }

    if (this.state.status_box_OG != this.state.status_box.label) {
      _OGstatus = false
    } else if (this.state.email_box_OG != this.state.email_box.label) {
      _OGstatus = false
    } else if (
      this.state.career_highlights_box_OG != this.state.career_highlights_box
    ) {
      _OGstatus = false
    } else if (this.state.games_of_ardour_OG != myardour) {
      _OGstatus = false
    }

    this.state.career_highlights_box == undefined
      ? undefined
      : (this.state.career_highlights_box = this.state.career_highlights_box.trim())
    this.state.achievements_box == undefined
      ? undefined
      : (this.state.achievements_box = this.state.achievements_box.trim())
    this.state.team_name_box == undefined
      ? undefined
      : (this.state.team_name_box = this.state.team_name_box.trim())
    this.state.role_title_box == undefined
      ? undefined
      : (this.state.role_title_box = this.state.role_title_box.trim())

    if (!this.state.just_one_time) {
      return
    }
    this.state.just_one_time = false

    if (this.state.createEsportsPost == true) {
      try {
        const post_bio = await axios.post('/api/esports_bio/create', {
          status: this.state.status_box.label,
          email_visibility: this.state.email_box.label == 'Yes' ? 'Yes' : 'No',
          games_of_ardour: myardour,
          career_highlights: this.state.career_highlights_box,
        })
      } catch (error) {
        console.log(error)
      }
    } else {
      if (_OGstatus == false) {
        try {
          const post_bio = await axios.post('/api/esports_bio/update/', {
            status: this.state.status_box.label,
            email_visibility:
              this.state.email_box.label == 'Yes' ? 'Yes' : 'No',
            games_of_ardour: myardour,
            career_highlights: this.state.career_highlights_box,
          })
        } catch (error) {
          console.log(error)
        }
      }
    }

    if (uShallNotPass) {
      try {
        const post_role = await axios.post('/api/esports_experiences/create', {
          role_title: this.state.role_title_box,
          game_name:
            newGame_name == ''
              ? this.state.value_game_name.label
              : newGame_name,
          team_name: this.state.team_name_box,
          duration: myPlayed,
          achievements: this.state.achievements_box,
          skills: myTags,
        })
      } catch (error) {
        console.log(error)
      }
    }
    this.handleCloseModal()
  }

  handleCreate_ardour = (inputValue: any) => {
    this.setState({ isLoading_ardour: true })
    setTimeout(() => {
      const {
        options_ardour,
        value_ardour,
        newValueCreated_ardour,
      } = this.state
      const newOption = createOption(inputValue, null)
      this.setState({ isLoading_ardour: false })
      this.setState({ options_ardour: [...options_ardour, newOption] })
      this.setState({ value_ardour: newOption })
      this.setState({ value_ardour: [...value_ardour, newOption] })
      this.setState({
        newValueCreated_ardour: [...newValueCreated_ardour, newOption.label],
      })
    }, 300)
  }

  handleCreate_game_name = (inputValue: any) => {
    setTimeout(() => {
      const {
        options_game_name,
        value_game_name,
        newValueCreated_game_name,
      } = this.state
      const newOption = createOption(inputValue, null)
      this.setState({ options_game_name: [...options_game_name, newOption] })
      this.setState({ value_game_name: newOption })
      this.setState({ value_tags: '' })
      this.setState({
        newValueCreated_game_name: [
          ...newValueCreated_game_name,
          newOption.label,
        ],
      })
      this.setState({ newValueCreated_tags: [] })
      this.setState({ options_tags: '' })
    }, 300)
  }

  handleCreate3 = (inputValue: any) => {
    this.setState({ isLoading_tags: true })
    setTimeout(() => {
      const { options_tags, value_tags, newValueCreated_tags } = this.state
      const newOption = createOption(inputValue, null)
      this.setState({ isLoading_tags: false })
      this.setState({ options_tags: [...options_tags, newOption] })
      this.setState({ value_tags: [...value_tags, newOption] })
      this.setState({
        newValueCreated_tags: [...newValueCreated_tags, newOption.label],
      })
    }, 300)
  }

  componentWillMount() {
    const self = this

    const getEsports_bio = async function() {
      try {
        const getEsports_bio = await axios.get('/api/esports_bio/show')

        if (getEsports_bio.data.myProfile.length != 0) {
          self.state.createEsportsPost = false
          self.setState({
            myEsports_bio: getEsports_bio.data.myProfile[0],
          })
          var arrTags = ''
          const { games_of_ardour } = getEsports_bio.data.myProfile[0]
          var tmp = []

          if (games_of_ardour != null && games_of_ardour != '') {
            arrTags = games_of_ardour.split(',')

            var i

            for (i = 0; i < arrTags.length; i++) {
              const newOption = createOption(arrTags[i])
              tmp.push(newOption)
            }
            self.setState({ value_ardour: tmp })
          }
        } else {
          self.setState({
            myEsports_bio: '',
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
    getEsports_bio()
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

  async getOptions(inputValue) {
    if (inputValue == '' || inputValue == undefined) {
      return []
    }
    try {
      inputValue = inputValue.trimStart()
      const getGameName = await axios.get(
        `/api/GameNames/${inputValue}/gameSearchResults`
      )
      var results = getGameName.data.gameSearchResults[0].filter((i) =>
        i.game_name.toLowerCase().includes(inputValue.toLowerCase())
      )
      var newArr = []
      var i, newOption
      if (results.length != 0) {
        for (i = 0; i < results.length; i++) {
          newOption = createOption(results[i].game_name, results[i].id)
          newArr.push(newOption)
        }
      } else {
        return []
      }
      return newArr
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    if (this.state.redirect_profile) {
      const { match } = this.props.routeProps
      var tmp = `/profile/${match.params.id}`
      return <Redirect push to={tmp} />
    }

    if (this.state.myEsports_bio !== undefined) {
      const {
        isLoading_ardour,
        options_ardour,
        value_ardour,
        isLoading_tags,
        options_tags,
        value_tags,
        value_game_name,
        options_game_name,
        isLoading_game_name,
      } = this.state
      const {
        email_visibility,
        games_of_ardour,
        career_highlights,
        status,
      } = this.state.myEsports_bio

      if (this.state.intial_trigger) {
        this.state.status_box.label = status
        this.state.email_box.label = email_visibility
        this.state.career_highlights_box = career_highlights
        this.state.intial_trigger = false

        this.state.status_box_OG = status
        this.state.email_box_OG = email_visibility
        this.state.career_highlights_box_OG = career_highlights
        this.state.games_of_ardour_OG = games_of_ardour
      }

      return (
        <div className='content-area addEsportsExp-page'>
          <Modal
            isOpen={true}
            onRequestClose={(event) => {
              // Ignore react-modal esc-close handling
              if (
                event.type === 'keydown' &&
                event.keyCode === 27 &&
                this.state.shouldCloseOnOverlayClick_ === false
              ) {
                return
              } else {
                this.handleCloseModal()
              }
            }}
            shouldCloseOnOverlayClick={this.state.shouldCloseOnOverlayClick_}
            className='addEsportsModal'
            overlayClassName='Overlay'>
            Esports Career:
            <i className='fas fa-times' onClick={this.handleCloseModal}></i>
            <div className='status'>
              <p>
                Status <span style={{ color: 'red' }}>*</span>
              </p>
              <Select
                onChange={this.handleChange_Status}
                options={status_options}
                placeholder='Set your job status'
                className='status_box'
                defaultValue={[{ label: status, value: status }]}
              />
            </div>
            <div className='email'>
              <p>
                Email Visible? <span style={{ color: 'red' }}>*</span>
              </p>
              <Select
                onChange={this.handleChange_email}
                options={email_options}
                placeholder="Show/Don't show email?"
                className='email_box'
                defaultValue={[
                  { label: email_visibility, value: email_visibility },
                ]}
              />
            </div>
            <div className='games_ardour_txtBox'>
              <p>Games of ardour</p>
              <AsyncCreatableSelect
                cacheOptions
                defaultOptions
                loadOptions={this.getOptions}
                onChange={this.handleChange_ardour}
                onCreateOption={this.handleCreate_ardour}
                isClearable
                value={value_ardour}
                className='games_ardour_box'
                placeholder='Games your passionate about'
                isMulti
                onInputChange={(inputValue) =>
                  inputValue.length <= 88
                    ? inputValue
                    : inputValue.substr(0, 88)
                }
              />
            </div>
            <div className='career-highlights'>
              <p>Career Highlights</p>
              <textarea
                id='career_highlights_box'
                className='career_highlights_box'
                rows={8}
                cols={80}
                defaultValue={career_highlights}
                maxLength='254'
                onChange={this.handleChange}
              />
            </div>
            <div className='line-break'>
              <hr />
            </div>
            <div className='line-break'>
              <hr />
            </div>
            Add Role Info:
            <div></div>
            <div className='role-title'>
              <p>
                Role Title <span style={{ color: 'red' }}>*</span>
              </p>
              <input
                type='text'
                id='role_title_box'
                className='role_title_box'
                maxLength='120'
                onChange={this.handleChange}
              />
            </div>
            <div className='gName_txtBox2'>
              <p>
                Game Name <span style={{ color: 'red' }}>*</span>
              </p>
              <AsyncCreatableSelect
                cacheOptions
                defaultOptions
                loadOptions={this.getOptions}
                onChange={this.handleChange_game_name}
                onCreateOption={this.handleCreate_game_name}
                isClearable
                value={value_game_name}
                className='game_name_box2'
                placeholder='Enter Game name'
                onInputChange={(inputValue) =>
                  inputValue.length <= 88
                    ? inputValue
                    : inputValue.substr(0, 88)
                }
              />
            </div>
            <div className='team-name'>
              <p>Team name</p>
              <input
                type='text'
                id='team_name_box'
                className='team_name_box'
                maxLength='120'
                onChange={this.handleChange}
              />
            </div>
            <div className='played'>
              <p>
                Time in Role: <span style={{ color: 'red' }}>*</span>
              </p>
              <Select
                onChange={this.handleChange_Played}
                options={played_options}
                placeholder='Select time in role'
                className='played_box'
                defaultValue={[{ label: 'Less than 3 months', value: 1 }]}
              />
            </div>
            <div className='achievements'>
              <p>Achievements in this role</p>
              <textarea
                id='achievements_box'
                className='achievements_box'
                rows={8}
                cols={80}
                defaultValue={''}
                maxLength='254'
                onChange={this.handleChange}
              />
            </div>
            <div className='tag_txtBox'>
              <p>
                <span style={{ color: 'green' }}>S</span>
                <span style={{ color: 'dodgerblue' }}>k</span>
                <span style={{ color: 'red' }}>i</span>
                <span style={{ color: 'gold' }}>l</span>
                <span style={{ color: 'green' }}>l</span>
                <span style={{ color: 'dodgerblue' }}>s</span> (Keywords that
                identify <span style={{ color: 'green' }}>y</span>
                <span style={{ color: 'dodgerblue' }}>o</span>
                <span style={{ color: 'red' }}>u</span>
                <span style={{ color: 'gold' }}>r</span> expertise with this
                role. Max 250 chars)
              </p>
              <CreatableSelect
                onChange={this.handleChange3}
                options={options_tags}
                onCreateOption={this.handleCreate3}
                isClearable
                isDisabled={isLoading_tags}
                isLoading={isLoading_tags}
                value={value_tags}
                className='tag_name_box'
                isMulti
                onInputChange={(inputValue) =>
                  inputValue.length <= 250
                    ? inputValue
                    : inputValue.substr(0, 250)
                }
              />
            </div>
            <div></div>
            {/* {!this.state.show_info_box && <div></div>}
            {this.state.show_info_box &&
              <div className="info_box">
                {this.state.show_email_info_box &&
                  <div className="email_error">
                    Error: Email field can't be empty
                  </div>
                }
                {this.state.show_status_info_box &&
                  <div className="status_name_error">
                    Error: Status can't be empty
                  </div>
                }
                {this.state.show_role_title_info_box &&
                  <div className="role_name_error">
                    Error: Role or Game Name can't be empty
                  </div>
                }
              </div>
            }*/}
            <div></div>
            <div></div>
            <div className='save-btn'>
              <button className='save' onClick={this.submitForm}>
                Save
              </button>
            </div>
          </Modal>
        </div>
      )
    } else {
      return <div className='content-area addEsportsExp-page'>Loading</div>
    }
  }
}
