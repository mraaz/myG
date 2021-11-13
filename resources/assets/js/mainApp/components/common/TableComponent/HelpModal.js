/*
 * Author : Nitin Tyagi
 * github  : https://github.com/realinit
 * Email : nitin.1992tyagi@gmail.com
 */
import React, { Component } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { MyGModal } from '../../common'
import { logToElasticsearch } from '../../../../integration/http/logger'

class HelpModal extends Component {
  state = {
    items: [
      'https://myg.gg/platform_images/clash_royale/pt-copy.jpg',
      'https://myg.gg/platform_images/clash_royale/pt-home.jpg',
      'https://myg.gg/platform_images/clash_royale/pt-profile.jpg'
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
    return (
      <MyGModal isOpen ariaHideApp={false}>
        <div className='modal-container sortable-Container__container'>
          <div className='modal-wrap'>
            <div className='modal__header'>
              <FormattedMessage
                id='stats.help.title'
                defaultMessage={`How to find your player tag`}
              />
            </div>
            <div className='modal__body'>
              ddd
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
