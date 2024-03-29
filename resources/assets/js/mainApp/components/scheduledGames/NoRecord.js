/*
 * Author : nitin Tyagi
 * github  : https://github.com/realinit
 * Email : nitin.1992tyagi@gmail.com
 */
import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const NoRecordFound = (props) => {
  return (
    <div className='noRecordFound__wraper'>
      <h1 className='noRecordFound__header'>Cannot find any games</h1>
      <div className='noRecordFound__body' style={{ color: '#fff' }}>
        Try searching for another title or{' '}
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
