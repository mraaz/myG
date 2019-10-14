import React, { Component } from "react"
import ReactDOM from "react-dom"
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from "react-router-dom"
import axios from "axios"
import Modal from "react-modal"
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector'

Modal.setAppElement('#app')

export default class Dossier extends Component {
  constructor () {
    super()
    self = this
    this.state = {
      shouldCloseOnOverlayClick_ : true,
      show_info_box: false,
      show_first_name_info_box: false,
      show_last_name_info_box: false,
      name_trigger: false,
      intial_trigger: true,
      first_name_box: "",
      last_name_box: "",
      country_: "",
      region_: "",
      slogan_box: "",
      bio_box: "",
      contact_info_box: ""
    }
  }

  componentWillMount(){
    const {match} = this.props.routeProps
    const self = this

    const getUser = async function(){
      try{
        const userProfile = await axios.get(`/api/user/${match.params.id}`)
        self.setState({
          userProfile: userProfile.data.user[0],

          }, () => {
            console.log()
          })
      } catch(error){
        console.log(error)
      }
    }
    getUser()
  }

  handleCloseModal () {
    const {match} = self.props.routeProps
    window.location.href = `/profile/${match.params.id}`
  }

  testModal = (e) => {
    this.setState({shouldCloseOnOverlayClick_: true})
  }

  selectCountry (val) {
    this.setState({ country_: val })
    this.setState({shouldCloseOnOverlayClick_: false})
  }

  selectRegion (val) {
    this.setState({ region_: val })
    this.setState({shouldCloseOnOverlayClick_: false})
  }

  handleChange = (e) => {
    this.setState({[e.target.id]: e.target.value})
    this.setState({shouldCloseOnOverlayClick_: false})
  }

  submitForm = async () => {
    let {name_trigger} = this.state.name_trigger

    if ((this.state.first_name_box == "") || (this.state.first_name_box == undefined)) {
      this.setState({show_info_box: true})
      this.setState({show_first_name_info_box: true})
      name_trigger=true
    }
    else{
      this.setState({show_first_name_info_box: false})
    }
    if ((this.state.last_name_box == "") || (this.state.last_name_box == undefined)) {
      this.setState({show_info_box: true})
      this.setState({show_last_name_info_box: true})
      name_trigger=true
    }
    else{
      this.setState({show_last_name_info_box: false})
    }
    if (name_trigger){
      this.setState({name_trigger: false})
      return
    }
    try {
      const post = await axios.post('/api/user',{
        first_name_box: this.state.first_name_box,
        last_name_box: this.state.last_name_box,
        slogan: this.state.slogan_box,
        bio: this.state.bio_box,
        country: this.state.country_,
        region: this.state.region_,
        contact_info: this.state.contact_info_box
      })
      this.handleCloseModal()
    } catch(error){
      console.log(error)
    }
  }

  render() {
    if(this.state.userProfile !== undefined) {
      const {country_, region_} = this.state
      const {first_name, last_name, country, region, profile_img, profile_bg, slogan, bio, contact_info} = this.state.userProfile
      if (this.state.intial_trigger){
        this.setState({first_name_box: first_name})
        this.setState({last_name_box: last_name})
        this.setState({country_: country})
        this.setState({region_: region})
        this.setState({slogan_box: slogan})
        this.setState({bio_box: bio})
        this.setState({intial_trigger: false})
      }
      return (
        <div className="content-area dossier-page">
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
             className="Modal"
             overlayClassName="Overlay"
            >
            Edit intro:
            <i className="fas fa-times" onClick={this.handleCloseModal}></i>
            <div className="fName_txtBox">
              <p>First Name <span style={{color: "red"}}>*</span></p>
              <input type="text" id="first_name_box" className="first_name_box" maxLength="50" defaultValue={`${first_name}`} onChange={this.handleChange} />
            </div>
            <div className="lName_txtBox">
              <p>Last Name <span style={{color: "red"}}>*</span></p>
              <input type="text" id="last_name_box" className="last_name_box" maxLength="50" defaultValue={`${last_name}`} onChange={this.handleChange}/>
            </div>
            <div className="location">
              <p>Location <span style={{color: "red"}}>*</span></p>
              <CountryDropdown
                value={country_}
                defaultOptionLabel={country}
                onChange={(val) => this.selectCountry(val)}
                valueType="full"
                style={{
                  fontSize: 15.2
                }}
              />&nbsp;
              <RegionDropdown
                country={country_}
                value={region_}
                blankOptionLabel={region}
                onChange={(val) => this.selectRegion(val)}
                style={{
                  fontSize: 15.2
                }}
              />
            </div>
            <div className="contact-info">
              <p>Contact Info (visible to friends ONLY)</p>
              <textarea id="contact_info_box" className="contact_info_box" rows={8} cols={80} maxLength="254" defaultValue={`${contact_info}`} onChange={this.handleChange}/>
            </div>
            <div className="slogan">
              <p>Slogan</p>
              <input type="text" id="slogan_box" className="slogan_box" maxLength="120" defaultValue={`${slogan}`} onBlur={this.onBlur_slogan_box} onFocus={this.onFocus_slogan_box} onChange={this.handleChange}/>
            </div>
            <div className="bio">
              <p>Brief Bio</p>
              <textarea id="bio_box" className="bio_box" rows={8} cols={80} maxLength="254" defaultValue={`${bio}`} onChange={this.handleChange}/>
            </div>
            <div> </div>
            <div className="save-btn">
              <button className="save" onClick={this.submitForm}>Save</button>
            </div>
            {this.state.show_info_box &&
              <div className="info_box">
                {this.state.show_first_name_info_box &&
                  <div className="first_name_error">
                    Error: First Name can't be blank
                  </div>
                }
                {this.state.show_last_name_info_box &&
                  <div className="last_name_error">
                    Error: Last Name can't be blank
                  </div>
                }
              </div>
            }
          </Modal>
        </div>
      )
    } else{
      return (
        <div className="content-area dossier-page">
          Loading
        </div>
      )
    }
  }
}
