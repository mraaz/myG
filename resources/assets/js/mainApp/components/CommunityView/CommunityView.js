import React, { useState, useRef, useEffect } from 'react'
import { toast } from 'react-toastify'
import moment from 'moment'
import axios from 'axios'
import { Toast_style } from '../Utility_Function'
import GamePosts from './GamePosts'

import CoverImage from './CoverImage'

const CommunityView = (props) => {
  const [communityDetails, setCommunityDetails] = useState({})

  useEffect(() => {
    const getcommunityDetails = async () => {
      const {
        data: { getOne = {} },
      } = await axios.get(`/api/groups/getGroupDetails/Hunter19oq235z`)

      setCommunityDetails({ ...getOne })
    }
    getcommunityDetails()
    return () => {
      setCommunityDetails({})
    }
  }, [])

  return (
    <div className='communityName__container '>
      <CoverImage {...communityDetails} />
      <div className='community__description'>{communityDetails.grp_description}</div>
      <div className='community__tags'>
        <div className='label'>Tags :</div>
      </div>
      {communityDetails.id && (
        <GamePosts {...props} group_id={communityDetails.id} current_user_permission={communityDetails.current_user_permission} />
      )}
    </div>
  )
}

export default CommunityView
