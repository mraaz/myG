import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'

const NoRecordFound = (props) => {
  return (
    <div className='noRecordFound__wraper'>
      <h1 className='noRecordFound__header'>Cannot find any games</h1>
      <div className='noRecordFound__body'>
        Try searching for another filter or{' '}
        <Link to='/addScheduleGames'>
          {' '}
          <span className='addScheduleGames__link' style={{ color: '#e5c746', cursor: 'pointer' }}>
            add your own game
          </span>
        </Link>
      </div>
    </div>
  )
}

export default NoRecordFound
