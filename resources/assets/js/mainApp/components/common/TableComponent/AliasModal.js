
   /*
 * Author : Nitin Tyagi
 * github  : https://github.com/realinit
 * Email : nitin.1992tyagi@gmail.com
 */ 
import React, {Component} from 'react';
import { FormattedMessage, injectIntl } from 'react-intl'
import axios from 'axios'
import { MyGModal,MyGAsyncSelect,MyGButton,MyGSelect,MyGDatePicker } from '../../common'
import { parsePlayersToSelectData } from '../../../utils/InvitePlayersUtils'
import moment from 'moment';
import notifyToast from '../../../../common/toast';


class AliasModal extends Component {
  state = {
    items: '',
    lockPlayerEnabled:false,
    alias:{},
    reminderTime:{},
    reminder:0
  };

  async componentDidMount () {
    try {
      const tmp = await axios.post('/api/clashroyale/getPlayerDetails/', {
        group_id: this.props.group_id,
        player_tag: this.props.player_tag
        })
        console.log("getPlayerDetails >>>>> ",tmp);
    } catch (error) {
      console.log("getPlayerDetails error  >>  ",error);
    }
    
  } 

  createOption = (label) => ({
    label,
    value: label,
  })

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

  handleDelete = (e) => {
    this.props.handleModalToggle()
  }

  togglelockPlayerEnabled = (e) => {
    this.setState({lockPlayerEnabled:!this.state.lockPlayerEnabled})
  }

  handleSave = async (e) => {
    if(this.state.alias.id){
      const tmp = await axios.post('/api/clashroyale/storePlayerDetails/', {
        group_id: this.props.group_id,
        player_tag: this.props.player_tag,
        clanTag: this.props.clanTag,
        user_id: this.state.alias.id,
        player_locked: this.state.lockPlayerEnabled,
        reminder_one: '01:00',
        reminder_two: '01:00',
        reminder_three: '01:00'
      })
      this.props.handleModalToggle()
    } else {
      notifyToast('Oops ! Please select a user first!');
    }
    
  }
  handleAliasOnChange = (alias) => {
    this.setState({alias})
  }
  handleAddReminderTime = () => {
    const {reminderTime={},reminder=0} = this.state;
    if(reminder < 3){
      reminderTime[`reminderTime_${reminder+1}`] = ""
    const rem  = reminder < 1 ? 0 : reminder;
    this.setState({reminderTime,reminder:rem+1})
    } else {
      notifyToast('Sorry Mate ! You can not add more then 3 reminder.');
    }
    
  }
  handleRemoveReminderTime = (index) => {
    const {reminderTime={},reminder=0} = this.state;
    const data = {...reminderTime};
    const key  = `reminderTime_${index+1}`
    delete data[key];
    const rem  = reminder < 1 ? 0 : reminder-1;
    this.setState({reminderTime:data,reminder:rem})
  }
  handleDateChange = (val,index) =>{
    const key  = `reminderTime_${index+1}`  
    // const value = moment(val).format('HH:mm')
    const {reminderTime={}} = this.state;
    reminderTime[key] = val
    this.setState({reminderTime})
  }

  render() {
    const {isOpen=false,handleModalToggle} = this.props;
    const {reminder,reminderTime,lockPlayerEnabled,alias} = this.state;
    return (
        <MyGModal isOpen={isOpen} ariaHideApp={false}>
            <div className='modal-container sortable-Container__container'>
                <div className="modal-wrap">
                    <div className="modal__header">
                      <FormattedMessage id='stats.player.title' defaultMessage='War reminders will be sent only if battles are remaining.' />
                    </div>
                    <div className="modal__body">
                      <div className='field-title'>
                        <FormattedMessage id='stats.player.alias' defaultMessage='MyG Alias' />
                      </div>
                      <MyGAsyncSelect
                        isClearable
                        isValidNewOption={() => {
                          return
                        }}
                        loadOptions={this.onPlayersSuggestionFetch}
                        onChange={(value) => {
                          this.handleAliasOnChange(value)
                        }}
                        value={alias}
                        placeholder='Enter your alias' 
                        className='test'
                      /> 
                      <div className='option'> 
                        <div className='title'>
                          <FormattedMessage id='stats.player.clanSwitch' defaultMessage='Lock player in this clan' />
                        </div>
                        <div className='button__switch browser__notification'>
                          <label
                            className={`switchLabel ${lockPlayerEnabled ? 'on' : 'off'}`}
                            onClick={() => this.togglelockPlayerEnabled()}
                          >
                            {lockPlayerEnabled ? 'on' : 'off'}
                          </label>
                          <input
                            id='switch-orange'
                            type='checkbox'
                            className='switch'
                            value={lockPlayerEnabled}
                            checked={lockPlayerEnabled}
                            onChange={() => this.togglelockPlayerEnabled()}
                          />
                        </div>
                      </div> 
                      <div className="reminderTime_section">
                        {[...new Array(reminder)].map((rem,index)=>{
                          return <div className="reminderTime_row" key={`reminderTime_${index+1}`}>
                                    <div className='field-title'>{`Reminder Time ${index+1}`}</div>
                                    <MyGDatePicker 
                                        showTimeSelect 
                                        showTimeSelectOnly 
                                        dateFormat="HH:mm" 
                                        timeIntervals={60} 
                                        style={false}
                                        onChange={ e => this.handleDateChange(e,index) } 
                                        selected={reminderTime[`reminderTime_${index+1}`]}

                                    />
                                    {/* <MyGSelect
                                      isClearable
                                      isValidNewOption={() => {
                                        return
                                      }}
                                      options={[]}//this.createOption()}
                                      onChange={(value) => {
                                        console.log("value ",value);
                                      }}
                                      value={''}
                                      placeholder='Enter your option' 
                                      className='test'
                                    />  */}
                                    <div>
                                      <MyGButton
                                        customStyles={{ color: '#fff', border: '2px solid #fff', background: '#fa3e3f',width: '150px' }}
                                        onClick={() => this.handleRemoveReminderTime(index)}
                                        text='- Remove'
                                      />  
                                    </div>
                              </div>
                        })}
                      {alias && Object.keys(alias).length > 0 && reminder < 3 && <MyGButton
                        customStyles={{ color: '#000', background: '#e5c746',width:"220px",marginTop:'10px' }}
                        onClick={() => this.handleAddReminderTime()}
                        text='+ Add Reminder Time'
                      />  
                      }
                      </div> 
                    
                    </div>
                    <div className='modal__footer'>
                    <MyGButton
                      customStyles={{ color: '#fff', border: '2px solid #fff', background: '#000' }}
                      onClick={() => this.handleClose()}
                      text='Cancel'
                    />
                    <MyGButton
                      customStyles={{ color: '#fff', border: '2px solid #fff', background: '#fa3e3f' }}
                      onClick={() => this.handleDelete()}
                      text='Delete'
                    />
                    <button type='button'  onClick={() => this.handleSave(true)}>
                      Save
                    </button>
                  </div>
                    <div className="modal__close" onClick={handleModalToggle}><img src="https://myG.gg/platform_images/Dashboard/X_icon.svg" /></div>
                </div>
            </div>
        </MyGModal>
    );
  }
}

export default (injectIntl(AliasModal))