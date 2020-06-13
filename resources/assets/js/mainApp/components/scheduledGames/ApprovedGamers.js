import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import Modal from 'react-modal'

const Approved_gamers = (props) => {
  const [attendees, setAttendees] = useState([])
  const [modalStatus, setModalStatus] = useState(false)
  const { approved_gamers = [] } = props

  useEffect(async () => {
    const getAttendees = await axios.post('/api/attendees/role_call_ALL/', {
      schedule_games_id: props.schedule_games_id,
      counter: 1,
    })
    if (getAttendees.data) {
      const { role_call_ALL = {} } = getAttendees.data
      const { data = [] } = role_call_ALL
      setAttendees(data)
    }
    return () => {}
  }, [])
  const showModal = () => {
    setModalStatus(!modalStatus)
  }
  console.log('attendees  ', attendees)

  return (
    <Fragment>
      <div className='gameTime__label'>Gamers</div>
      <div className='gamer__wraper'>
        {approved_gamers.length > 0 &&
          approved_gamers.map((gamer) => {
            return (
              <div className='single__gamer'>
                <div className='gamer__image '>
                  <img src={gamer.profile_img} />
                </div>
                <div className='gamer__alias ' title={gamer.alias}>
                  {gamer.alias}
                </div>
              </div>
            )
          })}
      </div>
      {/* <div className='View__AllGamers' onClick={showModal}>
        View All Gamers
      </div> */}
      <div className={`modal-container View__AllGamers__modal ${modalStatus ? 'modal--show' : ''}`}>
        <div className='modal-wrap'>
          <div className='modal__header'>
            Joined Gamers
            <div className='modal__close' onClick={showModal}></div>
          </div>
          <div className='modal__body'>
            {attendees.length > 0 &&
              attendees.map((attendee) => {
                return attendee.alias
              })}
          </div>
        </div>

        <div className='modal-overlay' onClick={showModal}></div>
      </div>
    </Fragment>
  )
}

export default Approved_gamers
