import React, { useState, useRef, useEffect } from 'react'
import moment from 'moment'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import GamePosts from './GamePosts'
import CoverImage from './CoverImage'
import Members from './Members'
import MangeSponsors from './MangeSponsors'

import { Toast_style } from '../Utility_Function'

const CommunityView = (props) => {
  const [communityDetails, setCommunityDetails] = useState({})
  const [modalStatus, setModalStatus] = useState(false)
  const [activeModalTab, setActiveModalTab] = useState('settings')
  const [showSponsorModal, setShowSponsorModal] = useState(false)
  const [singleSponsor, setSingleSponsor] = useState({})

  useEffect(() => {
    const getcommunityDetails = async () => {
      const { match } = props.routeProps
      const groupName = decodeURIComponent(match.params.name)
      const {
        data: { getOne = {} },
      } = await axios.get(`/api/groups/getGroupDetails/${groupName}`)

      if (Object.keys(getOne).length == 0) {
        toast.error(<Toast_style text={`Sorry mate, can't find that`} />)
        props.routeProps.history.push('/?at=communities')
      }

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

  const handleSponsorClick = (data) => {
    setSingleSponsor(data)
    setShowSponsorModal(true)
  }
  const hideSponsorModal = (data) => {
    setSingleSponsor({})
    setShowSponsorModal(false)
  }
  const addDefaultSrc = (ev) => {
    ev.target.src = 'https://myg-test-media-files.s3-ap-southeast-2.amazonaws.com/logo_JPG+(1).jpg'
  }

  const handleDeleteSponsor = async (id) => {
    const createSponsorData = await axios.post('/api/sponsor/delete', {
      group_id: groups_id,
      id,
    })
    if (createSponsorData) {
      toast.success(<Toast_style text={'Great, Deleted successfully!'} />)
    }
  }

  const renderSponsors = (Sponsors = []) => {
    const { current_user_permission } = communityDetails
    return (
      <div className='Sponsors__container'>
        <div className='Sponsors sponsors__label'>
          <span>Sponsors</span>
        </div>
        {Sponsors.length > 0 &&
          Sponsors.map((Sponsor) => {
            return (
              <div className='Sponsors' key={Sponsor.id}>
                <a href={`//${Sponsor.link}`} target='_blank'>
                  <img className='Sponsors__image' onError={addDefaultSrc} src={`${Sponsor.media_url}`} />
                </a>
                {[0, 1].includes(current_user_permission) && (
                  <div className='Sponsors__edit' onClick={(e) => handleSponsorClick(Sponsor)}>
                    Edit
                  </div>
                )}
                {[0, 1].includes(current_user_permission) && (
                  <div className='Sponsors__delete' onClick={(e) => handleDeleteSponsor(Sponsor.id)}>
                    Delete
                  </div>
                )}
              </div>
            )
          })}
        {Sponsors.length < 2 &&
          [1, 2].map((Sponsor) => {
            return (
              <div className='Sponsors' key={Sponsor}>
                <a href={`/`} target='_blank'>
                  <img className='Sponsors__image' onError={addDefaultSrc} src={``} />
                </a>
                {[0, 1].includes(current_user_permission) && (
                  <div className='Sponsors__edit' onClick={(e) => handleSponsorClick({})}>
                    Edit
                  </div>
                )}
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
      {communityDetails.allGrpTags && communityDetails.allGrpTags.length > 0 && (
        <div className='community__tags'>
          <div className='label'>Tags :</div>
          {communityDetails.allGrpTags.map((tag) => {
            return (
              <div>
                <span className='tags'>{tag}</span>
                <span className='dot'>{'.'}</span>
              </div>
            )
          })}
        </div>
      )}
      {renderSponsors(communityDetails.sponsors)}
      {showSponsorModal && <MangeSponsors sponsor={singleSponsor} handleModalStatus={hideSponsorModal} group_id={communityDetails.id} />}
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
