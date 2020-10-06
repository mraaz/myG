import React, { useState, useRef } from 'react'
import { Upload_to_S3 } from '../AWS_utilities'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Toast_style } from '../Utility_Function'

const addDefaultSrc = (ev) => {
  ev.target.src = 'https://mygame-media.s3.amazonaws.com/default_user/universe.jpg'
}

const labelMap = {
  '-1': 'Join',
  0: 'Joined',
  1: 'Joined',
  2: 'Joined',
  3: 'Joined',
  42: 'Pending',
}

import AnalyticsBox from '../AnalyticsBox'

const CoverImage = (props) => {
  const inputEl = useRef(null)
  const [joinlabel, setJoinlabel] = useState(labelMap[props.current_user_permission])
  const [toggle, setToggleOption] = useState(false)
  const [coverImage, setCoverImage] = useState(props.group_img || '')

  const handleChange = async (event) => {
    if (props.current_user_permission == 0) {
      const file = event.target.files[0]
      if (file.size > 10240) {
        const post = await Upload_to_S3(file, file.name, 4, props.id)
        setCoverImage(post.data.Location)
      }
    }
  }
  const handleFollowClick = async (id) => {
    const { user_id, following } = props
    if (following) {
      const data = await axios.post(`/api/followers/${user_id}/delete_group`, {
        group_id: id,
      })
    } else {
      const data = await axios.post('/api/followers/create', {
        group_id: id,
      })
    }
  }
  const handleLeaveClick = async (id) => {
    const data = await axios.delete(`/api/usergroup/${id}`)
    if (data) {
      props.routeProps.history.push('/?at=communities')
    }
  }
  const handleJoinButton = async () => {
    if (props.current_user_permission == -1) {
      const data = await axios.post('/api/usergroup/create', {
        group_id: id,
      })
      if (data) {
        toast.success(<Toast_style text={'Community request sent, let waiting for an approval.'} />)
        setJoinlabel('Pending')
      }
    } else {
      setToggleOption(!toggle)
    }
  }

  return (
    <div className='coverImage__container'>
      <img onError={addDefaultSrc} src={coverImage == '' ? props.group_img : coverImage} className='featuredImage' />
      <input
        type='file'
        accept='image/jpeg,image/jpg,image/png'
        ref={inputEl}
        disabled={props.current_user_permission == 0 ? false : true}
        className='featuredImageInput'
        onChange={(event) => handleChange(event)}
      />
      <div className='addCoverImage__button' onClick={(e) => inputEl.current.click()}>
        Add/Edit Cover Image
      </div>

      <div className='analyticsBox__container'>
        <AnalyticsBox />
      </div>
      <div className='community__option'>
        <div className='name'>{props.name}</div>
        <div className='option'>
          <button type='button' className='btnWarning btn__option' onClick={(e) => handleJoinButton()}>
            <span>{joinlabel || labelMap[props.current_user_permission]}</span>
            <img src='https://mygame-media.s3.amazonaws.com/platform_images/View+Game/Down+Carrot_black.svg'></img>
            {toggle && labelMap[props.current_user_permission] == 'Joined' && (
              <div className='btn__option__dropdown'>
                {props.current_user_permission != 0 && (
                  <div className='dropdown__option' onClick={(e) => handleLeaveClick(props.id)}>
                    Leave
                  </div>
                )}
                <div className='dropdown__option' onClick={(e) => handleFollowClick(props.id)}>
                  {props.following == true ? 'Unfolllow' : 'Follow'}
                </div>
              </div>
            )}
          </button>
          {[0, 1, 2].includes(props.current_user_permission) && (
            <button type='button' className='btnWarning' onClick={(e) => props.handleModalStatus('setting')}>
              Manage
            </button>
          )}
          <button type='button' className='btnWarning' onClick={(e) => props.handleModalStatus('members')}>
            View Members
          </button>
        </div>
      </div>
    </div>
  )
}

export default CoverImage
