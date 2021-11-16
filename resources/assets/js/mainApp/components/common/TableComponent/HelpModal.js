/*
 * Author : Nitin Tyagi
 * github  : https://github.com/realinit
 * Email : nitin.1992tyagi@gmail.com
 */
import React, { Component } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { MyGModal } from '../../common'
import ImageGallery from '../../common/ImageGallery/ImageGallery'
import { logToElasticsearch } from '../../../../integration/http/logger'

class HelpModal extends Component {
  state = {
    items: [
      {
        original: 'https://myg.gg/platform_images/clash_royale/pt-copy.jpg',
        src: 'https://myg.gg/platform_images/clash_royale/pt-copy.jpg',
        thumbnail: 'https://myg.gg/platform_images/clash_royale/pt-copy.jpg',
        description:"1. Select player name [pt-home.jpg]"
      },
      {
        original: 'https://myg.gg/platform_images/clash_royale/pt-home.jpg',
        src: 'https://myg.gg/platform_images/clash_royale/pt-home.jpg',
        thumbnail: 'https://myg.gg/platform_images/clash_royale/pt-home.jpg',
        description:"2. Select player tag [pt-profile.jpg]"
      },
      {
        original: 'https://myg.gg/platform_images/clash_royale/pt-profile.jpg',
        src: 'https://myg.gg/platform_images/clash_royale/pt-profile.jpg',
        thumbnail: 'https://myg.gg/platform_images/clash_royale/pt-profile.jpg',
        description:"3. Copy Tag [pt-copy.jpg]"
      },
    ],
  }

  async componentDidMount() {
    try {
    } catch (error) {
      this.setState({ loading: false })
      logToElasticsearch('error', 'HelpModal.js', 'Failed componentDidMount:' + ' ' + error)
    }
  }


  render() {
    const { handleModalToggle } = this.props;
    const { items } = this.state;
    return (
      <MyGModal isOpen ariaHideApp={false}>
        <div className='modal-container sortable-Container__container helpModal'>
          <div className='modal-wrap'>
            <div className='modal__header'>
              <FormattedMessage
                id='stats.help.title'
                defaultMessage={`How to find your player tag`}
              />
            </div>
            <div className='modal__body'>
            <ImageGallery 
              items={[...items]} 
              showFullscreenButton={true}
              showBullets={true}
              showGalleryFullscreenButton={true}
            />
            </div>
            <div className='modal__close' onClick={(e) => handleModalToggle(true)}>
              <img src='https://myG.gg/platform_images/Dashboard/X_icon.svg' />
            </div>
          </div>
        </div>
      </MyGModal>
    )
  }
}

export default injectIntl(HelpModal)
