import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import SweetAlert from '../common/MyGSweetAlert'
import { toast } from 'react-toastify'
import { Toast_style } from '../Utility_Function'
import { Upload_to_S3, Remove_file } from '../AWS_utilities'

const typeMapping = {
  0: 'Denied',
  1: 'Pending Approval',
  2: 'Approved'
}

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
      alert: null
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
    sponsors.length < 2 &&
      [...new Array(2 - sponsors.length)].map((sponsor, index) => {
        sponsors.push({
          group_id: null,
          id: '',
          media_url: '',
          link: ''
        })
      })
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

  showAlert(id) {
    const getAlert = () => (
      <SweetAlert
        danger
        showCancel
        title='Are you sure you wish to delete this Sponsor?'
        confirmBtnText='Make it so!'
        confirmBtnBsStyle='danger'
        focusCancelBtn={true}
        focusConfirmBtn={false}
        showCloseButton={true}
        onConfirm={() => this.hideAlert('true', id)}
        onCancel={() => this.hideAlert('false', id)}
      >
        You will not be able to recover this entry!
      </SweetAlert>
    )

    this.setState({
      alert: getAlert()
    })
  }

  hideAlert = (text, id) => {
    this.setState({
      alert: null
    })
    if (text == 'true') {
      this.deleteSponsor(id)
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
    this.setState({ saveButtonDisabled: true }, () => {
      this.fetchProfileData()
    })
  }

  handleClose = (e) => {
    if (this.state.aws_key_id != '') {
      Remove_file(this.state.file_keys, this.state.aws_key_id)
    }
  }

  updateSponsor = async (sponsor = {}) => {
    const { groups_id } = this.props
    const linkValue = sponsor ? (sponsor.link ? sponsor.link.trim() : '') : ''
    const media_url = sponsor ? (sponsor.media_url ? sponsor.media_url : '') : ''
    if (linkValue && media_url) {
      await axios.post('/api/sponsor/update', {
        group_id: groups_id,
        id: sponsor.id,
        media_url: media_url,
        link: linkValue
      })
      toast.error(<Toast_style text={'Epic! Saved successfully!'} />)
    } else {
      if (!linkValue && media_url) {
        toast.error(<Toast_style text={'ah, Please update Image/ Url !'} />)
      }
    }
  }

  createSponsor = async (sponsor = {}) => {
    const { group_id } = this.props
    const linkValue = sponsor ? (sponsor.link ? sponsor.link.trim() : '') : ''
    const media_url = sponsor ? (sponsor.media_url ? sponsor.media_url : '') : ''
    if (linkValue && media_url) {
      await axios.post('/api/sponsor/create', {
        group_id: group_id,
        type: 2,
        media_url: media_url,
        link: linkValue,
        aws_key_id: sponsor ? (sponsor.aws_key_id ? sponsor.aws_key_id : '') : ''
      })
      toast.error(<Toast_style text={'Great, Created successfully!'} />)
    } else {
      if (!linkValue && media_url) {
        toast.error(<Toast_style text={'ah, Please update Image/ Url !'} />)
      }
    }
  }

  handleLinkChange = (e, counter) => {
    const data = e.target.value
    const { sponsors = [] } = this.state

    const sponsorData = sponsors.map((sponsor, index) => {
      if (index == counter - 1) {
        return {
          ...sponsor,
          link: data
        }
      } else {
        return sponsor
      }
    })

    this.setState({ sponsors: sponsorData, saveButtonDisabled: false })
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
                aws_key_id: [post.data.aws_key_id]
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
    this.setState({ uploading, saveButtonDisabled: false })
  }

  deleteSponsor = (id) => {
    axios.delete(`/api/sponsor/delete/${id}`).then(this.fetchProfileData)
    toast.success(<Toast_style text={'Yup, yup, yup... deleted successfully!'} />)
  }

  render() {
    const {
      saveButtonDisabled = true,
      linkValue = '',
      media_url = '',
      modalStatus = true,
      uploading = [],
      sponsors = [],
      alert
    } = this.state

    return (
      <div className={`Sponsor__edit`}>
        {alert}
        <div className='SponsorSave__action'>
          <button type='button' className='Sponsoraction' disabled={saveButtonDisabled} onClick={this.handleSave}>
            Save
          </button>
        </div>
        {sponsors.map((sponsor, index) => {
          const counter = index + 1
          return (
            <div className='Sponsor__edit-list' key={`${sponsors.length}_${index}}`}>
              <div className='text sponsor__header-row'>
                <span className='count'> Custom Sponsor {counter}</span>
                <span className='status'> {typeMapping[sponsor.type]}</span>
                {sponsor.id && (
                  <span className='action' onClick={(e) => this.showAlert(sponsor.id)}>
                    {' '}
                    Delete
                  </span>
                )}
              </div>
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
                Or <span>Click/Tap here</span> to select (Image size: 980x120)
              </div>
              {uploading[counter] && (
                <div className='text'>
                  <span>Uploading... </span>
                </div>
              )}
              <div className='Sponsor__link__input'>
                <input
                  type='text'
                  autoComplete='off'
                  onChange={(e) => this.handleLinkChange(e, counter)}
                  value={linkValue == '' ? sponsor.link : linkValue}
                  placeholder='Enter link here'
                  onKeyDown={this.onKeyDown}
                  disabled={uploading[counter]}
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
    alias: state.user.alias
  }
}

export default connect(mapStateToProps, null)(MangeSponsors)
