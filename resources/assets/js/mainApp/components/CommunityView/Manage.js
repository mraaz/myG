import React from 'react'
import axios from 'axios'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'

export default class Members extends React.Component {
  constructor() {
    super()
    this.state = {
      modalStatus: true,
    }
  }

  render() {
    const { modalStatus } = this.state
    return (
      <div className={`modal-container View__Member__modal ${modalStatus ? 'modal--show' : ''}`}>
        <div className='modal-wrap'>
          <div className='modal__header'>Joined Gamers</div>
          <div className='modal__body'>ddwdw</div>
        </div>

        <div className='modal-overlay' onClick={(e) => this.props.handleModalStatus()}></div>
      </div>
    )
  }
}
