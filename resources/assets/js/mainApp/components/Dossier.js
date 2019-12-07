import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Redirect } from 'react-router'
import Select from 'react-select'
import axios from 'axios'
import Modal from 'react-modal'
import { toast } from 'react-toastify'

import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

Modal.setAppElement('#app')

const searchOptions = {
  types: ['(regions)'],
}

const relationship_status_options = [
  { value: 'Waiting for Player 2', label: 'Waiting for Player 2' },
  {
    value: 'Game in progress',
    label: 'Game in progress',
  },
]

const Toast_style = (props) => (
  <div className='individual-toasts'>
    <img width={48} src={'https://mygame-media.s3-ap-southeast-2.amazonaws.com/logos/Logo.png'}></img>
    <div>{props.text}</div>
  </div>
)

export default class Dossier extends Component {
  constructor() {
    super()
    this.state = {
      shouldCloseOnOverlayClick_: true,
      intial_trigger: true,
      first_name_box: '',
      last_name_box: '',
      country_: '',
      region_: '',
      slogan_box: '',
      bio_box: '',
      contact_info_box: '',
      address: '',
      final_add: '',
      just_one_time: true,
      redirect_: false,
      relationship_status_box: '',
    }
  }

  componentWillMount() {
    const { match } = this.props.routeProps
    const self = this

    const getUser = async function() {
      try {
        const userProfile = await axios.get(`/api/user/${match.params.id}`)
        self.setState({
          userProfile: userProfile.data.user[0],
        })
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  }

  handleCloseModal = () => {
    this.setState({ redirect_: true })
  }

  testModal = (e) => {
    this.setState({ shouldCloseOnOverlayClick_: true })
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value })
    this.setState({ shouldCloseOnOverlayClick_: false })
  }

  handleChange_address = (address) => {
    this.setState({ address })
  }
  handleSelect = (final_add) => {
    this.setState({ final_add })
    this.setState({ address: final_add })
    this.setState({ shouldCloseOnOverlayClick_: false })
  }
  handleChange_Relationship_Status = (relationship_status_box) => {
    this.setState({ relationship_status_box })
    this.setState({ shouldCloseOnOverlayClick_: false })
  }

  submitForm = async () => {
    this.state.country_ = ''
    this.state.region_ = ''

    var relationship_status = null

    if (this.state.first_name_box == '' || this.state.first_name_box == undefined) {
      toast.success(<Toast_style text={"Sorry mate! First & Last name can't be blank"} />)
      return
    }

    if (this.state.last_name_box == '' || this.state.last_name_box == undefined) {
      toast.success(<Toast_style text={"Sorry mate! First & Last name can't be blank"} />)
      return
    }

    if (!this.state.address.length) {
      toast.success(<Toast_style text={"Sorry mate! Location can't be blank"} />)
      return
    } else {
      if (this.state.address != this.state.final_add) {
        toast.success(<Toast_style text={'Sorry mate! You have to pick a location from the list'} />)
        return
      }
    }

    if (
      this.state.relationship_status_box != null &&
      this.state.relationship_status_box != undefined &&
      this.state.relationship_status_box.length != 0
    ) {
      relationship_status = this.state.relationship_status_box.value
    }

    var arrTags = this.state.address.split(',')
    if (arrTags.length == 1) {
      this.state.country_ = arrTags[0]
    } else {
      for (var i = 0; i < arrTags.length; i++) {
        if (i == arrTags.length - 1) {
          this.state.country_ = arrTags[i].trim()
        } else {
          this.state.region_ += arrTags[i] + ','
        }
      }
    }

    if (!this.state.just_one_time) {
      return
    }
    this.state.just_one_time = false

    try {
      const post = await axios.post('/api/user', {
        first_name_box: this.state.first_name_box,
        last_name_box: this.state.last_name_box,
        slogan: this.state.slogan_box,
        bio: this.state.bio_box,
        country: this.state.country_,
        region: this.state.region_,
        contact_info: this.state.contact_info_box,
        relationship_status: relationship_status,
      })
      this.handleCloseModal()
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

    if (this.state.userProfile !== undefined) {
      const { country_, region_ } = this.state
      const {
        first_name,
        last_name,
        country,
        region,
        profile_img,
        profile_bg,
        slogan,
        bio,
        contact_info,
        relationship_status,
      } = this.state.userProfile
      if (this.state.intial_trigger) {
        this.setState({ first_name_box: first_name })
        this.setState({ last_name_box: last_name })
        this.setState({ address: region + country })
        this.setState({ final_add: region + country })
        this.setState({ slogan_box: slogan })
        this.setState({ bio_box: bio })
        this.setState({ relationship_status_box: relationship_status })
        this.setState({ intial_trigger: false })
      }
      var stupid_hack = false
      if (relationship_status == null) {
        stupid_hack = true
      }
      return (
        <div className='content-area dossier-page'>
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
            className='Modal'
            overlayClassName='Overlay'
            style={{
              content: {
                backgroundColor: '#151b26',
              },
            }}>
            Edit intro:
            <i className='fas fa-times' onClick={this.handleCloseModal}></i>
            <div className='fName_txtBox'>
              <p>
                First Name <span style={{ color: 'red' }}>*</span>
              </p>
              <input
                type='text'
                id='first_name_box'
                className='first_name_box'
                maxLength='50'
                defaultValue={`${first_name}`}
                onChange={this.handleChange}
              />
            </div>
            <div className='lName_txtBox'>
              <p>
                Last Name <span style={{ color: 'red' }}>*</span>
              </p>
              <input
                type='text'
                id='last_name_box'
                className='last_name_box'
                maxLength='50'
                defaultValue={`${last_name}`}
                onChange={this.handleChange}
              />
            </div>
            <div className='location'>
              <p>
                Location <span style={{ color: 'red' }}>*</span>
              </p>
              <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange_address}
                onSelect={this.handleSelect}
                searchOptions={searchOptions}>
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                  <div>
                    <input
                      {...getInputProps({
                        placeholder: 'Search Places ...',
                        className: 'location-search-input',
                      })}
                    />
                    {suggestions.length > 0 && (
                      <div className='autocomplete-dropdown-container'>
                        {loading && <div>Loading...</div>}
                        {suggestions.map((suggestion) => {
                          const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item'
                          // inline style for demonstration purpose
                          const style = suggestion.active
                            ? { backgroundColor: '#fff', cursor: 'pointer' }
                            : { backgroundColor: '#151b26', cursor: 'pointer' }
                          return (
                            <div
                              {...getSuggestionItemProps(suggestion, {
                                className,
                                style,
                              })}>
                              <span>{suggestion.description}</span>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )}
              </PlacesAutocomplete>
            </div>
            <div className='realtionship-status'>
              <p>Relationship Status (Only visible to friends)</p>
              {stupid_hack && (
                <Select
                  onChange={this.handleChange_Relationship_Status}
                  options={relationship_status_options}
                  placeholder='Set your relationship status'
                  className='relationship_status_box'
                  isClearable
                />
              )}
              {!stupid_hack && (
                <Select
                  onChange={this.handleChange_Relationship_Status}
                  options={relationship_status_options}
                  placeholder='Set your relationship status'
                  className='relationship_status_box'
                  defaultValue={[{ label: relationship_status, value: relationship_status }]}
                  isClearable
                />
              )}
            </div>
            <div className='contact-info'>
              <p>Contact Info (Only visible to friends)</p>
              <textarea
                id='contact_info_box'
                className='contact_info_box'
                rows={8}
                cols={80}
                maxLength='254'
                defaultValue={`${contact_info}`}
                onChange={this.handleChange}
              />
            </div>
            <div className='slogan'>
              <p>Slogan</p>
              <input
                type='text'
                id='slogan_box'
                className='slogan_box'
                maxLength='120'
                defaultValue={`${slogan}`}
                onBlur={this.onBlur_slogan_box}
                onFocus={this.onFocus_slogan_box}
                onChange={this.handleChange}
              />
            </div>
            <div className='bio'>
              <p>Brief Bio</p>
              <textarea
                id='bio_box'
                className='bio_box'
                rows={8}
                cols={80}
                maxLength='254'
                defaultValue={`${bio}`}
                onChange={this.handleChange}
              />
            </div>
            <div> </div>
            <div className='save-btn'>
              <button className='save' onClick={this.submitForm}>
                Save
              </button>
            </div>
          </Modal>
        </div>
      )
    } else {
      return <div className='content-area dossier-page'>Loading</div>
    }
  }
}
