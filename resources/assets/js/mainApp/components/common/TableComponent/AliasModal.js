/*
 * Author : Nitin Tyagi
 * github  : https://github.com/realinit
 * Email : nitin.1992tyagi@gmail.com
 */
import React, { Component } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { MyGModal, MyGAsyncSelect, MyGButton, MyGDatePicker, MyGSweetAlert } from '../../common'
import { parsePlayersToSelectData } from '../../../utils/InvitePlayersUtils'
import notifyToast from '../../../../common/toast'
import { logToElasticsearch } from '../../../../integration/http/logger'
import { detectMob } from '../../../utils/utils'

const nm = {
  1: 'one',
  2: 'two',
  3: 'three'
}

import axios from 'axios'
import moment from 'moment'

class AliasModal extends Component {
  state = {
    items: '',
    lockPlayerEnabled: false,
    alias: null,
    reminderTime: {},
    reminder: 0,
    userList: '',
    alert: null,
    timeZone: ''
  }

  async componentDidMount() {
    try {
      this.setState({ loading: true }, async () => {
        const tmp = await axios.post('/api/clashroyale/getPlayerDetails/', {
          group_id: this.props.group_id,
          player_tag: this.props.player_tag
        })
        const { data = {} } = tmp
        const { id = '', timeZone = '', reminder_time_1 = '', reminder_time_2 = '', reminder_time_3 = '', player_locked = '' } = data
        let reminder = 0
        const reminderTime = {}
        if (id) {
          const _curDate = moment().format('YYYY-MM-DD')
          if (reminder_time_1) {
            reminder = 1
            reminderTime['reminderTime_one'] = moment(_curDate + 'T' + reminder_time_1 + ':00')
          }
          if (reminder_time_2) {
            reminder = 2
            reminderTime['reminderTime_two'] = moment(_curDate + 'T' + reminder_time_1 + ':00')
          }
          if (reminder_time_3) {
            reminder = 3
            reminderTime['reminderTime_three'] = moment(_curDate + 'T' + reminder_time_1 + ':00')
          }
          this.setState({
            clash_royale_player_id: id,
            reminder,
            reminderTime,
            timeZone,
            lockPlayerEnabled: player_locked,
            loading: false
          })
        }

        const all_group_members = await axios.post(`/api/usergroup/usergroupSearch_top_ishUsers`, {
          group_id: this.props.group_id
        })

        const parsedData = parsePlayersToSelectData(all_group_members.data.all_usergroup_members)
        console.log(parsedData, '<<ghf')
        this.setState({
          userList: parsedData,
          loading: false
        })
      })
    } catch (error) {
      this.setState({ loading: false })
      logToElasticsearch('error', 'AliasModal.js', 'Failed componentDidMount:' + ' ' + error)
    }
  }

  onPlayersSuggestionFetch = async (value) => {
    try {
      const {
        data: { all_group_members }
      } = await axios.post(`/api/usergroup/usergroupSearchResults_withOwner`, {
        alias: value,
        group_id: this.props.group_id
      })
      const parsedData = parsePlayersToSelectData(all_group_members)
      return parsedData
    } catch (error) {
      logToElasticsearch('error', 'AliasModal.js', 'Failed onPlayersSuggestionFetch:' + ' ' + error)
    }
  }

  handleClose = (e) => {
    this.props.handleModalToggle(true)
  }

  handleDelete = async (e) => {
    const { clash_royale_player_id = '' } = this.state
    if (clash_royale_player_id) {
      const tmp = await axios.delete(`/api/clashroyale/deletePlayerDetails/${clash_royale_player_id}`)
      if(tmp){
        notifyToast('Yeah ! Data deleted successfully!')
        this.props.handleModalToggle(true)
      }
    } else {
      notifyToast('Oops ! you can not delete this as this was not saved for this user earlier.')
    }
  }
  showAlert() {
    const getAlert = () => (
      <MyGSweetAlert
        danger
        showCancel
        title='Are you sure you wish to delete this?'
        confirmBtnText='Make it so!'
        focusCancelBtn={true}
        focusConfirmBtn={false}
        showCloseButton={false}
        btnSize='lg'
        style={{
          display: 'flex',
          whiteSpace: 'pre',
          width: '41%'
        }}
        onConfirm={() => this.hideAlert('true')}
        onCancel={() => this.hideAlert('false')}
      >
        You will not be able to recover this entry!
      </MyGSweetAlert>
    )

    this.setState({
      alert: getAlert()
    })
  }

  hideAlert = (text) => {
    this.setState({
      alert: null
    })
    if (text == 'true') {
      this.handleDelete()
    }
  }

  togglelockPlayerEnabled = (e) => {
    this.setState({ lockPlayerEnabled: !this.state.lockPlayerEnabled })
  }

  handleSave = async (e) => {
    const { reminderTime = {}, clash_royale_player_id = '' } = this.state
    if (this.state.alias?.id) {
      const tmp = await axios.post('/api/clashroyale/storePlayerDetails/', {
        clash_royale_player_id,
        group_id: this.props.group_id,
        player_tag: this.props.player_tag,
        clanTag: this.props.clanTag,
        user_id: this.state.alias.id,
        player_locked: this.state.lockPlayerEnabled,
        reminder_one: reminderTime['reminderTime_one'] ? moment(reminderTime['reminderTime_one']).format('HH:mm') : '',
        reminder_two: reminderTime['reminderTime_two'] ? moment(reminderTime['reminderTime_two']).format('HH:mm') : '',
        reminder_three: reminderTime['reminderTime_three'] ? moment(reminderTime['reminderTime_three']).format('HH:mm') : ''
      })
      if(tmp){
        notifyToast('Yeah ! Data saved successfully!')
        this.props.handleModalToggle(true)
      }
     
    } else {
      notifyToast('Oops ! Please select a user first!')
    }
  }
  handleAliasOnChange = (alias) => {
    this.setState({ alias })
  }
  handleAddReminderTime = () => {
    const { reminderTime = {}, reminder = 0 } = this.state
    if (reminder < 3) {
      reminderTime[`reminderTime_${nm[reminder + 1]}`] = ''
      const rem = reminder < 1 ? 0 : reminder
      this.setState({ reminderTime, reminder: rem + 1 })
    } else {
      notifyToast('Sorry Mate ! You can not add more then 3 reminder.')
    }
  }
  handleRemoveReminderTime = (index) => {
    const { reminderTime = {}, reminder = 0 } = this.state
    const data = { ...reminderTime }
    const key = `reminderTime_${nm[index + 1]}`
    delete data[key]
    const rem = reminder < 1 ? 0 : reminder - 1
    this.setState({ reminderTime: data, reminder: rem })
  }
  handleDateChange = (val, index) => {
    const key = `reminderTime_${nm[index + 1]}`
    // const value = moment(val).format('HH:mm')
    const { reminderTime = {} } = this.state
    reminderTime[key] = val
    this.setState({ reminderTime })
  }

  render() {
    const { handleModalToggle } = this.props
    const { reminder, reminderTime, lockPlayerEnabled, alias,timeZone,loading } = this.state;
    const isMobile = detectMob()
    // if(loading) return null
    return (
      <MyGModal isOpen ariaHideApp={false}>
        <div className='modal-container sortable-Container__container'>
          {this.state.alert}
          <div className='modal-wrap'>
            <div className='modal__header'>
              <FormattedMessage id='stats.player.title' defaultMessage='War reminders will be sent only if battles are remaining.' />
            </div>
            <div className='modal__body'>
              <div className='field-title'>
                <FormattedMessage id='stats.player.alias' defaultMessage='myG Alias' />
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
                options={this.state.userList}
                value={alias}
                placeholder='Enter your alias'
                className='test'
              />
              <div className='option'>
                <div className='title'>
                  <FormattedMessage id='stats.player.clanSwitch' defaultMessage='Lock player in this clan' />
                </div>
                <div className='button__switch browser__notification'>
                  <label className={`switchLabel ${lockPlayerEnabled ? 'on' : 'off'}`} onClick={() => this.togglelockPlayerEnabled()}>
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
              <div className='reminderTime_section'>
                <div className='title'>
                  <FormattedMessage
                    id='stats.player.reminderTimeLabel'
                    defaultMessage={`"Please select when you want the reminder to be sent out. Currently using ${timeZone} timezone" You can update this on the user's @${this.props.player_name}`}
                    values={{
                      timezone: timeZone,
                      username: this.props.player_name,
                      link: <a href={`/profile/${this.props.player_name}`}>@{this.props.player_name}</a>
                    }}
                  />
                </div>
                {[...new Array(reminder)].map((rem, index) => {
                  return (
                    <div className='reminderTime_row' key={`reminderTime_${index + 1}`}>
                      <div className='field-title'>{`Reminder Time ${index + 1}`}</div>
                      <MyGDatePicker
                        showTimeSelect
                        showTimeSelectOnly
                        dateFormat='HH:mm'
                        timeIntervals={60}
                        style={false}
                        onChange={(e) => this.handleDateChange(e, index)}
                        selected={reminderTime[`reminderTime_${nm[index + 1]}`]}
                      />
                      <div>
                        <MyGButton
                          customStyles={{ color: '#fff', border: '2px solid #fff', background: '#fa3e3f', maxWidth: '150px' }}
                          onClick={() => this.handleRemoveReminderTime(index)}
                          text={`${isMobile ? "-": "- Remove"}`}
                        />
                      </div>
                    </div>
                  )
                })}
                {alias && Object.keys(alias).length > 0 && reminder < 3 && (
                  <MyGButton
                    customStyles={{ color: '#000', background: '#e5c746', maxWidth: '220px', marginTop: '10px' }}
                    onClick={() => this.handleAddReminderTime()}
                    text='+ Add Reminder Time'
                  />
                )}
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
                onClick={() => this.showAlert()}
                text='Delete'
              />
              <button type='button' onClick={() => this.handleSave(true)}>
                Save
              </button>
            </div>
            <div className='modal__close' onClick={e=>handleModalToggle(true)}>
              <img src='https://myG.gg/platform_images/Dashboard/X_icon.svg' />
            </div>
          </div>
        </div>
      </MyGModal>
    )
  }
}

export default injectIntl(AliasModal)
