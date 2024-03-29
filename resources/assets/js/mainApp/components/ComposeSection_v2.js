import React, { Component, Fragment } from 'react'
import axios from 'axios'
import Dropzone from 'react-dropzone'
import { toast } from 'react-toastify'
import { EditorState } from 'draft-js'

const buckectBaseUrl = 'https://myG.gg/platform_images/'
import { MyGCreateableSelect ,MyGGameSelect} from './common'
import PostFileModal from './PostFileModal'
import { Disable_keys, Hash_Tags,Toast_style,Game_name_values } from './Utility_Function'
import { Upload_to_S3, Remove_file } from './AWS_utilities'

import ImageGallery from './common/ImageGallery/ImageGallery.js'
import { logToElasticsearch } from '../../integration/http/logger'
import { DraftComposer } from './common/Draftjs'
import { prepareDraftsEditorForSave, isEmptyDraftJs, MAX_HASH_TAGS, POST_COMPOSER } from '../../common/draftjs'

const createOption = (label, hash_tag_id) => ({
  label,
  value: label,
  hash_tag_id
})

export default class ComposeSection extends Component {
  constructor() {
    super()
    this.state = {
      show_post: false,
      profile_img: '',
      video: '',
      bFileModalOpen: false,
      fileType: 'photo',
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
      postContent: EditorState.createEmpty(),
      postContentHashtags: [],
      postContentMentions: [],
      game_names_id:'',
      games:[]
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
      bFileModalOpen: false
    })
  }

  callbackPostFileModalConfirm = async (data, keys) => {
    const callbackData = { ...data }
    try {
      this.setState({
        bFileModalOpen: false,
        group_id: callbackData.selected_group,
        selected_group_data: callbackData.selected_group_data,
        visibility: callbackData.visibility
      })
    } catch (error) {
      logToElasticsearch('error', 'ComposeSection_v2', 'Failed callbackPostFileModalConfirm:' + ' ' + error)
    }
  }

  openPhotoPost() {
    this.setState({
      bFileModalOpen: true,
      fileType: 'photo'
    })
  }

  openVideoPost() {
    this.setState({
      bFileModalOpen: true,
      fileType: 'video'
    })
  }
  openAudioPost() {
    this.setState({
      bFileModalOpen: true,
      fileType: 'audio'
    })
  }
  handleClear = () => {
    this.setState({
      postContent: EditorState.createEmpty(),
      preview_files: [],
      keys: [],
      overlay_active: false,
      open_compose_textTab: true,
      selected_group_data: [],
      group_id: [],
      value_tags: [],
      visibility: 1,
      video: '',
      game_names_id:''
    })
  }

  submitForm = async () => {
    //const content = this.state.post_content.trim()
    // const userLang = navigator.language || navigator.userLanguage

    let media_url = []
    let aws_key_id = []

    if (this.state.preview_files.length > 0) {
      for (let i = 0; i < this.state.preview_files.length; i++) {
        media_url.push(this.state.preview_files[i].src)
        aws_key_id.push(this.state.preview_files[i].id)
      }
    }

    let hash_tags = []
    let data = null
    const { content, hashtags, mentions } = prepareDraftsEditorForSave(
      this.state.postContent,
      this.state.postContentHashtags,
      this.state.postContentMentions
    )

    if (hashtags !== null && hashtags.length !== 0) {
      // Verify all tags are valid, if any found early return
      if (hashtags.some((hashtag) => /['/.%#$,;`\\]/.test(hashtag.tag))) {
        toast.success(<Toast_style text={'Sorry mate! Hash tags can not have invalid characters'} />)
        return
      }

      if (hashtags.length >= MAX_HASH_TAGS) {
        toast.success(<Toast_style text={"Crikey, mate! That's alot of tags. I'll only grab 20 and dump the rest."} />)
        hashtags = hashtags.slice(0, 20)
      }
    }

    hash_tags = JSON.stringify(
      hashtags.map((hashtag) => ({
        value: hashtag.tag,
        hash_tag_id: hashtag.id
      }))
    )

    data = {
      content,
      video: this.state.video,
      user_id: this.props.initialData.userInfo.id,
      type: 'text',
      visibility: this.state.visibility,
      group_id: this.props.group_id ? this.props.group_id : this.state.group_id.toString(),
      media_url: media_url.length > 0 ? JSON.stringify(media_url) : '',
      aws_key_id: aws_key_id.length > 0 ? aws_key_id : '',
      hash_tags,
      mentionsList: JSON.stringify(mentions),
      game_names_id: this.state.game_names_id ?this.state.game_names_id.value :''
    }

    try {
      const post = await axios.post('/api/post', data)
      if (post.data == 'video_link_failed') {
        toast.success(<Toast_style text={`Strewth mate! Invalid video link`} />)
        return
      }
      this.setState(
        {
          bFileModalOpen: false,
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
          video: '',
          postContent: EditorState.createEmpty(),
          postContentHashtags: [],
          postContentMentions: []
        },
        () => {
          media_url = []
          aws_key_id = []
          if (post.data != '') this.props.successCallback(post)
        }
      )
    } catch (error) {
      logToElasticsearch('error', 'ComposeSection_v2', 'Failed submitForm:' + ' ' + error)
    }
  }

  handleChange = (event) => {
    const name = event.target.name
    const value = event.target.type == 'checkbox' ? event.target.checked : event.target.value
    this.setState({
      [name]: value
    })
  }

  handleFocus_txtArea = () => {
    this.setState({ overlay_active: true })
  }
  handleOverlayClick = () => {
    this.setState({ overlay_active: !this.state.overlay_active })
  }

  detectKey = (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault()
      e.stopPropagation()
      this.submitForm()
      return false
    }

    if (e.key === 'Escape') {
      this.setState({
        edit_post: false,
        value2: ''
      })
    }
  }

  componentDidMount() {
    const self = this

    if (this.props != undefined) {
      if (this.props.initialData.userInfo != undefined) {
        this.setState({
          profile_img: this.props.initialData.userInfo.profile_img,
          alias: this.props.initialData.userInfo.alias
        })
      }
    }

    const getHash_tags = async function () {
      try {
        //const gamers_you_might_know = await axios.get('/api/user/gamers_you_might_know')

        let results = await Hash_Tags()
        self.setState({ options_tags: results })
      } catch (error) {
        logToElasticsearch('error', 'ComposeSection_v2', 'Failed getGamers_you_might_know:' + ' ' + error)
      }
    }
    const getGames = async function () {
      try {
        //const gamers_you_might_know = await axios.get('/api/user/gamers_you_might_know')

        let results = await Game_name_values()
        // if(results.data && results.data.allmyGameExperiences && results.data.allmyGameExperiences.length > 0 ){
        //   const gameData = results.data.allmyGameExperiences.map(d=>{
        //     return {
        //       ...d,
        //       label:d.game_name,
        //       value:d.game_names_id
        //     }
        //   });
          self.setState({ games: results })
        // }
      } catch (error) {
        logToElasticsearch('error', 'ComposeSection_v2', 'Failed get Games list:' + ' ' + error)
      }
    }
    getHash_tags()
    getGames()
  }

  togglePostTypeTab = (label) => {
    let open_compose_textTab = true
    if (label == 'media') {
      open_compose_textTab = false
    }
    if (label == 'text') {
      setTimeout(function () {
        document.getElementById('draftComposer').focus()
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
        this.doUploadS3(Files[i], name)
      }
    }
  }
  async doUploadS3(file, name) {
    var instance = this

    this.setState({
      uploading: true
    })

    try {
      const post = await Upload_to_S3(file, name, 0, null)

      var new_preview_files = instance.state.preview_files
      new_preview_files.push({
        src: post.data.Location,
        key: post.data.Key,
        id: post.data.aws_key_id
      })
      instance.setState({
        preview_files: new_preview_files,
        uploading: false
      })
    } catch (error) {
      instance.setState({
        uploading: false
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
    let { options_tags, value_tags } = this.state
    if (value_tags == null) value_tags = ''

    const newOption = createOption(inputValue, null)
    this.setState({ options_tags: [...options_tags, newOption] })
    this.setState({ value_tags: [...value_tags, newOption] })
  }

  //https://github.com/JedWatson/react-select/issues/3988 :RAAZ remove once fixed
  getNewOptionData = (inputValue, optionLabel) => ({
    value: inputValue,
    label: optionLabel,
    __isNew__: true,
    isEqual: () => false
  })

  getOptions_tags = (inputValue) => {
    const self = this

    const getInitialData = async function (inputValue) {
      try {
        var results = await Hash_Tags(inputValue)
        self.setState({ options_tags: results })
      } catch (error) {
        logToElasticsearch('error', 'ComposeSection_v2', 'Failed getOptions_tags:' + ' ' + error)
      }
    }
    getInitialData(inputValue)
  }

  handleChange_Hash_tags = (value_tags) => {
    this.setState({ value_tags })
  }
  handleGameChange = (value) => {
    this.setState({ game_names_id:value })
  }

  handlePreviewRemove = (e, src, key, id) => {
    e.preventDefault()

    Remove_file(key, id)

    // const deleteKeys = axios.post('/api/deleteFile', {
    //   aws_key_id: id,
    //   key: key,
    // })

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

  handleCreateGame = (inputValue) => {
    if (inputValue.length > 88) {
      toast.success(<Toast_style text={'Sorry mate! Game Title is too long.'} />)
      return
    }

    let { games } = this.state
    if (games == null) games = ''

    const newOption = this.createGameOption(inputValue, null)
    this.setState({ games: [...games, newOption], game_names_id: newOption })
  }

  getOptionsGames = (inputValue) => {
    const getInitialData = async function (inputValue) {
      try {
        const results = await Game_name_values(inputValue)
        this.setState({ games: results })
      } catch (error) {
        // Error get option tags
      }
    }

    if (inputValue.length > 88) {
      toast.success(<Toast_style text={'Sorry mate! Game Title is too long.'} />)
      return
    }
    getInitialData(inputValue)
  }


  createGameOption = (label, game_names_id) => ({
    label,
    value: label,
    game_names_id
  })


  render() {
    const {
      open_compose_textTab,
      bFileModalOpen,
      preview_files = [],
      selected_group_data,
      group_id,
      overlay_active,
      isShowAllGroup = false,
      visibility
    } = this.state
    const isButtonDisable = !isEmptyDraftJs(this.state.postContent) || preview_files.length > 0 ? true : false
    const groups = [...selected_group_data]
    const AllGroups = [...selected_group_data]
    const preview_filesData = [...preview_files]
    const { communityBox = false } = this.props

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
              <DraftComposer
                editorType={POST_COMPOSER}
                editorState={this.state.postContent}
                setEditorState={(state) => this.setState({ postContent: state })}
                placeholder={"What's up..."}
                addHashtag={(hashtagMention) => this.setState({ postContentHashtags: [...this.state.postContentHashtags, hashtagMention] })}
                addMention={(userMention) => this.setState({ postContentMentions: [...this.state.postContentMentions, userMention] })}
              >
                {preview_filesData.length > 0 && (
                  <div className='media'>
                    <ImageGallery items={preview_filesData} showFullscreenButton={false} showGalleryFullscreenButton={false} />
                  </div>
                )}
              </DraftComposer>
            </div>
          )}
          {open_compose_textTab && (
            <div className='video_box'>
              <input
                className='video-input'
                placeholder='Enter link to video here!'
                value={this.state.video}
                onChange={(event) => this.setState({ video: event.target.value })}
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
                disabled={this.state.uploading}
              >
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
                        <div className='files__preview_compose'>
                          {preview_filesData.slice(0, 3).map((file) => {
                            const splitUrl = file.src.split('.')
                            let fileType = splitUrl[splitUrl.length - 1]
                            if (file.src.includes('video') || this.videoFileType.includes(fileType)) {
                              return (
                                <span className='image' key={file.src}>
                                  <video className='post-video' controls>
                                    <source src={file.src}></source>
                                  </video>
                                  <span className='remove__image' onClick={(e) => this.handlePreviewRemove(e, file.src, file.key, file.id)}>
                                    X
                                  </span>
                                </span>
                              )
                            }
                            return (
                              <span className='image' key={file.src}>
                                <img src={file.src} key={file.src} />
                                <span className='remove__image' onClick={(e) => this.handlePreviewRemove(e, file.src, file.key, file.id)}>
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
              <div className='hashtag_label'>Game Title</div>
              <div className='hashtag_input'>
            <MyGCreateableSelect
              isClearable
              onCreateOption={this.handleCreateGame}
              onInputChange={this.getOptionsGames}
              onChange={(value) => {
                this.handleGameChange(value)
              }}
              getNewOptionData={this.getNewOptionData}
              value={this.state.game_names_id }
              placeholder='Search, Select or create Game Title'
              options={this.state.games}
              onKeyDown={Disable_keys}
              classNamePrefix='filter'
              className='viewGame__name'
            />
              </div>
            </div>
          )}
          {open_compose_textTab && !communityBox && (
            <div className='compose__people__section'>
              <div className='label'>Post on: </div>
              <div className='people_selected_container'>
                <div className='people_selected_list'>
                  <div
                    className='default_circle profile-image'
                    style={{
                      backgroundImage: `url('${this.state.profile_img}')`,
                      backgroundSize: 'cover'
                    }}
                  ></div>
                  <div className='people_label'>Your Feed</div>
                </div>
                {groups.splice(0, 3).map((g) => {
                  return (
                    <div className='people_selected_list'>
                      <div
                        className='default_circle profile-image'
                        style={{
                          backgroundImage: `url('${g.group_img}')`,
                          backgroundSize: 'cover'
                        }}
                      ></div>
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
                {visibility == 1 && '(Everyone)'}
                {visibility == 2 && '(Friends)'}
                {visibility == 3 && '(Followers)'}
                {visibility == 0 && '(Private)'}
              </div>
              <div className='add_more_people'>
                <button type='button' className='add__people' onClick={this.addGroupToggle}>
                  +
                </button>
              </div>
            </div>
          )}
          <div className='compose__button'>
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
