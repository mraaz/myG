/*
 * Author : Nitin Tyagi
 * github  : https://github.com/realinit
 * Email : nitin.1992tyagi@gmail.com
 */
import React, { Component } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { MyGModal } from '../../common'
import { logToElasticsearch } from '../../../../integration/http/logger'

class PlayerHistroyModal extends Component {
  state = {
    items: ''
  }

  async componentDidMount() {
    try {
    } catch (error) {
      this.setState({ loading: false })
      logToElasticsearch('error', 'HelpModal.js', 'Failed componentDidMount:' + ' ' + error)
    }
  }


  render() {
    const { handleModalToggle,player_name='',player_tag='' } = this.props;
    const { items } = this.state;
    return (
      <MyGModal isOpen ariaHideApp={false}>
        <div className='modal-container sortable-Container__container playerHistory'>
          <div className='modal-wrap'>
            <div className='modal__header'>
              <div>{player_name}</div>
              <div>{player_tag}</div>
            </div>
            <div className='modal__body'>
              history
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

export default injectIntl(PlayerHistroyModal)
