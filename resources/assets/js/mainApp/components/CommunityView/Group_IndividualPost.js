/*
 * Author : nitin Tyagi
 * github  : https://github.com/realinit
 * Email : nitin.1992tyagi@gmail.com
 */

//IndividualPost IS THE SAME AS THIS FILE. ANY CHANGES TO THAT FILE MOST LIKELY WILL NEED TO BE DONE HERE!!!

import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player'
import axios from 'axios'
import moment from 'moment'
import { EditorState } from 'draft-js'

import IndividualComment from '../IndividualComment'
import SweetAlert from '../common/MyGSweetAlert'
import { Toast_style, mobile_Share } from '../Utility_Function'
import { Upload_to_S3, Remove_file } from '../AWS_utilities'

import { toast } from 'react-toastify'
import { logToElasticsearch } from '../../../integration/http/logger'
import { createShortLink } from '../../../integration/http/links'

import { copyToClipboard } from '../../../common/clipboard'

const buckectBaseUrl = 'https://myG.gg/platform_images/'

import ImageGallery from '../common/ImageGallery/ImageGallery'
import { WithTooltip } from '../Tooltip'

import { DraftComposer } from '../common/Draftjs'
import {
  convertToEditorState,
  cloneEditorState,
  prepareDraftsEditorForSave,
  isEmptyDraftJs,
  MAX_HASH_TAGS,
  POST_STATIC,
  POST_EDIT,
  COMMENT_COMPOSER
} from '../../../common/draftjs'

export default class Group_IndividualPost extends Component {
  constructor() {
    super()
    this.state = {
      like: false,
      total: 0,
      comment_total: 0,
      show_like: true,
      show_comments: false,
      show_profile_img: false,
      admirer_first_name: '',
      pull_once: true,
      zero_comments: false,
      dropdown: false,
      post_deleted: false,
      edit_post: false,
      post_time: '',
      alert: null,
      media_urls: [],
      images: [],
      show_more_comments: true,
      preview_file: '',
      aws_key_id: [],
      file_keys: '',
      galleryItems: [],
      showmore: false,
      hideComments: false,
      commentShowCount: 2,
      showPostExtraOption: false,
      featured_enabled: false,
      allow_Comments: true,
      content: null,
      comment: EditorState.createEmpty(),
      commentHashtags: [],
      commentMentions: [],
      contentEdited: EditorState.createEmpty(),
      hashtagsContentEdited: [],
      mentionsContentEdited: []
    }
    // this.imageFileType = ['jpeg', 'jpg', 'png', 'gif']
    // this.videoFileType = ['mov', 'webm', 'mpg', 'mp4', 'avi', 'ogg']
    // this.textInput = null

    this.setTextInputRef = (element) => {
      this.textInput = element
    }

    this.focusTextInput = () => {
      // Focus the text input using the raw DOM API
      if (this.textInput) this.textInput.focus()
    }

    this.textInput2 = null

    this.setTextInputRef2 = (element) => {
      this.textInput2 = element
    }

    this.focusTextInput2 = () => {
      // Focus the text input using the raw DOM API
      if (this.textInput2) this.textInput2.focus()
    }

    this.fileInputRef = React.createRef()
    this.doUploadS3 = this.doUploadS3.bind(this)
  }

  click_like_btn = async (post_id) => {
    const isLoggedinUser = this.props.guest ? true : false
    if (isLoggedinUser) {
      return
    }

    this.setState({
      total: this.state.total + 1
    })

    try {
      axios.post('/api/likes', {
        post_id: post_id
      })
    } catch (error) {
      logToElasticsearch('error', 'Group_IndividualPost', 'Failed click_like_btn:' + ' ' + error)
    }
    if (this.state.total == 0) {
      this.setState({
        admirer_first_name: this.props.user.userInfo.alias
      })
    }

    this.setState({
      show_like: true
    })

    this.setState({
      like: !this.state.like
    })
  }

  click_unlike_btn = async (post_id) => {
    const isLoggedinUser = this.props.guest ? true : false
    if (isLoggedinUser) {
      return
    }

    this.setState({
      total: this.state.total - 1
    })

    try {
      axios.get(`/api/likes/delete/${post_id}`)
      //const deletePostLike = axios.get(`/api/notifications/deletePostLike/${post_id}`)
    } catch (error) {
      logToElasticsearch('error', 'Group_IndividualPost', 'Failed click_unlike_btn:' + ' ' + error)
    }

    if (this.state.total == 0) {
      this.setState({
        show_like: false
      })
    }

    this.setState({
      like: !this.state.like
    })
  }

  componentDidMount() {
    let { post } = this.props
    let media_url = '',
      post_timestamp = ''

    if (post.media_url) {
      try {
        media_url = post.media_url.length > 0 ? JSON.parse(post.media_url) : ''
      } catch (e) {
        media_url = post.media_url ? post.media_url : ''
      }
    }

    const galleryItems = []
    if (media_url.length > 0) {
      for (let i = 0; i < media_url.length; i++) {
        if (media_url[i] && media_url[i] != null) {
          galleryItems.push({ src: media_url[i] })
        }
      }
    }

    if (this.props.post.created_at) {
      post_timestamp = moment(this.props.post.created_at, 'YYYY-MM-DD HH:mm:ssZ')
    }

    if (this.props.post.total == 0) {
      this.setState({ show_like: false })
    }

    if (this.props.post.profile_img != null) {
      this.setState({ show_profile_img: true })
    }

    this.setState({
      like: this.props.post.do_I_like_it,
      total: this.props.post.total,
      admirer_first_name: this.props.post.admirer_first_name,
      post_time: post_timestamp.local().fromNow(),
      content: convertToEditorState(this.props.post.content),
      featured_enabled: this.props.featured,
      galleryItems,
      allow_Comments: post.allow_comments == 1 ? true : false
    })
    if (this.props.post.no_of_comments != 0) {
      this.setState({
        zero_comments: true,
        comment_total: this.props.post.no_of_comments
      })
    }

    this.pullComments()
  }

  pullComments = () => {
    var post_id = this.props.post.id
    const self = this

    const getComments = async function () {
      try {
        const myComments = await axios.get(`/api/comments/${post_id}`)
        self.setState({
          myComments: myComments.data.allComments,
          value: '',
          comment_total: myComments.data.allComments.length
        })
      } catch (error) {
        logToElasticsearch('error', 'Group_IndividualPost', 'Failed pullComments:' + ' ' + error)
      }
    }
    getComments()
  }

  show_more_comments = () => {
    const { show_comments, show_more_comments } = this.state
    this.setState({
      show_comments: !show_comments,
      show_more_comments: !show_more_comments,
      hideComments: false
    })
  }

  onChange = () => {
    const { show_comments } = this.state

    if (!show_comments) {
      this.pullComments()
    }
    this.setState({
      show_comments: !show_comments,
      show_more_comments: true
    })
    if (!show_comments) {
      this.focusTextInput()
    }
  }

  onFocus = () => {
    if (this.state.pull_once) {
      this.pullComments()
    }
    this.setState({
      pull_once: false,
      show_comments: true
    })
  }
  insert_image_comment = () => {
    if (!this.state.uploading) {
      this.fileInputRef.current.click()
    }
  }
  handleSelectFile = (e) => {
    const fileList = e.target.files
    if (fileList.length > 0) {
      let type = fileList[0].type.split('/')
      let name = `comment_${type}_${+new Date()}_${fileList[0].name}`
      this.doUploadS3(fileList[0], name)
    }
  }

  doUploadS3 = async (file, name) => {
    this.setState({
      uploading: true
    })

    try {
      const post = await Upload_to_S3(file, name, 0, null)

      this.setState({
        preview_file: [post.data.Location],
        file_keys: post.data.Key,
        aws_key_id: [post.data.aws_key_id]
      })
    } catch (error) {
      toast.success(<Toast_style text={'Opps, something went wrong. Unable to upload your file.'} />)
    }
    this.setState({
      uploading: false
    })

    this.setState({
      uploading: false
    })
  }

  insert_comment = () => {
    const { value, preview_file = [], aws_key_id = [] } = this.state

    if (isEmptyDraftJs(value) && preview_file.length == 0) {
      return
    }
    this.onFocus()
    const saveComment = async () => {
      const { myComments = [] } = this.state
      const { content } = prepareDraftsEditorForSave(this.state.comment, this.state.commentHashtags, this.state.commentMentions)

      try {
        const postComment = await axios.post('/api/comments', {
          content,
          post_id: this.props.post.id,
          media_url: this.state.preview_file.length > 0 ? JSON.stringify(this.state.preview_file) : '',
          aws_key_id: aws_key_id.length > 0 ? aws_key_id : ''
        })

        this.setState({
          myComments: [...myComments, ...postComment.data],
          preview_file: '',
          file_keys: '',
          value: EditorState.createEmpty(),
          commentHashtags: [],
          commentMentions: [],
          aws_key_id: []
        })

        this.setState({
          comment_total: this.state.comment_total + 1,
          zero_comments: true
        })
      } catch (error) {
        logToElasticsearch('error', 'Group_IndividualPost', 'Failed saveComment:' + ' ' + error)
      }
    }
    saveComment()
  }

  update_post = (e) => {
    if (isEmptyDraftJs(this.state.contentEdited)) {
      return
    }

    const self = this
    var post_id = this.props.post.id

    const editPost = async function () {
      const { content } = prepareDraftsEditorForSave(
        self.state.contentEdited,
        self.state.hashtagsContentEdited,
        self.state.mentionsContentEdited
      )
      try {
        await axios.post(`/api/post/update/${post_id}`, {
          content
        })
        self.setState({
          content: cloneEditorState(self.state.contentEdited),
          edit_post: false,
          contentEdited: EditorState.createEmpty(),
          hashtagsContentEdited: [],
          mentionsContentEdited: []
        })
      } catch (error) {
        logToElasticsearch('error', 'Group_IndividualPost', 'Failed editPost:' + ' ' + error)
      }
    }
    editPost()
  }

  submitComposeComment = () => {
    if (!this.state.uploading) {
      this.insert_comment()
    } else {
      toast.warn(<Toast_style text={'Opps,Image is uploading Please Wait...'} />)
    }
  }

  detectKey = (e, key) => {
    if (!key) {
      e.preventDefault()
      e.stopPropagation()
      if (!this.state.uploading) {
        this.insert_comment()
      } else {
        toast.warn(<Toast_style text={'Opps,Image is uploading Please Wait...'} />)
      }
    }
    if (e.key === 'Enter' && e.shiftKey) {
      return
    }

    if (e.key === 'Enter') {
      e.preventDefault()
      e.stopPropagation()
      if (!this.state.uploading) {
        this.insert_comment()
      } else {
        toast.warn(<Toast_style text={'Opps,Image is uploading Please Wait...'} />)
      }
    }
  }

  detectKey2 = (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      return
    }

    if (e.key === 'Escape') {
      this.setState({
        edit_post: false,
        contentEdited: ''
      })
    }

    if (e.key === 'Enter') {
      event.preventDefault()
      event.stopPropagation()
      this.update_post()
    }
  }

  showMoreComment = () => {
    const { myComments = [] } = this.state
    const comments = [...myComments]
    return (
      comments.length > 0 &&
      comments.map((item, index) => {
        return <IndividualComment comment={item} key={index} user={this.props.user.userInfo} post={this.props.post} />
      })
    )
  }
  showComment = () => {
    const { myComments = [], commentShowCount } = this.state
    const comments = [...myComments]
    const len = comments.length
    const commentArr = comments.length > 3 ? comments.slice(len - commentShowCount, len) : comments
    return (
      commentArr.length > 0 &&
      commentArr.map((item, index) => {
        return <IndividualComment comment={item} key={item.id} user={this.props.user.userInfo} post={this.props.post} />
      })
    )
  }

  clickedDropdown = () => {
    this.setState({
      dropdown: !this.state.dropdown
    })
  }

  clickedEdit = async () => {
    this.clickedGamePostExtraOption()
    const contentEdited = cloneEditorState(this.state.content)
    this.setState({
      edit_post: true,
      contentEdited,
      dropdown: false
    })
    setTimeout(
      function () {
        //Start the timer
        this.focusTextInput2()
      }.bind(this),
      100
    )
  }

  clickedShare = async () => {
    let post_id = this.props.post.id

    try {
      const value = await createShortLink(`${window.location.origin}/post/${post_id}`)
      mobile_Share(value)
      copyToClipboard(value)

      this.setState({
        showPostExtraOption: false
      })
    } catch (error) {
      logToElasticsearch('error', 'Group_IndividualPost', 'Failed clickedShare:' + ' ' + error)
    }
  }

  clicked_allowComments = () => {
    let post_id = this.props.post.id
    const curr_State = this.state.allow_Comments

    try {
      axios.post(`/api/post/update_allow_comments`, {
        post_id: post_id,
        allow_comments: !curr_State
      })

      this.setState({
        allow_Comments: !curr_State,
        showPostExtraOption: false
      })
    } catch (error) {
      logToElasticsearch('error', 'Group_IndividualPost', 'Failed clicked_allowComments:' + ' ' + error)
    }
  }

  delete_exp = () => {
    var post_id = this.props.post.id

    try {
      axios.delete(`/api/post/delete/${post_id}`)
      this.setState({
        post_deleted: true
      })
    } catch (error) {
      logToElasticsearch('error', 'Group_IndividualPost', 'Failed delete_exp:' + ' ' + error)
    }
  }

  showAlert() {
    this.clickedGamePostExtraOption()
    const getAlert = () => (
      <SweetAlert
        danger
        showCancel
        title='Are you sure you wish to delete this post?'
        confirmBtnText='Make it so!'
        confirmBtnBsStyle='danger'
        focusCancelBtn={true}
        focusConfirmBtn={false}
        showCloseButton={true}
        onConfirm={() => this.hideAlert('true')}
        onCancel={() => this.hideAlert('false')}
      >
        You will not be able to recover this entry!
      </SweetAlert>
    )

    this.setState({
      alert: getAlert()
    })
  }
  showReportAlert(id) {
    this.clickedGamePostExtraOption()
    const getAlert = () => (
      <SweetAlert
        danger
        showCancel
        title='Are you sure you wish to report this post?'
        confirmBtnText='Make it so!'
        confirmBtnBsStyle='danger'
        focusCancelBtn={true}
        focusConfirmBtn={false}
        showCloseButton={true}
        onConfirm={() => this.handleReportClick('true', id)}
        onCancel={() => this.handleReportClick('false', id)}
      ></SweetAlert>
    )

    this.setState({
      alert: getAlert()
    })
  }

  hideAlert(text) {
    this.setState({
      alert: null,
      dropdown: false
    })
    if (text == 'true') {
      this.delete_exp()
    }
  }
  clearPreviewImage = () => {
    Remove_file(this.state.file_keys, this.state.aws_key_id[0])

    // const deleteKeys = axios.post('/api/deleteFile', {
    //   aws_key_id: this.state.aws_key_id[0],
    //   key: this.state.file_keys,
    // })

    this.setState({
      preview_file: [],
      file_keys: ''
    })
  }

  toggleShowmore = () => {
    this.setState({ showmore: !this.state.showmore })
  }

  renderHashTags = (hash_tags) => {
    if (hash_tags.length > 0) {
      return hash_tags.map((tags) => {
        return (
          <strong>
            <Link to={`/hashtag/${tags.content}`}>{`#${tags.content} `}</Link>
          </strong>
        )
      })
    } else {
      return ''
    }
  }

  hide_comments = () => {
    const { myComments = [], show_more_comments } = this.state
    this.setState({ hideComments: true, show_more_comments: !show_more_comments, commentShowCount: myComments.length })
  }

  clickedGamePostExtraOption = () => {
    const { showPostExtraOption } = this.state
    this.setState({ showPostExtraOption: !showPostExtraOption })
  }

  handlefeaturedClick = (post_id) => {
    this.clickedGamePostExtraOption()
    let featured_enabled = !this.state.featured_enabled

    axios.post('/api/post/featureToggle/', {
      post_id,
      featured_enabled
    })

    toast.success(<Toast_style text={`\Great! Post has been successfully ${featured_enabled ? 'featured' : 'unfeatured'} `} />)
    this.setState({ featured_enabled: featured_enabled })
  }
  handleReportClick = (text, post_id) => {
    this.clickedGamePostExtraOption()
    if (text == 'true') {
      axios.get(`/api/post/report/${post_id}`)
      this.setState({ alert: '' })
      toast.success(<Toast_style text={`Thanks for reporting! You're helping to make this is a better place.`} />)
    } else {
      this.setState({ alert: '' })
    }
  }

  render() {
    const {
      myComments = [],
      media_urls,
      post_deleted,
      alert,
      show_more_comments = false,
      galleryItems = [],
      hideComments,
      showPostExtraOption
    } = this.state
    if (post_deleted != true) {
      let show_media = false
      //current_user_permission:
      //-1: Not a member of this group, 0: Owner, 1: Admin of group, 2: Moderator, 3: User, 42:Pending approval

      let { post, current_user_permission = null, user } = this.props //destructing of object
      let { profile_img = 'https://myG.gg/default_user/new-user-profile-picture.png', hash_tags = [] } = post //destructing of object

      //destructing of object
      const { userInfo = {} } = user

      if (post != undefined) {
        profile_img = post.profile_img
      }

      if (media_urls != [] && media_urls != null) {
        show_media = true
      }

      const check = this.state.featured_enabled ? true : false

      let isGuestUser = this.props.guest ? true : false
      if (!isGuestUser) {
        if (!this.state.allow_Comments) {
          isGuestUser = true
        } else {
          isGuestUser = false
        }
      }

      return (
        <div className='post__container'>
          {alert}
          <div className='post__body__wrapper'>
            <div className='post__body'>
              {current_user_permission != null && (
                <div className='gamePostExtraOption'>
                  <i className='fas fa-ellipsis-h' onClick={this.clickedGamePostExtraOption}>
                    ...
                  </i>
                  <div className={`post-dropdown ${showPostExtraOption == true ? 'active' : ''}`}>
                    <nav>
                      {[0, 1, 2].includes(current_user_permission) && !check && (
                        <div className='option' onClick={(e) => this.handlefeaturedClick(post.id)}>
                          Featured
                        </div>
                      )}
                      {[0, 1, 2].includes(current_user_permission) && check && (
                        <div className='option' onClick={(e) => this.handlefeaturedClick(post.id)}>
                          Unfeatured
                        </div>
                      )}
                      {![0, 1, 2].includes(current_user_permission) && userInfo.id != post.user_id && (
                        <div className='option' onClick={(e) => this.showReportAlert(post.id)}>
                          Report
                        </div>
                      )}
                      {([0, 1].includes(current_user_permission) || userInfo.id == post.user_id) && (
                        <div className='option' onClick={() => this.showAlert()}>
                          Delete
                        </div>
                      )}

                      {userInfo.id == post.user_id && (
                        <div className='option' onClick={this.clickedEdit}>
                          Edit &nbsp;
                        </div>
                      )}
                      <div className='option' onClick={() => this.clickedShare()}>
                        Share
                      </div>
                      {[0, 1, 2].includes(current_user_permission) && !this.state.allow_Comments && (
                        <div className='option' onClick={() => this.clicked_allowComments()}>
                          Enable comments
                        </div>
                      )}
                      {[0, 1, 2].includes(current_user_permission) && this.state.allow_Comments && (
                        <div className='option' onClick={() => this.clicked_allowComments()}>
                          Disable comments
                        </div>
                      )}
                    </nav>
                  </div>
                </div>
              )}
              <Link to={`/profile/${post.alias}`} className='user-img'>
                <div
                  className='profile__image'
                  style={{
                    backgroundImage: `url('${profile_img}')`,
                    backgroundSize: 'cover'
                  }}
                >
                  <div className='online__status'></div>
                </div>
              </Link>
              <div className='user__details'>
                <div className='author__username'>
                  <div className='username'>
                    <Link to={`/profile/${post.alias}`}>{`@${post.alias} `}</Link>
                  </div>
                  {post.visibility === 0 && (
                    <div className='private__post__lock'>
                      <WithTooltip
                        position={{ bottom: '-46px', left: '-22px' }}
                        style={{ display: 'inline-block', padding: '0 0 0 10px' }}
                        text='private'
                      >
                        <img src='https://myg.gg/platform_images/Dashboard/lock_icon_small.svg' alt='lock_svg' />
                      </WithTooltip>
                    </div>
                  )}
                </div>
                <div className='post__time'>{this.state.post_time}</div>
              </div>
              <div className='post__content'>
                {!this.state.edit_post && this.state.showmore && this.state.content && (
                  <DraftComposer
                    editorType={POST_STATIC}
                    editorState={this.state.content}
                    setEditorState={(state) => this.setState({ content: state })}
                  ></DraftComposer>
                )}
                {!this.state.edit_post && !this.state.showmore && this.state.content && (
                  <DraftComposer
                    editorType={POST_STATIC}
                    editorState={this.state.content}
                    setEditorState={(state) => this.setState({ content: state })}
                  ></DraftComposer>
                )}
                {this.state.edit_post && this.state.contentEdited && (
                  <DraftComposer
                    editorType={POST_EDIT}
                    editorState={this.state.contentEdited}
                    setEditorState={(state) => this.setState({ contentEdited: state })}
                    handleReturnKey={this.update_post}
                    addHashtag={(hashtagMention) =>
                      this.setState({ hashtagsContentEdited: [...this.state.hashtagsContentEdited, hashtagMention] })
                    }
                    addMention={(userMention) =>
                      this.setState({ mentionsContentEdited: [...this.state.mentionsContentEdited, userMention] })
                    }
                    handleSpecialKeys={(e) => this.setState({ edit_post: false })}
                  ></DraftComposer>
                )}
              </div>
            </div>
            <div className='media'>
              {!!this.props.post.video && <ReactPlayer width={'100%'} height={360} url={this.props.post.video} controls={true} />}
              {galleryItems.length > 0 && (
                <ImageGallery
                  items={[...galleryItems]}
                  showFullscreenButton={true}
                  showGalleryFullscreenButton={true}
                  showBullets={galleryItems.length > 1 ? true : false}
                />
              )}
            </div>
            <div className='update-stats'>
              {this.state.like && (
                <div className='like-btn' onClick={() => this.click_unlike_btn(post.id)}>
                  <img src='https://myG.gg/platform_images/Dashboard/btn_Like_Feed.svg' className='img-fluid' />
                  &nbsp;Liked
                </div>
              )}
              {!this.state.like && (
                <div className='like-btn' onClick={() => this.click_like_btn(post.id)}>
                  <img src='https://myG.gg/platform_images/Dashboard/btn_unLike_Feed.svg' className='img-fluid' />
                  &nbsp;Like
                </div>
              )}
              {this.state.show_like && (
                <div className='other-users'>
                  {this.state.total > 1
                    ? `${post.admirer_first_name} and ${this.state.total} others liked this update`
                    : `${this.state.admirer_first_name} liked this update`}
                </div>
              )}
              {!this.state.show_like && <div className='other-users'>Be the first to like this!</div>}
            </div>
            {show_more_comments && myComments.length > 0 && (
              <div className='show__comments_count' onClick={this.show_more_comments}>{` View all (${myComments.length}) comments`}</div>
            )}
            {!show_more_comments && myComments.length > 0 && (
              <div className='show__comments_count' onClick={this.hide_comments}>
                {` Hide all (${myComments.length}) comments`}
              </div>
            )}
            {myComments.length > 0 && !hideComments && (
              <div className='comments'>
                {show_more_comments && <div className='show-individual-comments'>{this.showComment()}</div>}
                {!show_more_comments && <div className='show-individual-comments'>{this.showMoreComment()}</div>}
              </div>
            )}
            <div className='compose-comment'>
              <DraftComposer
                editorType={COMMENT_COMPOSER}
                editorState={this.state.comment}
                setEditorState={(state) => this.setState({ value: state })}
                placeholder={'Write a comment...'}
                handleReturnKey={this.submitComposeComment}
                addHashtag={(hashtagMention) => this.setState({ commentHashtags: [...this.state.commentHashtags, hashtagMention] })}
                addMention={(userMention) => this.setState({ commentMentions: [...this.state.commentMentions, userMention] })}
              ></DraftComposer>
              <div className='insert__images' onClick={this.insert_image_comment}>
                <input
                  type='file'
                  accept='image/jpeg,image/jpg,image/png,image/gif'
                  ref={this.fileInputRef}
                  onChange={this.handleSelectFile}
                  name='insert__images'
                  disabled={isGuestUser}
                />
                <img src={`${buckectBaseUrl}Dashboard/BTN_Attach_Image.svg`} className='img-fluid' />
              </div>
              <div className='send__btn' onClick={(e) => this.detectKey(e, false)}>
                <img src={`${buckectBaseUrl}Dashboard/BTN_Send_Post.svg`} className='img-fluid' />
              </div>

              <div
                className='profile__image'
                style={{
                  backgroundImage: `url('${userInfo.profile_img}')`,
                  backgroundSize: 'cover'
                }}
              >
                <Link to={`/profile/${post.alias}`} className='user-img'></Link>
                <div className='online__status'></div>
              </div>
            </div>
            {this.state.uploading && <div className='uploadImage_loading'>Uploading ...</div>}
            {this.state.preview_file.length > 0 && (
              <div className='preview__image'>
                <img src={`${this.state.preview_file[0]}`} className='img-fluid' />
                <div className='clear__preview__image' onClick={this.clearPreviewImage}>
                  X
                </div>
              </div>
            )}
          </div>
          {showPostExtraOption == true && <div onClick={this.clickedGamePostExtraOption} className='threedots__backdrop'></div>}
        </div>
      )
    } else {
      return <div className='update-container'></div>
    }
  }
}

const app = document.getElementById('app')
