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
      visibility: 1,
    }

    this.closeModal = this.closeModal.bind(this)
  }

  componentDidMount() {
    const getmyGroups = async () => {
      try {
        const getmyGroups = await axios.get('/api/groups/view/1')
        this.setState({
          myGroups: getmyGroups.data.myGroups,
        })
      } catch (error) {
        console.log(error)
      }
    }

    const getGroups_im_in = async () => {
      try {
        const getGroups_im_in = await axios.get('/api/usergroup/view/1')
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

  closeModal(outsideClick = false) {
    if (outsideClick && !this.state.uploading) {
      this.setState({
        post_content: '',
      })
      this.props.callbackClose()
      return
    }
    this.props.callbackClose()
  }

  handleSubmit = () => {
    this.props.callbackConfirm({
      selected_group: this.state.selected_group,
      visibility: this.state.visibility,
    })

    this.setState({
      preview_files: [],
    })
  }

  handleVisibityChange = (event, value) => {
    this.setState({
      visibility: value,
    })
  }

  handleAcceptedFiles = (Files) => {
    if (Files.length > 8) {
      toast.success(<Toast_style text={`Sorry! Can't upload more than Eight at a time.`} />)
    } else {
      for (var i = 0; i < Files.length; i++) {
        let name = `post_image_${+new Date()}`
        this.doUploadS3(Files[i], name, name)
      }
    }
  }

  getSearchGroup = async (e) => {
    const searchText = e.target.value
    const groups = [...this.state.groups_im_in]
    if (searchText != '') {
      ///api/groups/${value}/groupSearchResults_Post
      const groups_im_in = groups.filter((g) => g.name.includes(searchText))
      this.setState({ groups_im_in, searchText })
    } else {
      const getGroups_im_in = await axios.get('/api/usergroup/view/1')
      this.setState({
        groups_im_in: getGroups_im_in.data.groups_im_in,
        searchText,
      })
    }
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
    const { groups_im_in, selected_group, selectedGroup, searchText = '' } = this.state
    var class_modal_status = ''
    if (this.props.bOpen) {
      class_modal_status = 'modal--show'
    }
    return (
      <div className={'modal-container ' + class_modal_status}>
        <div className='modal-wrap'>
          <section className='postCompose__container'>
            <div className={`people_group_list  active`}>
              <div className='search__box'>
                <label htmlFor='searchInput'>Search</label>
                <input type='text' id='searchInput' onChange={this.getSearchGroup} value={searchText} placeholder='Search here ...' />
              </div>
              <div className='people_group_list_box'>
                {groups_im_in &&
                  groups_im_in.length > 0 &&
                  groups_im_in.map((group_in, index) => {
                    return (
                      <div className='list__item' key={`${group_in.name}_${group_in.id}_${index}`}>
                        <div className='default_circle'>
                          <img src={group_in.group_img} className='groupImage' />
                        </div>
                        <div className='groupName'>{group_in.name}</div>
                        <div className='action'>
                          <label className='container'>
                            <input
                              type='checkbox'
                              checked={selected_group.includes(group_in.id)}
                              onChange={(e) => this.handleGroupCheck(e, group_in.id)}
                              value={1}
                            />
                            <span className='checkmark'></span>
                          </label>
                        </div>
                      </div>
                    )
                  })}
              </div>
              <div className='people_group_actions'>
                <div className='post__privacy_select'>
                  <div>
                    <label className='container'>
                      Everyone
                      <input
                        type='checkbox'
                        name='everyone'
                        checked={this.state.visibility == 1}
                        onChange={(e) => this.handleVisibityChange(e, 1)}
                        value={1}
                      />
                      <span className='checkmark'></span>
                    </label>
                  </div>
                  <div>
                    <label className='container'>
                      Friends
                      <input
                        type='checkbox'
                        name='friend'
                        checked={this.state.visibility == 2}
                        onChange={(e) => this.handleVisibityChange(e, 2)}
                        value={2}
                      />
                      <span className='checkmark'></span>
                    </label>
                  </div>
                  <div>
                    <label className='container'>
                      Followers
                      <input
                        type='checkbox'
                        name='followers'
                        checked={this.state.visibility == 3}
                        onChange={(e) => this.handleVisibityChange(e, 3)}
                        value={3}
                      />
                      <span className='checkmark'></span>
                    </label>
                  </div>
                  <div>
                    <label className='container'>
                      Private
                      <input
                        type='checkbox'
                        name='onlyme'
                        checked={this.state.visibility == 0}
                        onChange={(e) => this.handleVisibityChange(e, 0)}
                        value={0}
                      />
                      <span className='checkmark'></span>
                    </label>
                  </div>
                </div>
                <div className='actions'>
                  <button type='button' className='cancel' onClick={this.closeModal}>
                    Cancel
                  </button>
                  <button type='button' className='add__post' onClick={this.handleSubmit}>
                    Add
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className='modal-overlay' onClick={(e) => this.closeModal(true)}></div>
      </div>
    )
  }
}
