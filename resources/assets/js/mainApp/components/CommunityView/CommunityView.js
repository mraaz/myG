import React, { useState, useRef, useEffect } from 'react'
import { toast } from 'react-toastify'
import moment from 'moment'
import axios from 'axios'
import { Toast_style, Convert_to_comma_delimited_value } from '../Utility_Function'
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
      <GamePosts {...props} />
    </div>
  )
}

export default CommunityView
