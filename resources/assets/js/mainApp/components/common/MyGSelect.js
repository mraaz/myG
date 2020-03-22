import React from 'react'
import Select from 'react-select'

const MyGSelect = ({ defaultValue, isSearchable, options, onChange, value, placeholder, onInputChange }) => {
  const customStyles = {
    container: (provided) => ({
      ...provided,
      width: '422px',
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: '#2D363A',
      border: 'none',
      width: '422px',
      height: '38px',
      color: '#fff',
    }),
    menuList: (provided) => ({
      ...provided,
      backgroundColor: '#fff',
    }),
    menuList: (provided) => ({
      ...provided,
      backgroundColor: '#fff',
      color: '#384952',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#fff',
    }),
    input: (provided) => ({
      ...provided,
      color: '#fff',
    }),
  }

  return (
    <Select
      styles={customStyles}
      defaultValue={defaultValue}
      value={value}
      isSearchable={isSearchable}
      options={options}
      onChange={onChange}
      placeholder={placeholder}
      onInputChange={onInputChange}
    />
  )
}

export default MyGSelect
