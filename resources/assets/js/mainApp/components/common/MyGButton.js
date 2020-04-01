import React from 'react'

const MyGButton = ({ customStyles, text, onClick }) => {
  const styles = {
    button: {
      padding: '0 22px',
      borderRadius: '6px',
      height: '35px',
      lineHeight: '34px',
      margin: '0 20px',
      cursor: 'pointer',
    },
  }

  return (
    <div style={{ ...styles.button, ...customStyles }} onClick={onClick}>
      {text}
    </div>
  )
}

export default MyGButton
