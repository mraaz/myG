import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'

const NoRecordFound = (props) => {
  return (
    <div className='noRecordFound__wraper'>
      <h1 className='noRecordFound__header'>Cannot find any games</h1>
      <h1 className='noRecordFound__body'>
        Try searching for another filter or <Link to='/addScheduleGames'> add your own game</Link>
      </h1>
    </div>
  )
}

export default NoRecordFound
