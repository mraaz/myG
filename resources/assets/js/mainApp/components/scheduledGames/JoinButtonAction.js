import React, { Fragment, useState, useEffect } from 'react'
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
const queryMapping = {
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
}

const JoinStatus = (props) => {
  const { join_status = 0, additional_submit_info = false, additional_submit_info_fields = [] } = props
  const [modalStatus, setModalStatus] = useState(false)
  const [leaveButtonStatus, setLeaveButtonStatus] = useState(false)
  const [joinButtonText, setJoinButtonText] = useState('')
  const [otherInfoPlaceholder, setOtherInfoPlaceholder] = useState('')
  const [inGameUsername, setInGameUsername] = useState('')
  const [selectValues, setSelectValues] = useState({})

  useEffect(() => {
    setJoinButtonText(buttonStatus[join_status])
    return () => setJoinButtonText(buttonStatus['0'])
  }, [props.join_status])

  const showModal = () => {
    setModalStatus(!modalStatus)
    setSelectValues({})
  }
  const getOption = (data = '') => {
    let arr = []
    if ((data != null) & (data != '')) {
      arr = data != null ? data.split(',') : []
    }

    const option =
      arr.length > 0
        ? arr.map((d) => {
            return { value: d, label: d }
          })
        : []
    return option
  }

  const handleJoinGame = () => {
    if (!additional_submit_info) {
      saveJoinGame()
    } else {
      setModalStatus(!modalStatus)
    }
  }
  const saveJoinGame = async (query = {}) => {
    const get_stats = await axios.post('/api/attendees/savemySpot', {
      schedule_games_id: props.schedule_games_id,
      value_two: null,
      value_three: null,
      value_one: null,
      value_four: null,
      value_five: null,
      ...query,
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
  const getFinalValueToSubmit = (data) => {
    let payload = {}
    for (let key in data) {
      if (Array.isArray(data[key])) {
        const arr = data[key] && data[key].length > 0 ? data[key].map((d) => d.value) : data[key]
        if (arr) {
          payload[key] = arr.toString()
        }
      } else {
        payload[key] = data[key].value || ''
      }
    }
    return payload
  }

  const handleSubmit = () => {
    const valueToSubmit = getFinalValueToSubmit(selectValues)
    let index = 1
    let query = {}
    for (let key in valueToSubmit) {
      query[`value_${queryMapping[index]}`] = { [key]: valueToSubmit[key] }
      index++
    }
    saveJoinGame(query)
    setModalStatus(!modalStatus)
    setSelectValues({})
  }
  return (
    <Fragment>
      {joinButtonText == 'Join' ? (
        <div className='game__action__buttton'>
          <button type='button' onClick={handleJoinGame}>{`${joinButtonText}`}</button>
        </div>
      ) : (
        <div className='game__action__buttton'>
          <button type='button' onClick={handleJoindButtonClick} className={`${leaveButtonStatus ? 'open' : ''}`}>
            {`${joinButtonText}`}
            <img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/View+Game/Down+Carrot.svg' />
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
              {/* <input
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
              /> */}
              {additional_submit_info_fields.map((fields, index) => {
                let type = false
                let Placeholder = ''
                let key = []
                let values = []
                if (fields[2] != null) {
                  type = fields[2] == 'Multi' ? true : false
                }
                if (fields[1] != null) {
                  Placeholder = fields[1] ? fields[1] : ''
                }
                const Obj = fields[0]
                if (Obj != null) {
                  key = Object.keys(Obj)[0]
                  values = Object.values(Obj)[0]
                }

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
