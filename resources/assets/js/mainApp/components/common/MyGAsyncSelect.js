import React from 'react'
//import AsyncSelect from 'react-select'
import AsyncSelect from 'react-select/async';

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
  noOptionsMessage,
  loadOptions,
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
      ...styles.menuList,
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
    <AsyncSelect
      styles={customStyles}
      defaultValue={defaultValue}
      value={value}
      isSearchable={isSearchable}
      options={options}
      onChange={onChange}
      placeholder={placeholder}
      onInputChange={onInputChange}
      noOptionsMessage={noOptionsMessage}
      loadOptions={loadOptions}
      {...otherProps}
    />
  )
}

MyGAsyncSelect.defaultProps = {
  styles: {},
}

export default MyGAsyncSelect
