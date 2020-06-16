import React, { Fragment, useState } from 'react'
import axios from 'axios'
import { Toast_style } from '../Utility_Function'
import { toast } from 'react-toastify'
import Select from 'react-select'
import { exitGameGroup } from '../../../common/group'

const buttonStatus = {
  '0': 'Join',
  '1': 'Joined',
  '3': 'Pending',
}

const JoinStatus = (props) => {
  const { join_status = 0, additional_submit_info = false, additional_submit_info_fields = [] } = props
  const [modalStatus, setModalStatus] = useState(false)
  const [leaveButtonStatus, setLeaveButtonStatus] = useState(false)
  const [joinButtonText, setJoinButtonText] = useState(buttonStatus[join_status])
  const [otherInfoPlaceholder, setOtherInfoPlaceholder] = useState('')
  const [inGameUsername, setInGameUsername] = useState('')
  const [selectValues, setSelectValues] = useState({})

  const showModal = () => {
    setModalStatus(!modalStatus)
  }
  const getOption = (data = '') => {
    console.log('data  ', data)

    const arr = data ? data.split(',') : []
    const option =
      arr.length > 0 &&
      arr.map((d) => {
        return { value: d, label: d }
      })
    return option
  }

  const handleJoinGame = () => {
    if (!additional_submit_info) {
      saveJoinGame()
    } else {
      setModalStatus(!modalStatus)
    }
  }
  const saveJoinGame = async () => {
    const get_stats = await axios.post('/api/attendees/savemySpot', {
      schedule_games_id: props.schedule_games_id,
      value_two: null,
      value_three: null,
      value_one: null,
      value_four: null,
      value_five: null,
    })
    if (get_stats.data == 'Limit Reached') {
      toast.success(<Toast_style text={'Sorry mate, the spot got filled up! You are NOT in :('} />)
    } else if (get_stats == false) {
      toast.success(<Toast_style text={'Sorry mate, something went wrong'} />)
    }
    if (get_stats.data == 'Joined') {
      toast.success(<Toast_style text={'Gratz, you are in!'} />)
      setJoinButtonText(buttonStatus['1'])
    }
    if (get_stats.data == 'Pending') {
      toast.success(<Toast_style text={'Host notified, waiting on approval'} />)
      setJoinButtonText(buttonStatus['3'])
    }
  }

  const handleLeaveGame = async () => {
    const removeAttendee = axios.get(`/api/attendees/removeattending/${props.schedule_games_id}`)
    exitGameGroup(props.schedule_games_id)
    setJoinButtonText(buttonStatus['0'])
    setLeaveButtonStatus(!leaveButtonStatus)
  }
  const handleJoindButtonClick = () => {
    setLeaveButtonStatus(!leaveButtonStatus)
  }

  const handleOtherInfoPlaceholder = (e) => {
    const value = e.target.value
    setOtherInfoPlaceholder(value)
  }
  const handleInGameUsername = (e) => {
    const value = e.target.value
    setInGameUsername(value)
  }
  const handleSelectChange = (data, name) => {
    const values = { ...selectValues }
    values[name] = data
    setSelectValues(values)
  }

  const handleSubmit = () => {
    alert('In progress')
  }
  return (
    <Fragment>
      {joinButtonText == 'Join' ? (
        <div className='game__action__buttton'>
          <button type='button' onClick={handleJoinGame}>{`${joinButtonText}`}</button>
        </div>
      ) : (
        <div className='game__action__buttton'>
          <button type='button' onClick={handleJoindButtonClick}>
            {`${joinButtonText}`}
          </button>
          {leaveButtonStatus && <button type='button' className='leaveGame__button' onClick={handleLeaveGame}>{`Leave Game`}</button>}
        </div>
      )}
      <div className={`modal-container View__JoinBUtton__modal ${modalStatus ? 'modal--show' : ''}`}>
        <div className='modal-wrap'>
          <div className='modal__body'>
            <div className='body__content'>
              <h1>Select your role</h1>
              <p>Please, insert your current info and what you wish to apply for</p>
              <input
                type='text'
                className='viewGame__name__input'
                onChange={handleInGameUsername}
                value={inGameUsername}
                placeholder='In-game username'
              />
              <input
                type='text'
                className='viewGame__name__input'
                onChange={handleOtherInfoPlaceholder}
                value={otherInfoPlaceholder}
                placeholder='Other info (Placeholder)'
              />
              {additional_submit_info_fields.map((fields, index) => {
                const type = fields[2] == 'multi' ? true : false
                const Placeholder = fields[1] ? fields[1] : ''
                const Obj = fields[0]
                const key = Object.keys(fields[0])[0]
                const values = Object.values(fields[0])[0]
                return (
                  <Select
                    onChange={(data) => handleSelectChange(data, key)}
                    options={getOption(values)}
                    placeholder={Placeholder}
                    name={key}
                    isClearable
                    className='game__values'
                    classNamePrefix='filter'
                    value={selectValues[key] || ''}
                    isMulti={type}
                    key={index}
                  />
                )
              })}
            </div>
            <div className='modal__close' onClick={showModal}>
              <img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/X_icon.svg' />
            </div>
          </div>
          <div className='modal__footer'>
            <button type='button' onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>

        <div className='modal-overlay' onClick={showModal}></div>
      </div>
    </Fragment>
  )
}

export default JoinStatus
