import React from 'react'
import axios from 'axios'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'
import SweetAlert from '../common/MyGSweetAlert'
import { toast } from 'react-toastify'
import { Toast_style } from '../Utility_Function'
import { PageHeader, MyGButton, MyGModal, MyGInput } from '../common'

export default class MangeSponcers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalStatus: true,
      saveButtonDisabled: true,
      linkValue: '',
      media_url: '',
    }
  }

  addDefaultSrc = (ev) => {
    ev.target.src = 'https://mygame-media.s3.amazonaws.com/default_user/universe.jpg'
  }

  handleSave = (e) => {
    const { sponsor = {}, groups_id } = this.props
    if (sponsor.id) {
      this.updateSponcer()
    } else {
      this.createSponcer()
    }
  }

  updateSponcer = async (e) => {
    const { sponsor = {}, groups_id } = this.props
    const { linkValue, media_url } = this.state
    const updateSponcer = await axios.post('/api/sponsor/update', {
      group_id: groups_id,
      id: sponsor.id,
      media_url: media_url == '' ? sponsor.media_url : media_url,
      link: linkValue == '' ? sponsor.link : linkValue,
    })
    if (updateSponcer) {
      toast.error(<Toast_style text={'Great, Saved successfully!'} />)
      this.props.handleModalStatus()
    }
  }

  createSponcer = async () => {
    const { sponsor = {}, groups_id } = this.props
    const { linkValue, media_url } = this.state
    const createSponcerData = await axios.post('/api/sponsor/create', {
      group_id: groups_id,
      type: 2,
      media_url: media_url == '' ? sponsor.media_url : media_url,
      link: linkValue == '' ? sponsor.link : linkValue,
    })
    if (createSponcerData) {
      toast.error(<Toast_style text={'Great, Created successfully!'} />)
      this.props.handleModalStatus()
    }
  }

  handleLinkChange = (e) => {
    const data = e.target.value
    this.setState({ linkValue: data, saveButtonDisabled: false })
  }

  render() {
    const { sponsor = {} } = this.props
    const { saveButtonDisabled = [], linkValue = '', media_url = '', modalStatus = true } = this.state

    return (
      <div className={`modal-container View__Member__modal ${modalStatus ? 'modal--show' : ''}`}>
        <div className='modal-wrap'>
          <div className='modal__header'>
            <div className='tabs___header'>
              <span className={`setting__tab `}>Edit Media</span>
            </div>
            <div className='modal__close' onClick={(e) => this.props.handleModalStatus()}>
              <img src='https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/X_icon.svg' />
            </div>
          </div>
          <div className='modal__body sponcer__edit'>
            <div className='sponcer__media__input'>
              <img src={media_url == '' ? sponsor.media_url : media_url} onError={this.addDefaultSrc} />
            </div>
            <div className='sponcer__link__input'>
              <input type='text' onChange={this.handleLinkChange} value={linkValue == '' ? sponsor.link : linkValue} />
            </div>
          </div>
          <div className='modal__footer'>
            <MyGButton
              customStyles={{ color: '#FFFFFF', border: '2px solid #FFFFFF', background: '#000' }}
              onClick={() => this.props.handleModalStatus()}
              text='Cancel'
            />
            <button type='button' disabled={saveButtonDisabled} onClick={() => this.handleSave(true)}>
              Save
            </button>
          </div>
        </div>

        <div className='modal-overlay' onClick={(e) => this.props.handleModalStatus()}></div>
      </div>
    )
  }
}
