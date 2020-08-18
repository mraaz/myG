/*
 * Author : nitin Tyagi
 * github  : https://github.com/realinit
 * Email : nitin.1992tyagi@gmail.com
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import IndividualReply from './IndividualReply'
import moment from 'moment'
import SweetAlert from './common/MyGSweetAlert'
const buckectBaseUrl = 'https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/'

export default class IndividualComment extends Component {
  constructor() {
    super()
    this.state = {
      show_like: false,
      show_reply: false,
      show_add_reply: false,
      like: false,
      show_profile_img: false,
      total: 0,
      reply_total: 0,
      reply_name_box: '',
      value: '',
      show_more_replies: true,
      dropdown: false,
      comment_deleted: false,
      show_comment_options: false,
      show_edit_comment: false,
      content: '',
      comment_time: '',
      alert: null,
      uploading: false,
      preview_file: [],
      file_keys: [],
      hideReplies: false,
      replyShowCount: 1,
    }
    this.textInput = null
    this.fileInputRef = React.createRef()

    this.setTextInputRef = (element) => {
      this.textInput = element
    }

    this.focusTextInput = () => {
      // Focus the text input using the raw DOM API
      if (this.textInput) this.textInput.focus()
    }
  }

  componentDidMount() {
    if (this.props.comment.profile_img != null) {
      this.setState({ show_profile_img: true })
    }

    this.setState({
      content: this.props.comment.content,
    })

    var comment_timestamp = moment(this.props.comment.updated_at, 'YYYY-MM-DD HH:mm:ssZ')
    this.setState({ comment_time: comment_timestamp.local().fromNow() })

    const self = this
    let comment = this.props

    const getCommentLike = async function() {
      try {
        var i

        const myCommentLike = await axios.get(`/api/likes/comment/${comment.comment.id}`)

        if (myCommentLike.data.do_I_like_this_comment[0].myOpinion != 0) {
          self.setState({
            like: true,
          })
        }
        if (myCommentLike.data.no_of_likes[0].no_of_likes != 0) {
          self.setState({
            show_like: true,
            total: myCommentLike.data.no_of_likes[0].no_of_likes,
          })
        }
      } catch (error) {
        console.log(error)
      }
    }

    const getCommentReplies = async function() {
      try {
        var i

        const myCommentReplies = await axios.get(`/api/replies/${comment.comment.id}`)
        self.setState({
          myReplies: myCommentReplies.data.this_comments_replies,
        })

        if (myCommentReplies.data.no_of_replies[0].no_of_replies != 0) {
          self.setState({
            show_reply: true,
            reply_total: myCommentReplies.data.no_of_replies[0].no_of_replies,
          })
        }
      } catch (error) {
        console.log(error)
      }
    }

    const getmyCommentCount = async function() {
      try {
        var i

        const myCommentCount = await axios.get(`/api/comments/my_count/${comment.comment.id}`)

        if (myCommentCount.data.no_of_my_comments[0].no_of_my_comments != 0) {
          self.setState({
            show_comment_options: true,
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
    getCommentLike()
    getCommentReplies()
    getmyCommentCount()
  }

  pullReplies = () => {
    var comment_id = this.props.comment.id
    const self = this

    const getComments = async function() {
      try {
        const myCommentReplies = await axios.get(`/api/replies/${comment_id}`)
        self.setState({
          myReplies: myCommentReplies.data.this_comments_replies,
        })
      } catch (error) {
        console.log(error)
      }
    }
    getComments()
  }

  click_like_btn = (comment_id) => {
    this.setState({
      total: this.state.total + 1,
    })

    try {
      axios.post('/api/likes', {
        comment_id: comment_id,
      })
    } catch (error) {
      console.log(error)
    }

    this.setState({
      show_like: true,
      like: !this.state.like,
    })
  }

  click_unlike_btn = (comment_id) => {
    this.setState({
      total: this.state.total - 1,
    })

    let { comment } = this.props
    try {
      axios.get(`/api/likes/delete/comment/${comment_id}`)
    } catch (error) {
      console.log(error)
    }

    if (this.state.total == 1) {
      this.setState({
        show_like: false,
      })
    }

    this.setState({
      like: !this.state.like,
    })
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value })
  }

  handleChange2 = (e) => {
    this.setState({ value2: e.target.value })
  }

  toggleReply = () => {
    this.setState({
      show_add_reply: !this.state.show_add_reply,
    })

    if (!this.state.show_add_reply) {
      setTimeout(
        function() {
          //Start the timer
          this.focusTextInput()
        }.bind(this),
        100
      )
    }
  }
  show_more_replies = () => {
    this.setState({ show_more_replies: !this.state.show_more_replies, hideReplies: false })
  }

  showReplies = () => {
    const { myReplies = [], replyShowCount } = this.state
    const replies = [...myReplies]
    const len = replies.length
    const repliesArr = replies.length > 1 ? replies.slice(len - replyShowCount, len) : replies
    if (repliesArr.length > 0) {
      return repliesArr.map((item, index) => {
        return (
          <IndividualReply
            reply={item}
            key={item.id}
            comment_user_id={this.props.comment.user_id}
            post_id={this.props.comment.post_id}
            user={this.props.user}
            schedule_game_id={this.props.comment.schedule_games_id}
          />
        )
      })
    }
  }
  showMoreReplies = () => {
    const { myReplies = [] } = this.state
    if (myReplies.length > 0) {
      return myReplies.map((item, index) => {
        return (
          <IndividualReply
            reply={item}
            key={index}
            comment_user_id={this.props.comment.user_id}
            post_id={this.props.comment.post_id}
            user={this.props.user}
            schedule_game_id={this.props.comment.schedule_games_id}
          />
        )
      })
    }
  }

  detectKey = (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      return
    }

    if (e.key === 'Enter') {
      e.preventDefault()
      e.stopPropagation()
      if (!this.state.uploading) {
        this.insert_reply()
      } else {
        toast.warn(<Toast_style text={'Opps,An image is uploading. Please Wait...'} />)
      }
    }
  }

  detectKey2 = (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      return
    }

    if (e.key === 'Escape') {
      this.setState({
        show_edit_comment: false,
        dropdown: false,
        value2: '',
      })
    }

    if (e.key === 'Enter') {
      event.preventDefault()
      event.stopPropagation()
      this.insert_comment()
    }
  }

  insert_comment = () => {
    if (this.state.value2 == '') {
      return
    }
    if (this.state.value2.trim() == '') {
      this.setState({
        value2: '',
      })
      return
    }
    const self = this
    var comment_id = this.props.comment.id

    const saveComment = async function() {
      try {
        const mysaveComment = await axios.post(`/api/comments/update/${comment_id}`, {
          content: self.state.value2,
        })

        self.setState({
          show_edit_comment: false,
          dropdown: false,
          content: self.state.value2,
          value2: '',
        })
      } catch (error) {
        console.log(error)
      }
    }
    saveComment()
  }

  insert_reply = (e) => {
    const { value = '', preview_file = [] } = this.state

    if (value.trim() == '' && preview_file.length == 0) {
      return
    }
    const self = this
    let postReply

    const saveReply = async () => {
      const { myReplies = [] } = this.state
      try {
        postReply = await axios.post('/api/replies', {
          content: self.state.value.trim(),
          comment_id: self.props.comment.id,
          media_url: self.state.preview_file.length > 0 ? JSON.stringify(self.state.preview_file) : '',
          file_keys: self.state.file_keys.length > 0 ? self.state.file_keys : '',
        })

        let { comment, user } = self.props
        // if (comment.user_id != user.userInfo.id) {
        //   if (self.props.comment.schedule_games_id != null) {
        //     const addReply = axios.post('/api/notifications/addReply', {
        //       other_user_id: comment.user_id,
        //       schedule_games_id: self.props.comment.schedule_games_id,
        //       reply_id: postReply.data.id,
        //       media_url: self.state.preview_file.length > 0 ? JSON.stringify(self.state.preview_file) : '',
        //       file_keys: self.state.file_keys.length > 0 ? self.state.file_keys : '',
        //     })
        //   } else {
        //     const addReply = axios.post('/api/notifications/addReply', {
        //       other_user_id: comment.user_id,
        //       post_id: comment.post_id,
        //       reply_id: postReply.data.id,
        //       media_url: self.state.preview_file.length > 0 ? JSON.stringify(self.state.preview_file) : '',
        //       file_keys: self.state.file_keys.length > 0 ? self.state.file_keys : '',
        //     })
        //   }
        // }
        self.setState({
          myReplies: [...myReplies, ...postReply.data],
        })

        // self.pullReplies()

        self.setState({
          value: '',
          show_more_replies: !self.show_more_replies,
          show_add_reply: false,
          reply_total: self.state.reply_total + 1,
          show_reply: true,
          preview_file: [],
        })
      } catch (error) {
        console.log(error)
      }
    }
    saveReply()
  }

  clickedDropdown = () => {
    this.setState({
      dropdown: !this.state.dropdown,
    })
  }

  clickedEdit = async () => {
    let comment_id = this.props.comment.id
    try {
      const myComment_content = await axios.get(`/api/comments/show_comment/${comment_id}`)
      const content = myComment_content.data.this_comment[0].content
      this.setState({
        show_edit_comment: true,
        dropdown: false,
        value2: content,
      })
    } catch (error) {
      console.log(error)
    }
  }

  delete_exp = () => {
    let comment_id = this.props.comment.id

    try {
      const myComment_delete = axios.get(`/api/comments/delete/${comment_id}`)
      this.setState({
        comment_deleted: true,
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
        title='Are you sure you wish to delete this comment?'
        confirmBtnText='Make it so!'
        focusCancelBtn={true}
        focusConfirmBtn={false}
        showCloseButton={false}
        btnSize='lg'
        style={{
          display: 'flex',
          whiteSpace: 'pre',
          width: '41%',
        }}
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

  insert_image_comment = () => {
    if (!this.state.uploading) {
      this.fileInputRef.current.click()
    }
  }

  handleSelectFile = (e) => {
    const fileList = e.target.files
    let type = fileList[0].type.split('/')
    let name = `reply_${type}_${+new Date()}_${fileList[0].name}`
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
      toast.success(<Toast_style text={'Opps, something went wrong. Unable to upload your file.'} />)
    }
    this.setState({
      uploading: false,
    })
  }
  clearPreviewImage = () => {
    this.setState({
      preview_file: [],
      file_keys: [],
    })
  }

  hide_replies = () => {
    const { myReplies = [], show_more_replies } = this.state
    this.setState({ hideReplies: true, show_more_replies: !show_more_replies, replyShowCount: myReplies.length })
  }

  render() {
    let { comment } = this.props
    let {
      profile_img = 'https://s3-ap-southeast-2.amazonaws.com/mygame-media/default_user/new-user-profile-picture.png',
      media_url = '',
    } = comment
    const { myReplies = [], show_more_replies = true, hideReplies = false } = this.state
    const media_urls = media_url && media_url.length > 0 ? JSON.parse(media_url) : ''
    if (this.state.comment_deleted != true) {
      return (
        <div className='individual-comment-container'>
          {this.state.alert}
          <div className='comment__section'>
            <div className='comment-info'>
              <Link to={`/profile/${comment.alias}`}>{`@${comment.alias}`}</Link>
              {'  '}
              {!this.state.show_edit_comment && (
                <div className='comment-content'>
                  <p>{this.state.content}</p>
                  {media_urls.length > 0 && (
                    <div className='show__comment__image'>
                      {media_urls.map((img) => {
                        return <img src={img} />
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className='comment__shape'></div>

            {this.state.show_edit_comment && (
              <div className='edit__comment__input'>
                <input
                  type='text'
                  id='reply_name_box'
                  className='reply-name-box'
                  onKeyDown={this.detectKey2}
                  ref={this.setTextInputRef}
                  onChange={this.handleChange2}
                  value={this.state.value2}
                />
              </div>
            )}

            {/* comment option start  */}
            {this.state.show_comment_options && (
              <div className='comment-options'>
                <i className='fas fa-ellipsis-h' onClick={this.clickedDropdown}></i>
              </div>
            )}
            <div className={`dropdown ${this.state.dropdown ? 'active' : ''}`}>
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
            {/* comment option end  */}

            {/* profile section start  */}
            <Link to={`/profile/${comment.alias}`} className='user-img'>
              <div
                className='profile__image'
                style={{
                  backgroundImage: `url('${profile_img}')`,
                  backgroundSize: 'cover',
                }}>
                <div className='online__status'></div>
              </div>
            </Link>
          </div>
          {/* profile section end  */}
          <div className='reply__comment_section'>
            <div className='comment-panel-reply' onClick={this.toggleReply}>
              Reply
            </div>
            {this.state.like && (
              <div className='comment-panel-liked' onClick={() => this.click_unlike_btn(comment.id)}>
                Unlike
              </div>
            )}
            {!this.state.like && (
              <div className='comment-panel-like' onClick={() => this.click_like_btn(comment.id)}>
                Like
              </div>
            )}
            {this.state.show_like && (
              <div className='no-likes'>
                {this.state.total} {this.state.total > 1 ? 'Likes' : 'Like'}{' '}
              </div>
            )}
          </div>

          {/* comment reply start */}
          <div className='comment-panel'>
            {show_more_replies && myReplies.length > 0 && (
              <div className='show__moreReply' onClick={this.show_more_replies}>{` View all (${myReplies.length}) replies`}</div>
            )}
            {!show_more_replies && myReplies.length > 0 && (
              <div className='show__moreReply' onClick={this.hide_replies}>{` Hide all (${myReplies.length}) replies`}</div>
            )}
            {show_more_replies && !hideReplies && this.showReplies()}
            {!show_more_replies && !hideReplies && this.showMoreReplies()}

            {this.state.show_add_reply && (
              <div className='add-reply'>
                <input
                  type='text'
                  id='reply_name_box'
                  className='reply-name-box'
                  placeholder='Add a reply...'
                  onKeyDown={this.detectKey}
                  ref={this.setTextInputRef}
                  onChange={this.handleChange}
                  value={this.state.value}
                />
                <div className='insert__images' onClick={this.insert_image_comment}>
                  <input
                    type='file'
                    accept='image/jpeg,image/jpg,image/png,image/gif*'
                    ref={this.fileInputRef}
                    onChange={this.handleSelectFile}
                    name='insert__images'
                  />
                  <img src={`${buckectBaseUrl}Dashboard/BTN_Attach_Image.svg`} />
                </div>
                {this.state.uploading && <div className='uploadImage_loading'>Uploading ...</div>}
                {this.state.preview_file.length > 0 && (
                  <div className='preview__image'>
                    <img src={`${this.state.preview_file[0]}`} />
                    <div className='clear__preview__image' onClick={this.clearPreviewImage}>
                      X
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )
    } else {
      return <div className='individual-comment-container'></div>
    }
  }
}

const app = document.getElementById('app')
