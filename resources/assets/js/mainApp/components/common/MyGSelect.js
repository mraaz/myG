import React from 'react'
import Select from 'react-select'

const MyGSelect = ({ defaultValue, isSearchable, options }) => {
  const customStyles = {
    container: (provided) => ({
      ...provided,
      width: '400px',
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: '#2D363A',
      border: 'none',
      width: '400px',
      height: '38px',
    }),
  }

  return <Select styles={customStyles} defaultValue={defaultValue} isSearchable={isSearchable} options={options} />
}

export default MyGSelect
