import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import { EditorState } from 'draft-js'

import SweetAlert from './common/MyGSweetAlert'
import { logToElasticsearch } from '../../integration/http/logger'
import ReportPost from './common/ReportPost'
import { DraftComposer } from './common/Draftjs'
import {
  convertToEditorState,
  cloneEditorState,
  isEmptyDraftJs,
  prepareDraftsEditorForSave,
  REPLY_EDIT,
  REPLY_STATIC
} from '../../common/draftjs'

export default class IndividualReply extends Component {
  constructor() {
    super()
    this.state = {
      show_reply_like: false,
      reply_like: false,
      show_profile_img: false,
      reply_like_total: 0,
      dropdown: false,
      reply_deleted: false,
      show_edit_reply: false,
      replyEdited: EditorState.createEmpty(),
      content: null,
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

    const content = convertToEditorState(this.props.reply.content)
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

        if (myReplyLikes.data != '') {
          if (myReplyLikes.data.do_I_like_this_reply && myReplyLikes.data.do_I_like_this_reply[0].myOpinion != 0) {
            self.setState({
              reply_like: true
            })
          }

          if (myReplyLikes.data.no_of_likes && myReplyLikes.data.no_of_likes[0].no_of_likes != 0) {
            self.setState({
              show_reply_like: true,
              reply_like_total: myReplyLikes.data.no_of_likes[0].no_of_likes
            })
          }
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
        replyEdited: convertToEditorState(myReply_content.data.this_reply[0].content)
      })
      this.focusTextInput()
    } catch (error) {
      logToElasticsearch('error', 'IndividualReply', 'Failed clickedEdit:' + ' ' + error)
    }
  }

  submit = () => {}

  insert_reply = () => {
    if (isEmptyDraftJs(this.state.replyEdited)) {
      // If empty, return and do nothing. Cannot edit a reply to be nothing.
      return
    }

    const self = this
    var reply_id = this.props.reply.id

    const saveReply = async function () {
      const { content } = prepareDraftsEditorForSave(self.state.replyEdited, self.state.hashtags, self.state.mentions)

      try {
        await axios.post(`/api/replies/update/${reply_id}`, {
          content
        })
        self.setState({
          show_edit_reply: false,
          dropdown: false,
          content: cloneEditorState(self.state.replyEdited),
          replyEdited: EditorState.createEmpty()
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

  handleLinkClick = () => {
    if (this.props.handleLinkClick) {
      this.props.handleLinkClick()
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
              <Link to={`/profile/${reply.alias}`} onClick={this.handleLinkClick}>{`@${reply.alias}`}</Link>
              {'  '}
              {!this.state.show_edit_reply && this.state.content && (
                <div className='comment-content'>
                  <DraftComposer
                    editorType={REPLY_STATIC}
                    editorState={this.state.content}
                    setEditorState={(state) => this.setState({ content: state })}
                  ></DraftComposer>
                  {media_urls.length > 0 && (
                    <div className='show__comment__image'>
                      {media_urls.map((img, index) => {
                        return <img key={index} src={img} />
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
            {this.state.show_edit_reply && this.state.replyEdited && (
              <DraftComposer
                editorType={REPLY_EDIT}
                editorState={this.state.replyEdited}
                setEditorState={(state) => this.setState({ replyEdited: state })}
                handleReturnKey={this.insert_reply}
                handleSpecialKeys={(e) =>
                  this.setState({
                    show_edit_reply: false,
                    dropdown: false,
                    replyEdited: EditorState.createEmpty()
                  })
                }
                addHashtag={(hashtagMention) => this.setState({ hashtags: [...this.state.hashtags, hashtagMention] })}
                addMention={(userMention) => this.setState({ mentions: [...this.state.mentions, userMention] })}
              ></DraftComposer>
            )}
            {/* profile section start  */}
            <Link to={`/profile/${reply.alias}`} className='user-img' onClick={this.handleLinkClick}>
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
