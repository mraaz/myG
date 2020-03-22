import React from 'react'

import { PageHeader } from '../common'
import { styles } from '../../static/AddGame'
import '../../styles/AddGame/AddGameStyles.scss'
import AddGame from './AddGame'

const AddGameContainer = () => {
  const getPageFooter = () => {
    return (
      <div className={styles.footerContainer}>
        <div className={styles.footerSubmitButton}>Add Game</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <PageHeader headerText='Add Public Game' />
      <AddGame />
      {getPageFooter()}
    </div>
  )
}

export default AddGameContainer
