import React from 'react'

const MyGCheckbox = ({ checked, onClick, labelText }) => {
  const styles = {
    container: {
      marginBottom: '10px',
      cursor: 'pointer',
    },
    labelText: {
      marginLeft: '10px',
      fontWeight: 'bold',
    },
  }
  const checked_svg = 'https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/checkbox_checked.svg'
  const unchecked_svg = 'https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/checkbox_uncheked.svg'

  return (
    <div style={styles.container} onClick={() => onClick(!checked)}>
      <img src={checked ? checked_svg : unchecked_svg} height='15' width='15' />
      <span style={styles.labelText}>{labelText}</span>
    </div>
  )
}

export default MyGCheckbox
