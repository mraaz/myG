import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Toast_style } from '../../components/Utility_Function'
import { reasons, subReasons } from '../../../common/report'

const ReportPost = (props) => {
  const { modalStatus = true, hideModal, id } = props
  const [showReason, SetShowReason] = useState(false)
  const [reasonId, SetShowReasonId] = useState('')
  const [sub__content, SetSub__content] = useState('')
  const [requesting, SetRequesting] = useState(false)
  const [isDisabled, SetDisabled] = useState(true)

  const handleBackButton = () => {
    SetShowReason(false)
    SetShowReasonId('')
    SetDisabled(true)
  }
  const handleSubmit = async () => {
    SetRequesting(true)
    const data = await axios.post('/api/report/create', {
      report_description: sub__content,
      ...props,
    })
    if (data) {
      toast.success(<Toast_style text={"Thanks for reporting! You're helping to make this is a better place."} />)
      SetRequesting(false)
      hideModal(false)
    }
  }
  const handleReasonClick = (msgId) => {
    SetShowReason(true)
    SetShowReasonId(msgId)
  }
  const handleSubReasonClick = (msg) => {
    SetDisabled(false)
    SetSub__content(msg)
  }

  const renderReasons = () => {
    return Object.keys(reasons).map((msgId, index) => {
      return (
        <div className='report__message' key={`${msgId}_${index}`} onClick={(e) => handleReasonClick(msgId)}>
          <div className='main__content'>{reasons[msgId]}</div>
        </div>
      )
    })
  }
  const renderSubReasons = () => {
    const subReason = subReasons[reasonId]
    return subReason.map((reason) => {
      const [mainReason, reportMessage] = reason.split('<>')
      return (
        <div
          key={reason}
          className={`report__message ${reason == sub__content ? 'active' : ''}`}
          onClick={(e) => handleSubReasonClick(reason)}>
          <div className='main__content'>{mainReason}</div>
          <div className='sub__content'> {reportMessage}</div>
        </div>
      )
    })
  }

  return (
    <div className={`modal-container reportPost__modal ${modalStatus ? 'modal--show' : ''}`}>
      <div className='modal-wrap'>
        <div className='modal__header'>
          <h1>
            {showReason && (
              <img
                src='https://mygame-media.s3.amazonaws.com/platform_images/Communities/Group+971.svg'
                onClick={handleBackButton}
                alt='arrow-left'
              />
            )}

            <span>Why are you reporting this?</span>
          </h1>
          <div className='modal__close' onClick={(e) => hideModal(false)}>
            <img src='https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/X_icon.svg' />
          </div>
        </div>
        <div className='modal__body'>
          <div className='body__content'>
            {!showReason && renderReasons()}
            {showReason && renderSubReasons()}
          </div>
        </div>
        <div className='modal__footer'>
          {showReason && (
            <button type='button' onClick={handleBackButton}>
              Back
            </button>
          )}
          <button type='button' onClick={handleSubmit} disabled={requesting || isDisabled}>
            Submit
          </button>
        </div>
      </div>

      <div className='modal-overlay' onClick={(e) => hideModal(false)}></div>
    </div>
  )
}

export default ReportPost
