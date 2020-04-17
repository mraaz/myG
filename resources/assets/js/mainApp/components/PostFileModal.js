import React, { Component } from 'react'
import axios from 'axios'

import { toast } from 'react-toastify'
import { Toast_style } from './Utility_Function'

// import 'react-dropzone-uploader/dist/styles.css'
// import Dropzone from 'react-dropzone-uploader'
import Dropzone from 'react-dropzone'
const buckectBaseUrl = 'https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/'

export default class PostFileModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      preview_files: [],
      post_content: '',
      store_files: [],
      lock: false,
      uploading: false,
      submitButtonContent: 'Submit',
      open_compose_textTab: props.open_compose_textTab,
      add_group_toggle: false,
    }

    this.closeModal = this.closeModal.bind(this)
    this.doUploadS3 = this.doUploadS3.bind(this)
  }

  togglePostTypeTab = (label) => {
    let open_compose_textTab = true
    if (label == 'media') {
      open_compose_textTab = false
    }
    this.setState({ open_compose_textTab })
  }

  removeIndivdualfromAWS(id) {
    for (var i = 0; i < this.state.preview_files.length; i++) {
      if (this.state.preview_files[i].id == id) {
        const formData = new FormData()
        formData.append('key', this.state.preview_files[i].key)

        try {
          const post = axios.post('/api/deleteFile', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
        } catch (error) {
          toast.success(<Toast_style text={'Opps, something went wrong. Unable to upload your file. Close this window and try again'} />)
        }
        this.state.preview_files.splice(i, 1)
        break
      }
    }
  }

  closeModal() {
    this.props.callbackClose()
    if (this.state.preview_files.length != 0) {
      axios
        .post('/api/deleteFiles', {
          files: this.state.preview_files,
        })
        .catch((error) => {})
    }

    const tmparray = [...this.state.store_files]
    this.state.lock = true

    for (var i = 0; i < tmparray.length; i++) {
      tmparray[i].remove()
    }
    this.state.lock = false

    this.setState({
      preview_files: [],
      post_content: '',
      store_files: [],
    })
  }

  async doUploadS3(file, id, name) {
    var instance = this

    this.state.submitButtonContent = 'Uploading...'
    this.setState({
      uploading: true,
    })

    const formData = new FormData()
    formData.append('upload_file', file)
    formData.append('filename', name)

    try {
      const post = await axios.post('/api/uploadFile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      var new_preview_files = instance.state.preview_files
      new_preview_files.push({
        src: post.data.Location,
        key: post.data.Key,
        id: id,
      })
      instance.setState({
        preview_files: new_preview_files,
      })
    } catch (error) {
      toast.success(<Toast_style text={'Opps, something went wrong. Unable to upload your file. Close this window and try again'} />)
    }
    this.state.submitButtonContent = 'Submit'
    this.setState({
      uploading: false,
    })
  }

  getUploadParams = async ({ file, meta: { id, name } }) => {
    this.doUploadS3(file, id, name)
    return { url: 'https://httpbin.org/post' }
  }

  handleChangeStatus = ({ meta }, status, allFiles) => {
    this.state.store_files = allFiles
    if (status == 'removed' && this.state.lock == false) {
      this.removeIndivdualfromAWS(meta.id)
    }
  }

  handleSubmit = (files, allFiles) => {
    if (this.state.uploading == true) {
      return
    }
    var tmp = []
    var keys = []

    for (var i = 0; i < this.state.preview_files.length; i++) {
      tmp.push(this.state.preview_files[i].src)
      keys.push(this.state.preview_files[i].key)
    }

    this.props.callbackConfirm(
      {
        media_url: tmp,
        content: this.state.post_content,
      },
      keys
    )

    this.state.lock = true
    allFiles.forEach((f) => f.remove())
    this.state.lock = false

    this.setState({
      preview_files: [],
      post_content: '',
    })
  }

  handleChange = (event) => {
    const name = event.target.name
    const value = event.target.type == 'checkbox' ? event.target.checked : event.target.value
    this.setState({
      [name]: value,
    })
  }
  handleAcceptedFiles = (Files) => {
    let preview_files = []
    for (var i = 0; i < Files.length; i++) {
      let preview = Files[i].preview
      preview_files[i] = preview
    }
    this.setState({
      preview_files: preview_files,
    })
  }

  submitForm = () => {
    this.props.callbackContentConfirm(this.state.post_content)
  }

  addGroupToggle = () => {
    this.setState({ add_group_toggle: !this.state.add_group_toggle })
  }
  addGroupToggleForm = () => {
    console.log('addGroupToggleForm called')
    this.addGroupToggle()
  }

  render() {
    const { open_compose_textTab, add_group_toggle, preview_files } = this.state
    var class_modal_status = ''
    console.log(preview_files)
    if (this.props.bOpen) {
      class_modal_status = 'modal--show'
    }

    var accept = ''

    if (this.props.fileType == 'photo') {
      accept = 'image/*'
    } else {
      accept = 'video/*'
    }

    var filepath = 'https://s3-ap-southeast-2.amazonaws.com/mygame-media/blank-profile-picture-973460_1280.png'
    var instance = this
    return (
      <div className={'modal-container ' + class_modal_status}>
        <div className='modal-wrap'>
          <section className='postCompose__container'>
            <div className='compose__type__section'>
              <div className={`share__thought ${open_compose_textTab ? 'active' : ''}`} onClick={(e) => this.togglePostTypeTab('text')}>
                {`Share your thoughts ...`}
              </div>
              <div className={`add__post__image ${open_compose_textTab ? '' : 'active'}`} onClick={(e) => this.togglePostTypeTab('media')}>
                {` Add video or photos`}
              </div>
            </div>
            {open_compose_textTab && (
              <div className='text__editor__section'>
                <textarea
                  onChange={this.handleChange}
                  onKeyDown={this.detectKey}
                  maxLength='254'
                  name='post_content'
                  value={this.state.post_content}
                  placeholder='What in your mind?'
                />
              </div>
            )}
            {!open_compose_textTab && (
              <div className='media__container'>
                <Dropzone onDrop={(acceptedFiles) => this.handleAcceptedFiles(acceptedFiles)}>
                  {(props) => {
                    return (
                      <section className='custom__html'>
                        <div className='images'>
                          <span className=' button photo-btn'>
                            <img src={`${buckectBaseUrl}Dashboard/BTN_Attach_Image.svg`} />
                          </span>
                          <span className='button video-btn'>
                            <img src={`${buckectBaseUrl}Dashboard/BTN_Attach_Video.svg`} />
                          </span>
                          <span className='button video-btn'>
                            <img src={`${buckectBaseUrl}Dashboard/BTN_Attach_Audio.svg`} />
                          </span>
                        </div>
                        <div className='text'>
                          Or <span>click here </span> to select
                        </div>
                        {preview_files.length > 0 && (
                          <div className='files__preview'>
                            {preview_files.map((url) => (
                              <img src={url} />
                            ))}
                          </div>
                        )}
                      </section>
                    )
                  }}
                </Dropzone>
              </div>
            )}
            <div className='compose__people__section'>
              <div className='label'>Post on: </div>
              <div className='people_selected_container'>
                <div className='people_selected_list'>
                  <div className='default_circle'></div>
                  <div className='people_label'>Your Feed</div>
                </div>
              </div>
              <div className='add_more_people'>
                <button type='button' className='add__people' onClick={this.addGroupToggle}>
                  Add
                </button>
              </div>
            </div>
            <div className='compose__button'>
              <button type='button' className='cancel' onClick={this.closeModal}>
                Cancel
              </button>
              <button type='button' className='add__post' onClick={this.submitForm}>
                Post
              </button>
            </div>
            {/* <div className={'modal-container ' + class_modal_status}>
        <div className='modal-wrap'>
          <div className='modal-header'>{this.props.fileType == 'photo' ? 'Upload Photos' : 'Upload Videos'}</div>
          <div className='modal-close-btn' onClick={() => this.closeModal()}>
            <i className='fas fa-times'></i>
          </div>
          <div className='modal-content'>
            <textarea
              name='post_content'
              rows={8}
              cols={80}
              onChange={this.handleChange}
              maxLength='254'
              value={this.state.post_content}
              placeholder="What's up..."
            />
            <Dropzone
              getUploadParams={this.getUploadParams}
              onChangeStatus={this.handleChangeStatus}
              onSubmit={this.handleSubmit}
              accept={accept}
              inputContent={(files, extra) => (extra.reject ? 'Image or video files only' : 'Drag Files or Click to Browse')}
              styles={{
                dropzone: { minHeight: 200, maxHeight: 250 },
                dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
                inputLabel: (files, extra) => (extra.reject ? { color: 'red' } : {}),
              }}
              maxFiles={4}
              maxSizeBytes={26214400}
              submitButtonContent={this.state.submitButtonContent}
            />
          </div>*/}
          </section>
          {add_group_toggle && (
            <div className='people_group_list'>
              <div className='search__box'>
                <label for='searchInput'>Search</label>
                <input type='text' id='searchInput' value='' placeholder='' />
              </div>
              <div className='people_group_list_box'></div>
              <div className='people_group_actions'>
                <div className='post__privacy_select'>
                  <div>
                    <input type='checkbox' id='Everyone' /> <label for='Everyone'>Everyone</label>
                  </div>
                  <div>
                    <input type='checkbox' id='Friends' /> <label for='Friends'>Friends</label>
                  </div>
                  <div>
                    <input type='checkbox' id='Followers' /> <label for='Followers'>Followers</label>
                  </div>
                  <div>
                    <input type='checkbox' id='Private' /> <label for='Private'>Private</label>
                  </div>
                </div>
                <div className='actions'>
                  <button type='button' className='cancel' onClick={this.addGroupToggle}>
                    Cancel
                  </button>
                  <button type='button' className='add__post' onClick={this.addGroupToggleForm}>
                    Post
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className='modal-overlay' onClick={this.closeModal}></div>
      </div>
    )
  }
}
