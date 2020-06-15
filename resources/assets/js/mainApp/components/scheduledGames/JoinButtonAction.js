import React, { Fragment, useState } from 'react'
import axios from 'axios'
import { Toast_style } from '../Utility_Function'
import { toast } from 'react-toastify'
import Select from 'react-select'

const buttonStatus = {
  '0': 'Join',
  '1': 'Joined',
  '3': 'Pending',
}

const JoinStatus = (props) => {
  const { join_status = 0, additional_submit_info = false, additional_submit_info_fields = [] } = props
  const [modalStatus, setModalStatus] = useState(false)
  const [leaveButtonStatus, setLeaveButtonStatus] = useState(false)
  const [joinButtonText, setSoinButtonText] = useState(buttonStatus[join_status])

  const showModal = () => {
    setModalStatus(!modalStatus)
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
    }
    if (get_stats.data == 'Pending') {
      toast.success(<Toast_style text={'Host notified, waiting on approval'} />)
    }
  }

  const handleLeaveGame = () => {
    console.log('handleLeaveGame')
  }
  const handleJoindButtonClick = () => {
    setLeaveButtonStatus(!leaveButtonStatus)
  }

  return (
    <Fragment>
      {joinButtonText == 'Join' ? (
        <div className='game__action__buttton'>
          <button type='button' onClick={handleJoinGame}>{`${joinButtonText}`}</button>
        </div>
      ) : (
        <div className='game__action__buttton'>
          <button type='button' onClick={handleJoinGame}>
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
              <Select
                onChange={(data) => this.handleChange_region(data, 'region')}
                options={[]}
                placeholder='Select your region'
                name='region-box'
                isClearable
                className='game__values'
                classNamePrefix='filter'
                value={''}
              />
              <Select
                onChange={(data) => this.handleChange_region(data, 'region')}
                options={[]}
                placeholder='Select your region'
                name='region-box'
                isClearable
                className='game__values'
                classNamePrefix='filter'
                value={''}
              />
              <Select
                onChange={(data) => this.handleChange_region(data, 'region')}
                options={[]}
                placeholder='Select your region'
                name='region-box'
                isClearable
                className='game__values'
                classNamePrefix='filter'
                value={''}
              />
              <Select
                onChange={(data) => this.handleChange_region(data, 'region')}
                options={[]}
                placeholder='Select your region'
                name='region-box'
                isClearable
                className='game__values'
                classNamePrefix='filter'
                value={''}
              />
              <Select
                onChange={(data) => this.handleChange_region(data, 'region')}
                options={[]}
                placeholder='Select your region'
                name='region-box'
                isClearable
                className='game__values'
                classNamePrefix='filter'
                value={''}
              />
            </div>
            <div className='modal__close' onClick={showModal}>
              <img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/X_icon.svg' />
            </div>
          </div>
          <div className='modal__footer'>
            <button type='button'>Submit</button>
          </div>
        </div>

        <div className='modal-overlay' onClick={showModal}></div>
      </div>
    </Fragment>
  )
}

export default JoinStatus
