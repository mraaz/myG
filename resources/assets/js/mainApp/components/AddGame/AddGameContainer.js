import React from 'react'

import { PageHeader } from '../common'
import { styles } from '../../static/AddGame'
import '../../styles/AddGame/AddGameStyles.scss'
import AddGame from './AddGame'

const AddGameContainer = () => {
  return (
    <div className={styles.container}>
      <PageHeader headerText='Add Public Game' />
      <AddGame />
    </div>
  )
}

export default AddGameContainer
