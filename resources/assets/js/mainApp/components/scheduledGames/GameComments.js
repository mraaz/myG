/*
 * Author : nitin Tyagi
 * github  : https://github.com/realinit
 * Email : nitin.1992tyagi@gmail.com
 */
import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

import moment from 'moment'
import axios from 'axios'

import IndividualComment from '../IndividualComment'
import { toast } from 'react-toastify'
import { Toast_style } from '../Utility_Function'
import { Upload_to_S3, Remove_file } from '../AWS_utilities'
import MobileGameComments from '../MobileView/MobileGameComments'

const buckectBaseUrl = 'https://myG.gg/platform_images/'
const defaultUserImage = 'https://myG.gg/default_user/new-user-profile-picture.png'

export default class GameComments extends Component {
  constructor() {
    super()
    this.state = {
      preview_file: [],
      aws_key_id: [],
      file_keys: '',
      uploading: false,
    }
    this.imageFileType = ['jpeg', 'jpg', 'png', 'gif']
    this.videoFileType = ['mov', 'webm', 'mpg', 'mp4', 'avi', 'ogg']
    this.textInput = null
    this.fileInputRef = React.createRef()
  }

  componentDidMount() {
    this.pullComments()
  }

  pullComments = async () => {
    const id = this.props.game_id
    try {
      const gameComments = await axios.get(`/api/comments/scheduled_games/${id}`)
      this.setState({
        comments: [],
      })
      this.setState({
        comments: gameComments.data.allComments,
        comment_total: gameComments.data.allComments.length,
      })
    } catch (error) {
      console.log(error)
    }
  }
  showComment = () => {
    const { comments = [] } = this.state
    const commentClone = [...comments]
    return (
      commentClone.length > 0 &&
      commentClone.map((item, index) => {
        return <IndividualComment comment={item} key={index} user={this.props.user} />
      })
    )
  }
  insert_image_comment = () => {
    if (!this.state.uploading) {
      this.fileInputRef.current.click()
    }
  }
  setTextInputRef = (element) => {
    this.textInput = element
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
  handleChange = (e) => {
    this.setState({ value: e.target.value })
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
      uploading: true,
    })

    try {
      const post = await Upload_to_S3(file, name, 0, null)

      this.setState({
        preview_file: [post.data.Location],
        file_keys: post.data.Key,
        aws_key_id: [post.data.aws_key_id],
      })
    } catch (error) {
      toast.success(<Toast_style text={'Opps, something went wrong. Unable to upload your file.'} />)
    }
    this.setState({
      uploading: false,
    })
  }

  clearPreviewImage = () => {
    const delete_file = Remove_file(this.state.file_keys, this.state.aws_key_id[0])

    // const deleteKeys = axios.post('/api/deleteFile', {
    //   aws_key_id: this.state.aws_key_id[0],
    //   key: this.state.file_keys,
    // })

    this.setState({
      preview_file: [],
      file_keys: '',
    })
  }

  insert_comment = () => {
    const { value = '', preview_file = [], aws_key_id = [] } = this.state

    if (value.trim() == '' && preview_file.length == 0) {
      return
    }
    const saveComment = async () => {
      const { comments = [] } = this.state
      try {
        const postComment = await axios.post('/api/comments', {
          content: this.state.value.trim(),
          schedule_games_id: this.props.game_id,
          media_url: this.state.preview_file.length > 0 ? JSON.stringify(this.state.preview_file) : '',
          aws_key_id: aws_key_id.length > 0 ? aws_key_id : '',
        })

        this.setState({
          comments: [...comments, ...postComment.data],
          preview_file: '',
          file_keys: '',
          value: '',
          aws_key_id: [],
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

  render() {
    let { scheduleGames_data = {}, allow_comments = 0, user } = this.props //destructing of object
    let { comments = [] } = this.state //destructing of object
    let { userInfo = {} } = user //destructing of object

    let {
      profile_img = 'https://myG.gg/default_user/new-user-profile-picture.png',
      hash_tags = [],
    } = scheduleGames_data
    return (
      <Fragment>
        <div className="desktopView">
          <div className='gameComments__header '>
            <div className='gameName' onClick={this.props.toggleBack}>
              <h1 className='game__name'>
                <img src='https://myG.gg/platform_images/View+Game/Down+Carrot.svg' /> Comments{' '}
                {` (${comments.length})`}{' '}
              </h1>
            </div>
          </div>
          <div className='show-individual-comments'>{this.showComment()}</div>
          {allow_comments == 1 && (
            <div className='compose__comment__wrapper'>
              <div className='compose-comment'>
                <textarea
                  name='name'
                  placeholder='Write a comment...'
                  value={this.state.value}
                  onChange={this.handleChange}
                  maxLength='254'
                  onKeyDown={this.detectKey}
                  ref={this.setTextInputRef}
                />
                <div className='insert__images' onClick={this.insert_image_comment}>
                  <input
                    type='file'
                    accept='image/jpeg,image/jpg,image/png,image/gif'
                    ref={this.fileInputRef}
                    onChange={this.handleSelectFile}
                    name='insert__images'
                  />
                  <img src={`${buckectBaseUrl}Dashboard/BTN_Attach_Image.svg`} />
                </div>
                <Link to={`/profile/${userInfo.alias}`} className='user-img'>
                  <div
                    className='profile__image'
                    style={{
                      backgroundImage: `url('${userInfo.profile_img ? userInfo.profile_img : defaultUserImage}')`,
                      backgroundSize: 'cover',
                    }}>
                    <div className='online__status'></div>
                  </div>
                </Link>
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

        <div className="mobileView">
          <MobileGameComments
            toggleBack={this.props.toggleBack}
            comments={comments}
            allowComments={allow_comments}
            showComment={this.showComment}
            value={this.state.value}
            handleChange={this.handleChange}
            detectKey={this.detectKey}
            insertImageComment={this.insert_image_comment}
            fileInputRef={this.fileInputRef}
            handleSelectFile={this.handleSelectFile}
            buckectBaseUrl={buckectBaseUrl}
            userInfo={userInfo}
            defaultUserImage={defaultUserImage}
            uploading={this.state.uploading}
            previewFile={this.state.preview_file}
            clearPreviewImage={this.clearPreviewImage}/>
        </div>
      </Fragment>
    )
  }
}
