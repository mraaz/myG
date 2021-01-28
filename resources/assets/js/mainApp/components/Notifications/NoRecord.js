/*
 * Author : nitin Tyagi
 * github  : https://github.com/realinit
 * Email : nitin.1992tyagi@gmail.com
 */
import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const NoRecordFound = (props) => {
  const { title = '', linkvisible = true } = props
  return (
    <div className='noRecordFound__wraper'>
      <h1 className='noRecordFound__header'>{title}</h1>
      {linkvisible && (
        <div className='noRecordFound__body'>
          No upcoming games;{' '}
          <Link to='/addScheduleGames'>
            {' '}
            <span className='addScheduleGames__link' style={{ color: '#e5c746', cursor: 'pointer' }}>
              let's create our own game
            </span>
          </Link>
        </div>
      )}
    </div>
  )
}

export default NoRecordFound
