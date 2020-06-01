import React from 'react'
import ReactDOM from 'react-dom'

import ImageGallery from 'react-image-gallery'

const PREFIX_URL = 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/'

export default class CustomImageGallery extends React.Component {
  constructor() {
    super()
    this.state = {
      showVideo: {},
      videoPreviewIcon:
        'https://mygame-media.s3.ap-southeast-2.amazonaws.com/user_files/100_1590944450417_QtATks_post_image_1590944450050_video-placeholder.jpg',
    }

    this.imageFileType = ['jpeg', 'jpg', 'png', 'gif']
    this.videoFileType = ['mov', 'webm', 'mpg', 'mp4', 'avi', 'ogg']
  }

  _toggleShowVideo(url) {
    this.state.showVideo[url] = !Boolean(this.state.showVideo[url])
    this.setState({
      showVideo: this.state.showVideo,
    })

    if (this.state.showVideo[url]) {
      if (this.state.showPlayButton) {
        this.setState({ showGalleryPlayButton: false })
      }

      if (this.state.showFullscreenButton) {
        this.setState({ showGalleryFullscreenButton: false })
      }
    }
  }

  _renderVideo(item) {
    return (
      <div>
        (
        <div className='video-wrapper'>
          <video className='post-video' controls autoplay>
            <source src={item.embedUrl}></source>
          </video>
        </div>
        )
      </div>
    )
  }

  getPreviewImageGallery = (preview_filesData) => {
    return preview_filesData.map((data) => {
      const splitUrl = data.src.split('.')
      let fileType = splitUrl[splitUrl.length - 1]
      if (data.src.includes('video') || this.videoFileType.includes(fileType)) {
        return {
          embedUrl: data.src,
          original: this.state.videoPreviewIcon,
          thumbnail: this.state.videoPreviewIcon,
          renderItem: this._renderVideo.bind(this),
        }
      } else {
        return { original: data.src, original: data.src, thumbnail: data.src }
      }
    })
  }

  render() {
    if (this.props.items && this.props.items.length > 0) {
      const images = this.getPreviewImageGallery(this.props.items)
      return (
        <section className='app'>
          <ImageGallery
            ref={(i) => (this._imageGallery = i)}
            onImageLoad={this._onImageLoad}
            lazyLoad={true}
            showThumbnails={false}
            showPlayButton={false}
            items={images}
            showBullets={true}
            autoPlay={false}
            isRTL={false}
            disableSwipe={false}
            showNav={true}
            showFullscreenButton={false}
          />
        </section>
      )
    } else {
      return ''
    }
  }
}
