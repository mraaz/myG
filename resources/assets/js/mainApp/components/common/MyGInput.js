import React from 'react'

const MyGInput = ({ placeholder, value, onChange }) => {
  const styles = {
    container: {
      backgroundColor: '#2D363A',
      padding: '0 7px',
      width: 'fit-content',
      borderRadius: '4px',
    },
    inputContainer: {
      width: '400px',
      height: '38px',
      border: '1px #273137',
      backgroundColor: '#2D363A',
      color: '#fff',
      fontSize: '15px',
    },
  }

  return (
    <div style={styles.container}>
      <input style={styles.inputContainer} placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  )
}

export default MyGInput
