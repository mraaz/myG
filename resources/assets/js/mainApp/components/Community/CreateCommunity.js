import React, { Fragment } from 'react'
import '../../styles/Community/community.scss'
const buckectBaseUrl = 'https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/'
import {
  SETTINGS_ENUMS,
  styles,
  EXPERIENCE_OPTIONS,
  REGION_OPTIONS,
  PLATFORM_OPTIONS,
  CLASH_ROYAL_TROPHY,
  DOTA2_MEDAL_RANKS,
  DOTA2_ROLES,
  DOTA2_SERVER_REGIONS,
} from '../../static/AddGame'
import { MyGCheckbox, MyGTextarea, MyGAsyncSelect, MyGCreateableSelect, MyGSelect, MyGDatePicker, MyGInput } from '../common'

const CreateCommunity = () => {
  const communityView = () => {
    return (
      <div className='main'>
        <div className='left-container'>
          <div className='sideLineContainer'>
            <div className='sideBall' />
            <div className='sideLine' />
          </div>
          <div>
            <div className='fieldTitle'>Community Name</div>
            <MyGInput className='community-input' placeholder='Community Name' />
            <div className='fieldTitle'>Game Title</div>
            <MyGInput className='community-input' placeholder='Enter Game Title' />
            {/* <div className='fieldTitle'>Featured Image</div>
            <MyGTextarea
              onChange={(event) => {
                updateAdvancedSettings({ acceptMessage: event.target.value })
              }}
              placeholder='Create a message for those who join & accept your game'
              maxLength={250}
            /> */}
            <div className='fieldTitle'>Featured Image</div>
            <div className='community-media'>
              <div className='media__container'>
                <div className='fieldTitle'>Drop your image or video</div>
                <div className='community-image'>
                  <span className=' button photo-btn'>
                    <img src={`${buckectBaseUrl}Dashboard/BTN_Attach_Image.svg`} />
                  </span>
                </div>
                <div className='fieldTitle'>
                  Or <span className='click-here-span'>click here </span> to select
                </div>
              </div>
            </div>
            <div className='hashTag_section'>
              <div className='fieldTitle'>Add Hashtags</div>
              <div className='hashtag_input'>
                <MyGCreateableSelect isClearable isMulti className='hash_tag_name_box' placeholder='Search, Select or create Hash Tags' />
              </div>
            </div>
          </div>
        </div>
        <div className='right-container'>
          <div className='sideLineContainer'>
            <div className='sideBall' />
            <div className='sideLine' />
          </div>
          <div>
            <div className='fieldTitle'>Description</div>
            <MyGTextarea
              onChange={(event) => {
                updateAdvancedSettings({ acceptMessage: event.target.value })
              }}
              placeholder='Enter a description for your game'
              maxLength={250}
            />
            <div className='fieldTitle'>Moderators</div>
            <MyGInput className='community-input' placeholder='Enter your Friends name to set him as a moderator' />
            <div className='comments-privacy-container'>
              <div className='fieldTitle'>Comments and Privacy</div>
              <MyGCheckbox labelText='Allow posts from everyone' />
              <MyGCheckbox labelText='Allow everyone check members list' />
              <MyGCheckbox labelText='Allow managers to post as Featured' />
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <Fragment>
      <div className='container'>{communityView()}</div>
    </Fragment>
  )
}

export default CreateCommunity
