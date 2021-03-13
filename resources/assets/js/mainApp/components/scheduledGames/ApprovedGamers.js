/*
 * Author : nitin Tyagi
 * github  : https://github.com/realinit
 * Email : nitin.1992tyagi@gmail.com
 */
import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'
const defaultUserImage = 'https://myG.gg/default_user/new-user-profile-picture.png'

const Approved_gamers = (props) => {
  const [attendees, setAttendees] = useState([])
  const [extraHeaders, setHeaders] = useState([])
  const [extraKeys, setExtraKeys] = useState([])
  const [modalStatus, setModalStatus] = useState(false)
  const { approved_gamers = [] } = props

  useEffect(() => {
    async function fetchHeaders() {
      const getHeaders = await axios.get(`/api/attendees/getHeader/${props.schedule_games_id}`)
      if (getHeaders.data) {
        const { additional_submit_info = false, additional_submit_info_fields = {} } = getHeaders.data
        if (additional_submit_info) {
          setHeaders(Object.values(additional_submit_info_fields))
          setExtraKeys(Object.keys(additional_submit_info_fields))
        }
      }
    }

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

    if (modalStatus == true) {
      fetchData()
      fetchHeaders()
    }
  }, [modalStatus])
  const showModal = () => {
    setModalStatus(!modalStatus)
  }

  const addDefaultSrc = (ev) => {
    ev.target.src = 'https://myG.gg/default_user/new-user-profile-picture.png'
  }

  return (
    <Fragment>
      {approved_gamers.length > 0 && <div className='gameTime__label'>Gamers ({approved_gamers.length})</div>}
      <div className='gamer__wraper'>
        {approved_gamers.length > 0 &&
          approved_gamers.slice(0, 3).map((gamer) => {
            return (
              <div className='single__gamer'>
                <Link to={`/profile/${gamer.alias}`}>
                  <div className='gamer__image '>
                    <img onError={addDefaultSrc} src={gamer.profile_img ? gamer.profile_img : defaultUserImage} />
                  </div>
                  <div className='gamer__alias ' title={gamer.alias}>
                    {gamer.alias}
                  </div>
                </Link>
              </div>
            )
          })}

        {approved_gamers.length > 0 && (
          <div className='View__AllGamers' onClick={showModal}>
            ... View All
          </div>
        )}
      </div>

      <div className={`modal-container View__AllGamers__modal ${modalStatus ? 'modal--show' : ''}`}>
        <div className='modal-wrap'>
          <div className='modal__header'>
            Joined Gamers
            <div className='modal__close' onClick={showModal}>
              <img src='https://myG.gg/platform_images/Dashboard/X_icon.svg' />
            </div>
          </div>
          <div className='modal__body'>
            <div className='people_group_list_box_header'>
              <div className='box_header_name gamer'>Gamer</div>
              {extraHeaders.length > 0 &&
                extraHeaders.map((header) => {
                  return (
                    <div className='box_header_name extraFileds' style={{ width: `${500 / extraHeaders.length}px` }}>
                      {header}
                    </div>
                  )
                })}
              <div className='box_header_name level'>Level</div>
            </div>

            <div className='people_group_list_box'>
              {attendees.length > 0 &&
                attendees.map((attendee) => {
                  return (
                    <div className='list__item'>
                      <div className='gamer__name gamer'>
                        <Link to={`/profile/${attendee.alias}`}>
                          <div className='default_circle profile-image'>
                            <img
                              onError={addDefaultSrc}
                              src={attendee.profile_img ? attendee.profile_img : defaultUserImage}
                              className='groupImage'
                            />
                          </div>
                          <spam>{attendee.alias}</spam>
                        </Link>
                      </div>
                      {extraKeys.length > 0 &&
                        extraKeys.map((extraKey) => {
                          if (attendee[extraKey]) {
                            return (
                              <div className='other__title extraKey' style={{ width: `${500 / extraKeys.length}px` }}>
                                {attendee[extraKey].split(',').join(', ')}
                              </div>
                            )
                          }
                        })}
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
