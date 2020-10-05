import React from 'react'
import axios from 'axios'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'
import SweetAlert from '../common/MyGSweetAlert'
import { toast } from 'react-toastify'
import { Toast_style } from '../Utility_Function'
import { Upload_to_S3 } from '../AWS_utilities'
import { PageHeader, MyGButton, MyGModal, MyGInput } from '../common'

export default class MangeSponsors extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalStatus: true,
      saveButtonDisabled: true,
      linkValue: '',
      media_url: '',
    }
    this.fileInputRef = React.createRef()
  }

  addDefaultSrc = (ev) => {
    ev.target.src = 'https://mygame-media.s3.amazonaws.com/default_user/universe.jpg'
  }

  handleSave = (e) => {
    const { sponsor = {}, groups_id } = this.props
    if (sponsor.id) {
      this.updateSponsor()
    } else {
      this.createSponsor()
    }
  }

  updateSponsor = async (e) => {
    const { sponsor = {}, groups_id } = this.props
    const { linkValue, media_url } = this.state
    const updateSponsor = await axios.post('/api/sponsor/update', {
      group_id: groups_id,
      id: sponsor.id,
      media_url: media_url == '' ? sponsor.media_url : media_url,
      link: linkValue == '' ? sponsor.link : linkValue,
    })
    if (updateSponsor) {
      toast.error(<Toast_style text={'Great, Saved successfully!'} />)
      this.props.handleModalStatus()
    }
  }

  createSponsor = async () => {
    const { sponsor = {}, groups_id } = this.props
    const { linkValue, media_url } = this.state
    const createSponsorData = await axios.post('/api/sponsor/create', {
      group_id: groups_id,
      type: 2,
      media_url: media_url == '' ? sponsor.media_url : media_url,
      link: linkValue == '' ? sponsor.link : linkValue,
    })
    if (createSponsorData) {
      toast.error(<Toast_style text={'Great, Created successfully!'} />)
      this.props.handleModalStatus()
    }
  }

  handleLinkChange = (e) => {
    const data = e.target.value
    this.setState({ linkValue: data, saveButtonDisabled: false })
  }

  handleImageChange = (e) => {
    if (!this.state.uploading) {
      this.fileInputRef.current.click()
    }
  }

  handleSelectFile = (e) => {
    const fileList = e.target.files
    if (fileList.length > 0) {
      let type = fileList[0].type.split('/')
      let name = `Sponsor_${type}_${+new Date()}_${fileList[0].name}`
      this.doUploadS3(fileList[0], name)
    }
  }

  doUploadS3 = async (file, name) => {
    this.setState({ uploading: true })
    try {
      const post = await Upload_to_S3(file, name, 0, null)
      this.setState({
        media_url: [post.data.Location],
        file_keys: post.data.Key,
        aws_key_id: [post.data.aws_key_id],
        saveButtonDisabled: false,
      })
    } catch (error) {
      toast.success(<Toast_style text={'Opps, something went wrong. Unable to upload your file.'} />)
    }
    this.setState({ uploading: false })
  }

  render() {
    const { sponsor = {} } = this.props
    const { saveButtonDisabled = false, linkValue = '', media_url = '', modalStatus = true, uploading = false } = this.state

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
          <div className='modal__body Sponsor__edit'>
            <div className='Sponsor__media__input' onClick={this.handleImageChange}>
              <input
                type='file'
                accept='image/jpeg,image/jpg,image/png,image/gif'
                ref={this.fileInputRef}
                onChange={this.handleSelectFile}
                name='insert__images'
              />
              {uploading && <div className='image__uploading'>Uploading...</div>}
              <img
                src={
                  media_url == ''
                    ? sponsor.media_url || 'https://mygame-media.s3.amazonaws.com/platform_images/Communities/upload_image.png'
                    : media_url
                }
                onError={this.addDefaultSrc}
              />
            </div>
            <div className='Sponsor__link__input'>
              <label>Enter Sponsor link</label>
              <input
                type='text'
                onChange={this.handleLinkChange}
                value={linkValue == '' ? sponsor.link : linkValue}
                placeholder='Enter link here'
              />
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
