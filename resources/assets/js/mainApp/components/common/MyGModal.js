import React from 'react'
import Modal from 'react-modal'

const MyGModal = ({ isOpen, children }) => {
  const styles = {
    overlay: {
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#1D232690',
    },
    content: {
      borderRadius: '14px',
      position: 'static',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#101214',
      border: 'none',
      padding: 0,
    },
  }

  return (
    <Modal isOpen={isOpen} style={styles}>
      {children}
    </Modal>
  )
}

export default MyGModal
