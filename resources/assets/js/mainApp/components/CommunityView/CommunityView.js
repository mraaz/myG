import React, { useState, useRef, useEffect } from 'react'
import moment from 'moment'
import axios from 'axios'
import GamePosts from './GamePosts'

import CoverImage from './CoverImage'
import Members from './Members'

const CommunityView = (props) => {
  const [communityDetails, setCommunityDetails] = useState({})
  const [modalStatus, setModalStatus] = useState(false)
  const [activeModalTab, setActiveModalTab] = useState('settings')

  useEffect(() => {
    const getcommunityDetails = async () => {
      const { match } = props.routeProps
      const groupName = decodeURIComponent(match.params.name)
      const {
        data: { getOne = {} },
      } = await axios.get(`/api/groups/getGroupDetails/${groupName}`)

      document.title = 'myG - ' + getOne.name
      setCommunityDetails({ ...getOne })
    }

    getcommunityDetails()
    return () => {
      setCommunityDetails({})
    }
  }, [])

  const handleModalStatus = (label) => {
    setActiveModalTab(label)
    setModalStatus(!modalStatus)
  }

  return (
    <div className='communityName__container '>
      <CoverImage {...communityDetails} handleModalStatus={handleModalStatus} {...props} />
      <div className='community__description'>{communityDetails.grp_description}</div>
      <div className='community__tags'>
        <div className='label'>Tags :</div>
      </div>
      {communityDetails.id && (
        <GamePosts {...props} group_id={communityDetails.id} current_user_permission={communityDetails.current_user_permission} />
      )}
      {modalStatus == true ? (
        <Members
          current_user_permission={communityDetails.current_user_permission}
          {...props}
          activeTab={activeModalTab}
          handleModalStatus={handleModalStatus}
          group_id={communityDetails.id}
        />
      ) : (
        ''
      )}
    </div>
  )
}

export default CommunityView
