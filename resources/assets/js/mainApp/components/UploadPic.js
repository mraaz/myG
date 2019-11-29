import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { render } from 'react-dom'
import { Redirect } from 'react-router'
import axios from 'axios'
import Modal from 'react-modal'

Modal.setAppElement('#app')

export default class UploadPic extends Component {
  constructor() {
    super()
    self = this
    this.state = {
      shouldCloseOnOverlayClick_: true,
      files: [],
      showModal: true,
      redirect_: false,
    }
    this.handleCloseModal = this.handleCloseModal.bind(this)
  }

  componentWillMount() {
    const self = this
    self.setState({
      userProfile: 1,
    })
  }

  handleCloseModal() {
    this.state.redirect_ = true
    this.setState({ showModal: false })
  }

  render() {
    if (this.state.redirect_) {
      const { match } = this.props.routeProps
      var tmp = `/profile/${match.params.id}`
      return <Redirect push to={tmp} />
    }
    if (this.state.userProfile !== undefined) {
      const previewStyle = {
        display: 'inline',
        width: 100,
        height: 100,
      }
      return (
        <div className='content-area uploadPic-page'>
          <Modal
            isOpen={this.state.showModal}
            onRequestClose={this.handleCloseModal}
            shouldCloseOnOverlayClick={true}
            className='Modal'
            overlayClassName='Overlay'></Modal>
        </div>
      )
    } else {
      return <div className='content-area uploadPic-page'>Loading</div>
    }
  }
}
