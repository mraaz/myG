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
      sponsors: this.props.sponsors,
      uploading: [],
    }

    this.fileInputRef = []
  }

  addDefaultSrc = (ev) => {
    ev.target.src = 'https://myG.gg/default_user/universe.jpg'
  }

  onKeyDown = (event) => {
    const code = event.keyCode || event.which
    if (code === 13) {
      this.handleSave()
    }
  }

  handleSave = (e) => {
    const { sponsors = [] } = this.state
    sponsors.map((sponsor) => {
      if (sponsor.id) {
        this.updateSponsor(sponsor)
      } else {
        this.createSponsor(sponsor)
      }
    })
  }

  handleClose = (e) => {
    if (this.state.aws_key_id != '') {
      const delete_file = Remove_file(this.state.file_keys, this.state.aws_key_id)
    }
    this.props.handleModalStatus(false)
  }

  updateSponsor = async (sponsor = {}) => {
    const { groups_id } = this.props

    await axios.post('/api/sponsor/update', {
      group_id: groups_id,
      id: sponsor.id,
      media_url: sponsor.media_url ? sponsor.media_url : '',
      link: sponsor.link ? sponsor.link : '',
    })
    toast.error(<Toast_style text={'Epic! Saved successfully!'} />)
    this.props.handleModalStatus(true)
  }

  createSponsor = async (sponsor = {}) => {
    const { group_id } = this.props
    const { linkValue, media_url, aws_key_id = '' } = this.state
    await axios.post('/api/sponsor/create', {
      group_id: group_id,
      type: 2,
      media_url: sponsor.media_url ? sponsor.media_url : '',
      link: sponsor.link ? sponsor.link : '',
      aws_key_id: sponsor.aws_key_id ? sponsor.aws_key_id : '',
    })
    toast.error(<Toast_style text={'Great, Created successfully!'} />)
    this.props.handleModalStatus(true)
  }

  handleLinkChange = (e, counter) => {
    const data = e.target.value
    const { sponsors = [] } = this.state
    const sponsorData = [...sponsors]
    sponsorData[counter - 1] = {
      ...sponsorData[counter - 1],
      link: data,
    }

    if (data == '') {
      this.setState({ sponsors: sponsorData, saveButtonDisabled: true })
    } else {
      this.setState({ sponsors: sponsorData, saveButtonDisabled: false })
    }
  }

  handleImageChange = (e, counter) => {
    if (!this.state.uploading[counter]) {
      this.fileInputRef[counter].click()
    }
  }

  handleSelectFile = (e, counter) => {
    const fileList = e.target.files
    if (fileList.length > 0) {
      let type = fileList[0].type.split('/')
      let name = `Sponsor_${type}_${+new Date()}_${fileList[0].name}`
      let pattern = /image-*/

      if (!fileList[0].type.match(pattern)) {
        toast.error(<Toast_style text={'Opps, Invalid file format! '} />)
        return
      }
      this.doUploadS3(fileList[0], name, counter)
    }
  }

  doUploadS3 = async (file, name, counter) => {
    const { uploading = [] } = this.state
    uploading[counter] = true
    this.setState({ uploading })
    try {
      if (file.size < 10485760) {
        const { sponsors = [] } = this.state
        let post = null
        const sponsor = sponsors[counter - 1]

        if (sponsor.id) {
          post = await Upload_to_S3(file, name, 10, sponsor.id)
        } else {
          post = await Upload_to_S3(file, name, 0, null)
        }

        if (post != false) {
          const sponsorData = sponsors.map((sponsor, index) => {
            if (index == counter - 1) {
              return {
                ...sponsor,
                media_url: [post.data.Location],
                file_keys: post.data.Key,
                aws_key_id: [post.data.aws_key_id],
              }
            } else {
              return sponsor
            }
          })
          this.setState({ sponsors: sponsorData })
        }
      } else {
        toast.error(<Toast_style text={'Opps, file size can not be excced more than 10MB '} />)
      }
    } catch (error) {
      toast.success(<Toast_style text={'Opps, something went wrong. Unable to upload your file.'} />)
    }
    uploading[counter] = false
    this.setState({ uploading })
  }

  render() {
    const { saveButtonDisabled = true, linkValue = '', media_url = '', modalStatus = true, uploading = [], sponsors = [] } = this.state
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
                const counter = index + 1
                return (
                  <div className='Sponsor__edit-list' key={`${sponsors.length}_${counter}`}>
                    <div className='text'>Custom Sponsor {counter}</div>
                    <div className='Sponsor__media__input' onClick={(e) => this.handleImageChange(e, counter)}>
                      <input
                        type='file'
                        accept='image/jpeg,image/jpg,image/png,image/gif'
                        ref={(ref) => (this.fileInputRef[counter] = ref)}
                        onChange={(e) => this.handleSelectFile(e, counter)}
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
                    {uploading[counter] && (
                      <div className='text'>
                        <span>Uploading... </span>
                      </div>
                    )}
                    <div className='Sponsor__link__input'>
                      <input
                        type='text'
                        onChange={(e) => this.handleLinkChange(e, counter)}
                        value={sponsor.link}
                        placeholder='Enter link here'
                        onKeyDown={this.onKeyDown}
                      />
                    </div>
                  </div>
                )
              })}
            {sponsors.length < 2 &&
              [...new Array((this.props.level < 25 ? 1 : 2) - sponsors.length)].map((sponsor, index) => {
                const counter = sponsors.length + index + 1
                return (
                  <div className='Sponsor__edit-list' key={`${sponsors.length}_${counter}`}>
                    <div className='text'>Custom Sponsor {counter}</div>
                    <div className='Sponsor__media__input' onClick={(e) => this.handleImageChange(e, counter)}>
                      <input
                        type='file'
                        accept='image/jpeg,image/jpg,image/png,image/gif'
                        ref={(ref) => (this.fileInputRef[counter] = ref)}
                        onChange={(e) => this.handleSelectFile(e, counter)}
                        name='insert__images'
                      />
                      <img
                        src={media_url == '' ? 'https://myG.gg/platform_images/Dashboard/BTN_Attach_Image.svg' : media_url}
                        onError={this.addDefaultSrc}
                      />
                    </div>
                    <div className='text__tap'>
                      Or <span>Click/Tap here</span> to select
                    </div>
                    {uploading[counter] && (
                      <div className='text'>
                        <span>Uploading... </span>
                      </div>
                    )}
                    <div className='Sponsor__link__input'>
                      <input
                        type='text'
                        onChange={(e) => this.handleLinkChange(e, counter)}
                        value={sponsor.link}
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
