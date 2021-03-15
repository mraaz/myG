import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'

import GamePosts from './GamePosts'
import CoverImage from './CoverImage'
import Members from './Members'
import MangeSponsors from './MangeSponsors'
import { registerSponsorClick } from '../../../integration/http/quests'

import { Toast_style } from '../Utility_Function'

const CommunityView = (props) => {
  const [communityDetails, setCommunityDetails] = useState({})
  const [modalStatus, setModalStatus] = useState(false)
  const [activeModalTab, setActiveModalTab] = useState('settings')
  const [showSponsorModal, setShowSponsorModal] = useState(false)
  const [singleSponsor, setSingleSponsor] = useState({})
  const contentAreaRef = useRef()

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
    window.addEventListener('scroll', handleScroll, true)
    return () => {
      setCommunityDetails({})
    }
  }, [])

  const handleScroll = () => {
    let lastScrollY = window.scrollY
    let offsetWidth = 0
    if (contentAreaRef.current && contentAreaRef.current.offsetWidth) {
      offsetWidth = contentAreaRef.current.offsetWidth ? contentAreaRef.current.offsetWidth : 0
    }
    window.requestAnimationFrame(() => {
      if (lastScrollY > 200 && contentAreaRef.current && contentAreaRef.current.style) {
        document.getElementById('main-sidebar').style.position = 'fixed'
        // Required padding to prevent infinite loop of styling

        const w = document.getElementById('main-sidebar').offsetWidth - 80
        if (window.innerWidth > 768) {
          contentAreaRef.current.style.paddingTop = '170px'
          // document.getElementById('content-container').style.marginLeft = '80px'
          document.getElementById('content-container').style.paddingLeft = '80px'
          contentAreaRef.current.style.paddingLeft = `${w}px`
        }
        // Exit early to make this less confusing
        return
      }

      if (contentAreaRef.current) {
        contentAreaRef.current.removeAttribute('style')
      }
      document.getElementById('main-sidebar').removeAttribute('style')
      document.getElementById('content-container').removeAttribute('style')
    })
  }

  const handleModalStatus = (label) => {
    setActiveModalTab(label)
    setModalStatus(!modalStatus)
    if (label == true) {
      hideSponsorModal(true)
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
        data: { getOne = {} },
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
  const addDefaultSrc = (ev) => {
    ev.target.src = 'https://myG.gg/platform_images/Communities/myG_logo.jpg'
  }

  const handleDeleteSponsor = async (id, index) => {
    await axios.delete(`/api/sponsor/delete/${id}`)
    // let tmpSponsors = communityDetails.sponsors
    // delete tmpSponsors[index]
    //tmpSponsors[index].media_url = 'https://myG.gg/platform_images/Communities/myG_logo.jpg'
    //setCommunityDetails({ sponsors: tmpSponsors })
    hideSponsorModal(true)
    toast.success(<Toast_style text={'Yup, yup, yup... deleted successfully!'} />)
  }

  const renderSponsors = (Sponsors = []) => {
    if (props.level < 15) return <p className='locked-sponsors'>Community Sponsors are unlocked at Lvl. 15</p>
    if (props.level < 25) Sponsors = Sponsors.slice ? Sponsors.slice(0, 1) : []
    const { current_user_permission } = communityDetails
    return (
      <div className='Sponsors__container'>
        {[0, 1].includes(current_user_permission) && (
          <button type='button' class='sponsors__btn' onClick={(e) => handleSponsorClick(Sponsors)}>
            Manage your Sponsors
          </button>
        )}
        {Sponsors.length > 0 &&
          Sponsors.map((Sponsor) => {
            const hasSponsor = !!Sponsor.link
            const hasMediaUrl = !!Sponsor.media_url
            if (!hasMediaUrl) return null
            return (
              <div className='Sponsors' key={Sponsor.id}>
                <div
                  className='Sponsors__image'
                  // style={{ backgroundImage: `url(${sponsor.media_url}), url(${defaultSponsorImage})` }}
                  onClick={() => {
                    if (!hasSponsor) return
                    window.open(sponsorLink, '_blank')
                  }}
                />
                {/* {[0, 1].includes(current_user_permission) && (
                  <div className='Sponsors__edit' onClick={(e) => handleSponsorClick(Sponsor)}>
                    Edit
                  </div>
                )} */}
                {/* {[0, 1].includes(current_user_permission) && (
                  <div className='Sponsors__delete' onClick={(e) => handleDeleteSponsor(Sponsor.id)}>
                    Delete
                  </div>
                )} */}
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
        <GamePosts {...props} group_id={communityDetails.id} current_user_permission={communityDetails.current_user_permission} />
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
        />
      ) : (
        ''
      )}
    </div>
  )
}

function mapStateToProps(state) {
  return {
    level: (state.user.userTransactionStates || {}).user_level,
  }
}

export default connect(mapStateToProps)(CommunityView)
