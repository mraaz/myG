import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'

import GamePosts from './GamePosts'
import CoverImage from './CoverImage'
import Members from './Members'
import MangeSponsors from './MangeSponsors'
import Channel from '../Channel'

import { Toast_style } from '../Utility_Function'

const CommunityView = (props) => {
  const [communityDetails, setCommunityDetails] = useState({})
  const [modalStatus, setModalStatus] = useState(false)
  const [activeModalTab, setActiveModalTab] = useState('settings')
  const [showSponsorModal, setShowSponsorModal] = useState(false)
  const [singleSponsor, setSingleSponsor] = useState({})
  const contentAreaRef = useRef()

  useEffect(() => {
    getcommunityDetails()
    return () => {
      setCommunityDetails({})
    }
  }, [])

  const getcommunityDetails = async () => {
    const { match } = props.routeProps
    const groupName = decodeURIComponent(match.params.name)
    const {
      data: { getOne = {} }
    } = await axios.get(`/api/groups/getGroupDetails/${groupName}`)
    if (Object.keys(getOne).length == 0) {
      toast.error(<Toast_style text={`Sorry mate, can't find that`} />)
      props.routeProps.history.push('/?at=communities')
    }

    document.title = 'myG - ' + getOne.name
    setCommunityDetails({ ...getOne })
  }

  const handleModalStatus = (label) => {
    setActiveModalTab(label)
    setModalStatus(!modalStatus)
    if (label == true) {
      hideSponsorModal(true)
      getcommunityDetails()
    }
  }

  const handleSponsorClick = (data) => {
    setSingleSponsor(data)
    setShowSponsorModal(true)
  }

  const hideSponsorModal = async (data) => {
    if (data === true) {
      const { match } = props.routeProps
      const groupName = decodeURIComponent(match.params.name)
      const {
        data: { getOne = {} }
      } = await axios.get(`/api/groups/getGroupDetails/${groupName}`)

      if (Object.keys(getOne).length == 0) {
        toast.error(<Toast_style text={`Sorry mate, can't find that`} />)
        props.routeProps.history.push('/?at=communities')
      }
      document.title = 'myG - ' + getOne.name
      setCommunityDetails({ ...getOne })
    }
    setSingleSponsor({})
    setShowSponsorModal(false)
  }

  const handleDeleteSponsor = async (id, index) => {
    await axios.delete(`/api/sponsor/delete/${id}`)
    hideSponsorModal(true)
    toast.success(<Toast_style text={'Yup, yup, yup... deleted successfully!'} />)
  }

  const renderSponsors = (Sponsors = []) => {
    const { current_user_permission } = communityDetails

    if ([0, 1].includes(current_user_permission) && props.level < 15)
      return <p className='locked-sponsors'>Community Sponsors are unlocked at Lvl. 15</p>
    if (props.level < 25) Sponsors = Sponsors.slice ? Sponsors.slice(0, 1) : []
    return (
      <div className='Sponsors__container'>
        {[0, 1].includes(current_user_permission) && (
          <button type='button' className='sponsors__btn' onClick={(e) => handleSponsorClick(Sponsors)}>
            Manage your Sponsors
          </button>
        )}
        {Sponsors.length > 0 &&
          Sponsors.map((Sponsor, index) => {
            const hasSponsor = !!Sponsor.link
            const hasMediaUrl = !!Sponsor.media_url
            if (!hasMediaUrl || Sponsor.type != 2) return null
            return (
              <div className='Sponsors' key={`${Sponsors.length}_${index}}`}>
                <div
                  className='Sponsors__image'
                  // style={{ backgroundImage: `url(${Sponsor.media_url}), url(${defaultSponsorImage})` }}
                  onClick={() => {
                    if (!hasSponsor) return
                    window.open(sponsorLink, '_blank')
                  }}
                >
                  <img src={Sponsor.media_url} style={{ width: '100%', height: '100%' }} />
                </div>
                {/* {[0, 1].includes(current_user_permission) && (
                  <div className='Sponsors__edit' onClick={(e) => handleSponsorClick(Sponsor)}>
                    Edit
                  </div>
                )} */}
                {[0, 1].includes(current_user_permission) && (
                  <div className='Sponsors__delete' onClick={(e) => handleDeleteSponsor(Sponsor.id)}>
                    Delete
                  </div>
                )}
              </div>
            )
          })}
      </div>
    )
  }

  return (
    <div className='communityName__container' ref={contentAreaRef}>
      <CoverImage {...communityDetails} handleModalStatus={handleModalStatus} {...props} />
      <div className='community__description'>{communityDetails.grp_description}</div>
      {communityDetails.game_names_id && communityDetails.game_names_id != null && (
        <div className='community__tags'>
          <div className='label'>Game: </div>
          <div>
            <span className='tags'>{communityDetails.game_name}</span>
          </div>
        </div>
      )}
      {renderSponsors(communityDetails.sponsors)}
      {showSponsorModal && <MangeSponsors sponsors={singleSponsor} handleModalStatus={hideSponsorModal} group_id={communityDetails.id} />}
      {communityDetails.id && (
        <React.Fragment>
          <Channel community title={communityDetails.name} channelId={`community-${communityDetails.id}`} />
          <div style={{ margin: 32 }} />
          <GamePosts {...props} group_id={communityDetails.id} current_user_permission={communityDetails.current_user_permission} />
        </React.Fragment>
      )}
      {modalStatus == true ? (
        <Members
          current_user_permission={communityDetails.current_user_permission}
          {...props}
          activeTab={activeModalTab}
          handleModalStatus={handleModalStatus}
          group_id={communityDetails.id}
          community_type={communityDetails.type}
          community_Membership_Approval={communityDetails.all_accept}
          community_grp_description={communityDetails.grp_description}
          community_allGrpTags={communityDetails.allGrpTags}
          community_Name={decodeURIComponent(props.routeProps.match.params.name)}
          community_game_names_id={communityDetails.game_names_id}
          stats_header={communityDetails.stats_header}
        />
      ) : (
        ''
      )}
    </div>
  )
}

function mapStateToProps(state) {
  return {
    level: (state.user.userTransactionStates || {}).user_level
  }
}

export default connect(mapStateToProps)(CommunityView)
