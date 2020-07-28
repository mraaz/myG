/*
 * Author : nitin Tyagi
 * github  : https://github.com/realinit
 * Email : nitin.1992tyagi@gmail.com
 */
import React, { Component, Fragment } from 'react'
import axios from 'axios'
import IndividualPost from './IndividualPost'
import { Hash_Tags } from './Utility_Function'

import { toast } from 'react-toastify'
import { Toast_style } from './Utility_Function'
import yourCommunitiesBox from './Community/YourCommunityBox/index'

const MAX_HASH_TAGS = 21

const createOption = (label, hash_tag_id) => ({
  label,
  value: label,
  hash_tag_id,
})

export default class GroupMain extends Component {
  constructor() {
    super()
    this.state = {
      show_post: false,
      profile_img: '',
      post_content: '',
      bFileModalOpen: false,
      myPosts: [],
      masterList: [],
      open_compose_textTab: true,
      add_group_toggle: false,
      selected_group: [],
      selected_group_data: [],
      selectedGroup: [],
      groups_im_in: [],
      preview_files: [],
      visibility: 1,
      group_id: [],
      options_tags: '',
      value_tags: [],
      isShowAllGroup: false,
    }
  }

  submitForm = async () => {
    const content = this.state.post_content.trim()

    let media_url = []
    let keys = []

    if (this.state.preview_files.length > 0) {
      for (let i = 0; i < this.state.preview_files.length; i++) {
        media_url.push(this.state.preview_files[i].src)
        keys.push(this.state.preview_files[i].key)
      }
    }
    let hash_tags = []
    if (this.state.value_tags.length != 0 && this.state.value_tags != null) {
      if (this.state.value_tags.length >= MAX_HASH_TAGS) {
        toast.success(<Toast_style text={"Crikey, mate! That's alot of tags. I'll only grab 20 and dump the rest."} />)
      }
      for (let i = 0; i < MAX_HASH_TAGS && i < this.state.value_tags.length; i++) {
        if (/['/.%#$,;`\\]/.test(this.state.value_tags[i].value)) {
          toast.success(<Toast_style text={'Sorry mate! Hash tags can not have invalid characters'} />)
          return
        }
        delete this.state.value_tags[i].label
      }
      hash_tags = JSON.stringify(this.state.value_tags)
    }

    try {
      const post = await axios.post('/api/post', {
        content: content,
        user_id: this.props.initialData.userInfo.id,
        type: 'text',
        visibility: this.state.visibility,
        group_id: this.state.group_id.toString(),
        media_url: media_url.length > 0 ? JSON.stringify(media_url) : '',
        file_keys: keys.length > 0 ? keys : '',
        hash_tags: hash_tags,
      })
      this.setState(
        {
          bFileModalOpen: false,
          post_content: '',
          media_url: [],
          preview_files: [],
          keys: [],
          visibility: 1,
          overlay_active: false,
          value_tags: [],
          selected_group_data: [],
          selected_group: [],
          group_id: [],
          open_compose_textTab: true,
        },
        () => {
          media_url = []
          keys = []
          this.props.successCallback(post)
        }
      )
      // await this.get_posts(post)
    } catch (error) {
      console.log(error)
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
  }

  togglePostTypeTab = (label) => {
    let open_compose_textTab = true
    if (label == 'media') {
      open_compose_textTab = false
    }
    if (label == 'text') {
      setTimeout(function () {
        document.getElementById('composeTextarea').focus()
      }, 0)
    }
    this.setState({ open_compose_textTab, overlay_active: true })
  }

  toggleShowAllGroup = () => {
    this.setState({ isShowAllGroup: !this.state.isShowAllGroup })
  }

  render() {
    const { open_compose_textTab, overlay_active } = this.state

    return (
      <Fragment>
        <section className={`postCompose__container ${overlay_active ? 'zI1000' : ''}`}>
          <div className='compose__type__section'>
            <div className={`share__thought ${open_compose_textTab ? 'active' : ''}`} onClick={(e) => this.togglePostTypeTab('text')}>
              {`Your Communities`}
            </div>
            <div className='devider'></div>
            <div className={`add__post__image ${open_compose_textTab ? '' : 'active'}`} onClick={(e) => this.togglePostTypeTab('media')}>
              {` Suggest Communities`}
            </div>
          </div>
          {open_compose_textTab && (
            <Fragment>
              <div className='row'>
                <div className='col-md-3'>
                  <yourCommunitiesBox />
                </div>
              </div>
            </Fragment>
          )}
          {!open_compose_textTab && <h1>Suggest Communities</h1>}
        </section>
      </Fragment>
    )
  }
}

const app = document.getElementById('app')
