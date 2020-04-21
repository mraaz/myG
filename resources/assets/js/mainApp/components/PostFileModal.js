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
      selected_group: [],
      selectedGroup: [],
      groups_im_in: [],
    }

    this.closeModal = this.closeModal.bind(this)
    this.doUploadS3 = this.doUploadS3.bind(this)
  }

  componentDidMount() {
    const getmyGroups = async () => {
      try {
        const getmyGroups = await axios.get('/api/groups/view')
        this.setState({
          myGroups: getmyGroups.data.myGroups,
        })
      } catch (error) {
        console.log(error)
      }
    }

    const getGroups_im_in = async () => {
      try {
        const getGroups_im_in = await axios.get('/api/usergroup/view')
        this.setState({
          groups_im_in: getGroups_im_in.data.groups_im_in,
        })
      } catch (error) {
        console.log(error)
      }
    }

    getGroups_im_in()
    getmyGroups()
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

  async doUploadS3(file, id = '', name) {
    var instance = this

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

  handleSubmit = () => {
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
        selected_group: this.state.selected_group,
      },
      keys
    )

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
  handleVisibityChange = (event) => {
    const name = event.target.name
    const value = event.target.type == 'checkbox' ? event.target.checked : event.target.value
    if (name == 'everyone') {
      this.setState({
        [name]: value,
        onlyme: false,
        followers: false,
        friend: false,
      })
    } else {
      this.setState({
        [name]: value,
        everyone: false,
      })
    }
  }

  handleAcceptedFiles = (Files) => {
    for (var i = 0; i < Files.length; i++) {
      let name = `post_image_${+new Date()}`
      this.doUploadS3(Files[i], name, name)
    }
  }

  submitForm = () => {
    if (this.state.preview_files.length > 0) {
      this.handleSubmit()
    } else {
      this.props.callbackContentConfirm(this.state.post_content, this.state.selectedGroup)
    }
  }

  addGroupToggle = () => {
    this.setState({ add_group_toggle: !this.state.add_group_toggle })
  }
  cancelGroupToggle = () => {
    this.setState({ selected_group: [] })
  }
  addGroupToggleForm = () => {
    const { selected_group, groups_im_in } = this.state

    const selectedGroup = groups_im_in.filter((g) => selected_group.includes(g.id))
    this.setState({ selectedGroup })
    this.addGroupToggle()
  }

  handleGroupCheck = (e, id) => {
    let selected_group = [...this.state.selected_group]
    const value = event.target.checked
    if (value) {
      selected_group.push(id)
    } else {
      selected_group = selected_group.filter((gid) => gid != id)
    }
    this.setState({ selected_group })
  }

  render() {
    const {
      open_compose_textTab,
      add_group_toggle,
      preview_files,
      onlyme,
      followers,
      friend,
      everyone,
      groups_im_in,
      selected_group,
      selectedGroup,
    } = this.state
    var class_modal_status = ''
    if (this.props.bOpen) {
      class_modal_status = 'modal--show'
    }
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
                <Dropzone
                  onDrop={(acceptedFiles) => this.handleAcceptedFiles(acceptedFiles)}
                  accept='image/*,video/*'
                  minSize={0}
                  maxSize={5242880}
                  multiple
                  disabled={this.state.uploading}>
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
                          {/* <span className='button video-btn'>
                            <img src={`${buckectBaseUrl}Dashboard/BTN_Attach_Audio.svg`} />
                          </span> */}
                        </div>
                        <div className='text'>
                          Or <span>click here </span> to select
                        </div>
                        {this.state.uploading && (
                          <div className='text'>
                            <span>Uploading... </span>
                          </div>
                        )}
                        {preview_files.length > 0 && (
                          <div className='files__preview'>
                            {preview_files.slice(0, 3).map((file) => (
                              <img src={file.src} />
                            ))}
                            {preview_files.length > 3 ? `(${preview_files.length})...` : ''}
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
                {selectedGroup.splice(0, 3).map((g) => {
                  return (
                    <div className='people_selected_list'>
                      <div className='default_circle'></div>
                      <div className='people_label'>{g.name}</div>
                    </div>
                  )
                })}
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
              <button type='button' className='add__post' disabled={this.state.uploading} onClick={this.submitForm}>
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

            {add_group_toggle && (
              <div className='people_group_list'>
                <div className='search__box'>
                  <label for='searchInput'>Search</label>
                  <input type='text' id='searchInput' value='' placeholder='' />
                </div>
                <div className='people_group_list_box'>
                  {groups_im_in.length > 0 &&
                    groups_im_in.map((group_in, index) => {
                      return (
                        <div className='list__item' key={`${group_in.name}_${group_in.id}_${index}`}>
                          <div className='default_circle'>
                            <img src={group_in.group_img} className='groupImage' />
                          </div>
                          <div className='groupName'>{group_in.name}</div>
                          <div className='action'>
                            <input
                              type='checkbox'
                              checked={selected_group.includes(group_in.id)}
                              onChange={(e) => this.handleGroupCheck(e, group_in.id)}
                              value={1}
                            />
                          </div>
                        </div>
                      )
                    })}
                </div>
                <div className='people_group_actions'>
                  <div className='post__privacy_select'>
                    <div>
                      <input
                        type='checkbox'
                        name='everyone'
                        checked={everyone}
                        onChange={this.handleVisibityChange}
                        id='Everyone'
                        value={1}
                      />{' '}
                      <label for='Everyone'>Everyone</label>
                    </div>
                    <div>
                      <input type='checkbox' name='friend' checked={friend} onChange={this.handleVisibityChange} id='Friends' value={2} />{' '}
                      <label for='Friends'>Friends</label>
                    </div>
                    <div>
                      <input
                        type='checkbox'
                        name='followers'
                        checked={followers}
                        onChange={this.handleVisibityChange}
                        id='Followers'
                        value={3}
                      />{' '}
                      <label for='Followers'>Followers</label>
                    </div>
                    <div>
                      <input type='checkbox' name='onlyme' checked={onlyme} onChange={this.handleVisibityChange} id='Private' value={0} />{' '}
                      <label for='Private'>Private</label>
                    </div>
                  </div>
                  <div className='actions'>
                    <button type='button' className='cancel' onClick={this.cancelGroupToggle}>
                      Cancel
                    </button>
                    <button type='button' className='add__post' onClick={this.addGroupToggleForm}>
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
        <div className='modal-overlay' onClick={this.closeModal}></div>
      </div>
    )
  }
}
