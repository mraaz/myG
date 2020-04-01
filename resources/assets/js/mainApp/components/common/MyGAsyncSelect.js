import React from 'react'
import Select from 'react-select/lib/AsyncCreatable'

const MyGAsyncSelect = ({
  defaultValue,
  isSearchable,
  options,
  onChange,
  value,
  placeholder,
  onInputChang,
  onInputChange,
  ...otherProps
}) => {
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
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#1C2326',
      border: '1px solid',
      borderRadius: '4px',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#fff',
    }),
  }

  console.log('options: ', options)
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
      {...otherProps}
    />
  )
}

export default MyGAsyncSelect
