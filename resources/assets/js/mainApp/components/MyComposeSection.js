import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import IndividualPost from './IndividualPost'
import PostFileModal from './PostFileModal'

export default class MyComposeSection extends Component {
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
      groups_post: false,
      no_show: false,
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
    var post
    try {
      if (this.state.groups_post) {
        post = await axios.post(url, {
          media_url: JSON.stringify(data.media_url),
          content: data.content,
          groups_id: this.props.groups_id.params.id,
          file_keys: keys,
        })
      } else {
        post = await axios.post(url, {
          media_url: JSON.stringify(data.media_url),
          content: data.content,
          file_keys: keys,
        })
      }

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

  submitForm = async () => {
    if (this.state.post_content.trim() == '') {
      this.setState({
        post_content: '',
      })
      return
    }
    try {
      var post
      if (this.state.groups_post) {
        post = await axios.post('/api/post', {
          content: this.state.post_content.trim(),
          user_id: this.props.initialData.userInfo.id,
          type: 'text',
          groups_id: this.props.groups_id.params.id,
        })
      } else {
        post = await axios.post('/api/post', {
          content: this.state.post_content.trim(),
          user_id: this.props.initialData.userInfo.id,
          type: 'text',
        })
      }

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

  showLatestPosts = () => {
    if (this.state.myPosts != undefined) {
      return this.state.myPosts.map((item, index) => {
        return <IndividualPost post={item} key={item.id} user={this.props.initialData} />
      })
    }
  }

  get_posts = (post) => {
    const self = this
    const getPosts = async function() {
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

    const getGroupDetails = async function() {
      const mygroup_details = await axios.get(`/api/usergroup/mygroup_details/${self.props.groups_id.params.id}`)
      if (mygroup_details.data.mygroup_details.length == 0 || mygroup_details.data.mygroup_details[0].permission_level == 42) {
        try {
          const getOwner = await axios.get(`/api/groups/show_owner/${self.props.groups_id.params.id}`)

          if (getOwner.data.show_owner[0].user_id != self.props.initialData.userInfo.id) {
            self.setState({
              no_show: true,
            })
          }
        } catch (error) {
          console.log(error)
        }
      }
    }

    try {
      if (this.props.groups_id.params.id != undefined) {
        if (this.props.initialData.userInfo != undefined) {
          this.state.groups_post = true
          getGroupDetails()
        }
      }
    } catch (e) {
      this.state.groups_post = false
    }

    if (this.props != undefined) {
      if (this.props.initialData.userInfo != undefined) {
        this.setState({
          profile_img: this.props.initialData.userInfo.profile_img,
          alias: this.props.initialData.userInfo.alias,
        })
      }
    }
  }

  render() {
    return (
      <section className='compose-area'>
        {!this.state.no_show && (
          <div className='compose-section'>
            <textarea
              name='post_content'
              rows={8}
              cols={80}
              defaultValue={''}
              onChange={this.handleChange}
              onKeyDown={this.detectKey}
              maxLength='254'
              placeholder="What's up..."
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
              <div className='button photo-btn' onClick={() => this.openPhotoPost()}>
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
        )}
        <section id='posts'>{this.state.show_post && this.showLatestPosts()}</section>
      </section>
    )
  }
}

const app = document.getElementById('app')
