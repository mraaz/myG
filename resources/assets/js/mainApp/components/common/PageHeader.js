import React from 'react'

const PageHeader = ({ headerText }) => {
  const styles = {
    container: {
      height: '77px',
      width: '100%',
      backgroundColor: '#1D2326',
      textAlign: 'center',
      lineHeight: '77px',
      color: '#fff',
      fontWeight: 'bold',
      borderBottom: '2px solid #344953',
      borderLeft: '1px solid #344953'
    }
  }

  return <div style={styles.container}>{headerText}</div>
}

export default PageHeader
