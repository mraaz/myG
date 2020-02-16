import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import IndividualComment from './IndividualComment'
import moment from 'moment'
import SweetAlert from 'react-bootstrap-sweetalert'

export default class IndividualPost extends Component {
  constructor() {
    super()
    this.state = {
      like: false,
      total: 0,
      comment_total: 0,
      show_like: true,
      show_more_comments: false,
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
    const self = this

    const getmyPostCount = async function() {
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
    getmyPostCount()
  }

  pullComments = () => {
    var post_id = this.props.post.id
    const self = this

    const getComments = async function() {
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

  onChange = () => {
    let tmpState = this.state.show_more_comments

    if (!this.state.show_more_comments) {
      this.pullComments()
    }
    // this.setState({
    //   pull_once: false
    // })
    this.setState({
      show_more_comments: !this.state.show_more_comments,
    })
    if (!tmpState) {
      this.focusTextInput()
    }
  }

  onFocus = () => {
    if (this.state.pull_once) {
      this.pullComments()
    }
    this.setState({
      pull_once: false,
      show_more_comments: true,
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
    const self = this

    const saveComment = async function() {
      try {
        const postComment = await axios.post('/api/comments', {
          content: self.state.value.trim(),
          post_id: self.props.post.id,
        })
        let { post, user } = self.props
        if (post.user_id != user.userInfo.id) {
          const addPostLike = axios.post('/api/notifications/addComment', {
            other_user_id: post.user_id,
            post_id: self.props.post.id,
            comment_id: postComment.data.id,
          })
        }
        self.setState({
          myComments: [],
        })
        self.pullComments()
        self.setState({
          comment_total: self.state.comment_total + 1,
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

    const editPost = async function() {
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
      event.preventDefault()
      event.stopPropagation()
      this.insert_comment()
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

  showComment = () => {
    if (this.state.myComments != undefined) {
      return this.state.myComments.map((item, index) => {
        return <IndividualComment comment={item} key={index} user={this.props.user} />
      })
    }
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
      function() {
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
    if (this.state.post_deleted != true) {
      var show_media = true
      let { post } = this.props //destructing of object

      var media_urls = []
      if (post.type == 'photo' || post.type == 'video') {
        try {
          media_urls = JSON.parse(post.media_url)
        } catch (error) {
          console.log('Data error with your post. Delete POST please! ' + post.content)
        }
      }
      if (media_urls == [] || media_urls == null) {
        show_media = false
      }
      return (
        <div className='update-container'>
          {this.state.alert}
          <div className='padding-container'>
            <div className='grey-container'>
              <div className='author-info'>
                {this.state.show_profile_img && (
                  <Link
                    to={`/profile/${post.user_id}`}
                    className='user-img'
                    style={{
                      backgroundImage: `url('${post.profile_img}')`,
                    }}></Link>
                )}
                {!this.state.show_profile_img && (
                  <Link
                    to={`/profile/${post.user_id}`}
                    className='user-img'
                    style={{
                      backgroundImage: `url('https://s3-ap-southeast-2.amazonaws.com/mygame-media/default_user/new-user-profile-picture.png')`,
                    }}></Link>
                )}
                <div className='info'>
                  <Link to={`/profile/${post.user_id}`}>{`${post.alias}`}</Link> shared a{' '}
                  <Link to={`/profile/${post.user_id}`}>{post.type == 'text' ? 'story' : 'image'}</Link>
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
                        onKeyUp={this.detectKey2}
                        ref={this.setTextInputRef2}
                      />
                    </div>
                  </div>
                )}
                {show_media &&
                  media_urls.map(function(data, index) {
                    if (post.type == 'photo') {
                      return <img className='post-photo' src={data}></img>
                    } else if (post.type == 'video') {
                      return (
                        <video className='post-video' controls>
                          <source src={data}></source>
                        </video>
                      )
                    }
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
                  onKeyUp={this.detectKey}
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
        </div>
      )
    } else {
      return <div className='update-container'></div>
    }
  }
}

const app = document.getElementById('app')
