
   /*
 * Author : Nitin Tyagi
 * github  : https://github.com/realinit
 * Email : nitin.1992tyagi@gmail.com
 */ 
import React, {Component} from 'react';
import axios from 'axios'
import { MyGModal,MyGAsyncSelect,MyGButton } from '../../common'
import { parsePlayersToSelectData } from '../../../utils/InvitePlayersUtils'


class AliasModal extends Component {
  state = {
    items: ''
  };

  onPlayersSuggestionFetch = async (value) => {
    try {
      const {
        data: { playerSearchResults }
      } = await axios.post(`/api/user/playerSearchResults`, {
        alias: value
      })
      const parsedData = parsePlayersToSelectData(playerSearchResults)
      return parsedData
    } catch (error) {
      // error player suggestion fetch
    }
  }

  handleClose = (e) => {
    this.props.handleModalToggle()
  }

  handleSave = (e) => {
    this.props.handleModalToggle()
  }

  render() {
    const {isOpen=false,handleModalToggle} = this.props;
    return (
        <MyGModal isOpen={isOpen} ariaHideApp={false}>
            <div className='modal-container sortable-Container__container'>
                <div className="modal-wrap">
                    <div className="modal__header">War reminders will be sent only if battles are remaining.</div>
                    <div className="modal__body">
                      <div className='field-title'>MyG Alias</div>
                      <MyGAsyncSelect
                        isClearable
                        isValidNewOption={() => {
                          return
                        }}
                        loadOptions={this.onPlayersSuggestionFetch}
                        onChange={(value) => {
                          console.log("value ",value);
                        }}
                        value={''}
                        placeholder='Enter your alias' 
                        className='test'
                      /> 
                      <div className='option'> 
                      <div className='title'>Lock player in this clan</div>
                      <div className='button__switch browser__notification'>
                        <label
                          className={`switchLabel ${this.props.onlineNotificationsEnabled ? 'on' : 'off'}`}
                          // onClick={() => this.props.toggleOnlineNotifications(this.props.userId)}
                        >
                          {this.props.onlineNotificationsEnabled ? 'on' : 'off'}
                        </label>
                        <input
                          id='switch-orange'
                          type='checkbox'
                          className='switch'
                          value={this.props.onlineNotificationsEnabled}
                          checked={this.props.onlineNotificationsEnabled}
                          // onChange={() => this.props.toggleOnlineNotifications(this.props.userId)}
                        />
                      </div>
                    </div>  
                    
                    </div>
                    <div className='modal__footer'>
                    <MyGButton
                      customStyles={{ color: '#fff', border: '2px solid #fff', background: '#000' }}
                      onClick={() => this.handleClose()}
                      text='Cancel'
                    />
                    <button type='button'  onClick={() => this.handleSave(true)}>
                      Save
                    </button>
                  </div>
                    <div class="modal__close" onClick={handleModalToggle}><img src="https://myG.gg/platform_images/Dashboard/X_icon.svg" /></div>
                </div>
            </div>
        </MyGModal>
    );
  }
}


export default AliasModal;