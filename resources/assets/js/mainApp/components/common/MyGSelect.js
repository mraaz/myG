import React from 'react'
import Select from 'react-select'

const MyGSelect = ({ defaultValue, isSearchable, options, onChange, value, width, innerWidth, placeholder, onInputChange, disabled, ...props }) => {
  const customStyles = {
    container: (provided) => ({
      ...provided,
      width:  width || '422px',
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: '#2D363A',
      border: 'none',
      width:  innerWidth || '422px',
      minHeight: '38px',
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
      {...props}
    />
  )
}

export default MyGSelect
