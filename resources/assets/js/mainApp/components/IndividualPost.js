/*
 * Author : nitin Tyagi
 * github  : https://github.com/realinit
 * Email : nitin.1992tyagi@gmail.com
 */

//Group_IndividualPost IS THE SAME AS THIS FILE. ANY CHANGES TO THAT FILE MOST LIKELY WILL NEED TO BE DONE HERE!!!

import React, { Component, Fragment } from 'react'
import ReactPlayer from 'react-player'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'

import IndividualComment from './IndividualComment'
import SweetAlert from './common/MyGSweetAlert'
import { Toast_style } from './Utility_Function'
import { Upload_to_S3, Remove_file } from './AWS_utilities'

import { toast } from 'react-toastify'
import { logToElasticsearch } from '../../integration/http/logger'

const buckectBaseUrl = 'https://myG.gg/platform_images/'

import ImageGallery from './common/ImageGallery/ImageGallery'
import ReportPost from './common/ReportPost'
import { WithTooltip } from './Tooltip'
import { copyToClipboard } from '../../common/clipboard'
import { createShortLink } from '../../integration/http/links'

export default class IndividualPost extends Component {
  constructor() {
    super()
    this.state = {
      like: false,
      total: 0,
      comment_total: 0,
      pinned_total: 0,
      show_like: true,
      show_comments: false,
      admirer_first_name: '',
      pull_once: true,
      value: '',
      value2: '',
      zero_comments: false,
      dropdown: false,
      show_post_options: false,
      post_deleted: false,
      edit_post: false,
      content: '',
      post_time: '',
      alert: null,
      media_urls: [],
      images: [],
      showBullets: true,
      show_more_comments: true,
      preview_file: '',
      aws_key_id: [],
      file_keys: '',
      galleryItems: [],
      showmore: false,
      hideComments: false,
      commentShowCount: 2,
      showPostExtraOption: false,
      show_group_name: false
    }
    this.imageFileType = ['jpeg', 'jpg', 'png', 'gif']
    this.videoFileType = ['mov', 'webm', 'mpg', 'mp4', 'avi', 'ogg']
    this.textInput = null

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
      await axios.post('/api/likes', {
        post_id: post_id
      })
    } catch (error) {
      logToElasticsearch('error', 'IndividualPost', 'Failed click_like_btn:' + ' ' + error)
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
      await axios.get(`/api/likes/delete/${post_id}`)
    } catch (error) {
      logToElasticsearch('error', 'IndividualPost', 'Failed click_unlike_btn:' + ' ' + error)
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
    let media_url = ''

    try {
      if (post.media_url != null && post.media_url) {
        media_url = post.media_url.length > 0 ? JSON.parse(post.media_url) : ''
      }
    } catch (e) {
      media_url = ''
    }
    const galleryItems = []
    if (media_url.length > 0) {
      for (var i = 0; i < media_url.length; i++) {
        if (media_url[i] && media_url[i] != null) {
          galleryItems.push({ src: media_url[i] })
        }
      }
    }
    let post_timestamp = moment()
    try {
      if (this.props.post.created_at) {
        post_timestamp = moment(this.props.post.created_at, 'YYYY-MM-DD HH:mm:ssZ')
      }

      if (this.props.post.total == 0) {
        this.setState({ show_like: false })
      }

      this.setState({
        like: this.props.post.do_I_like_it,
        total: this.props.post.total,
        admirer_first_name: this.props.post.admirer_first_name,
        post_time: post_timestamp.local().fromNow(),
        content: this.props.post.content,
        galleryItems
      })
      if (this.props.post.no_of_comments != 0) {
        this.setState({
          zero_comments: true,
          comment_total: this.props.post.no_of_comments
        })
      }

      if (post.group_id != null && post.group_id != '' && post.name != undefined && post.name != '') {
        if ((source = 'news_feed')) {
          this.state.show_group_name = true
        }
      }
    } catch (e) {}

    this.pullComments()
  }

  pullComments = () => {
    let post_id = ''
    try {
      post_id = this.props.post.id
    } catch (e) {}
    const self = this

    const getComments = async function () {
      try {
        const myComments = await axios.get(`/api/comments/${post_id}`)
        self.setState({
          myComments: myComments.data.allComments,
          value: '',
          comment_total: myComments.data.allComments.length,
          pinned_total: myComments.data.pinned_total
        })
      } catch (error) {
        logToElasticsearch('error', 'IndividualPost', 'Failed pullComments:' + ' ' + error)
      }
    }
    if (post_id != '') getComments()
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value })
  }

  handleChange2 = (e) => {
    this.setState({ value2: e.target.value })
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
    const { value = '', preview_file = [], aws_key_id = [] } = this.state

    if (value.trim() == '' && preview_file.length == 0) {
      return
    }
    this.onFocus()
    const saveComment = async () => {
      const { myComments = [] } = this.state
      try {
        const postComment = await axios.post('/api/comments', {
          content: this.state.value.trim(),
          post_id: this.props.post.id,
          media_url: this.state.preview_file.length > 0 ? JSON.stringify(this.state.preview_file) : '',
          aws_key_id: aws_key_id.length > 0 ? aws_key_id : ''
        })

        this.setState({
          myComments: [...myComments, ...postComment.data],
          preview_file: '',
          file_keys: '',
          value: '',
          aws_key_id: []
        })

        this.setState({
          comment_total: this.state.comment_total + 1,
          zero_comments: true
        })
      } catch (error) {
        logToElasticsearch('error', 'IndividualPost', 'Failed saveComment:' + ' ' + error)
      }
    }
    saveComment()
  }

  update_post = (e) => {
    if (this.state.value2 == '') {
      return
    }
    if (this.state.value2.trim() == '') {
      this.setState({
        value: ''
      })
      return
    }
    const self = this
    var post_id = this.props.post.id

    const editPost = async function () {
      try {
        await axios.post(`/api/post/update/${post_id}`, {
          content: self.state.value2
        })
        self.setState({
          content: self.state.value2,
          edit_post: false,
          value2: ''
        })
      } catch (error) {
        logToElasticsearch('error', 'IndividualPost', 'Failed editPost:' + ' ' + error)
      }
    }
    editPost()
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
        value2: ''
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
        return (
          <IndividualComment
            comment={item}
            key={index}
            user={this.props.user}
            onDelete={(deleted) => {
              this.setState((previous) => ({
                myComments: previous.myComments.filter((comment) => comment.id !== deleted)
              }))
            }}
          />
        )
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
        return (
          <IndividualComment
            comment={item}
            key={item.id}
            user={this.props.user}
            onDelete={(deleted) => {
              this.setState((previous) => ({
                myComments: previous.myComments.filter((comment) => comment.id !== deleted)
              }))
            }}
          />
        )
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
    this.setState({
      edit_post: true,
      value2: this.state.content.trim(),
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

  delete_exp = () => {
    var post_id = this.props.post.id

    try {
      axios.delete(`/api/post/delete/${post_id}`)
      this.setState({
        post_deleted: true
      })
    } catch (error) {
      logToElasticsearch('error', 'IndividualPost', 'Failed delete_exp:' + ' ' + error)
    }
  }

  //returns True if mobile
  detectMob = () => {
    return window.innerWidth <= 480
  }

  clickedShare = async () => {
    var post_id = this.props.post.id

    try {
      const value = await createShortLink(`${window.location.origin}/post/${post_id}`)
      copyToClipboard(value)
      if (this.detectMob()) {
        navigator
          .share({
            title: 'myG',
            text: 'Share link',
            url: value
          })
          .catch((error) => {
            logToElasticsearch('error', 'IndividualPost', 'Failed clickedShare(SHARE)' + ' ' + error)
          })
      }
      this.setState({
        showPostExtraOption: false
      })
    } catch (error) {
      logToElasticsearch('error', 'IndividualPost', 'Failed clickedShare:' + ' ' + error)
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
  showReportAlert = (id) => {
    this.clickedGamePostExtraOption()
    const getAlert = () => <ReportPost post_id={id} hideModal={this.hideAlert} />

    this.setState({
      alert: getAlert()
    })
  }

  hideAlert = (text) => {
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
    this.setState({
      hideComments: true,
      show_more_comments: !show_more_comments,
      commentShowCount: myComments.length
    })
  }

  clickedGamePostExtraOption = () => {
    const { showPostExtraOption } = this.state
    this.setState({ showPostExtraOption: !showPostExtraOption })
  }

  render() {
    const {
      myComments = [],
      post_deleted,
      alert,
      show_more_comments = false,
      galleryItems = [],
      hideComments,
      showPostExtraOption,
      pinned_total = 0
    } = this.state
    const isLoggedinUser = this.props.guest ? true : false
    if (post_deleted != true) {
      let { post, user = {} } = this.props //destructing of object
      let profile_img = 'https://myG.gg/default_user/new-user-profile-picture.png',
        hash_tags = ''

      if (post != undefined) {
        profile_img = post.profile_img
        hash_tags = post.hash_tags
      }

      if (hash_tags == undefined) hash_tags = ''
      if (post == undefined || !post.user_id) {
        return <div className='update-container'></div>
      }

      return (
        <div className='post__container'>
          {alert}
          <div className='post__body__wrapper'>
            <div className='post__body'>
              {!isLoggedinUser && (
                <div className='gamePostExtraOption'>
                  <i className='fas fa-ellipsis-h' onClick={this.clickedGamePostExtraOption}>
                    ...
                  </i>
                  <div className={`post-dropdown ${showPostExtraOption == true ? 'active' : ''}`}>
                    <nav>
                      {user.id != post.user_id && (
                        <div className='option' onClick={(e) => this.showReportAlert(post.id)}>
                          Report
                        </div>
                      )}
                      {user.id == post.user_id && (
                        <div className='option' onClick={() => this.showAlert()}>
                          Delete
                        </div>
                      )}
                      {user.id == post.user_id && (
                        <div className='option' onClick={this.clickedEdit}>
                          Edit &nbsp;
                        </div>
                      )}
                      <div className='option' onClick={() => this.clickedShare()}>
                        Share
                      </div>
                    </nav>
                  </div>
                </div>
              )}
              <Link to={`/profile/${post.alias}`} className='user-img'>
                <div
                  className='profile__image'
                  style={{
                    backgroundImage: `url('${profile_img}'), url('https://myG.gg/default_user/new-user-profile-picture.png')`,
                    backgroundSize: 'cover'
                  }}
                >
                  {/* <div className='online__status'></div>*/}
                </div>
              </Link>
              <div className='user__details'>
                <div className='author__username'>
                  <div className='username'>
                    <Link to={`/profile/${post.alias}`}>{`@${post.alias} `}</Link>
                  </div>
                  {this.state.show_group_name && (
                    <div className='shared__group'>
                      {`shared `}
                      <div className='arrow'></div>
                      <Link to={`/community/${decodeURI(post.name)}`}>{decodeURI(post.name)}</Link>
                    </div>
                  )}
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
                {!this.state.edit_post && this.state.showmore && (
                  <Fragment>
                    <p style={{ whiteSpace: 'pre-line' }}>
                      {`${this.state.content}  `}
                      {this.renderHashTags(hash_tags)}
                      <strong onClick={this.toggleShowmore}>{' ... '}See less</strong>
                    </p>
                  </Fragment>
                )}
                {!this.state.edit_post && !this.state.showmore && (
                  <Fragment>
                    <p style={{ whiteSpace: 'pre-line' }}>
                      {`${this.state.content.slice(0, 254)}  `} {this.renderHashTags(hash_tags)}
                      {this.state.content.length > 254 && <strong onClick={this.toggleShowmore}> {' ... '} See more</strong>}
                    </p>
                  </Fragment>
                )}
                {this.state.edit_post && (
                  <div className='post_content_editbox'>
                    <textarea
                      name='name2'
                      rows={8}
                      cols={80}
                      value={this.state.value2}
                      onChange={this.handleChange2}
                      maxLength='254'
                      onKeyDown={this.detectKey2}
                      ref={this.setTextInputRef2}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className='media'>
              {!!this.props.post.video && <ReactPlayer width={'100%'} height={360} url={this.props.post.video} controls={true} />}
              {galleryItems.length > 0 && (
                <ImageGallery
                  items={[...galleryItems]}
                  showBullets={galleryItems.length > 1 ? true : false}
                  showFullscreenButton={true}
                  showGalleryFullscreenButton={true}
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
              {this.state.show_like && (!!post.admirer_first_name || !!this.state.admirer_first_name) && (
                <div className='other-users'>
                  {this.state.total > 1
                    ? `${post.admirer_first_name} and ${this.state.total} others liked this update`
                    : `${this.state.admirer_first_name} liked this update`}
                </div>
              )}
              {!this.state.show_like && (
                <div className='other-users'>
                  <FormattedMessage id='individual-post.show-like' defaultMessage='Be the first to like this!' />
                </div>
              )}
            </div>
            {show_more_comments && myComments.length > 0 && pinned_total == 0 && (
              <div className='show__comments_count' onClick={this.show_more_comments}>{` View all (${myComments.length}) comments`}</div>
            )}
            {show_more_comments && myComments.length > 0 && pinned_total != 0 && (
              <div
                className='show__comments_count'
                onClick={this.show_more_comments}
              >{` View all (${myComments.length}) comments && (${pinned_total}) pinned`}</div>
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
              <textarea
                name='name'
                placeholder='Write a comment...'
                value={this.state.value}
                onChange={this.handleChange}
                maxLength='254'
                onKeyDown={(e) => this.detectKey(e, true)}
                ref={this.setTextInputRef}
                disabled={isLoggedinUser}
              />
              <div className='insert__images' onClick={this.insert_image_comment}>
                <input
                  type='file'
                  accept='image/jpeg,image/jpg,image/png,image/gif'
                  ref={this.fileInputRef}
                  onChange={this.handleSelectFile}
                  name='insert__images'
                />
                <img src={`${buckectBaseUrl}Dashboard/BTN_Attach_Image.svg`} className='img-fluid' />
              </div>
              <div className='send__btn' onClick={(e) => this.detectKey(e, false)}>
                <img src={`${buckectBaseUrl}Dashboard/BTN_Send_Post.svg`} className='img-fluid' />
              </div>

              <div
                className='profile__image'
                style={{
                  backgroundImage: `url('${user.profile_img}')`,
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
