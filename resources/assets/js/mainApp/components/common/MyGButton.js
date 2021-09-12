import React from 'react'

const MyGButton = ({ customStyles, text, onClick, primary, secondary, loading }) => {
  const styles = {
    button: {
      padding: '0 22px',
      borderRadius: '6px',
      height: '35px',
      lineHeight: '34px',
      margin: '0 20px',
      cursor: 'pointer'
    }
  }
  const hasCssStyle = !!primary || !!secondary
  let cssStyle = `${primary ? 'myg-button-primary' : ''}` + `${secondary ? 'myg-button-secondary' : ''}`
  const objectStyle = hasCssStyle ? {} : { ...styles.button, ...customStyles }
  if (loading) cssStyle += ' myg-button-loading'
  return (
    <div className={cssStyle} style={objectStyle} onClick={onClick}>
      {text}
    </div>
  )
}

export default MyGButton
