import React, { Fragment, useState } from 'react'
import axios from 'axios'

// import styles
import '../../../styles/Community/AddCommunityStyles.scss'

const SuggestedCommunityBox = (props) => {
  const [joinState, updatejoinState] = useState(true)

  console.log(props, '<<<<RAAAZ')
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
    updatejoinState(false)
  }

  return (
    <Fragment>
      <div className='col-md-4'>
        <div className='community-card-box'>
          <div className='suggested-community-title'>
            <p>{props.data.name}</p>
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
          <div className='btn-show'>{joinState && <button onClick={joinGroup}>Join</button>}</div>
        </div>
      </div>
    </Fragment>
  )
}

export default SuggestedCommunityBox
