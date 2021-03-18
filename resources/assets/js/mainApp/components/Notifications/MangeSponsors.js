import React from 'react'
import axios from 'axios'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import get from 'lodash.get'
import SweetAlert from '../common/MyGSweetAlert'
import { toast } from 'react-toastify'
import { Toast_style } from '../Utility_Function'
import { Upload_to_S3, Remove_file } from '../AWS_utilities'
import { MyGButton } from '../common'
import { fetchProfileInfoAction } from '../../../redux/actions/profileAction'

class MangeSponsors extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalStatus: true,
      saveButtonDisabled: true,
      linkValue: '',
      media_url: '',
      aws_key_id: '',
      file_keys: '',
      uploading: [],
    }
    this.fileInputRef = []
  }

  componentDidMount() {
    this.fetchProfileData()
  }

  fetchProfileData = async () => {
    const profileData = await axios.get(`/api/profile/${this.props.alias}`)
    const { data = {} } = profileData
    const { profile = {} } = data
    const { sponsors = [] } = profile
    this.setState({ sponsors })
  }

  addDefaultSrc = (ev) => {
    ev.target.src = 'https://myG.gg/default_user/universe.jpg'
  }

  onKeyDown = (event) => {
    const code = event.keyCode || event.which
    if (code === 13) {
      this.handleSave()
      this.fetchProfileData()
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
  }

  updateSponsor = async (sponsor = {}) => {
    const { groups_id } = this.props

    await axios.post('/api/sponsor/update', {
      group_id: groups_id,
      id: sponsor.id,
      media_url: sponsor ? (sponsor.media_url ? sponsor.media_url : '') : '',
      link: sponsor ? (sponsor.link ? sponsor.link : '') : '',
    })
    toast.error(<Toast_style text={'Epic! Saved successfully!'} />)
  }

  createSponsor = async (sponsor = {}) => {
    const { group_id } = this.props
    const { linkValue, media_url, aws_key_id = '' } = this.state
    await axios.post('/api/sponsor/create', {
      group_id: group_id,
      type: 2,
      media_url: sponsor ? (sponsor.media_url ? sponsor.media_url : '') : '',
      link: sponsor ? (sponsor.link ? sponsor.link : '') : '',
      aws_key_id: sponsor ? (sponsor.aws_key_id ? sponsor.aws_key_id : '') : '',
    })
    toast.error(<Toast_style text={'Great, Created successfully!'} />)
  }

  handleLinkChange = (e, counter) => {
    const data = e.target.value
    const { sponsors = [] } = this.state

    const sponsorData = sponsors.map((sponsor, index) => {
      if (index == counter - 1) {
        return {
          ...sponsor,
          link: data,
        }
      } else {
        return sponsor
      }
    })

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
      <div className={`Sponsor__edit`}>
        <div className='SponsorSave__action'>
          <button type='button' className='Sponsoraction' onClick={this.handleSave}>
            Save
          </button>
        </div>
        {sponsors.map((sponsor, index) => {
          const counter = index + 1
          return (
            <div className='Sponsor__edit-list' key={`${sponsor.length}_${index}}`}>
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
                  src={media_url == '' ? sponsor.media_url || 'https://myG.gg/platform_images/Dashboard/BTN_Attach_Image.svg' : media_url}
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
                  value={linkValue == '' ? sponsor.link : linkValue}
                  placeholder='Enter link here'
                  onKeyDown={this.onKeyDown}
                />
              </div>
            </div>
          )
        })}
        {sponsors.length < 2 &&
          [...new Array(2 - sponsors.length)].map((sponsor, index) => {
            const counter = sponsors.length + index + 1
            return (
              <div className='Sponsor__edit-list' key={`${sponsor.length}_${index}}`}>
                <div className='text'>Custom Sponsor {index + 1}</div>
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
                    value={sponsor ? sponsor.link : ''}
                    placeholder='Enter link here'
                    onKeyDown={this.onKeyDown}
                  />
                </div>
              </div>
            )
          })}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    alias: state.user.alias,
  }
}

export default connect(mapStateToProps, null)(MangeSponsors)
