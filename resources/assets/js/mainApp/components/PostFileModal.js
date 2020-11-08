/*
 * Author : nitin Tyagi
 * github  : https://github.com/realinit
 * Email : nitin.1992tyagi@gmail.com
 */
import React, { Component } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Toast_style } from './Utility_Function'
import { logToElasticsearch } from '../../integration/http/logger'

export default class PostFileModal extends Component {
  constructor(props) {
    super(props)
    this.timeout = 0
    this.state = {
      post_content: '',
      store_files: [],
      lock: false,
      uploading: false,
      submitButtonContent: 'Submit',
      open_compose_textTab: props.open_compose_textTab,
      add_group_toggle: false,
      selected_group: [],
      selected_group_data: [],
      groups_im_in: [],
      visibility: 1,
      gid_request: {},
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
        logToElasticsearch('error', 'PostFileModal', 'Failed componentDidMount:' + ' ' + error)
      }
    }

    const getGroups_im_in = async () => {
      try {
        const getGroups_im_in = await axios.get('/api/usergroup/view/1')
        this.setState({
          groups_im_in: getGroups_im_in.data.groups_im_in,
        })
      } catch (error) {
        logToElasticsearch('error', 'PostFileModal', 'Failed getGroups_im_in:' + ' ' + error)
      }
    }
    const { selected_group = [], selected_group_data = [], visibility } = this.props

    getGroups_im_in()
    getmyGroups()
    this.setState({
      selected_group,
      selected_group_data,
      visibility,
    })
  }

  togglePostTypeTab = (label) => {
    let open_compose_textTab = true
    if (label == 'media') {
      open_compose_textTab = false
    }
    this.setState({ open_compose_textTab })
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
    const { selected_group = [], selected_group_data = [], visibility } = this.state
    this.props.callbackConfirm({
      selected_group: selected_group,
      selected_group_data: selected_group_data,
      visibility: visibility,
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

  getMergedGroupData = (groups_im_in, groups_im_not_in) => {
    groups_im_not_in.map((gd) => {
      gd['im_not_in'] = true
      groups_im_in.push(gd)
    })

    return groups_im_in.length > 0 ? groups_im_in.sort((a, b) => ('' + a.name).localeCompare(b.name)) : []
  }

  getSearchGroup = (e) => {
    const self = this

    const searchText = e.target.value
    this.setState({ searchText })

    if (this.timeout) clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      getSearchInfo()
    }, 300)

    const getSearchInfo = async function() {
      try {
        if (searchText != '') {
          const gd = await axios.get(`/api/groups/${searchText}/groupSearchResults_Post`)
          let groups_im_in = gd.data.myGroupSearchResults
          const groups_im_not_in = gd.data.groupSearchResults_im_not_in
          if (groups_im_not_in.length > 0) {
            groups_im_in = self.getMergedGroupData(groups_im_in, groups_im_not_in)
          }
          self.setState({ groups_im_in })
        } else {
          const getGroups_im_in = await axios.get('/api/usergroup/view/1')
          self.setState({
            groups_im_in: getGroups_im_in.data.groups_im_in,
          })
        }
      } catch (error) {
        logToElasticsearch('error', 'PostFileModal', 'Failed getSearchInfo:' + ' ' + error)
      }
    }
  }

  handleGroupCheck = (e, { id, name, group_img }) => {
    let selected_group = [...this.state.selected_group]
    let selected_group_data = [...this.state.selected_group_data]
    const value = event.target.checked
    if (value) {
      selected_group.push(id)
      selected_group_data.push({
        name,
        id,
        group_img,
      })
    } else {
      selected_group = selected_group.filter((gid) => gid != id)
      selected_group_data = selected_group_data.filter((gid) => gid.id != id)
    }
    this.setState({ selected_group, selected_group_data })
  }

  joinMe = async (gid) => {
    try {
      const { gid_request = {} } = this.state
      const sendInvite = await axios.post('/api/usergroup/create', {
        group_id: gid,
      })
      if (sendInvite.data) {
        gid_request[gid] = true
        this.setState({ gid_request })
      }
    } catch (error) {
      logToElasticsearch('error', 'PostFileModal', 'Failed joinMe:' + ' ' + error)
    }
  }

  addDefaultSrc(ev) {
    ev.target.src = 'https://mygame-media.s3.amazonaws.com/default_user/new-user-profile-picture.png'
  }

  render() {
    const { groups_im_in, selected_group, searchText = '', gid_request } = this.state
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
                <h1>Add communities feed</h1>
                <div style={{ display: 'flex' }}>
                  <label htmlFor='searchInput'>Search</label>
                  <input type='text' id='searchInput' onChange={this.getSearchGroup} value={searchText} placeholder='Search here ...' />
                </div>
              </div>
              <div className='people_group_list_box'>
                {groups_im_in &&
                  groups_im_in.length > 0 &&
                  groups_im_in.map((group_in, index) => {
                    return (
                      <div className='list__item' key={`${group_in.name}_${group_in.id}_${index}`}>
                        <div className='default_circle'>
                          <img onError={this.addDefaultSrc} src={group_in.group_img} className='groupImage' />
                        </div>
                        <div className='groupName'>{group_in.name}</div>
                        <div className='action'>
                          {group_in.im_not_in ? (
                            gid_request[group_in.id] ? (
                              <div className='group_request-sent'>Sent</div>
                            ) : (
                              <div className='group_join' onClick={(e) => this.joinMe(group_in.id)}>
                                JOIN ME
                              </div>
                            )
                          ) : (
                            <label className='container'>
                              <input
                                type='checkbox'
                                checked={selected_group.includes(group_in.id)}
                                onChange={(e) => this.handleGroupCheck(e, group_in)}
                                value={1}
                              />
                              <span className='checkmark'></span>
                            </label>
                          )}
                        </div>
                      </div>
                    )
                  })}
              </div>
              <div className='people_group_actions'>
                <h1>Who can see this post</h1>
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
                  <button type='button' className='cancel' onClick={this.closeModal}></button>
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
