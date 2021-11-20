import React from 'react'
import ImageGallery from 'react-image-gallery'

export default class CustomImageGallery extends React.Component {
  constructor() {
    super()
    this.state = {
      showVideo: {},
      videoPreviewIcon: 'https://myG.gg/platform_images/Dashboard/BTN_Attach_Video.svg'
    }

    this.imageFileType = ['jpeg', 'jpg', 'png', 'gif']
    this.videoFileType = ['mov', 'webm', 'mpg', 'mp4', 'avi', 'ogg']
  }

  _toggleShowVideo(url) {
    this.state.showVideo[url] = !Boolean(this.state.showVideo[url])
    this.setState({
      showVideo: this.state.showVideo
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
          renderItem: this._renderVideo.bind(this)
        }
      } else {
        return { original: data.src, original: data.src, thumbnail: data.src,description: data.description }
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
            lazyLoad={this.props.lazyLoad ? this.props.lazyLoad : true}
            showThumbnails={this.props.showThumbnails ? this.props.showThumbnails : false}
            showPlayButton={this.props.showPlayButton ? this.props.showPlayButton : false}
            items={images}
            showBullets={this.props.showBullets ? this.props.showBullets : false}
            autoPlay={this.props.autoPlay ? this.props.autoPlay : false}
            isRTL={this.props.isRTL ? this.props.isRTL : false}
            disableSwipe={this.props.disableSwipe ? this.props.disableSwipe : true}
            showNav={this.props.showNav ? this.props.showNav : true}
            showFullscreenButton={this.props.showFullscreenButton ? this.props.showFullscreenButton : false}
            showGalleryFullscreenButton={this.props.showGalleryFullscreenButton ? this.props.showGalleryFullscreenButton : false}
            useBrowserFullscreen={true}
          />
        </section>
      )
    } else {
      return ''
    }
  }
}
