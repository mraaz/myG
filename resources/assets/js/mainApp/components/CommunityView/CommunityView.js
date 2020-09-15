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
      <div className='community__description'>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
        erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
        est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
        labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
        gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet
      </div>
      {communityDetails.id && (
        <GamePosts {...props} group_id={communityDetails.id} current_user_permission={communityDetails.current_user_permission} />
      )}
    </div>
  )
}

export default CommunityView
