import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import SweetAlert from './common/MyGSweetAlert'
import { Toast_style } from './Utility_Function'

import { toast } from 'react-toastify'
import { logToElasticsearch } from '../../integration/http/logger'
import { MyGButton } from './common'

import ImageGallery from './common/ImageGallery/ImageGallery'
import ReportPost from './common/ReportPost'

export default class IndividualSponsoredPost extends Component {
  constructor() {
    super()
    this.state = {
      dropdown: false,
      content: '',
      alert: null,
      media_urls: [],
      galleryItems: [],
      showmore: false,
      showPostExtraOption: false,
    }
  }

  componentDidMount() {
    let { post } = this.props
    let media_url = ''
    const self = this

    this.props.post.alias = 'myG'
    try {
      if (post.media_url != null && post.media_url) {
        media_url = post.media_url.length > 0 ? JSON.parse(post.media_url) : ''
      }
    } catch (e) {
      media_url = post.media_url ? post.media_url : ''
    }
    const galleryItems = []
    if (media_url.length > 0) {
      for (var i = 0; i < media_url.length; i++) {
        if (media_url[i] && media_url[i] != null) {
          galleryItems.push({ src: media_url[i] })
        }
      }
    }

    this.setState({
      content: this.props.post.content,
      galleryItems,
    })
  }

  clickedDropdown = () => {
    this.setState({
      dropdown: !this.state.dropdown,
    })
  }

  showReportAlert = (id) => {
    this.clickedGamePostExtraOption()
    const getAlert = () => <ReportPost post_id={id} hideModal={this.hideAlert} />

    this.setState({
      alert: getAlert(),
    })
  }

  hideAlert = (text) => {
    this.setState({
      alert: null,
      dropdown: false,
    })
  }

  toggleShowmore = () => {
    this.setState({ showmore: !this.state.showmore })
  }

  renderHashTags = (hash_tags) => {
    if (hash_tags.length > 0) {
      return hash_tags.map((tags) => {
        return (
          <strong>
            <Link to={`/hashtag/${tags.content}`}>{`#${tags.content} `}</Link>
          </strong>
        )
      })
    } else {
      return ''
    }
  }

  clickedGamePostExtraOption = () => {
    const { showPostExtraOption } = this.state
    this.setState({ showPostExtraOption: !showPostExtraOption })
  }

  follow_link = (url) => {
    if (!url.match(/^https?:\/\//i)) {
      url = 'http://' + url
    }
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  render() {
    const { media_urls, alert, galleryItems = [], showPostExtraOption } = this.state

    const profile_img = 'https://myG.gg/logos/myG_transparent.svg'

    let { post } = this.props //destructing of object
    let { hash_tags = [] } = post //destructing of object

    return (
      <div className='post__container'>
        {alert}
        <div className='post__body__wrapper'>
          <div className='post__body'>
            <div className='gamePostExtraOption'>
              <i className='fas fa-ellipsis-h' onClick={this.clickedGamePostExtraOption}>
                ...
              </i>
              <div className={`post-dropdown ${showPostExtraOption == true ? 'active' : ''}`}>
                <nav>
                  <div className='option' onClick={(e) => this.showReportAlert(post.id)}>
                    Report
                  </div>
                </nav>
              </div>
            </div>
            <div className='user-img' onClick={(e) => this.follow_link(post.click_url)}>
              <div
                className='profile__image__sponsored'
                style={{
                  backgroundImage: `url('${profile_img}'), url('https://myG.gg/logos/myG_transparent.svg')`,
                  backgroundSize: 'cover',
                }}>
                {/* <div className='online__status'></div>*/}
              </div>
            </div>
            <div className='user__details'>
              <div className='author__username'>
                <div className='username' onClick={(e) => this.follow_link(post.click_url)}>
                  {`@${post.alias} `}
                </div>
                <div className='arrow' onClick={(e) => this.follow_link(post.click_url)}></div>
                <div className='promoted' onClick={(e) => this.follow_link(post.click_url)}>
                  Promoted
                </div>
              </div>
            </div>
            <div className='post__content'>
              {this.state.showmore && (
                <Fragment>
                  <p style={{ whiteSpace: 'pre-line' }}>
                    {`${this.state.content}  `}
                    {this.renderHashTags(hash_tags)}
                    <strong onClick={this.toggleShowmore}>{' ... '}See less</strong>
                  </p>
                </Fragment>
              )}
              {!this.state.showmore && (
                <Fragment>
                  <p style={{ whiteSpace: 'pre-line' }}>
                    {`${this.state.content.slice(0, 254)}  `} {this.renderHashTags(hash_tags)}
                    {this.state.content.length > 254 && <strong onClick={this.toggleShowmore}> {' ... '} See more</strong>}
                  </p>
                </Fragment>
              )}
            </div>
          </div>
          <div className='media' onClick={(e) => this.follow_link(post.click_url)}>
            {galleryItems.length > 0 && <ImageGallery items={[...galleryItems]} showBullets={galleryItems.length > 1 ? true : false} />}
          </div>
          <div className='update-stats'>
            <div className='update-stats2'>
              <div className='sponsor-section' onClick={(e) => this.follow_link(post.click_url)}>
                {post.caption}
              </div>
              <div className='sponsor-url' onClick={(e) => this.follow_link(post.click_url)}>
                {post.url}
              </div>
            </div>
            <div className='sponsor-button' onClick={(e) => this.follow_link(post.click_url)}>
              <MyGButton
                customStyles={{ color: '#000', backgroundColor: '#E5C746' }}
                text='More deets'
                onClick={(e) => this.follow_link(post.click_url)}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const app = document.getElementById('app')
