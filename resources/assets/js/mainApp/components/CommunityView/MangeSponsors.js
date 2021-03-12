import React from 'react'
import axios from 'axios'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'
import SweetAlert from '../common/MyGSweetAlert'
import { toast } from 'react-toastify'
import { Toast_style } from '../Utility_Function'
import { Upload_to_S3, Remove_file } from '../AWS_utilities'
import { MyGButton } from '../common'

export default class MangeSponsors extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalStatus: true,
      saveButtonDisabled: true,
      linkValue: '',
      media_url: '',
      aws_key_id: '',
      file_keys: '',
      linkValue_2: '',
      media_url_2: '',
      aws_key_id_2: '',
      file_keys_2: '',
    }
    this.fileInputRef = React.createRef()
  }

  addDefaultSrc = (ev) => {
    ev.target.src = 'https://myG.gg/default_user/universe.jpg'
  }

  onKeyDown = (event) => {
    const code = event.keyCode || event.which
    if (code === 13) {
      const { sponsor = {} } = this.props
      if (sponsor.id) {
        this.updateSponsor()
      } else {
        this.createSponsor()
      }
    }
  }

  handleSave = (e) => {
    const { sponsor = {} } = this.props
    if (sponsor.id) {
      this.updateSponsor()
    } else {
      this.createSponsor()
    }
  }

  handleClose = (e) => {
    if (this.state.aws_key_id != '') {
      const delete_file = Remove_file(this.state.file_keys, this.state.aws_key_id)
    }
    this.props.handleModalStatus(false)
  }

  updateSponsor = async (e) => {
    const { sponsor = {}, groups_id } = this.props
    const { linkValue, media_url } = this.state

    await axios.post('/api/sponsor/update', {
      group_id: groups_id,
      id: sponsor.id,
      media_url: media_url == '' ? sponsor.media_url : media_url,
      link: linkValue == '' ? sponsor.link : linkValue,
    })
    toast.error(<Toast_style text={'Epic! Saved successfully!'} />)
    this.props.handleModalStatus(true)
  }

  createSponsor = async () => {
    const { sponsor = {}, group_id } = this.props
    const { linkValue, media_url, aws_key_id = '' } = this.state
    await axios.post('/api/sponsor/create', {
      group_id: group_id,
      type: 2,
      media_url: media_url == '' ? sponsor.media_url : media_url,
      link: linkValue == '' ? sponsor.link : linkValue,
      aws_key_id: aws_key_id,
    })
    toast.error(<Toast_style text={'Great, Created successfully!'} />)
    this.props.handleModalStatus(true)
  }

  handleLinkChange = (e) => {
    const data = e.target.value
    if (data == '') {
      this.setState({ linkValue: data, saveButtonDisabled: true })
    } else {
      this.setState({ linkValue: data, saveButtonDisabled: false })
    }
  }

  handleLinkChange_2 = (e) => {
    const data = e.target.value
    if (data == '') {
      this.setState({ linkValue_2: data, saveButtonDisabled: true })
    } else {
      this.setState({ linkValue_2: data })
    }
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
      let pattern = /image-*/

      if (!fileList[0].type.match(pattern)) {
        toast.error(<Toast_style text={'Opps, Invalid file format! '} />)
        return
      }
      this.doUploadS3(fileList[0], name)
    }
  }

  doUploadS3 = async (file, name) => {
    this.setState({ uploading: true })
    try {
      if (file.size < 10485760) {
        const { sponsor = {} } = this.props
        let post = null

        if (sponsor.id) {
          post = await Upload_to_S3(file, name, 10, sponsor.id)
        } else {
          post = await Upload_to_S3(file, name, 0, null)
        }

        if (post != false) {
          this.setState({
            media_url: [post.data.Location],
            file_keys: post.data.Key,
            aws_key_id: [post.data.aws_key_id],
          })
        }
      } else {
        toast.error(<Toast_style text={'Opps, file size can not be excced more than 10MB '} />)
      }
    } catch (error) {
      toast.success(<Toast_style text={'Opps, something went wrong. Unable to upload your file.'} />)
    }
    this.setState({ uploading: false })
  }

  handleSelectFile_2 = (e) => {
    const fileList = e.target.files
    if (fileList.length > 0) {
      let type = fileList[0].type.split('/')
      let name = `Sponsor_${type}_${+new Date()}_${fileList[0].name}`
      let pattern = /image-*/

      if (!fileList[0].type.match(pattern)) {
        toast.error(<Toast_style text={'Opps, Invalid file format! '} />)
        return
      }
      this.doUploadS3(fileList[0], name)
    }
  }

  doUploadS3_2 = async (file, name) => {
    this.setState({ uploading: true })
    try {
      if (file.size < 10485760) {
        const { sponsor = {} } = this.props
        let post = null

        if (sponsor.id) {
          post = await Upload_to_S3(file, name, 10, sponsor.id)
        } else {
          post = await Upload_to_S3(file, name, 0, null)
        }

        if (post != false) {
          this.setState({
            media_url_2: [post.data.Location],
            file_keys_2: post.data.Key,
            aws_key_id_2: [post.data.aws_key_id],
          })
        }
      } else {
        toast.error(<Toast_style text={'Opps, file size can not be excced more than 10MB '} />)
      }
    } catch (error) {
      toast.success(<Toast_style text={'Opps, something went wrong. Unable to upload your file.'} />)
    }
    this.setState({ uploading: false })
  }

  render() {
    const { sponsors = [] } = this.props
    const {
      saveButtonDisabled = true,
      linkValue = '',
      media_url = '',
      linkValue_2 = '',
      media_url_2 = '',
      modalStatus = true,
      uploading = false,
    } = this.state

    return (
      <div className={`modal-container View__Member__modal ${modalStatus ? 'modal--show' : ''}`}>
        <div className='modal-wrap'>
          <div className='modal__header'>
            <div className='tabs___header'>
              <span className={`setting__tab  notHand`}>Edit Media</span>
            </div>
            <div className='modal__close' onClick={(e) => this.handleClose()}>
              <img src='https://myG.gg/platform_images/Dashboard/X_icon.svg' />
            </div>
          </div>

          <div className='modal__body Sponsor__edit'>
            {sponsors.length > 0 &&
              sponsors.map((sponsor, index) => {
                return (
                  <div className='Sponsor__edit-list'>
                    <div className='text'>Custom Sponsor {index + 1}</div>
                    <div className='Sponsor__media__input' onClick={this.handleImageChange}>
                      <input
                        type='file'
                        accept='image/jpeg,image/jpg,image/png,image/gif'
                        ref={this.fileInputRef}
                        onChange={this.handleSelectFile}
                        name='insert__images'
                      />
                      <img
                        src={
                          media_url == '' ? sponsor.media_url || 'https://myG.gg/platform_images/Dashboard/BTN_Attach_Image.svg' : media_url
                        }
                        onError={this.addDefaultSrc}
                      />
                    </div>
                    <div className='text__tap'>
                      Or <span>Click/Tap here</span> to select
                    </div>
                    {uploading && (
                      <div className='text'>
                        <span>Uploading... </span>
                      </div>
                    )}
                    <div className='Sponsor__link__input'>
                      <input
                        type='text'
                        onChange={this.handleLinkChange}
                        value={linkValue == '' ? sponsor.link : linkValue}
                        placeholder='Enter link here'
                        onKeyDown={this.onKeyDown}
                      />
                    </div>
                  </div>
                )
              })}
            {sponsors.length < 2 &&
              [...new Array((this.props.level < 25 ? 1 : 2) - sponsors.length)].map((sponsor, index) => {
                return (
                  <div className='Sponsor__edit-list'>
                    <div className='text'>Custom Sponsor {index + 1}</div>
                    <div className='Sponsor__media__input' onClick={this.handleImageChange}>
                      <input
                        type='file'
                        accept='image/jpeg,image/jpg,image/png,image/gif'
                        ref={this.fileInputRef}
                        onChange={this.handleSelectFile_2}
                        name='insert__images'
                      />
                      <img
                        src={media_url_2 == '' ? 'https://myG.gg/platform_images/Dashboard/BTN_Attach_Image.svg' : media_url_2}
                        onError={this.addDefaultSrc}
                      />
                    </div>
                    <div className='text__tap'>
                      Or <span>Click/Tap here</span> to select
                    </div>
                    {uploading && (
                      <div className='text'>
                        <span>Uploading... </span>
                      </div>
                    )}
                    <div className='Sponsor__link__input'>
                      <input
                        type='text'
                        onChange={this.handleLinkChange_2}
                        value={linkValue_2 == '' ? '' : linkValue_2}
                        placeholder='Enter link here'
                        onKeyDown={this.onKeyDown}
                      />
                    </div>
                  </div>
                )
              })}
          </div>

          <div className='modal__footer'>
            <MyGButton
              customStyles={{ color: '#fff', border: '2px solid #fff', background: '#000' }}
              onClick={() => this.handleClose()}
              text='Cancel'
            />
            <button type='button' disabled={saveButtonDisabled} onClick={() => this.handleSave(true)}>
              Save
            </button>
          </div>
        </div>

        <div className='modal-overlay' onClick={(e) => this.handleClose()}></div>
      </div>
    )
  }
}
