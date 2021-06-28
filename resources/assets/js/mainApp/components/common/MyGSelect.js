import React from 'react'
import { injectIntl } from 'react-intl'
import Select from 'react-select'

const MyGSelect = ({
  defaultValue,
  isSearchable,
  options,
  onChange,
  onFocus,
  value,
  width,
  innerWidth,
  placeholder,
  onInputChange,
  disabled,
  intl,
  ...props
}) => {
  const customStyles = {
    container: (provided) => ({
      ...provided,
      width: width || '422px'
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: '#2D363A',
      border: 'none',
      width: innerWidth || '422px',
      minHeight: '38px',
      color: '#fff'
    }),
    menuList: (provided) => ({
      ...provided,
      backgroundColor: '#fff',
      color: '#384952'
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#fff'
    }),
    input: (provided) => ({
      ...provided,
      color: '#fff'
    })
  }

  return (
    <div className='game-title-select'>
      <Select
        defaultValue={defaultValue}
        value={value}
        isSearchable={isSearchable}
        options={options}
        onFocus={onFocus}
        onChange={onChange}
        placeholder={placeholder || intl.formatMessage({ id: 'myg.select.hint', defaultValue: 'Select...' })}
        onInputChange={onInputChange}
        classNamePrefix='filter'
        {...props}
      />
    </div>
  )
}

export default injectIntl(MyGSelect)
