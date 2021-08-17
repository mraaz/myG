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
import { EditorState } from 'draft-js'
import SweetAlert from './common/MyGSweetAlert'
import { Upload_to_S3, Remove_file } from './AWS_utilities'
const buckectBaseUrl = 'https://myG.gg/platform_images/'

import { Toast_style } from './Utility_Function'
import { toast } from 'react-toastify'
import { logToElasticsearch } from '../../integration/http/logger'
import ReportPost from './common/ReportPost'

import { DraftComposer } from './common/Draftjs'
import {
  cloneEditorState,
  prepareDraftsEditorForSave,
  convertToEditorState,
  isEmptyDraftJs,
  COMMENT_STATIC,
  COMMENT_EDIT,
  REPLY_COMPOSER
} from '../../common/draftjs'

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
      show_more_replies: true,
      dropdown: false,
      comment_deleted: false,
      show_edit_comment: false,
      comment_time: '',
      alert: null,
      uploading: false,
      preview_file: [],
      file_keys: '',
      aws_key_id: [],
      hideReplies: false,
      replyShowCount: 1,
      pinned_status: false,
      show_reply_button: true,
      content: null,
      commentEdited: EditorState.createEmpty(),
      commentEditedHashtags: [],
      commentEditedMentions: [],
      reply: EditorState.createEmpty(),
      replyHashtags: [],
      replyMentions: []
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
      content: convertToEditorState(this.props.comment.content),
      pinned_status: this.props.comment.pinned ? true : false
    })

    let comment_timestamp = moment(this.props.comment.updated_at, 'YYYY-MM-DD HH:mm:ssZ')
    this.setState({ comment_time: comment_timestamp.local().fromNow() })

    const self = this
    let comment = this.props

    if (this.props.post) {
      this.setState({
        show_reply_button: this.props.post.allow_comments == 1 ? true : false
      })
    }

    const getCommentReplies = async function () {
      try {
        const myCommentReplies = await axios.get(`/api/replies/${comment.comment.id}`)

        if (myCommentReplies.data != '') {
          self.setState({
            myReplies: myCommentReplies.data.this_comments_replies
          })

          if (myCommentReplies.data.no_of_replies[0].no_of_replies != 0) {
            self.setState({
              show_reply: true,
              reply_total: myCommentReplies.data.no_of_replies[0].no_of_replies
            })
          }

          if (myCommentReplies.data.do_I_like_this_comment && myCommentReplies.data.do_I_like_this_comment[0].myOpinion != 0) {
            self.setState({
              like: true
            })
          }
          if (myCommentReplies.data.no_of_likes && myCommentReplies.data.no_of_likes[0].no_of_likes != 0) {
            self.setState({
              show_like: true,
              total: myCommentReplies.data.no_of_likes[0].no_of_likes
            })
          }
        }
      } catch (error) {
        logToElasticsearch('error', 'IndividualComment', 'Failed getCommentReplies:' + ' ' + error)
      }
    }

    // const getmyCommentCount = async function() {
    //   try {
    //     var i
    //
    //     const myCommentCount = await axios.get(`/api/comments/my_count/${comment.comment.id}`)
    //
    //     if (myCommentCount.data.no_of_my_comments[0].no_of_my_comments != 0) {
    //       self.setState({
    //         show_comment_options: true,
    //       })
    //     }
    //   } catch (error) {
    //     logToElasticsearch('error', 'IndividualComment', 'Failed getmyCommentCount:' + ' ' + error)
    //   }
    // }

    getCommentReplies()
    //getmyCommentCount()
  }

  pullReplies = () => {
    var comment_id = this.props.comment.id
    const self = this

    const getComments = async function () {
      try {
        const myCommentReplies = await axios.get(`/api/replies/${comment_id}`)
        self.setState({
          myReplies: myCommentReplies.data.this_comments_replies
        })
      } catch (error) {
        logToElasticsearch('error', 'IndividualComment', 'Failed getComments:' + ' ' + error)
      }
    }
    getComments()
  }

  click_like_btn = (comment_id) => {
    this.setState({
      total: this.state.total + 1
    })

    try {
      axios.post('/api/likes', {
        comment_id: comment_id
      })
    } catch (error) {
      logToElasticsearch('error', 'IndividualComment', 'Failed click_like_btn:' + ' ' + error)
    }

    this.setState({
      show_like: true,
      like: !this.state.like
    })
  }

  click_unlike_btn = (comment_id) => {
    this.setState({
      total: this.state.total - 1
    })

    try {
      axios.get(`/api/likes/delete/comment/${comment_id}`)
    } catch (error) {
      logToElasticsearch('error', 'IndividualComment', 'Failed click_unlike_btn:' + ' ' + error)
    }

    if (this.state.total == 1) {
      this.setState({
        show_like: false
      })
    }

    this.setState({
      like: !this.state.like
    })
  }

  toggleReply = () => {
    this.setState({
      show_add_reply: !this.state.show_add_reply
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
            onDelete={(deleted) => {
              this.setState((previous) => ({
                myReplies: previous.myReplies.filter((reply) => reply.id !== deleted)
              }))
            }}
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
            onDelete={(deleted) => {
              this.setState((previous) => ({
                myReplies: previous.myReplies.filter((reply) => reply.id !== deleted)
              }))
            }}
          />
        )
      })
    }
  }

  detectKey = (e, key) => {
    if (!key) {
      e.preventDefault()
      e.stopPropagation()
      if (!this.state.uploading) {
        this.insert_reply()
      } else {
        toast.warn(<Toast_style text={'Opps,An image is uploading. Please Wait...'} />)
      }
    }
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
        commentEdited: EditorState.createEmpty()
      })
    }

    if (e.key === 'Enter') {
      event.preventDefault()
      event.stopPropagation()
      this.insert_comment()
    }
  }

  insert_comment = () => {
    if (isEmptyDraftJs(this.state.commentEdited)) {
      return
    }
    const self = this
    var comment_id = this.props.comment.id

    const saveComment = async function () {
      const { content } = prepareDraftsEditorForSave(
        self.state.commentEdited,
        self.state.commentEditedHashtags,
        self.state.commentEditedMentions
      )

      try {
        const mysaveComment = await axios.post(`/api/comments/update/${comment_id}`, {
          content
        })

        self.setState({
          show_edit_comment: false,
          dropdown: false,
          content: cloneEditorState(self.state.commentEdited),
          commentEdited: EditorState.createEmpty()
        })
      } catch (error) {
        logToElasticsearch('error', 'IndividualComment', 'Failed saveComment:' + ' ' + error)
      }
    }
    saveComment()
  }

  insert_reply = (e) => {
    const { reply = EditorState.createEmpty(), preview_file = [], aws_key_id = [] } = this.state

    if (isEmptyDraftJs(reply) && preview_file.length == 0) {
      return
    }
    const self = this
    let postReply

    const saveReply = async () => {
      const { myReplies = [] } = this.state
      const { content } = prepareDraftsEditorForSave(self.state.reply)

      try {
        postReply = await axios.post('/api/replies', {
          content,
          comment_id: self.props.comment.id,
          media_url: self.state.preview_file.length > 0 ? JSON.stringify(self.state.preview_file) : '',
          aws_key_id: aws_key_id.length > 0 ? aws_key_id : ''
        })

        self.setState({
          myReplies: [...myReplies, ...postReply.data]
        })

        self.setState({
          reply: EditorState.createEmpty(),
          show_more_replies: !self.show_more_replies,
          show_add_reply: false,
          reply_total: self.state.reply_total + 1,
          show_reply: true,
          preview_file: []
        })
      } catch (error) {
        logToElasticsearch('error', 'IndividualComment', 'Failed saveReply:' + ' ' + error)
      }
    }
    saveReply()
  }

  clickedDropdown = () => {
    this.setState({
      dropdown: !this.state.dropdown
    })
  }

  clickedEdit = async () => {
    let comment_id = this.props.comment.id
    try {
      const myComment_content = await axios.get(`/api/comments/show_comment/${comment_id}`)

      const commentEdited = convertToEditorState(myComment_content.data.this_comment[0].content)
      this.setState({
        show_edit_comment: true,
        dropdown: false,
        commentEdited
      })

      this.focusTextInput()
    } catch (error) {
      logToElasticsearch('error', 'IndividualComment', 'Failed clickedEdit:' + ' ' + error)
    }
  }

  clickedPin_status = async (_status) => {
    //_status = True for Pinned
    let comment_id = this.props.comment.id

    try {
      await axios.get(`/api/comments/pin_status/${comment_id}/${_status}`)
      if (_status) toast.success(<Toast_style text={'Woot!, Comment pinned!'} />)
      else toast.success(<Toast_style text={'Roger that!, Comment Unpinned!'} />)

      this.setState({
        dropdown: false,
        pinned_status: _status
      })
    } catch (error) {
      logToElasticsearch('error', 'IndividualComment', 'Failed clickedPin:' + ' ' + error)
    }
  }

  delete_exp = () => {
    let comment_id = this.props.comment.id

    try {
      axios.delete(`/api/comments/delete/${comment_id}`)
      this.setState({
        comment_deleted: true
      })
      this.props.onDelete(comment_id)
    } catch (error) {
      logToElasticsearch('error', 'IndividualComment', 'Failed delete_exp:' + ' ' + error)
    }
  }
  showReportAlert = (id) => {
    this.clickedDropdown()
    const getAlert = () => <ReportPost comment_id={id} hideModal={this.hideAlert} />

    this.setState({
      alert: getAlert()
    })
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

  insert_image_comment = () => {
    if (!this.state.uploading) {
      this.fileInputRef.current.click()
    }
  }

  handleSelectFile = (e) => {
    const fileList = e.target.files
    let type = fileList[0].type.split('/')
    let name = `reply_${type}_${+new Date()}_${fileList[0].name}`
    this.doUploadS3(fileList[0], name)
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
  }

  clearPreviewImage = () => {
    Remove_file(this.state.file_keys, this.state.aws_key_id[0])
    // const deleteKeys = axios.post('/api/deleteFile', {
    //   aws_key_id: this.state.aws_key_id[0],
    //   key: this.state.file_keys,
    // })
    this.setState({
      preview_file: [],
      file_keys: '',
      aws_key_id: []
    })
  }

  hide_replies = () => {
    const { myReplies = [], show_more_replies } = this.state
    this.setState({ hideReplies: true, show_more_replies: !show_more_replies, replyShowCount: myReplies.length })
  }

  render() {
    let { comment, user, post } = this.props
    let { profile_img = 'https://myG.gg/default_user/new-user-profile-picture.png', media_url = '' } = comment
    const { myReplies = [], show_more_replies = true, hideReplies = false } = this.state
    const media_urls = media_url && media_url.length > 0 ? JSON.parse(media_url) : ''
    const comment_pinned = this.state.pinned_status

    let isDisabled = user && user.id ? false : true
    if (!isDisabled) {
      if (!post.allow_comments) isDisabled = true
    }

    if (this.state.comment_deleted != true) {
      return (
        <div className='individual-comment-container'>
          {this.state.alert}
          <div className='comment__section'>
            <div className='comment-info'>
              <div className='comment-pin-group'>
                <Link to={`/profile/${comment.alias}`}>{`@${comment.alias}`}</Link>
                {comment_pinned && (
                  <div className='comment-pin'>
                    <img className='photo' src='https://myg.gg/platform_images/Profile/thumbtack.png' />
                  </div>
                )}
                {'  '}
              </div>
              {!this.state.show_edit_comment && this.state.content && (
                <div className='comment-content'>
                  <DraftComposer
                    editorType={COMMENT_STATIC}
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
            {/* comment option start  */}
            <div className='gamePostExtraOption'>
              {user && user.id && (
                <i className='fas fa-ellipsis-h' onClick={this.clickedDropdown}>
                  ...
                </i>
              )}
              <div className={`dropdown ${this.state.dropdown ? 'active' : ''}`}>
                <nav>
                  {user && user.id != comment.user_id && (
                    <div className='option' onClick={(e) => this.showReportAlert(comment.id)}>
                      Report
                    </div>
                  )}
                  {user && user.id == comment.user_id && (
                    <div className='edit' onClick={this.clickedEdit}>
                      Edit &nbsp;
                    </div>
                  )}
                  {user && user.id == comment.post_user_id && !comment_pinned && (
                    <div className='edit' onClick={(e) => this.clickedPin_status(true)}>
                      Pin &nbsp;
                    </div>
                  )}
                  {user && user.id == comment.post_user_id && comment_pinned && (
                    <div className='edit' onClick={(e) => this.clickedPin_status(false)}>
                      Unpin &nbsp;
                    </div>
                  )}
                  {user && user.id == comment.user_id && (
                    <div className='delete' onClick={() => this.showAlert()}>
                      Delete
                    </div>
                  )}
                  &nbsp;
                </nav>
              </div>
            </div>
            {/* comment option end  */}
            {this.state.show_edit_comment && this.state.commentEdited && (
              <div className='edit__comment__input'>
                <DraftComposer
                  editorType={COMMENT_EDIT}
                  editorState={this.state.commentEdited}
                  setEditorState={(state) => this.setState({ commentEdited: state })}
                  handleReturnKey={() => this.insert_comment()}
                  addHashtag={(hashtagMention) =>
                    this.setState({ commentEditedHashtags: [...this.state.commentEditedHashtags, hashtagMention] })
                  }
                  addMention={(userMention) => this.setState({ commentEditedMentions: [...this.state.commentEditedMentions, userMention] })}
                  handleSpecialKeys={(e) =>
                    this.setState({
                      show_edit_comment: false,
                      dropdown: false,
                      commentEdited: EditorState.createEmpty()
                    })
                  }
                ></DraftComposer>
              </div>
            )}
            {/* profile section start  */}
            <Link to={`/profile/${comment.alias}`} className='user-img'>
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
            {this.state.show_reply_button && (
              <div className='comment-panel-reply' onClick={this.toggleReply}>
                Reply
              </div>
            )}
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
                <div className='reply-row'>
                  {/* The draft editor */}
                  <DraftComposer
                    editorType={REPLY_COMPOSER}
                    editorState={this.state.reply}
                    setEditorState={(state) => this.setState({ reply: state })}
                    addHashtag={(hashtagMention) => this.setState({ replyHashtags: [...this.state.replyHashtags, hashtagMention] })}
                    addMention={(userMention) => this.setState({ replyMentions: [...this.state.replyMentions, userMention] })}
                    handleReturnKey={() => {
                      if (!this.state.uploading) {
                        this.insert_reply()
                      } else {
                        toast.warn(<Toast_style text={'Opps,An image is uploading. Please Wait...'} />)
                      }
                    }}
                    handleSpecialKeys={(e) =>
                      this.setState({
                        show_add_reply: false,
                        reply: EditorState.createEmpty()
                      })
                    }
                  ></DraftComposer>
                  {/* Image upload box */}
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
                <div className='insert__images' onClick={this.insert_image_comment}>
                  <input
                    type='file'
                    accept='image/jpeg,image/jpg,image/png,image/gif*'
                    ref={this.fileInputRef}
                    onChange={this.handleSelectFile}
                    name='insert__images'
                    disabled={isDisabled}
                  />
                  <img src={`${buckectBaseUrl}Dashboard/BTN_Attach_Image.svg`} />
                </div>
                <div className='send__btn' onClick={(e) => this.detectKey(e, false)}>
                  <img src={`${buckectBaseUrl}Dashboard/BTN_Send_Post.svg`} className='img-fluid' />
                </div>
              </div>
            )}
          </div>

          {this.state.dropdown == true && <div onClick={this.clickedDropdown} className='threedots__backdrop'></div>}
        </div>
      )
    } else {
      return <div className='individual-comment-container'></div>
    }
  }
}

const app = document.getElementById('app')
