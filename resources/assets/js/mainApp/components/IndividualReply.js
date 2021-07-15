import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import { ContentState, EditorState, convertFromRaw, convertToRaw } from 'draft-js'

import SweetAlert from './common/MyGSweetAlert'
import { Is_json } from './Utility_Function'
import { logToElasticsearch } from '../../integration/http/logger'
import ReportPost from './common/ReportPost'
import { DraftComposer } from './Draftjs'
import { COMPOSER_TYPE_ENUM, MAX_HASH_TAGS, getCurrentlyListedMentionsAndHashtags, reduceMentions } from './Draftjs/helpers'

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
      show_edit_reply: false,
      value: EditorState.createEmpty(),
      content: EditorState.createEmpty(),
      reply_time: '',
      alert: null,
      mentions: [],
      hashtags: []
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
    if (this.props.reply.profile_img != null) {
      this.setState({ show_profile_img: true })
    }

    let content = null
    this.props.reply.content
    if (Is_json(this.props.reply.content)) {
      // Its a Draft post, convert it to content state
      content = EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.reply.content)))
    } else {
      // Its a old string post, create a state from it
      content = EditorState.createWithContent(ContentState.createFromText(this.props.reply.content))
    }

    this.setState({
      content
    })

    var reply_timestamp = moment(this.props.reply.updated_at, 'YYYY-MM-DD HH:mm:ssZ')
    this.setState({ reply_time: reply_timestamp.local().fromNow() })

    const self = this
    let reply = this.props

    const getCommentReplies = async function () {
      try {
        const myReplyLikes = await axios.get(`/api/likes/reply/${reply.reply.id}`)

        if (myReplyLikes.data.do_I_like_this_reply[0].myOpinion != 0) {
          self.setState({
            reply_like: true
          })
        }

        if (myReplyLikes.data.no_of_likes[0].no_of_likes != 0) {
          self.setState({
            show_reply_like: true,
            reply_like_total: myReplyLikes.data.no_of_likes[0].no_of_likes
          })
        }
      } catch (error) {
        logToElasticsearch('error', 'IndividualReply', 'Failed getCommentReplies:' + ' ' + error)
      }
    }

    // const getmyRepliesCount = async function() {
    //   try {
    //     var i
    //
    //     const myRepliesCount = await axios.get(`/api/replies/my_count/${reply.reply.id}`)
    //
    //     if (myRepliesCount.data.no_of_my_replies[0].no_of_my_replies != 0) {
    //       self.setState({
    //         show_reply_options: true,
    //       })
    //     }
    //   } catch (error) {
    //     logToElasticsearch('error', 'IndividualReply', 'Failed getmyRepliesCount:' + ' ' + error)
    //   }
    // }
    getCommentReplies()
    //getmyRepliesCount()
  }

  click_reply_like_btn = (reply_id) => {
    this.setState({
      reply_like_total: this.state.reply_like_total + 1
    })

    try {
      const replyLike = axios.post('/api/likes', {
        reply_id: reply_id
      })
    } catch (error) {
      logToElasticsearch('error', 'IndividualReply', 'Failed click_reply_like_btn:' + ' ' + error)
    }

    this.setState({
      show_reply_like: true,
      reply_like: !this.state.reply_like
    })
  }

  click_reply_unlike_btn = (reply_id) => {
    this.setState({
      reply_like_total: this.state.reply_like_total - 1
    })

    //let { post_id } = this.props
    try {
      const reply_unlike = axios.get(`/api/likes/delete/reply/${reply_id}`)
    } catch (error) {
      logToElasticsearch('error', 'IndividualReply', 'Failed click_reply_unlike_btn:' + ' ' + error)
    }

    if (this.state.reply_like_total == 1) {
      this.setState({
        show_reply_like: false
      })
    }

    this.setState({
      reply_like: !this.state.reply_like
    })
  }

  clickedDropdown = () => {
    this.setState({
      dropdown: !this.state.dropdown
    })
  }

  delete_exp = () => {
    let reply_id = this.props.reply.id

    try {
      const myReply_delete = axios.delete(`/api/replies/delete/${reply_id}`)
      this.setState({
        reply_deleted: true
      })
      this.props.onDelete(reply_id)
    } catch (error) {
      logToElasticsearch('error', 'IndividualReply', 'Failed delete_exp:' + ' ' + error)
    }
  }

  clickedEdit = async () => {
    let reply_id = this.props.reply.id

    try {
      const myReply_content = await axios.get(`/api/replies/show_reply/${reply_id}`)

      this.setState({
        show_edit_reply: true,
        dropdown: false,
        value: myReply_content.data.this_reply[0].content
      })
      this.focusTextInput()
    } catch (error) {
      logToElasticsearch('error', 'IndividualReply', 'Failed clickedEdit:' + ' ' + error)
    }
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value })
  }

  submit = () => {}

  detectKey = (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      return
    }

    if (e.key === 'Escape') {
      this.setState({
        show_edit_reply: false,
        dropdown: false,
        value: ''
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
        value: ''
      })
      return
    }
    const self = this
    var reply_id = this.props.reply.id

    const saveReply = async function () {
      try {
        const mysaveReply = await axios.post(`/api/replies/update/${reply_id}`, {
          content: self.state.value
        })

        self.setState({
          show_edit_reply: false,
          dropdown: false,
          content: self.state.value,
          value: ''
        })
      } catch (error) {
        logToElasticsearch('error', 'IndividualReply', 'Failed saveReply:' + ' ' + error)
      }
    }
    saveReply()
  }

  showReportAlert = (id) => {
    this.clickedDropdown()
    const getAlert = () => <ReportPost reply_id={id} hideModal={this.hideAlert} />

    this.setState({
      alert: getAlert()
    })
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
          width: '41%'
        }}
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

  hideAlert = (text) => {
    this.setState({
      alert: null,
      dropdown: false
    })
    if (text == 'true') {
      this.delete_exp()
    }
  }

  render() {
    let { reply, user } = this.props
    let { profile_img = 'https://image.flaticon.com/icons/svg/149/149071.svg', media_url = '' } = reply

    const media_urls = media_url && media_url.length > 0 ? JSON.parse(media_url) : ''
    if (this.state.reply_deleted != true) {
      return (
        <div className='individual-reply-container'>
          {this.state.alert}
          <div className='comment__section'>
            <div className='comment-info'>
              <Link to={`/profile/${reply.alias}`}>{`@${reply.alias}`}</Link>
              {'  '}
              {!this.state.show_edit_reply && (
                <div className='comment-content'>
                  <DraftComposer editorType={COMPOSER_TYPE_ENUM.INDIVIDUAL_COMMENT_STATIC} editorState={this.state.content}></DraftComposer>
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
            {/* reply option start  */}
            <div className='gamePostExtraOption'>
              <i className='fas fa-ellipsis-h' onClick={this.clickedDropdown}>
                ...
              </i>
              <div className={`dropdown ${this.state.dropdown ? 'active' : ''}`}>
                <nav>
                  {user.id != reply.user_id && (
                    <div className='option' onClick={(e) => this.showReportAlert(reply.id)}>
                      Report
                    </div>
                  )}
                  {user.id == reply.user_id && (
                    <div className='edit' onClick={this.clickedEdit}>
                      Edit &nbsp;
                    </div>
                  )}
                  {user.id == reply.user_id && (
                    <div className='delete' onClick={() => this.showAlert()}>
                      Delete
                    </div>
                  )}
                  &nbsp;
                </nav>
              </div>
            </div>
            {/* reply option end  */}
            {this.state.show_edit_reply && (
              <DraftComposer
                editorType={COMPOSER_TYPE_ENUM.INDIVIDUAL_COMMENT_REPLY_COMPOSER}
                editorState={this.state.value}
                setEditorState={(state) => this.setState({ value: state })}
                placeholder={'Write a comment...'}
                handleReturnKey={this.submit}
                addHashtag={(hashtagMention) => this.setState({ hashtags: [...this.state.hashtags, hashtagMention] })}
                addMention={(userMention) => this.setState({ mentions: [...this.state.mentions, userMention] })}
              ></DraftComposer>
              // <div className='edit__comment__input'>
              //   <input
              //     type='text'
              //     id='reply_name_box'
              //     className='reply-name-box'
              //     onKeyDown={this.detectKey}
              //     ref={this.setTextInputRef}
              //     onChange={this.handleChange}
              //     value={this.state.value}
              //   />
              // </div>
            )}
            {/* profile section start  */}
            <Link to={`/profile/${reply.alias}`} className='user-img'>
              <div
                className='profile__image'
                style={{
                  backgroundImage: `url('${profile_img}'), url('https://myG.gg/default_user/new-user-profile-picture.png')`,
                  backgroundSize: 'cover'
                }}
              >
                <div className='online__status'></div>
              </div>
            </Link>
          </div>
          {/* profile section end  */}
          <div className='reply__comment_section'>
            {this.state.reply_like && (
              <div className='comment-panel-liked' onClick={() => this.click_reply_unlike_btn(reply.id)}>
                Unlike
              </div>
            )}
            {!this.state.reply_like && (
              <div className='comment-panel-like' onClick={() => this.click_reply_like_btn(reply.id)}>
                Like
              </div>
            )}
            {this.state.show_reply_like && (
              <div className='no-likes'>
                {this.state.reply_like_total} {this.state.reply_like_total > 1 ? 'Likes' : 'Like'}{' '}
              </div>
            )}
          </div>
          {this.state.dropdown == true && <div onClick={this.clickedDropdown} className='threedots__backdrop'></div>}
        </div>
      )
    } else {
      return <div className='comment-replies'></div>
    }
  }
}

const app = document.getElementById('app')
