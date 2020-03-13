import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import SweetAlert from 'react-bootstrap-sweetalert'

export default class IndividualReply extends Component {
  constructor() {
    super()
    this.state = {
      show_reply_like: false,
      show_reply_reply: false,
      reply_like: false,
      show_profile_img: false,
      reply_like_total: 0,
      show_add_reply: false,
      dropdown: false,
      reply_deleted: false,
      show_reply_options: false,
      show_edit_reply: false,
      value: '',
      content: '',
      reply_time: '',
      alert: null,
    }
    this.textInput = null

    this.setTextInputRef = (element) => {
      this.textInput = element
    }

    this.focusTextInput = () => {
      // Focus the text input using the raw DOM API
      if (this.textInput) this.textInput.focus()
    }
  }

  componentWillMount() {
    if (this.props.reply.profile_img != null) {
      this.setState({ show_profile_img: true })
    }

    this.setState({
      content: this.props.reply.content,
    })

    var reply_timestamp = moment(this.props.reply.updated_at, 'YYYY-MM-DD HH:mm:ssZ')
    this.setState({ reply_time: reply_timestamp.local().fromNow() })

    const self = this
    let reply = this.props

    const getCommentReplies = async function() {
      try {
        var i

        const myReplyLikes = await axios.get(`/api/likes/reply/${reply.reply.id}`)

        if (myReplyLikes.data.do_I_like_this_reply[0].myOpinion != 0) {
          self.setState({
            reply_like: true,
          })
        }

        if (myReplyLikes.data.no_of_likes[0].no_of_likes != 0) {
          self.setState({
            show_reply_like: true,
            reply_like_total: myReplyLikes.data.no_of_likes[0].no_of_likes,
          })
        }
      } catch (error) {
        console.log(error)
      }
    }

    const getmyRepliesCount = async function() {
      try {
        var i

        const myRepliesCount = await axios.get(`/api/replies/my_count/${reply.reply.id}`)

        if (myRepliesCount.data.no_of_my_replies[0].no_of_my_replies != 0) {
          self.setState({
            show_reply_options: true,
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
    getCommentReplies()
    getmyRepliesCount()
  }

  click_reply_like_btn = (reply_id) => {
    try {
      const replyLike = axios.post('/api/likes', {
        reply_id: reply_id,
      })

      let { comment_user_id, post_id, reply, user, schedule_game_id } = this.props
      if (reply.user_id != user.userInfo.id) {
        if (schedule_game_id != null) {
          const addReplyLike = axios.post('/api/notifications/addReplyLike', {
            other_user_id: reply.user_id,
            schedule_games_id: schedule_game_id,
            reply_id: reply_id,
          })
        } else {
          const addReplyLike = axios.post('/api/notifications/addReplyLike', {
            other_user_id: reply.user_id,
            post_id: post_id,
            reply_id: reply_id,
          })
        }
      }
    } catch (error) {
      console.log(error)
    }

    this.setState({
      reply_like_total: this.state.reply_like_total + 1,
    })

    this.setState({
      show_reply_like: true,
      reply_like: !this.state.reply_like,
    })
  }

  click_reply_unlike_btn = (reply_id) => {
    let { post_id } = this.props
    try {
      const reply_unlike = axios.get(`/api/likes/delete/reply/${reply_id}`)
      const deleteReplyLike = axios.get(`/api/notifications/deleteReplyLike/${reply_id}`)
    } catch (error) {
      console.log(error)
    }

    if (this.state.reply_like_total == 1) {
      this.setState({
        show_reply_like: false,
      })
    }

    this.setState({
      reply_like_total: this.state.reply_like_total - 1,
    })

    this.setState({
      reply_like: !this.state.reply_like,
    })
  }

  clickedDropdown = () => {
    this.setState({
      dropdown: !this.state.dropdown,
    })
  }

  delete_exp = () => {
    var reply_id = this.props.reply.id

    try {
      const myReply_delete = axios.get(`/api/replies/delete/${reply_id}`)
      this.setState({
        reply_deleted: true,
      })
    } catch (error) {
      console.log(error)
    }
  }

  clickedEdit = async () => {
    var reply_id = this.props.reply.id

    try {
      const myReply_content = await axios.get(`/api/replies/show_reply/${reply_id}`)

      this.setState({
        show_edit_reply: true,
        dropdown: false,
        value: myReply_content.data.this_reply[0].content,
      })
    } catch (error) {
      console.log(error)
    }
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value })
  }

  detectKey = (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      return
    }

    if (e.key === 'Escape') {
      this.setState({
        show_edit_reply: false,
        dropdown: false,
        value: '',
      })
    }

    if (e.key === 'Enter') {
      e.preventDefault()
      e.stopPropagation()
      this.insert_reply()
    }
  }

  insert_reply = () => {
    if (this.state.value == '') {
      return
    }
    if (this.state.value.trim() == '') {
      this.setState({
        value: '',
      })
      return
    }
    const self = this
    var reply_id = this.props.reply.id

    const saveReply = async function() {
      try {
        const mysaveReply = await axios.post(`/api/replies/update/${reply_id}`, {
          content: self.state.value,
        })

        self.setState({
          show_edit_reply: false,
          dropdown: false,
          content: self.state.value,
          value: '',
        })
      } catch (error) {
        console.log(error)
      }
    }
    saveReply()
  }

  showAlert() {
    const getAlert = () => (
      <SweetAlert
        danger
        showCancel
        title='Are you sure you wish to delete this reply?'
        confirmBtnText='Make it so!'
        confirmBtnBsStyle='danger'
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

  render() {
    let { reply } = this.props
    //console.log(reply);
    if (this.state.reply_deleted != true) {
      return (
        <div className='comment-replies'>
          {this.state.alert}
          {this.state.show_profile_img && (
            <Link
              to={`/profile/${reply.alias}`}
              className='user-img-reply'
              style={{
                backgroundImage: `url('${reply.profile_img}')`,
              }}></Link>
          )}
          {!this.state.show_profile_img && (
            <Link
              to={`/profile/${reply.alias}`}
              className='user-img-reply'
              style={{
                backgroundImage: `url('https://image.flaticon.com/icons/svg/149/149071.svg')`,
              }}></Link>
          )}
          <div className='reply-author-info'>
            {reply.alias}
            {this.state.show_reply_options && (
              <div className='reply-options'>
                <i className='fas fa-ellipsis-h' onClick={this.clickedDropdown}></i>
              </div>
            )}
          </div>
          <div className={`reply-dropdown ${this.state.dropdown ? 'active' : ''}`}>
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
          <div className='reply-comment-content'>{this.state.content}</div>
          <div className='replies-panel'>
            <div className='comment-panel'>
              {this.state.reply_like && (
                <div className='comment-panel-liked' onClick={() => this.click_reply_unlike_btn(reply.id)}>
                  Like
                </div>
              )}
              {!this.state.reply_like && (
                <div className='comment-panel-like' onClick={() => this.click_reply_like_btn(reply.id)}>
                  Like
                </div>
              )}
              {(this.state.show_reply_like || this.state.show_reply) && <div className='divider'>|</div>}
              {this.state.show_reply_like && (
                <div className='no-likes'>
                  {this.state.reply_like_total} {this.state.reply_like_total > 1 ? 'Likes' : 'Like'}{' '}
                </div>
              )}
              <div className='comment-time'>
                <i className='fas fa-circle'></i> {this.state.reply_time}
              </div>
            </div>
          </div>
          {this.state.show_edit_reply && (
            <div className='add-reply'>
              <input
                type='text'
                id='reply_name_box'
                className='reply-name-box'
                onKeyDown={this.detectKey}
                ref={this.setTextInputRef}
                onChange={this.handleChange}
                value={this.state.value}
              />
            </div>
          )}
        </div>
      )
    } else {
      return <div className='comment-replies'></div>
    }
  }
}

const app = document.getElementById('app')
