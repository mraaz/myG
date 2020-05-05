import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import IndividualReply from './IndividualReply'
import moment from 'moment'
import SweetAlert from 'react-bootstrap-sweetalert'

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

    const getCommentLike = async function () {
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

    const getCommentReplies = async function () {
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

    const getmyCommentCount = async function () {
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

    const getComments = async function () {
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
    try {
      const commentLike = axios.post('/api/likes', {
        comment_id: comment_id,
      })

      let { comment, user } = this.props
      if (comment.user_id != user.userInfo.id) {
        if (this.props.comment.schedule_games_id != null) {
          const addCommentLike = axios.post('/api/notifications/addCommentLike', {
            other_user_id: comment.user_id,
            schedule_games_id: this.props.comment.schedule_games_id,
            comment_id: comment_id,
          })
        } else {
          const addCommentLike = axios.post('/api/notifications/addCommentLike', {
            other_user_id: comment.user_id,
            post_id: comment.post_id,
            comment_id: comment_id,
          })
        }
      }
    } catch (error) {
      console.log(error)
    }

    this.setState({
      total: this.state.total + 1,
    })

    this.setState({
      show_like: true,
      like: !this.state.like,
    })
  }

  click_unlike_btn = (comment_id) => {
    let { comment } = this.props
    try {
      const unlike = axios.get(`/api/likes/delete/comment/${comment_id}`)
      const deleteCommentLike = axios.get(`/api/notifications/deleteCommentLike/${comment_id}`)
    } catch (error) {
      console.log(error)
    }

    if (this.state.total == 1) {
      this.setState({
        show_like: false,
      })
    }

    this.setState({
      total: this.state.total - 1,
    })

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
        function () {
          //Start the timer
          this.focusTextInput()
        }.bind(this),
        100
      )
    }
  }

  showReplies = () => {
    if (this.state.myReplies != undefined) {
      return this.state.myReplies.map((item, index) => {
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
      this.insert_reply()
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

    const saveComment = async function () {
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
    var postReply

    const saveReply = async function () {
      try {
        postReply = await axios.post('/api/replies', {
          content: self.state.value.trim(),
          comment_id: self.props.comment.id,
        })

        let { comment, user } = self.props
        if (comment.user_id != user.userInfo.id) {
          if (self.props.comment.schedule_games_id != null) {
            const addReply = axios.post('/api/notifications/addReply', {
              other_user_id: comment.user_id,
              schedule_games_id: self.props.comment.schedule_games_id,
              reply_id: postReply.data.id,
            })
          } else {
            const addReply = axios.post('/api/notifications/addReply', {
              other_user_id: comment.user_id,
              post_id: comment.post_id,
              reply_id: postReply.data.id,
            })
          }
        }
        self.setState({
          myReplies: [],
        })

        self.pullReplies()

        self.setState({
          value: '',
          show_more_replies: !self.show_more_replies,
          show_add_reply: false,
          reply_total: self.state.reply_total + 1,
          show_reply: true,
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
    var comment_id = this.props.comment.id

    try {
      const myComment_content = await axios.get(`/api/comments/show_comment/${comment_id}`)

      this.setState({
        show_edit_comment: true,
        dropdown: false,
        value2: myComment_content.data.this_comment[0].content,
      })
    } catch (error) {
      console.log(error)
    }
  }

  delete_exp = () => {
    var comment_id = this.props.comment.id

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

  render() {
    let { comment } = this.props
    if (this.state.comment_deleted != true) {
      return (
        <div className='individual-comment-container'>
          {this.state.alert}
          <div className='comment__section'>
            <div className='comment-info'>
              <Link to={`/profile/${comment.alias}`}>{`@${comment.alias}`}</Link>
              {'  '}
              <div className='comment-content'>
                <p>{this.state.content}</p>
                {comment.media_url && (
                  <div className='show__comment__image'>
                    <img src={comment.media_url} />
                  </div>
                )}
              </div>
            </div>
            <div className='comment__shape'></div>

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
            <div className='profile__image'>
              {this.state.show_profile_img && (
                <Link
                  to={`/profile/${comment.alias}`}
                  className='user-img'
                  style={{
                    backgroundImage: `url('${comment.profile_img}')`,
                  }}></Link>
              )}
              {!this.state.show_profile_img && (
                <Link
                  to={`/profile/${comment.alias}`}
                  className='user-img'
                  style={{
                    backgroundImage: `url('https://s3-ap-southeast-2.amazonaws.com/mygame-media/default_user/new-user-profile-picture.png')`,
                  }}></Link>
              )}
              <div className='online__status'></div>
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
            </div>
          </div>
          {/* comment reply start */}
          <div className='comment-panel'>
            {this.state.show_more_replies && this.showReplies()}
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
              </div>
            )}
          </div>
        </div>
        // <div className='individual-comment-container'>
        //   {this.state.alert}
        //   <div className='author-info'>
        //     {this.state.show_profile_img && (
        //       <Link
        //         to={`/profile/${comment.alias}`}
        //         className='user-img'
        //         style={{
        //           backgroundImage: `url('${comment.profile_img}')`,
        //         }}></Link>
        //     )}
        //     {!this.state.show_profile_img && (
        //       <Link
        //         to={`/profile/${comment.alias}`}
        //         className='user-img'
        //         style={{
        //           backgroundImage: `url('https://image.flaticon.com/icons/svg/149/149071.svg')`,
        //         }}></Link>
        //     )}
        //     <div className='comment-info'>
        //       <Link to={`/profile/${comment.alias}`}>{`${comment.alias}`}</Link>
        //     </div>
        //     {this.state.show_comment_options && (
        //       <div className='comment-options'>
        //         <i className='fas fa-ellipsis-h' onClick={this.clickedDropdown}></i>
        //       </div>
        //     )}
        // <div className={`dropdown ${this.state.dropdown ? 'active' : ''}`}>
        //   <nav>
        //     <div className='edit' onClick={this.clickedEdit}>
        //       Edit &nbsp;
        //     </div>
        //     <div className='delete' onClick={() => this.showAlert()}>
        //       Delete
        //     </div>
        //     &nbsp;
        //   </nav>
        // </div>
        //   </div>
        //   <div className='comment-content'>
        //     <p>{this.state.content}</p>
        //   </div>
        //   <div className='comment-panel'>
        // {this.state.like && (
        //   <div className='comment-panel-liked' onClick={() => this.click_unlike_btn(comment.id)}>
        //     Like
        //   </div>
        // )}
        // {!this.state.like && (
        //   <div className='comment-panel-like' onClick={() => this.click_like_btn(comment.id)}>
        //     Like
        //   </div>
        // )}
        // <div className='comment-panel-reply' onClick={this.toggleReply}>
        //   Reply
        // </div>
        //     {(this.state.show_like || this.state.show_reply) && <div className='divider'>|</div>}
        //     {this.state.show_like && (
        //       <div className='no-likes'>
        //         {this.state.total} {this.state.total > 1 ? 'Likes' : 'Like'}{' '}
        //       </div>
        //     )}
        //     {this.state.show_reply && this.state.show_like && <div className='colon'>:</div>}
        //     {this.state.show_reply && (
        //       <div className='no-reply'>
        //         {' '}
        //         {this.state.reply_total} {this.state.reply_total > 1 ? 'Replies' : 'Reply'}
        //       </div>
        //     )}
        //     <div className='comment-time'>
        //       <i className='fas fa-circle'></i> {this.state.comment_time}
        //     </div>
        //   </div>
        //   {this.state.show_more_replies && this.showReplies()}
        // {this.state.show_add_reply && (
        //   <div className='add-reply'>
        //     <input
        //       type='text'
        //       id='reply_name_box'
        //       className='reply-name-box'
        //       placeholder='Add a reply...'
        //       onKeyDown={this.detectKey}
        //       ref={this.setTextInputRef}
        //       onChange={this.handleChange}
        //       value={this.state.value}
        //     />
        //   </div>
        // )}
        //   {this.state.show_edit_comment && (
        //     <div className='add-reply'>
        //       <input
        //         type='text'
        //         id='reply_name_box'
        //         className='reply-name-box'
        //         onKeyDown={this.detectKey2}
        //         ref={this.setTextInputRef}
        //         onChange={this.handleChange2}
        //         value={this.state.value2}
        //       />
        //     </div>
        //   )}
        // </div>
      )
    } else {
      return <div className='individual-comment-container'></div>
    }
  }
}

const app = document.getElementById('app')
