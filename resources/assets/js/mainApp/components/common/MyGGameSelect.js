import React from 'react'
import AsyncCreatableSelect from 'react-select/async-creatable'
import { ignoreFunctions } from '../../../common/render'
import { Game_name_values, Disable_keys } from '../Utility_Function'
import { fetchDynamicFields } from '../../../integration/http/profile'

export default class MyGGameSelect extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  loadTitleOptions = async (input) => {
    const results = await Game_name_values(input)
    return results.length ? results : [{ label: input, value: input }]
  }

  onChange = async (input) => {
    const results = !!input && !!input.value && (await Game_name_values(input.value))
    const game = results && results[0] ? results[0] : input
    const dynamicFields = game && this.props.dynamicFields ? await fetchDynamicFields(game.game_names_id) : []
    this.props.onChange({ game, dynamicFields })
  }

  limitInputLength = (inputValue) => {
    return inputValue.length <= 88 ? inputValue : inputValue.substr(0, 88)
  }

  // How to use react-select styles -> https://react-select.com/styles#style-object
  customStyles = () => ({
    container: (provided) => ({
      ...provided,
      display: 'flex',
      backgroundColor: '#2D363A',
      borderRadius: '4px',
      padding: '4px 0',
      ...(this.props.containerStyles || {})
    }),
    input: (provided) => ({
      ...provided,
      backgroundColor: '#2D363A',
      color: '#fff',
      fontSize: '16px',
      ...(this.props.inputStyles || {})
    }),
    valueContainer: (provided) => ({
      ...provided,
      color: '#fff',
      fontSize: '16px',
      backgroundColor: '#2D363A',
      ...(this.props.valueContainerStyles || {})
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#fff',
      fontSize: '16px',
      backgroundColor: '#2D363A',
      ...(this.props.placeholderStyles || {})
    }),
    control: (provided) => ({
      ...provided,
      color: '#fff',
      fontSize: '16px',
      backgroundColor: '#2D363A',
      border: 'none',
      ...(this.props.controlStyles || {})
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#fff',
      fontSize: '16px',
      backgroundColor: '#2D363A',
      ...(this.props.singleValueStyles || {})
    }),
    multiValue: (provided) => ({
      ...provided,
      color: '#fff',
      fontSize: '16px',
      backgroundColor: '#2D363A',
      ...(this.props.multiValueStyles || {})
    }),
    option: (provided) => ({
      ...provided,
      color: '#fff',
      fontSize: '16px',
      backgroundColor: '#171a1c',
      ...(this.props.optionStyles || {})
    }),
    menu: (provided) => ({
      ...provided,
      color: '#fff',
      fontSize: '16px',
      backgroundColor: '#2D363A',
      zIndex: 1000,
      ...(this.props.menuStyles || {})
    })
  })

  render() {
    return (
      <AsyncCreatableSelect
        value={this.props.game && this.props.game.label ? this.props.game : null}
        disabled={this.props.disabled}
        placeholder={this.props.placeholder}
        loadOptions={this.loadTitleOptions}
        onChange={this.onChange}
        onInputChange={this.limitInputLength}
        styles={this.customStyles()}
        onKeyDown={Disable_keys}
        isSearchable={true}
        menuPlacement={this.props.menuPlacement || 'bottom'}
        cacheOptions
        defaultOptions
        isClearable
      />
    )
  }
}
