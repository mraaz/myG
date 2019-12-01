import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Redirect } from 'react-router'
import axios from 'axios'
import Select from 'react-select'
import CreatableSelect from 'react-select/lib/Creatable'
import AsyncCreatableSelect from 'react-select/lib/AsyncCreatable'
import Modal from 'react-modal'

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
  value: label.toLowerCase().replace(/\W/g, ''),
  game_names_id,
})

export default class EditGamingExp extends Component<*, State> {
  constructor() {
    super()
    self = this
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
      name_trigger: false,
      intial_trigger: true,
      edit_game_name: '',
      just_one_time: true,
      redirect_: false,
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
      const myGame = axios.get(
        `/api/GameExperiences/delete/${match.params.game_id}`
      )
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
    var myGame_name = ''
    var myStatus = ''

    let { name_trigger } = this.state.name_trigger

    if (this.state.value == '' || this.state.value == null) {
      this.setState({ show_info_box: true })
      this.setState({ show_game_name_info_box: true })
      name_trigger = true
    } else {
      this.setState({ show_game_name_info_box: false })
      if (this.state.value.label != null) {
        myGame_name = this.state.value.label
      } else {
        myGame_name = this.state.value
      }
    }

    if (this.state.status_box == '' || this.state.status_box == null) {
      this.setState({ show_info_box: true })
      this.setState({ show_status_info_box: true })
      name_trigger = true
    } else {
      this.setState({ show_status_info_box: false })
      if (this.state.status_box.label != null) {
        myStatus = this.state.status_box.label
      } else {
        myStatus = this.state.status_box
      }
    }

    if (name_trigger) {
      this.setState({ name_trigger: false })
      return
    }

    if (
      this.state.experience_box != null ||
      this.state.experience_box != undefined
    ) {
      if (this.state.experience_box.value != null) {
        myExperience = this.state.experience_box.value
      } else {
        myExperience = this.state.experience_box
      }
    }

    if (this.state.played_box != null || this.state.played_box != undefined) {
      myPlayed = this.state.played_box.value
    }
    if (this.state.ratings_box != null || this.state.ratings_box != undefined) {
      if (this.state.ratings_box.value != null) {
        myRatings = this.state.ratings_box.value
      } else {
        myRatings = this.state.ratings_box
      }
    }
    //If you created a new game and you have selected it then and only then will we save this to the DB

    var newGameID = ''
    if (this.state.newValueCreated != '') {
      var i
      for (i = 0; i < this.state.newValueCreated.length; i++) {
        if (this.state.value.label == this.state.newValueCreated[i]) {
          try {
            const post = await axios.post('/api/GameNames', {
              game_name: this.state.value.label,
            })
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
      if (this.state.value.game_names_id == null) {
        tmpnewGameID = newGameID
      } else {
        tmpnewGameID = this.state.value.game_names_id
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

    if (self.state.value_tags !== null && self.state.value_tags.length !== 0) {
      for (var i = 0; i < self.state.value_tags.length; i++) {
        myTags += self.state.value_tags[i].label + '; '
      }
      myTags = myTags
        .trim()
        .replace(/; /g, ',')
        .trim()
      myTags = myTags.replace(/;/g, '')
      myTags = myTags.replace(/,/g, ', ')
    }

    this.state.comments_box == undefined
      ? undefined
      : (this.state.comments_box = this.state.comments_box.trim())
    this.state.link_box == undefined
      ? undefined
      : (this.state.link_box = this.state.link_box.trim())

    if (!this.state.just_one_time) {
      return
    }
    this.state.just_one_time = false

    try {
      const { match } = this.props.routeProps
      const post = await axios.post(
        `/api/GameExperiences/${match.params.id}/${match.params.game_id}`,
        {
          game_name: myGame_name,
          experience: myExperience,
          comments: this.state.comments_box,
          status: myStatus,
          played: myPlayed,
          link: this.state.link_box,
          ratings: myRatings,
          tags: myTags,
        }
      )
      this.handleCloseModal()
    } catch (error) {
      console.log(error)
    }
  }

  handleCreate = (inputValue: any) => {
    this.setState({ isLoading: true })
    setTimeout(() => {
      const { options, value, newValueCreated } = this.state
      const newOption = createOption(inputValue, null)
      this.setState({ isLoading: false })
      this.setState({ options: [...options, newOption] })
      this.setState({ value: newOption })
      this.setState({ value_tags: '' })
      this.setState({ newValueCreated: [...newValueCreated, newOption.label] })
      this.setState({ newValueCreated_tags: [] })
      this.setState({ options_tags: '' })
    }, 1000)
  }

  handleCreate2 = (inputValue: any) => {
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
    }, 1000)
  }

  componentWillMount() {
    const { match } = this.props.routeProps
    const self = this

    const getGamingExp = async function() {
      try {
        const myGame = await axios.get(
          `/api/GameExperiences/${match.params.id}/${match.params.game_id}`
        )

        self.state.edit_game_name = myGame.data.myGameExperience[0].game_name

        const gameName = await axios.get(
          `/api/GameName/${self.state.edit_game_name}`
        )
        const game_newOption = createOption(
          myGame.data.myGameExperience[0].game_name,
          gameName.data.getOne[0].id
        )

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
    // const getGameNameTags = async function(){
    //   try{
    //     console.log(self.state.edit_game_name);
    //     const gameName = await axios.get(`/api/GameName/${self.state.edit_game_name}`)
    //     console.log(gameName);
    //     return
    //
    //     var i
    //     for (i = 0; i < allGameNames.data.allGameNames.length; i++){
    //       const newOption = createOption(allGameNames.data.allGameNames[i].game_name, allGameNames.data.allGameNames[i].id )
    //       const { options } = self.state
    //       self.state.options = [...options, newOption]
    //
    //       if (self.state.edit_game_name == allGameNames.data.allGameNames[i].game_name){
    //         var allTags
    //         allTags = await axios.get(`/api/Tags/${allGameNames.data.allGameNames[i].id}`)
    //
    //         var x
    //         for (x = 0; x < allTags.data.allTags.length; x++){
    //           const anotherOption = createOption(allTags.data.allTags[x].tag)
    //           let { options_tags } = self.state
    //           if (x == 0){
    //             options_tags=""
    //           }
    //           // self.setState({
    //           //     options_tags: [...options_tags, anotherOption],
    //           // })
    //           self.state.options_tags = [...options_tags, anotherOption]
    //         }
    //       }
    //     }
    //   } catch (error){
    //     console.log(error)
    //   }
    // }
    getGamingExp()
    //getGameNameTags()
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
    if (this.state.redirect_) {
      const { match } = this.props.routeProps
      var tmp = `/profile/${match.params.id}`
      return <Redirect push to={tmp} />
    }
    if (this.state.myGame !== undefined) {
      const {
        isLoading,
        options,
        value,
        isLoading_tags,
        options_tags,
        value_tags,
        edit_game_name,
      } = this.state
      const {
        game_name,
        experience,
        comments,
        played_label,
        played_value,
        status,
        link,
        tags,
        ratings,
      } = this.state.myGame
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
            className='addGamingModal'
            overlayClassName='Overlay'>
            Edit Gaming Experience:
            <i className='fas fa-times' onClick={this.handleCloseModal}></i>
            <div className='gName_txtBox'>
              <p>
                Game Name <span style={{ color: 'red' }}>*</span>
              </p>
              {/* <input type="text" id="game_name_box" className="game_name_box" maxLength="50" onKeyDown={this.onKeyDown} onChange={this.handleChange} /> */}
              <AsyncCreatableSelect
                cacheOptions
                defaultOptions
                loadOptions={this.getOptions}
                isClearable
                onChange={this.handleChange2}
                className='game_name_box'
                onCreateOption={this.handleCreate}
                onInputChange={(inputValue) =>
                  inputValue.length <= 88
                    ? inputValue
                    : inputValue.substr(0, 88)
                }
                defaultValue={[{ label: game_name, value: game_name }]}
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
              <input
                id='link_ChkBox'
                type='checkbox'
                defaultChecked={link_chkbox_state}
                onChange={this.toggleChange_link}
              />{' '}
              Link
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
                <span style={{ color: 'gold' }}>s</span> (Keywords that identify{' '}
                <span style={{ color: 'green' }}>y</span>
                <span style={{ color: 'dodgerblue' }}>o</span>
                <span style={{ color: 'red' }}>u</span>
                <span style={{ color: 'gold' }}>r</span> unique experience with
                this game. Max 250 chars)
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
                onInputChange={(inputValue) =>
                  inputValue.length <= 250
                    ? inputValue
                    : inputValue.substr(0, 250)
                }
                value={value_tags}
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
            {!this.state.show_info_box && <div></div>}
            {this.state.show_info_box && (
              <div className='info_box'>
                {this.state.show_game_name_info_box && (
                  <div className='game_name_error'>
                    Error: Game Name can't be empty
                  </div>
                )}
                {this.state.show_status_info_box && (
                  <div className='status_name_error'>
                    Error: Status can't be empty
                  </div>
                )}
              </div>
            )}
            <div></div>
            <div className='save-btn'>
              <button
                className='delete'
                onClick={() => {
                  if (
                    window.confirm(
                      'Are you sure you wish to delete this Gaming Experience?'
                    )
                  )
                    this.delete_exp()
                }}>
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
