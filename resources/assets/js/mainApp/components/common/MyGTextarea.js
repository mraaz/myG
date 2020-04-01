import React from 'react'

const MyGTextarea = ({ placeholder, value, onChange }) => {
  const styles = {
    container: {
      backgroundColor: '#2D363A',
      width: 'fit-content',
      borderRadius: '4px',
      padding: '10px 10px',
    },
    inputContainer: {
      width: '400px',
      height: '120px',
      border: '1px #273137',
      backgroundColor: '#2D363A',
      color: '#fff',
      fontSize: '15px',
      resize: 'none',
      outline: 'none',
    },
  }

  return (
    <div style={styles.container}>
      <textarea style={styles.inputContainer} placeholder={placeholder} onChange={onChange} value={value} />
    </div>
  )
}

export default MyGTextarea
