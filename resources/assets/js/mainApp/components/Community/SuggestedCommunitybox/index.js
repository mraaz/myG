import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

import { Toast_style } from '../../Utility_Function'

// import styles
import '../../../styles/Community/AddCommunityStyles.scss'

const SuggestedCommunityBox = (props) => {
  const [joinState, updatejoinState] = useState(true)

  const redirect2Group = () => {
    props.routeProps.routeProps.history.push(`/community/${encodeURI(props.data.name.trim())}`)
  }

  let members_txt = 'Members'

  if (props.data.no_of_peeps == '1') {
    members_txt = 'Member'
  }

  const addDefaultSrc = (ev) => {
    ev.target.src = 'https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/logo.svg'
  }

  const joinGroup = () => {
    const sendInvite = axios.post('/api/usergroup/create', {
      group_id: props.data.group_id,
    })
    toast.success(<Toast_style text={'Woot! Request sent'} />)
    updatejoinState(false)
    //axios.delete(`/api/groupConnection/${props.data.group_id}`)
  }

  return (
    <Fragment>
      <div className='col-md-4'>
        <div className='community-card-box'>
          <div className='suggested-community-title'>
            <p>
            <Link to={`/community/${encodeURI(props.data.name.trim())}`}>
              {props.data.name}
            </Link>
            </p>
          </div>
          <div className='community-img'>
            <img onError={addDefaultSrc} src={props.data.group_img} className='img-fluid' />
          </div>
          <div className='suggested-community-text'>
            <p>{props.data.grp_description}</p>
            <hr />
          </div>
          <div className='members'>
            <h2>{props.data.no_of_peeps}</h2>
            <span>{members_txt}</span>
          </div>
          <div className='btn-show'>{joinState && <button onClick={joinGroup}>Join</button>}
          {!joinState && <button onClick={redirect2Group}>Show</button>}</div>
        </div>
      </div>
    </Fragment>
  )
}

export default SuggestedCommunityBox
