import React, { Fragment, useState } from 'react'
import classNames from 'classnames'

import { SETTINGS_ENUMS, styles, EXPERIENCE_OPTIONS } from '../../static/AddGame'
import { MyGCheckbox, MyGInput } from '../common'
import MyGSelect from '../common/MyGSelect'

const AddGame = () => {
  const [selectedSettings, updatedSelectedSettings] = useState(SETTINGS_ENUMS.ADVANCED)
  const [isEndGameFieldSelected, toggleEndGameField] = useState(true)

  // Handlers

  // Views
  const getPlayersNumberView = () => {
    return (
      <div>
        <div className={styles.fieldTitle}>Number of Players</div>
        <MyGCheckbox checked={true} onChange={() => {}} labelText='Unlimited' />
      </div>
    )
  }

  const getCommentPrivaryView = () => {
    return (
      <div>
        <div className={styles.fieldTitle}>Comments and Privacy</div>
        <MyGCheckbox checked={true} onChange={() => {}} labelText='Allow Comments On Game Listing' />
        <MyGCheckbox checked={true} onChange={() => {}} labelText='List Game as Public Game' />
      </div>
    )
  }

  const getEndGameField = () => {
    return (
      <Fragment>
        <div className={styles.fieldTitle}>End Time</div>
        <MyGInput />
      </Fragment>
    )
  }
  const getMainSettingsView = () => {
    return (
      <div>
        <div className={styles.fieldTitle}>Game Title</div>
        <MyGInput />
        <div className={styles.fieldTitle}>Start Time</div>
        <MyGInput />
        {isEndGameFieldSelected && getEndGameField()}
        {getPlayersNumberView()}
        {getCommentPrivaryView()}
      </div>
    )
  }

  const getAdvancedSettingsView = () => {
    return (
      <div>
        <div className={styles.fieldTitle}>Experience</div>
        <MyGSelect options={EXPERIENCE_OPTIONS} />
        <div className={styles.fieldTitle}>Tags</div>
        <MyGSelect />
      </div>
    )
  }

  const getOptionalGameFieldsView = () => {
    return <div />
  }

  const getGameSettingsView = () => {
    return (
      <div>
        <div />
        {selectedSettings === SETTINGS_ENUMS.MAIN ? getMainSettingsView() : getAdvancedSettingsView()}
      </div>
    )
  }

  const getSettingsMenu = () => {
    return (
      <div className={styles.menuContainer}>
        <div onClick={() => updatedSelectedSettings(SETTINGS_ENUMS.MAIN)}>
          <div className={styles.menuText}>Main Settings</div>
          <div className={classNames([styles.menuLine, selectedSettings === SETTINGS_ENUMS.MAIN ? styles.menuLineHighlighted : null])} />
        </div>
        <div onClick={() => updatedSelectedSettings(SETTINGS_ENUMS.ADVANCED)}>
          <div className={styles.menuText}>Advanced Settings</div>
          <div
            className={classNames([styles.menuLine, selectedSettings === SETTINGS_ENUMS.ADVANCED ? styles.menuLineHighlighted : null])}
          />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.mainContainer}>
      {getSettingsMenu()}
      {getGameSettingsView()}
      {getOptionalGameFieldsView()}
    </div>
  )
}

export default AddGame
