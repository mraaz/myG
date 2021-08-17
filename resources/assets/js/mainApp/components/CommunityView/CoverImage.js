import React, { useState, useRef } from 'react'
import { Upload_to_S3 } from '../AWS_utilities'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Toast_style, mobile_Share } from '../Utility_Function'
import { copyToClipboard } from '../../../common/clipboard'
import { createShortLink } from '../../../integration/http/links'

const addDefaultSrc = (ev) => {
  ev.target.src = 'https://myG.gg/default_user/universe.jpg'
}

const labelMap = {
  '-1': 'Join',
  0: 'Joined',
  1: 'Joined',
  2: 'Joined',
  3: 'Joined',
  42: 'Pending'
}

const CoverImage = (props) => {
  const inputEl = useRef(null)
  const [joinlabel, setJoinlabel] = useState(labelMap[props.current_user_permission])
  const [toggle, setToggleOption] = useState(false)
  const [coverImage, setCoverImage] = useState(props.group_img || '')
  const [following, setFollowing] = useState('')

  const handleChange = async (event) => {
    if (props.current_user_permission == 0) {
      const file = event.target.files[0]
      let pattern = /image-*/

      if (!file.type.match(pattern)) {
        toast.error(<Toast_style text={'Opps, Invalid file format! '} />)
        return
      }
      if (file.size < 10485760) {
        const post = await Upload_to_S3(file, file.name, 4, props.id)
        setCoverImage(post.data.Location)
      } else {
        toast.error(<Toast_style text={'Opps, file size can not be excced more than 10MB '} />)
      }
    }
  }
  const handleFollowClick = async (id) => {
    const f = following == '' ? (props.following == true ? 'Unfollow' : 'Follow') : following
    if (f == 'Unfollow') {
      axios.delete(`/api/followers/delete_group/${id}`)

      toast.success(<Toast_style text={`Cheers mate you're no longer following`} />)
      setFollowing('Follow')
    } else {
      axios.post(`/api/followers/create`, {
        group_id: id
      })

      toast.success(<Toast_style text={`Cheers mate you're following`} />)
      setFollowing('Unfollow')
    }
  }
  const handleLeaveClick = (id) => {
    axios.delete(`/api/usergroup/${id}`)
    toast.success(<Toast_style text={`Time to skedaddle! We're out of ${props.name}!`} />)
    props.routeProps.history.push('/?at=communities')
  }
  const handleJoinButton = async (e, id) => {
    e.preventDefault()
    if (props.current_user_permission == -1 && joinlabel == undefined) {
      await axios.post('/api/usergroup/create', {
        group_id: id
      })
      toast.success(<Toast_style text={'Join request sent. You need approval, let the waiting game begin'} />)
      setJoinlabel('Pending')
    } else {
      setToggleOption(!toggle)
    }
  }

  const clickedShare = async () => {
    try {
      const value = await createShortLink(window.location.href)
      mobile_Share(value)
      copyToClipboard(value)
    } catch (error) {
      logToElasticsearch('error', 'CoverImage', 'Failed clickedShare:' + ' ' + error)
    }
  }

  /**
   * Designed to attach to a elements onClick event and toggle the options
   * dropdown, while preventing the click event on parent elements.
   *
   * Built to attach to the options button to prevent the Join/Leave event
   * firing.
   *
   * @param {MouseEvent} clickEvent The click event of the attached element
   */
  const handleToggleOption = (clickEvent) => {
    clickEvent.stopPropagation()
    setToggleOption(!toggle)
  }

  return (
    <div className='coverImage__container'>
      <img
        onError={addDefaultSrc}
        src={coverImage == '' ? props.group_img : coverImage}
        className={`featuredImage ${props.current_user_permission == 0 ? '' : 'nothand'}`}
      />
      <input
        type='file'
        accept='image/jpeg,image/jpg,image/png'
        ref={inputEl}
        disabled={props.current_user_permission == 0 ? false : true}
        className='featuredImageInput'
        onChange={(event) => handleChange(event)}
      />
      {[0].includes(props.current_user_permission) && (
        <div className='addCoverImage__button' onClick={(e) => inputEl.current.click()}>
          Add/Edit Cover Image
        </div>
      )}
      <div className='community__option'>
        <div className='name'>{props.name}</div>
        <div className='option'>
          <button type='button' className='btnWarning btn__option' onClick={(e) => handleJoinButton(e, props.id)}>
            <span>{joinlabel || labelMap[props.current_user_permission]}</span>
            <img src='https://myG.gg/platform_images/View+Game/Down+Carrot_black.svg' onClick={(e) => handleToggleOption(e)}></img>
            {toggle &&
              (labelMap[props.current_user_permission] == 'Joined' ||
                labelMap[props.current_user_permission] == 'Pending' ||
                labelMap[props.current_user_permission] == 'Join') && (
                <div className='btn__option__dropdown'>
                  {props.current_user_permission != 0 && (labelMap[props.current_user_permission] != 'Join' || joinlabel == 'Pending') && (
                    <div className='dropdown__option' onClick={(e) => handleLeaveClick(props.id)}>
                      Leave
                    </div>
                  )}
                  <div className='dropdown__option' onClick={(e) => handleFollowClick(props.id)}>
                    {following || (props.following == true ? 'Unfollow' : 'Follow')}
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
          <button type='button' className='btnWarning' onClick={() => clickedShare()}>
            Share
          </button>
        </div>
      </div>
    </div>
  )
}

export default CoverImage
