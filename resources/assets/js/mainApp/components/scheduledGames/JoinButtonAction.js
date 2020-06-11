import React, { Fragment } from 'react'
import axios from 'axios'

const buttonStatus = {
  '0': 'Join',
  '1': 'Joined',
  '3': 'Pending',
}

const JoinStatus = (props) => {
  const { join_status = 0 } = props
  return (
    <Fragment>
      {join_status == 0 ? (
        <div className='game__action__buttton'>
          <button type='button'>{`Join`}</button>
        </div>
      ) : (
        <div className='game__action__buttton'>
          <button type='button'>{buttonStatus[`${join_status}`]}</button>
        </div>
      )}
    </Fragment>
  )
}

export default JoinStatus
