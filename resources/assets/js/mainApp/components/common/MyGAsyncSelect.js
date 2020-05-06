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
  styles,
  ...otherProps
}) => {
  const customStyles = {
    container: (provided) => ({
      ...provided,
      width: '422px',
      ...styles.container,
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: '#2D363A',
      border: 'none',
      width: '422px',
      minHeight: '38px',
      color: '#fff',
      ...styles.control,
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

MyGAsyncSelect.defaultProps = {
  styles: {},
}

export default MyGAsyncSelect
