/*
 * Author : nitin Tyagi
 * github  : realnit
 */
import React, { Component } from 'react'
import axios from 'axios'
import IndividualPost from './IndividualPost'
import PostFileModal from './PostFileModal'
import Dropzone from 'react-dropzone'

const visibility_options = [
  { value: 1, label: 'Everyone' },
  { value: 2, label: 'Friends' },
  { value: 0, label: 'Only me' },
]

export default class ComposeSection extends Component {
  constructor() {
    super()
    this.state = {
      show_post: false,
      profile_img: '',
      post_content: '',
      bFileModalOpen: false,
      fileType: 'photo',
      myPosts: [],
      masterList: [],
      visibility_box: [{ label: 'Everyone', value: 1 }],
      open_compose_textTab: true,
    }

    this.openPhotoPost = this.openPhotoPost.bind(this)

    this.openVideoPost = this.openVideoPost.bind(this)
    this.callbackPostFileModalClose = this.callbackPostFileModalClose.bind(this)
    this.callbackPostFileModalConfirm = this.callbackPostFileModalConfirm.bind(this)
  }

  callbackPostFileModalClose() {
    this.setState({
      bFileModalOpen: false,
    })
  }

  callbackPostFileModalConfirm = async (data, keys) => {
    this.setState({
      bFileModalOpen: false,
    })

    var url = ''

    if (this.state.fileType == 'photo') {
      url = '/api/postphoto'
    } else if (this.state.fileType == 'video') {
      url = '/api/postvideo'
    } else {
      url = '/api/postphoto'
    }

    if (data.media_url.length == 0 && data.content == '') {
      return
    }

    try {
      const post = await axios.post(url, {
        media_url: JSON.stringify(data.media_url),
        content: data.content,
        file_keys: keys,
      })

      this.setState({
        myPosts: [],
      })
      await this.get_posts(post)
    } catch (error) {
      console.log(error)
    }
  }

  openPhotoPost() {
    this.setState({
      bFileModalOpen: true,
      fileType: 'photo',
    })
  }

  openVideoPost() {
    this.setState({
      bFileModalOpen: true,
      fileType: 'video',
    })
  }
  openAudioPost() {
    this.setState({
      bFileModalOpen: true,
      fileType: 'audio',
    })
  }

  submitForm = async () => {
    if (this.state.post_content.trim() == '') {
      this.setState({
        post_content: '',
      })
      return
    }
    try {
      const post = await axios.post('/api/post', {
        content: this.state.post_content.trim(),
        user_id: this.props.initialData.userInfo.id,
        type: 'text',
        visibility: this.state.visibility_box.value,
      })
      this.setState({
        myPosts: [],
      })
      await this.get_posts(post)
    } catch (error) {
      console.log(error)
    }
  }

  handleChange = (event) => {
    const name = event.target.name
    const value = event.target.type == 'checkbox' ? event.target.checked : event.target.value
    this.setState({
      [name]: value,
    })
  }

  handleChange_txtArea = (event) => {
    this.setState({ post_content: event.target.value })
  }

  showLatestPosts = () => {
    if (this.state.myPosts != []) {
      return this.state.myPosts.map((item, index) => {
        return <IndividualPost post={item} key={item.id} user={this.props.initialData} />
      })
    }
  }

  get_posts = (post) => {
    const self = this

    const getPosts = async function () {
      try {
        const myPosts = await axios.get(`/api/mypost/${post.data}`)
        self.state.masterList = self.state.masterList.concat(myPosts.data.myPosts)

        self.setState({
          myPosts: self.state.masterList.reverse(),
          show_post: true,
          post_content: '',
        })
      } catch (error) {
        console.log(error)
      }
    }
    getPosts()
  }

  detectKey = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.stopPropagation()
      this.submitForm()
      return false
    }

    if (e.key === 'Enter' && e.shiftKey) {
      return
    }

    if (e.key === 'Escape') {
      this.setState({
        edit_post: false,
        value2: '',
      })
    }
  }

  componentDidMount() {
    const self = this

    if (this.props != undefined) {
      if (this.props.initialData.userInfo != undefined) {
        this.setState({
          profile_img: this.props.initialData.userInfo.profile_img,
          alias: this.props.initialData.userInfo.alias,
        })
      }
    }

    const getGamers_you_might_know = async function () {
      try {
        const gamers_you_might_know = await axios.get('/api/user/gamers_you_might_know')
        console.log(gamers_you_might_know)
      } catch (error) {
        console.log(error)
      }
    }
    getGamers_you_might_know()
  }

  handleChange_visibility = (visibility_box) => {
    this.setState({ visibility_box })
  }
  togglePostTypeTab = (label) => {
    let open_compose_textTab = true
    if (label == 'media') {
      open_compose_textTab = false
    }
    this.setState({ open_compose_textTab })
  }

  render() {
    const { open_compose_textTab } = this.state
    return (
      <section className='postCompose__container'>
        <div className='compose__type__section'>
          <div className={`share__thought ${open_compose_textTab ? 'active' : ''}`} onClick={(e) => this.togglePostTypeTab('text')}>
            {`Share your thoughts ...`}
          </div>
          <div className={`add__post__image ${open_compose_textTab ? 'active' : ''}`} onClick={(e) => this.togglePostTypeTab('media')}>
            {` Add video or photos`}
          </div>
        </div>
        {open_compose_textTab && (
          <div className='text__editor__section'>
            <textarea
              onChange={this.handleChange_txtArea}
              onKeyDown={this.detectKey}
              maxLength='254'
              value={this.state.post_content}
              placeholder='What in your mind?'
            />
          </div>
        )}
        {!open_compose_textTab && (
          <div className='media__container'>
            <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
              {(props) => {
                console.log(props)
                return (
                  <section className='custom__html'>
                    <span className=' button photo-btn'>
                      <i className='far fa-images' />
                    </span>
                    <span className='button video-btn'>
                      <i className='far fa-play-circle' />
                    </span>
                    <span className='button video-btn'>
                      <i className='far fa-volume-up' />
                    </span>
                  </section>
                )
              }}
            </Dropzone>
            {/* <div className=' button photo-btn' onClick={() => this.openPhotoPost()}>
              <i className='far fa-images' />
            </div>
            <div className='button video-btn' onClick={() => this.openVideoPost()}>
              <i className='far fa-play-circle' />
            </div>
            <div className='button video-btn' onClick={() => this.openAudioPost()}>
              <i className='far fa-volume-up' />
            </div> */}
          </div>
        )}
        <div className='compose__people__section'>
          <div className='label'>Post on: </div>
          <div className='people_selected_container'>
            <div className='people_selected_list'>
              <div className='default_circle'></div>
              <div className='people_label'>Your Feed</div>
            </div>
          </div>
          <div className='add_more_people'>
            <button type='button' className='add__people'>
              Add
            </button>
          </div>
        </div>
        <div className='compose__button'>
          <button type='button' className='cancel'>
            Cancel
          </button>
          <button type='button' className='add__post' onClick={this.submitForm}>
            Post
          </button>
        </div>
        <PostFileModal
          bOpen={this.state.bFileModalOpen}
          fileType={this.state.fileType}
          callbackClose={this.callbackPostFileModalClose}
          callbackConfirm={this.callbackPostFileModalConfirm}></PostFileModal>

        {/* <section className='compose-area'>
        <div className='compose-section'>
          <textarea
            rows={8}
            cols={80}
            onChange={this.handleChange_txtArea}
            onKeyDown={this.detectKey}
            maxLength='254'
            value={this.state.post_content}
            placeholder="What's up..."
          />
          <Select
            onChange={this.handleChange_visibility}
            options={visibility_options}
            placeholder='Who should see this?'
            className='visibility_box'
            defaultValue={[{ label: 'Everyone', value: 1 }]}
          />
          <div className='user-img' />
          <Link
            to={`/profile/${this.state.alias}`}
            className='user-img'
            style={{
              backgroundImage: `url('${this.state.profile_img}')`,
            }}></Link>
          <PostFileModal
            bOpen={this.state.bFileModalOpen}
            fileType={this.state.fileType}
            callbackClose={this.callbackPostFileModalClose}
            callbackConfirm={this.callbackPostFileModalConfirm}></PostFileModal>
          <div className='buttons'>
            <div className=' button photo-btn' onClick={() => this.openPhotoPost()}>
              <i className='far fa-images' />
            </div>
            <div className='button video-btn' onClick={() => this.openVideoPost()}>
              <i className='far fa-play-circle' />
            </div>
            <div className='button send-btn' onClick={this.submitForm}>
              <i className='far fa-paper-plane' />
            </div>
          </div>
        </div>
      </section> */}
      </section>
    )
  }
}

const app = document.getElementById('app')
