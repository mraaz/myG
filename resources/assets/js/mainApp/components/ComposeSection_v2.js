/*
 * Author : nitin Tyagi
 * github  : https://github.com/realinit
 * Email : nitin.1992tyagi@gmail.com
 */
import React, { Component, Fragment } from 'react'
import axios from 'axios'
import IndividualPost from './IndividualPost'
import PostFileModal from './PostFileModal'
import Dropzone from 'react-dropzone'
const buckectBaseUrl = 'https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/'
import { MyGCreateableSelect } from './common'
import { Disable_keys, Hash_Tags } from './Utility_Function'

import { toast } from 'react-toastify'
import { Toast_style } from './Utility_Function'
import ImageGallery from './common/ImageGallery/ImageGallery.js'
// import ImageGallery from 'react-image-gallery'

const MAX_HASH_TAGS = 21

const createOption = (label, hash_tag_id) => ({
  label,
  value: label,
  hash_tag_id,
})

export default class ComposeSection extends Component {
  constructor() {
    super()
    this.state = {
      show_post: false,
      profile_img: '',
      post_content: '',
      bFileModalOpen: false,
      fileType: 'photo',
      myPosts: [],
      masterList: [],
      open_compose_textTab: true,
      add_group_toggle: false,
      selected_group: [],
      selected_group_data: [],
      selectedGroup: [],
      groups_im_in: [],
      preview_files: [],
      visibility: 1,
      overlay_active: false,
      group_id: [],
      options_tags: '',
      value_tags: [],
      isShowAllGroup: false,
    }

    this.openPhotoPost = this.openPhotoPost.bind(this)

    this.openVideoPost = this.openVideoPost.bind(this)
    this.callbackPostFileModalClose = this.callbackPostFileModalClose.bind(this)
    this.callbackPostFileModalConfirm = this.callbackPostFileModalConfirm.bind(this)
    this.doUploadS3 = this.doUploadS3.bind(this)
    this.imageFileType = ['jpeg', 'jpg', 'png', 'gif']
    this.videoFileType = ['mov', 'webm', 'mpg', 'mp4', 'avi', 'ogg']
  }

  callbackPostFileModalClose() {
    this.setState({
      bFileModalOpen: false,
    })
  }

  callbackPostFileModalConfirm = async (data, keys) => {
    const callbackData = { ...data }
    try {
      this.setState({
        bFileModalOpen: false,
        group_id: callbackData.selected_group,
        selected_group_data: callbackData.selected_group_data,
        visibility: callbackData.visibility,
      })
    } catch (error) {
      console.log(error)
    }
  }

  openPhotoPost() {
    this.setState({
      bFileModalOpen: true,
      fileType: 'photo',
    })
  }

  openVideoPost() {
    this.setState({
      bFileModalOpen: true,
      fileType: 'video',
    })
  }
  openAudioPost() {
    this.setState({
      bFileModalOpen: true,
      fileType: 'audio',
    })
  }
  handleClear = () => {
    this.setState({
      post_content: '',
      preview_files: [],
      keys: [],
      overlay_active: false,
      open_compose_textTab: true,
      selected_group_data: [],
      group_id: [],
      value_tags: [],
      visibility: 1,
    })
  }

  submitForm = async () => {
    const content = this.state.post_content.trim()

    let media_url = []
    let keys = []

    if (this.state.preview_files.length > 0) {
      for (let i = 0; i < this.state.preview_files.length; i++) {
        media_url.push(this.state.preview_files[i].src)
        keys.push(this.state.preview_files[i].key)
      }
    }
    let hash_tags = []
    if (this.state.value_tags.length != 0 && this.state.value_tags != null) {
      if (this.state.value_tags.length >= MAX_HASH_TAGS) {
        toast.success(<Toast_style text={"Crikey, mate! That's alot of tags. I'll only grab 20 and dump the rest."} />)
      }
      for (let i = 0; i < MAX_HASH_TAGS && i < this.state.value_tags.length; i++) {
        if (/['/.%#$,;`\\]/.test(this.state.value_tags[i].value)) {
          toast.success(<Toast_style text={'Sorry mate! Hash tags can not have invalid characters'} />)
          return
        }
        // if (this.state.value_tags[i].hash_tag_id == null) {
        //   const new_HashTags = await axios.post('/api/HashTags', {
        //     content: this.state.value_tags[i].value,
        //   })
        //   hash_tags.push(new_HashTags.data)
        // } else {
        //   hash_tags.push(this.state.value_tags[i].hash_tag_id)
        // }
        delete this.state.value_tags[i].label
      }
      hash_tags = JSON.stringify(this.state.value_tags)
    }

    try {
      const post = await axios.post('/api/post', {
        content: content,
        user_id: this.props.initialData.userInfo.id,
        type: 'text',
        visibility: this.state.visibility,
        group_id: this.state.group_id.toString(),
        media_url: media_url.length > 0 ? JSON.stringify(media_url) : '',
        file_keys: keys.length > 0 ? keys : '',
        hash_tags: hash_tags,
      })
      this.setState(
        {
          bFileModalOpen: false,
          post_content: '',
          media_url: [],
          preview_files: [],
          keys: [],
          visibility: 1,
          overlay_active: false,
          value_tags: [],
          selected_group_data: [],
          selected_group: [],
          group_id: [],
          open_compose_textTab: true,
        },
        () => {
          media_url = []
          keys = []
          this.props.successCallback(post)
        }
      )
      // await this.get_posts(post)
    } catch (error) {
      console.log(error)
    }
  }

  handleChange = (event) => {
    const name = event.target.name
    const value = event.target.type == 'checkbox' ? event.target.checked : event.target.value
    this.setState({
      [name]: value,
    })
  }

  handleChange_txtArea = (event) => {
    const value = event.target.value
    this.setState({ post_content: value })
  }
  handleFocus_txtArea = () => {
    this.setState({ overlay_active: true })
  }
  handleOverlayClick = () => {
    this.setState({ overlay_active: !this.state.overlay_active })
  }

  showLatestPosts = () => {
    if (this.state.myPosts != []) {
      return this.state.myPosts.map((item, index) => {
        return <IndividualPost post={item} key={item.id} user={this.props.initialData} />
      })
    }
  }

  get_posts = (post) => {
    const self = this

    const getPosts = async function () {
      try {
        const myPosts = await axios.get(`/api/mypost/${post.data}`)
        self.state.masterList = self.state.masterList.concat(myPosts.data.myPosts)

        self.setState({
          myPosts: self.state.masterList.reverse(),
          show_post: true,
          post_content: '',
        })
      } catch (error) {
        console.log(error)
      }
    }
    getPosts()
  }

  detectKey = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.stopPropagation()
      this.submitForm()
      return false
    }

    if (e.key === 'Enter' && e.shiftKey) {
      return
    }

    if (e.key === 'Escape') {
      this.setState({
        edit_post: false,
        value2: '',
      })
    }
  }

  componentDidMount() {
    const self = this

    if (this.props != undefined) {
      if (this.props.initialData.userInfo != undefined) {
        this.setState({
          profile_img: this.props.initialData.userInfo.profile_img,
          alias: this.props.initialData.userInfo.alias,
        })
      }
    }

    const getGamers_you_might_know = async function () {
      try {
        const gamers_you_might_know = await axios.get('/api/user/gamers_you_might_know')

        //Pigybacking on here so we don't have to create a new method
        let results = await Hash_Tags()
        self.setState({ options_tags: results })
      } catch (error) {
        console.log(error)
      }
    }
    getGamers_you_might_know()
  }

  togglePostTypeTab = (label) => {
    let open_compose_textTab = true
    if (label == 'media') {
      open_compose_textTab = false
    }
    if (label == 'text') {
      setTimeout(function () {
        document.getElementById('composeTextarea').focus()
      }, 0)
    }
    this.setState({ open_compose_textTab, overlay_active: true })
  }

  handleAcceptedFiles = (Files, rejectedFiles) => {
    const { preview_files = [] } = this.state
    const len = preview_files.length + Files.length
    if (rejectedFiles.length > 0) {
      toast.error(
        <Toast_style text={`Sorry mate! ${rejectedFiles.length} File(s) rejected because of bad format or file size limit exceed (10mb)`} />
      )
    }
    if (len > 8) {
      toast.success(<Toast_style text={`Sorry mate! Can't upload more than eight at a time.`} />)
    } else {
      for (var i = 0; i < Files.length; i++) {
        let type = Files[i].type.split('/')
        let name = `post_${type[0]}_${+new Date()}_${Files[i].name}`
        this.doUploadS3(Files[i], name, name)
      }
    }
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
        uploading: false,
      })
    } catch (error) {
      instance.setState({
        uploading: false,
      })
      toast.success(<Toast_style text={'Opps, something went wrong. Unable to upload your file. Close this window and try again'} />)
    }
  }

  addGroupToggle = () => {
    this.setState({ bFileModalOpen: !this.state.bFileModalOpen })
  }

  handleCreateHashTags = (inputValue) => {
    if (inputValue.length > 88) {
      toast.success(<Toast_style text={'Sorry mate! Tag length is tooo long.'} />)
      return
    }
    const { options_tags, value_tags, newValueCreated_tags } = this.state
    const newOption = createOption(inputValue, null)
    this.setState({ options_tags: [...options_tags, newOption] })
    this.setState({ value_tags: [...value_tags, newOption] })
  }

  getOptions_tags = (inputValue) => {
    const self = this

    const getInitialData = async function (inputValue) {
      try {
        var results = await Hash_Tags(inputValue)
        self.setState({ options_tags: results })
      } catch (error) {
        console.log(error)
      }
    }
    getInitialData(inputValue)
  }

  handleChange_Hash_tags = (value_tags) => {
    this.setState({ value_tags })
  }

  handlePreviewRemove = (e, src) => {
    e.preventDefault()
    let preview_files = [...this.state.preview_files]
    preview_files = preview_files.filter((data) => data.src != src)
    this.setState({ preview_files })
  }

  getPreviewImageGallery = (preview_filesData) => {
    return preview_filesData.map((data) => {
      return { original: data.src, thumbnail: data.src }
    })
  }

  toggleShowAllGroup = () => {
    this.setState({ isShowAllGroup: !this.state.isShowAllGroup })
  }

  render() {
    const {
      open_compose_textTab,
      bFileModalOpen,
      preview_files = [],
      selected_group_data,
      group_id,
      overlay_active,
      post_content = '',
      isShowAllGroup = false,
      visibility,
    } = this.state
    const isButtonDisable = post_content != '' || preview_files.length > 0 ? true : false
    const groups = [...selected_group_data]
    const AllGroups = [...selected_group_data]
    const preview_filesData = [...preview_files]
    const previewImageGallery = this.getPreviewImageGallery(preview_filesData)

    return (
      <Fragment>
        <section className={`postCompose__container ${overlay_active ? 'zI1000' : ''}`}>
          <div className='compose__type__section'>
            <div className={`share__thought ${open_compose_textTab ? 'active' : ''}`} onClick={(e) => this.togglePostTypeTab('text')}>
              {`Share your thoughts ...`}
            </div>
            <div className='devider'></div>
            <div className={`add__post__image ${open_compose_textTab ? '' : 'active'}`} onClick={(e) => this.togglePostTypeTab('media')}>
              {` Add video or photos`}
            </div>
          </div>
          {open_compose_textTab && (
            <div className='text__editor__section'>
              <div className='media'>
                {preview_filesData.length > 0 && (
                  <ImageGallery items={preview_filesData} showFullscreenButton={false} showGalleryFullscreenButton={false} />
                )}
              </div>
              <textarea
                onChange={this.handleChange_txtArea}
                onFocus={this.handleFocus_txtArea}
                onKeyDown={this.detectKey}
                maxLength='2048'
                value={post_content}
                placeholder="What's up... "
                id={`composeTextarea`}
              />
            </div>
          )}
          {!open_compose_textTab && (
            <div className='media__container'>
              <Dropzone
                onDrop={(acceptedFiles, rejectedFiles) => this.handleAcceptedFiles(acceptedFiles, rejectedFiles)}
                accept='image/jpeg,image/jpg,image/png,image/gif,video/mp4,video/webm,video/ogg'
                minSize={0}
                maxSize={52428800}
                multiple
                disabled={this.state.uploading}>
                {(props) => {
                  return (
                    <section className='custom__html'>
                      <div className='text'>Drop your image or video</div>
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
                      {preview_filesData.length > 0 && (
                        <div className='files__preview'>
                          {preview_filesData.slice(0, 3).map((file) => {
                            const splitUrl = file.src.split('.')
                            let fileType = splitUrl[splitUrl.length - 1]
                            if (file.src.includes('video') || this.videoFileType.includes(fileType)) {
                              return (
                                <span className='image' key={file.src}>
                                  <video className='post-video' controls>
                                    <source src={file.src}></source>
                                  </video>
                                  <span className='remove__image' onClick={(e) => this.handlePreviewRemove(e, file.src)}>
                                    X
                                  </span>
                                </span>
                              )
                            }
                            return (
                              <span className='image' key={file.src}>
                                <img src={file.src} key={file.src} />
                                <span className='remove__image' onClick={(e) => this.handlePreviewRemove(e, file.src)}>
                                  X
                                </span>
                              </span>
                            )
                          })}
                          {preview_filesData.length > 3 ? `(${preview_filesData.length})...` : ''}
                        </div>
                      )}
                    </section>
                  )
                }}
              </Dropzone>
              {/* <div className=' button photo-btn' onClick={() => this.openPhotoPost()}>
              <i className='far fa-images' />
            </div>
            <div className='button video-btn' onClick={() => this.openVideoPost()}>
              <i className='far fa-play-circle' />
            </div>
            <div className='button video-btn' onClick={() => this.openAudioPost()}>
              <i className='far fa-volume-up' />
            </div> */}
            </div>
          )}
          {open_compose_textTab && (
            <div className='hashTag_section'>
              <div className='hashtag_label'>Add Hashtags</div>
              <div className='hashtag_input'>
                <MyGCreateableSelect
                  isClearable
                  isMulti
                  onKeyDown={Disable_keys}
                  onCreateOption={this.handleCreateHashTags}
                  options={this.state.options_tags}
                  value={this.state.value_tags}
                  onChange={this.handleChange_Hash_tags}
                  onInputChange={this.getOptions_tags}
                  className='hash_tag_name_box'
                  placeholder='Search, Select or create Hash Tags'
                />
              </div>
            </div>
          )}
          {open_compose_textTab && (
            <div className='compose__people__section'>
              <div className='label'>Post on: </div>
              <div className='people_selected_container'>
                <div className='people_selected_list'>
                  <div
                    className='default_circle'
                    style={{
                      backgroundImage: `url('${this.state.profile_img}')`,
                      backgroundSize: 'cover',
                    }}></div>
                  <div className='people_label'>Your Feed</div>
                </div>
                {groups.splice(0, 3).map((g) => {
                  return (
                    <div className='people_selected_list'>
                      <div
                        className='default_circle'
                        style={{
                          backgroundImage: `url('${g.group_img}')`,
                          backgroundSize: 'cover',
                        }}></div>
                      <div className='people_label'>{g.name}</div>
                    </div>
                  )
                })}
                {AllGroups.length > 3 && (
                  <div className='all__selected_groups people_selected_list'>
                    <span className='more__groups' onClick={this.toggleShowAllGroup}>
                      ...
                    </span>

                    {isShowAllGroup && (
                      <div className='group__details'>
                        {AllGroups.splice(3, AllGroups.length).map((group) => {
                          return <div className='people_label'>{group.name}</div>
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className='post_for'>
                {visibility == 1 && '( Everyone )'}
                {visibility == 2 && '( Friends )'}
                {visibility == 3 && '( Followers )'}
                {visibility == 0 && '( Private )'}
              </div>
              <div className='add_more_people'>
                <button type='button' className='add__people' onClick={this.addGroupToggle}>
                  +
                </button>
              </div>
            </div>
          )}
          <div className='compose__button'>
            {overlay_active && <button type='button' className='cancel' onClick={this.handleClear}></button>}
            <button type='button' disabled={!isButtonDisable} className='add__post' onClick={this.submitForm}>
              Post
            </button>
          </div>

          {bFileModalOpen && (
            <PostFileModal
              bOpen={bFileModalOpen}
              callbackClose={this.callbackPostFileModalClose}
              callbackConfirm={this.callbackPostFileModalConfirm}
              callbackContentConfirm={this.submitForm}
              open_compose_textTab={open_compose_textTab}
              selected_group_data={selected_group_data}
              selected_group={group_id}
              visibility={this.state.visibility}
            />
          )}
        </section>
        <div className={`highlight_overlay ${overlay_active ? 'active' : ''}`} onClick={this.handleOverlayClick}></div>
      </Fragment>
    )
  }
}

const app = document.getElementById('app')
