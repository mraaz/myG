import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import IndividualComment from './IndividualComment'
import moment from 'moment'
import SweetAlert from 'react-bootstrap-sweetalert'
import ImageGallery from 'react-image-gallery'
const buckectBaseUrl = 'https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/'
import { toast } from 'react-toastify'
import { Toast_style } from './Utility_Function'

export default class IndividualPost extends Component {
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
      autoPlay: false,
      isRTL: false,
      disableSwipe: false,
      show_group_name: false,
      group_name: '',
      show_more_comments: false,
      preview_file: '',
      aws_key: '',
    }
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
    try {
      const mylike = await axios.post('/api/likes', {
        post_id: post_id,
      })
      let { post, user } = this.props
      if (this.props != undefined) {
        if (user.userInfo != undefined) {
          if (post.user_id != user.userInfo.id) {
            const addPostLike = axios.post('/api/notifications/addPostLike', {
              other_user_id: post.user_id,
              post_id: post_id,
            })
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
    if (this.state.total == 0) {
      this.setState({
        admirer_first_name: this.props.user.userInfo.alias,
      })
    }
    this.setState({
      total: this.state.total + 1,
    })

    this.setState({
      show_like: true,
    })

    this.setState({
      like: !this.state.like,
    })
  }

  click_unlike_btn = async (post_id) => {
    try {
      const unlike = await axios.get(`/api/likes/delete/${post_id}`)
      const deletePostLike = axios.get(`/api/notifications/deletePostLike/${post_id}`)
    } catch (error) {
      console.log(error)
    }

    this.setState({
      total: this.state.total - 1,
    })
    if (this.state.total == 0) {
      this.setState({
        show_like: false,
      })
    }

    this.setState({
      like: !this.state.like,
    })
  }

  componentDidMount() {
    let { post } = this.props

    const self = this

    if (post.type == 'photo' || post.type == 'video') {
      try {
        this.state.media_urls = JSON.parse(post.media_url)
      } catch (error) {
        console.log('Data error with your post. Delete POST please! ' + post.content)
      }
    }

    if (post.type == 'photo') {
      if (this.state.media_urls != null) {
        for (var i = 0; i < this.state.media_urls.length; i++) {
          var myStruct = { original: this.state.media_urls[i], thumbnail: this.state.media_urls[i] }
          this.state.images.push(myStruct)
        }
      }
    }

    this.setState({ like: this.props.post.do_I_like_it })
    this.setState({ total: this.props.post.total })
    this.setState({ admirer_first_name: this.props.post.admirer_first_name })

    var post_timestamp = moment(this.props.post.updated_at, 'YYYY-MM-DD HH:mm:ssZ')
    this.setState({ post_time: post_timestamp.local().fromNow() })

    if (this.props.post.total == 0) {
      this.setState({ show_like: false })
    }
    if (this.props.post.profile_img != null) {
      this.setState({ show_profile_img: true })
    }

    this.setState({
      content: this.props.post.content,
    })

    if (this.props.post.no_of_comments != 0) {
      this.setState({
        zero_comments: true,
        comment_total: this.props.post.no_of_comments,
      })
    }

    var post_id = this.props.post.id

    const getmyPostCount = async function () {
      try {
        var i

        const myPostCount = await axios.get(`/api/post/my_count/${post_id}`)

        if (myPostCount.data.no_of_my_posts[0].no_of_my_posts != 0) {
          self.setState({
            show_post_options: true,
          })
        }
      } catch (error) {
        console.log(error)
      }
    }

    const getGroup_info = async function () {
      try {
        var i

        const myPostCount = await axios.get(`/api/groups/${post.group_id}`)

        if (myPostCount.data.group.length != 0) {
          self.setState({
            group_name: myPostCount.data.group[0].name,
          })
        }
      } catch (error) {
        console.log(error)
      }
    }

    getmyPostCount()

    if (post.group_id != null && post.group_id != '') {
      if ((post.source = 'news_feed')) {
        this.state.show_group_name = true
        getGroup_info()
      }
    }
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
          comment_total: myComments.data.allComments.length,
        })
      } catch (error) {
        console.log(error)
      }
    }
    getComments()
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
      show_comments: false,
      show_more_comments: true,
    })
  }

  onChange = () => {
    const { show_comments } = this.state

    if (!show_comments) {
      this.pullComments()
    }
    this.setState({
      show_comments: !show_comments,
      show_more_comments: false,
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
      show_comments: true,
    })
  }
  insert_image_comment = () => {
    if (!this.state.uploading) {
      this.fileInputRef.current.click()
    }
  }
  handleSelectFile = (e) => {
    const fileList = e.target.files
    let name = `comment_image_${+new Date()}`
    this.doUploadS3(fileList[0], name, name)
  }

  doUploadS3 = async (file, id = '', name) => {
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
      this.setState({
        preview_file: [post.data.Location],
        file_keys: [post.data.Key],
      })
    } catch (error) {
      toast.success(<Toast_style text={'Opps, something went wrong. Unable to upload your file. Close this window and try again'} />)
    }
    this.setState({
      uploading: false,
    })
  }

  insert_comment = () => {
    if (this.state.value == '') {
      return
    }
    if (this.state.value.trim() == '') {
      this.setState({
        value: '',
      })
      return
    }
    this.onFocus()
    const saveComment = async () => {
      try {
        const postComment = await axios.post('/api/comments', {
          content: this.state.value.trim(),
          post_id: this.props.post.id,
          media_url: this.state.preview_file,
          file_keys: this.state.file_keys,
        })
        let { post, user } = this.props
        if (post.user_id != user.userInfo.id) {
          const addPostLike = axios.post('/api/notifications/addComment', {
            other_user_id: post.user_id,
            post_id: this.props.post.id,
            comment_id: postComment.data.id,
          })
        }
        this.setState({
          myComments: [],
          preview_file: [],
          file_keys: '',
        })
        this.pullComments()
        this.setState({
          comment_total: this.state.comment_total + 1,
          zero_comments: true,
        })
      } catch (error) {
        console.log(error)
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
        value: '',
      })
      return
    }
    const self = this
    var post_id = this.props.post.id

    const editPost = async function () {
      try {
        const myEditPost = await axios.post(`/api/post/update/${post_id}`, {
          content: self.state.value2,
        })
        self.setState({
          content: self.state.value2,
          edit_post: false,
          value2: '',
        })
      } catch (error) {
        console.log(error)
      }
    }
    editPost()
  }

  detectKey = (e) => {
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
        value2: '',
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
        return <IndividualComment comment={item} key={index} user={this.props.user} />
      })
    )
  }
  showComment = () => {
    const { myComments = [] } = this.state
    const comments = [...myComments]
    const commentArr = comments.length > 3 ? comments.slice(3) : comments
    console.log(commentArr, 'commentArr')

    return (
      commentArr.length > 0 &&
      commentArr.map((item, index) => {
        return <IndividualComment comment={item} key={index} user={this.props.user} />
      })
    )
  }

  clickedDropdown = () => {
    this.setState({
      dropdown: !this.state.dropdown,
    })
  }

  clickedEdit = async () => {
    this.setState({
      edit_post: true,
      value2: this.state.content.trim(),
      dropdown: false,
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
      const myPost_delete = axios.get(`/api/post/delete/${post_id}`)
      this.setState({
        post_deleted: true,
      })
    } catch (error) {
      console.log(error)
    }
  }

  showAlert() {
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
        onCancel={() => this.hideAlert('false')}>
        You will not be able to recover this entry!
      </SweetAlert>
    )

    this.setState({
      alert: getAlert(),
    })
  }

  hideAlert(text) {
    this.setState({
      alert: null,
      dropdown: false,
    })
    if (text == 'true') {
      this.delete_exp()
    }
  }

  render() {
    const { myComments = [], media_urls, post_deleted, alert, show_profile_img, show_comments, show_more_comments } = this.state
    if (post_deleted != true) {
      var show_media = false

      let { post } = this.props //destructing of object
      //destructing of object

      if (media_urls != [] && media_urls != null) {
        show_media = true
      }

      return (
        <div className='post__container'>
          {alert}
          <div className='post__body'>
            <div className='profile__image'>
              {show_profile_img && (
                <Link
                  to={`/profile/${post.alias}`}
                  className='user-img'
                  style={{
                    backgroundImage: `url('${post.profile_img}')`,
                  }}></Link>
              )}
              {!this.state.show_profile_img && (
                <Link
                  to={`/profile/${post.alias}`}
                  className='user-img'
                  style={{
                    backgroundImage: `url('https://s3-ap-southeast-2.amazonaws.com/mygame-media/default_user/new-user-profile-picture.png')`,
                  }}></Link>
              )}
              <div className='online__status'></div>
            </div>
            <div className='user__details'>
              <div className='author__username'>
                <Link to={`/profile/${post.alias}`}>{`@${post.alias} `}</Link> shared a {post.type == 'text' ? 'story' : 'image'}
                {'  from community: '}
                {this.state.show_group_name && <Link to={`/groups/${post.group_id}`}>@{this.state.group_name}</Link>}
              </div>
              <div className='post__time'>{this.state.post_time}</div>
            </div>
            <div className='post__content'>
              <p>{this.state.content}</p>
              {this.state.show_post_options && (
                <div className='post-options'>
                  <i className='fas fa-ellipsis-h' onClick={this.clickedDropdown}></i>
                </div>
              )}
              <div className={`post-dropdown ${this.state.dropdown == true ? 'active' : ''}`}>
                <nav>
                  <div className='edit' onClick={this.clickedEdit}>
                    Edit &nbsp;
                  </div>
                  <div className='delete' onClick={() => this.showAlert()}>
                    Delete
                  </div>
                  &nbsp;
                </nav>
              </div>
            </div>
          </div>
          <div className='media'>
            {this.state.edit_post && (
              <div className='update-info'>
                <div className='compose-comment'>
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
              </div>
            )}
            {show_media && post.type == 'photo' && (
              <ImageGallery
                items={this.state.images}
                showBullets={this.state.showBullets}
                autoPlay={this.state.autoPlay}
                isRTL={this.state.isRTL}
                disableSwipe={this.state.disableSwipe}
                y
              />
            )}
            {show_media &&
              post.type == 'video' &&
              this.state.media_urls.map(function (data, index) {
                return (
                  <video className='post-video' controls>
                    <source src={data}></source>
                  </video>
                )
              })}
          </div>
          <div className='update-stats'>
            <div className='icon-section'>
              <div className='like-circle'>
                <i className='fas fa-thumbs-up' />
              </div>
            </div>
            {this.state.show_like && (
              <div className='other-users'>
                {this.state.total > 1
                  ? `${post.admirer_first_name} and ${this.state.total} others liked this update`
                  : `${this.state.admirer_first_name} liked this update`}
              </div>
            )}
            {!this.state.show_like && <div className='other-users'>Be the first to like this!</div>}
            {this.state.like && (
              <div className='like-btn' onClick={() => this.click_unlike_btn(post.id)}>
                <i className='fas fa-thumbs-up' />
                &nbsp;Like
              </div>
            )}
            {!this.state.like && (
              <div className='like-btn' onClick={() => this.click_like_btn(post.id)}>
                <i className='far fa-thumbs-up' />
                &nbsp;Like
              </div>
            )}
            {this.state.zero_comments && (
              <div className='comments-stats' onClick={this.onChange}>
                <i class='far fa-comment-alt'></i>
                {' comments'}
                {/* {this.state.comment_total > 1 ? `${this.state.comment_total} comments` : `${this.state.comment_total} comment`}{' '} */}
              </div>
            )}
            {!this.state.zero_comments && (
              <div className='comments-stats' onClick={this.focusTextInput}>
                {' '}
                No comments
              </div>
            )}
          </div>
          {show_comments && myComments.length > 3 && (
            <div className='show__comments_count' onClick={this.show_more_comments}>{`View all (${myComments.length}) comments`}</div>
          )}
          <div className='comments'>
            {show_comments && <div className='show-individual-comments'>{this.showComment()}</div>}
            {show_more_comments && <div className='show-individual-comments'>{this.showMoreComment()}</div>}
          </div>
          <div className='compose-comment'>
            <textarea
              name='name'
              placeholder='Make a comment...'
              value={this.state.value}
              onChange={this.handleChange}
              maxLength='254'
              onKeyDown={this.detectKey}
              ref={this.setTextInputRef}
            />
            <div className='insert__images' onClick={this.insert_image_comment}>
              <input type='file' ref={this.fileInputRef} onChange={this.handleSelectFile} name='insert__images' />
              <img src={`${buckectBaseUrl}Dashboard/BTN_Attach_Image.svg`} />
            </div>

            <div className='profile__image'>
              {this.state.show_profile_img && (
                <Link
                  to={`/profile/${post.alias}`}
                  className='user-img'
                  style={{
                    backgroundImage: `url('${post.profile_img}')`,
                  }}></Link>
              )}
              {!this.state.show_profile_img && (
                <Link
                  to={`/profile/${post.alias}`}
                  className='user-img'
                  style={{
                    backgroundImage: `url('https://s3-ap-southeast-2.amazonaws.com/mygame-media/default_user/new-user-profile-picture.png')`,
                  }}></Link>
              )}
              <div className='online__status'></div>
            </div>
          </div>
          {this.state.preview_file.length > 0 && (
            <div className='preview__image'>
              <img src={`${this.state.preview_file[0]}`} />
            </div>
          )}

          {/*<div className='update-container'>
          {this.state.alert}
          <div className='padding-container'>
            <div className='grey-container'>
              <div className='author-info'>
                {this.state.show_profile_img && (
                  <Link
                    to={`/profile/${post.alias}`}
                    className='user-img'
                    style={{
                      backgroundImage: `url('${post.profile_img}')`,
                    }}></Link>
                )}
                {!this.state.show_profile_img && (
                  <Link
                    to={`/profile/${post.alias}`}
                    className='user-img'
                    style={{
                      backgroundImage: `url('https://s3-ap-southeast-2.amazonaws.com/mygame-media/default_user/new-user-profile-picture.png')`,
                    }}></Link>
                )}
                <div className='info'>
                  <Link to={`/profile/${post.alias}`}>{`${post.alias}`}</Link> shared a {post.type == 'text' ? 'story' : 'image'}
                  {this.state.show_group_name && <Link to={`/groups/${post.group_id}`}>from community: {this.state.group_name}</Link>}
                </div>
                {this.state.show_post_options && (
                  <div className='post-options'>
                    <i className='fas fa-ellipsis-h' onClick={this.clickedDropdown}></i>
                  </div>
                )}
                <div className={`post-dropdown ${this.state.dropdown ? 'active' : ''}`}>
                  <nav>
                    <div className='edit' onClick={this.clickedEdit}>
                      Edit &nbsp;
                    </div>
                    <div className='delete' onClick={() => this.showAlert()}>
                      Delete
                    </div>
                    &nbsp;
                  </nav>
                </div>
              </div>
              <div className='media'>
                {!this.state.edit_post && (
                  <div className='update-info'>
                    <p>{this.state.content}</p>
                  </div>
                )}
                {this.state.edit_post && (
                  <div className='update-info'>
                    <div className='compose-comment'>
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
                  </div>
                )}
                {show_media && post.type == 'photo' && (
                  <ImageGallery
                    items={this.state.images}
                    showBullets={this.state.showBullets}
                    autoPlay={this.state.autoPlay}
                    isRTL={this.state.isRTL}
                    disableSwipe={this.state.disableSwipe}
                    y
                  />
                )}
                {show_media &&
                  post.type == 'video' &&
                  this.state.media_urls.map(function (data, index) {
                    return (
                      <video className='post-video' controls>
                        <source src={data}></source>
                      </video>
                    )
                  })}
              </div>
              <div className='update-stats'>
                <div className='icon-section'>
                  <div className='like-circle'>
                    <i className='fas fa-thumbs-up' />
                  </div>
                </div>
                {this.state.show_like && (
                  <div className='other-users'>
                    {this.state.total > 1
                      ? `${post.admirer_first_name} and ${this.state.total} others liked this update`
                      : `${this.state.admirer_first_name} liked this update`}
                  </div>
                )}
                {!this.state.show_like && <div className='other-users'>Be the first to like this!</div>}
                <div className='post-time'>{this.state.post_time}</div>
                {this.state.like && (
                  <div className='like-btn' onClick={() => this.click_unlike_btn(post.id)}>
                    <i className='fas fa-thumbs-up' />
                    &nbsp;Like
                  </div>
                )}
                {!this.state.like && (
                  <div className='like-btn' onClick={() => this.click_like_btn(post.id)}>
                    <i className='far fa-thumbs-up' />
                    &nbsp;Like
                  </div>
                )}
                {this.state.zero_comments && (
                  <div className='comments-stats' onClick={this.onChange}>
                    {' '}
                    {this.state.comment_total > 1 ? `${this.state.comment_total} comments` : `${this.state.comment_total} comment`}{' '}
                  </div>
                )}
                {!this.state.zero_comments && (
                  <div className='comments-stats' onClick={this.focusTextInput}>
                    {' '}
                    No comments
                  </div>
                )}
              </div>
              <div className='compose-comment'>
                <textarea
                  name='name'
                  rows={8}
                  cols={80}
                  placeholder='Make a comment...'
                  onFocus={this.onFocus}
                  value={this.state.value}
                  onChange={this.handleChange}
                  maxLength='254'
                  onKeyDown={this.detectKey}
                  ref={this.setTextInputRef}
                />
                <div className='buttons'>
                  <div className='repost-btn' onClick={this.insert_comment}>
                    <i className='fas fa-reply' />
                  </div>
                </div>
              </div>
              <div className='comments'>
                {this.state.show_more_comments && <div className='show-individual-comments'>{this.showComment()}</div>}
              </div>
            </div>
          </div>
                </div>*/}
        </div>
      )
    } else {
      return <div className='update-container'></div>
    }
  }
}

const app = document.getElementById('app')
