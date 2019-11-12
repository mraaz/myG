import React, { Component} from "react"
import ReactDOM from "react-dom"
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from "react-router-dom"
import axios from "axios"
import Modal from "react-modal"

Modal.setAppElement('#app')


export default class UploadPic extends Component {
  constructor () {
    super()
    self = this
    this.state = {
      shouldCloseOnOverlayClick_ : true,
      files: [],
      showModal: true
    }
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentWillMount(){

    //const {match} = this.props.routeProps
    const self = this
    //
    // const getUser = async function(){
    //   try{
    //     const userProfile = await axios.get(`/api/user/${match.params.id}`)
        self.setState({
          userProfile: 1,
        })
    //   } catch(error){
    //     console.log(error)
    //   }
    // }
    //getUser()
  }



  handleCloseModal () {
    this.setState({ showModal: false })
    const {match} = self.props.routeProps
    window.location.href = `/profile/${match.params.id}`
  }

  // testModal = (e) => {
  //   this.setState({shouldCloseOnOverlayClick_: true})
  // }

  // submitForm = async () => {
  //   try {
  //     const post = await axios.post('/api/user',{
  //       first_name_box: this.state.first_name_box,
  //       last_name_box: this.state.last_name_box,
  //       slogan: this.state.slogan_box,
  //       bio: this.state.bio_box,
  //       country: this.state.country_,
  //       region: this.state.region_
  //     })
  //     this.handleCloseModal()
  //   } catch(error){
  //     console.log(error)
  //   }
  // }



  render() {
    if(this.state.userProfile !== undefined) {
      const previewStyle = {
        display: 'inline',
        width: 100,
        height: 100,
      }
      return (
        <div className="content-area uploadPic-page">
          <Modal
            isOpen={this.state.showModal}
            onRequestClose={this.handleCloseModal}
            shouldCloseOnOverlayClick={true}
            className="Modal"
            overlayClassName="Overlay"
          >

          </Modal>
        </div>
      )
    } else {
      return (
        <div className="content-area uploadPic-page">
          Loading
        </div>
      )
    }
  }
}
