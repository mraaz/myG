import React, { useState, useRef, useEffect } from 'react'
import moment from 'moment'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import GamePosts from './GamePosts'
import CoverImage from './CoverImage'
import Members from './Members'
import MangeSponcers from './MangeSponcers'

import { Toast_style } from '../Utility_Function'

const CommunityView = (props) => {
  const [communityDetails, setCommunityDetails] = useState({})
  const [modalStatus, setModalStatus] = useState(false)
  const [activeModalTab, setActiveModalTab] = useState('settings')
  const [showSponcerModal, setShowSponcerModal] = useState(false)
  const [singleSponcer, setSingleSponcer] = useState({})

  useEffect(() => {
    const getcommunityDetails = async () => {
      const { match } = props.routeProps
      const groupName = decodeURIComponent(match.params.name)
      const {
        data: { getOne = {} },
      } = await axios.get(`/api/groups/getGroupDetails/${groupName}`)

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

  const handleSponcerClick = (data) => {
    setSingleSponcer(data)
    setShowSponcerModal(true)
  }
  const hideSponcerModal = (data) => {
    setSingleSponcer({})
    setShowSponcerModal(false)
  }
  const addDefaultSrc = (ev) => {
    ev.target.src = 'https://myg-test-media-files.s3-ap-southeast-2.amazonaws.com/logo_JPG+(1).jpg'
  }

  const handleDeleteSponcer = async (id) => {
    const createSponcerData = await axios.post('/api/sponsor/delete', {
      group_id: groups_id,
      id,
    })
    if (createSponcerData) {
      toast.success(<Toast_style text={'Great, Deleted successfully!'} />)
    }
  }

  const renderSponcers = (sponcers = []) => {
    return (
      <div className='sponcers__container'>
        <div className='sponcers sponsors__label'>
          <span>Sponsors</span>
        </div>
        {sponcers.length > 0 &&
          sponcers.map((sponcer) => {
            return (
              <div className='sponcers' key={sponcer.id}>
                <a href={`//${sponcer.link}`} target='_blank'>
                  <img className='sponcers__image' onError={addDefaultSrc} src={`${sponcer.media_url}`} />
                </a>
                <div className='sponcers__edit' onClick={(e) => handleSponcerClick(sponcer)}>
                  Edit
                </div>
                <div className='sponcers__delete' onClick={(e) => handleDeleteSponcer(sponcer.id)}>
                  Delete
                </div>
              </div>
            )
          })}
        {sponcers.length < 2 &&
          [1, 2].map((sponcer) => {
            return (
              <div className='sponcers' key={sponcer.id}>
                <a href={`#`} target='_blank'>
                  <img className='sponcers__image' onError={addDefaultSrc} src={``} />
                </a>
                <div className='sponcers__edit' onClick={(e) => handleSponcerClick({})}>
                  Edit
                </div>
              </div>
            )
          })}
      </div>
    )
  }

  return (
    <div className='communityName__container '>
      <CoverImage {...communityDetails} handleModalStatus={handleModalStatus} {...props} />
      <div className='community__description'>{communityDetails.grp_description}</div>
      <div className='community__tags'>
        <div className='label'>Tags :</div>
        {communityDetails.allGrpTags &&
          communityDetails.allGrpTags.length > 0 &&
          communityDetails.allGrpTags.map((tag) => {
            return (
              <div>
                <span className='tags'>{tag}</span>
                <span className='dot'>{'.'}</span>
              </div>
            )
          })}
      </div>
      {renderSponcers(communityDetails.sponsors)}
      {showSponcerModal && <MangeSponcers sponsor={singleSponcer} handleModalStatus={hideSponcerModal} group_id={communityDetails.id} />}
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
