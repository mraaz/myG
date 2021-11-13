/*
 * Author : Nitin Tyagi
 * github  : https://github.com/realinit
 * Email : nitin.1992tyagi@gmail.com
 */
import React, { Component } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { MyGModal,MyGTextarea,MyGButton } from '../../common'
import { logToElasticsearch } from '../../../../integration/http/logger'

class PlayerHistroyModal extends Component {
  state = {
    items: ''
  }

  async componentDidMount() {
    try {
      const tmp = await axios.post('/api/clashroyale/cr_player_manager_show/', {
        user_id: 1,
        group_id: 1
      })
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
              <div className="header__left"><a href={`/profile/${player_name}`}>@{player_name}</a></div>
              <div className="header__right">{player_tag}</div>
            </div>
            <div className='modal__body'>
              <div className='field-title'>Notes</div>
              <div className='description-text-area'>
                <div>
                  <MyGTextarea
                    onChange={(event) => {
                    console.log("event.target.value  ",event.target.value);
                    }}
                    value={''}
                    placeholder='Enter Note'
                    maxLength={250}
                  />
                </div>
              </div>  
            </div>
            <div className='modal__footer'>
              <MyGButton
                customStyles={{ color: '#fff', border: '2px solid #fff', background: '#000' }}
                // onClick={() => this.handleClose()}
                text='Cancel'
              />
              <button type='button'>
                Save
              </button>
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
