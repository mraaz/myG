import React from 'react'

import { PageHeader } from '../common'

import CreateCommunity from './CreateCommunity'

const CommunityContainer = () => {
  return (
    <div className='container'>
      <PageHeader headerText='Create Community' />
      <CreateCommunity />
    </div>
  )
}

export default CommunityContainer
