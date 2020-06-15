import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import Modal from 'react-modal'

const Approved_gamers = (props) => {
  const [attendees, setAttendees] = useState([])
  const [modalStatus, setModalStatus] = useState(false)
  const { approved_gamers = [] } = props

  useEffect(() => {
    async function fetchData() {
      const getAttendees = await axios.post('/api/attendees/role_call_ALL/', {
        schedule_games_id: props.schedule_games_id,
        counter: 1,
      })
      if (getAttendees.data) {
        const { role_call_ALL = {} } = getAttendees.data
        const { data = [] } = role_call_ALL
        setAttendees(data)
      }
    }
    if (modalStatus == true) fetchData()
  }, [modalStatus])
  const showModal = () => {
    setModalStatus(!modalStatus)
  }

  return (
    <Fragment>
      <div className='gameTime__label'>Gamers</div>
      <div className='gamer__wraper'>
        {approved_gamers.length > 0 &&
          approved_gamers.slice(0, 3).map((gamer) => {
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
        <div className='View__AllGamers' onClick={showModal}>
          ... View All Gamers
        </div>
      </div>

      <div className={`modal-container View__AllGamers__modal ${modalStatus ? 'modal--show' : ''}`}>
        <div className='modal-wrap'>
          <div className='modal__header'>
            Joined Gamers
            <div className='modal__close' onClick={showModal}>
              <img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/X_icon.svg' />
            </div>
          </div>
          <div className='modal__body'>
            <div className='people_group_list_box_header'>
              <div className='box_header_name' style={{ flex: 3 }}>
                Gamer
              </div>
              <div className='box_header_name'>Server</div>
              <div className='box_header_name'>Medals</div>
              <div className='box_header_name'>Position</div>
              <div className='box_header_name'>Level</div>
            </div>

            <div className='people_group_list_box'>
              {attendees.length > 0 &&
                attendees.map((attendee) => {
                  return (
                    <div className='list__item'>
                      <div className='gamer__name'>
                        <div className='default_circle'>
                          <img src={attendee.profile_img} className='groupImage' />
                        </div>
                        <spam>{attendee.alias}</spam>
                      </div>
                      <div className='other__title server'> </div>
                      <div className='other__title medals'> </div>
                      <div className='other__title'>
                        {' '}
                        <span className='position'>1</span>
                      </div>
                      <div className='other__title level'>
                        {'level '}
                        <span className='level__value'>{attendee.level}</span>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        </div>

        <div className='modal-overlay' onClick={showModal}></div>
      </div>
    </Fragment>
  )
}

export default Approved_gamers
