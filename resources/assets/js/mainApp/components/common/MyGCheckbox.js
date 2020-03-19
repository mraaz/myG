import React from 'react'

import '../../styles/common/MyGCheckboxStyles.scss'

const MyGCheckbox = ({ checked, onChange, labelText }) => {
  const styles = {}

  return (
    <label class='my-g-checkbox__container'>
      <input type='checkbox' checked='checked' />
      <span class='my-g-checkbox__checkmark'></span>
      One
    </label>
  )

  //   return (
  //     <div className='my-g-checkbox__container'>
  //       <input type='checkbox' checked={checked} onChange={checked} />
  //       <span class='my-g-checkbox__checkmark'></span>
  //       <div>{labelText}</div>
  //     </div>
  //   )
}

export default MyGCheckbox
