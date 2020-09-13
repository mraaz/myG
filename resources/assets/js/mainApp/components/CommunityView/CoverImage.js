import React, { useState, useRef } from 'react'
import { Toast_style } from '../Utility_Function'
import { Upload_to_S3 } from '../AWS_utilities'

const addDefaultSrc = (ev) => {
  ev.target.src = 'https://mygame-media.s3.amazonaws.com/default_user/universe.jpg'
}

import AnalyticsBox from '../AnalyticsBox'

const CoverImage = (props) => {
  const inputEl = useRef(null)

  const handleChange = async (event) => {
    const file = event.target.files[0]
    const data = await Upload_to_S3(file, file.name)
  }

  return (
    <div className='coverImage__container'>
      <img onError={addDefaultSrc} src={props.group_img} className='featuredImage' onClick={(e) => inputEl.current.click()} />
      <input type='file' ref={inputEl} className='featuredImageInput' onChange={(event) => handleChange(event)} />

      <div className='analyticsBox__container'>
        <AnalyticsBox />
      </div>
      <div className='community__option'>
        <div className='name'>{props.name}</div>
        <div className='option'>
          <button type='button' className='btnWarning'>
            Join
            <img src='https://mygame-media.s3.amazonaws.com/platform_images/View+Game/Down+Carrot_black.svg'></img>
          </button>
          <button type='button' className='btnWarning'>
            Manage
          </button>
          <button type='button' className='btnWarning'>
            View Members
          </button>
        </div>
      </div>
    </div>
  )
}

export default CoverImage
