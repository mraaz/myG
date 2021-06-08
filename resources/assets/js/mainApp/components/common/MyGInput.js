import React from 'react'

const MyGInput = ({ containerStyles, inputStyles, placeholder, value, onChange, children, refInput, onClick, onBlur, maxLength, ...props }) => {
  const styles = {
    container: {
      backgroundColor: '#2D363A',
      padding: '0 7px',
      width: 'fit-content',
      borderRadius: '4px',
      display: 'flex',
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
    <div style={{ ...styles.container, ...containerStyles }}>
      <input
        style={{ ...styles.inputContainer, ...inputStyles }}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onClick={onClick}
        ref={refInput}
        maxLength={maxLength || Number.MAX_SAFE_INTEGER}
        onBlur={onBlur}
        {...props}
      />
      {children}
    </div>
  )
}

MyGInput.defaultProps = {
  containerStyles: {},
  inputStyles: {},
  onClick: () => {},
}

export default MyGInput
