import React from 'react'
import axios from 'axios'
import AsyncSelect from 'react-select/async'
import { ignoreFunctions } from '../../../common/render'
import { Disable_keys } from '../Utility_Function'
import { parsePlayersToSelectData } from '../../utils/InvitePlayersUtils'

export default class MyGFriendSelect extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  fetchFriends = async (keywords) => {
    return axios.post(`/api/user/keywordSearchResults`, { keywords, counter: 1 })
      .then((response) => parsePlayersToSelectData(response.data.playerSearchResults.data, { backgroundColor: '#2D363A' }));
  }

  onChange = async (input) => {
    console.log(this.props.friends, input)
    this.props.onChange(input);
  }

  limitInputLength = (inputValue) => {
    return inputValue.length <= 88 ? inputValue : inputValue.substr(0, 88);
  }

  // How to use react-select styles -> https://react-select.com/styles#style-object
  customStyles = () => ({
    container: (provided) => ({
      ...provided,
      display: 'flex',
      backgroundColor: '#2D363A',
      borderRadius: '4px',
      padding: '4px 0',
      ...(this.props.containerStyles || {}),
    }),
    input: (provided) => ({
      ...provided,
      backgroundColor: '#2D363A',
      color: '#fff',
      fontSize: '16px',
      ...(this.props.inputStyles || {}),
    }),
    valueContainer: (provided) => ({
      ...provided,
      color: '#fff',
      fontSize: '16px',
      backgroundColor: '#2D363A',
      ...(this.props.valueContainerStyles || {}),
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#fff',
      fontSize: '16px',
      backgroundColor: '#2D363A',
      ...(this.props.placeholderStyles || {}),
    }),
    control: (provided) => ({
      ...provided,
      color: '#fff',
      fontSize: '16px',
      backgroundColor: '#2D363A',
      border: 'none',
      ...(this.props.controlStyles || {}),
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#fff',
      fontSize: '16px',
      backgroundColor: '#2D363A',
      ...(this.props.singleValueStyles || {}),
    }),
    multiValue: (provided) => ({
      ...provided,
      color: '#fff',
      fontSize: '16px',
      backgroundColor: '#2D363A',
      ...(this.props.multiValueStyles || {}),
    }),
    option: (provided) => ({
      ...provided,
      color: '#fff',
      fontSize: '16px',
      backgroundColor: '#2D363A',
      ...(this.props.optionStyles || {}),
    }),
    menu: (provided) => ({
      ...provided,
      color: '#fff',
      fontSize: '16px',
      backgroundColor: '#2D363A',
      ...(this.props.menuStyles || {}),
    }),
  });

  render() {
    return (
      <AsyncSelect
        value={this.props.friends}
        disabled={this.props.disabled}
        placeholder={this.props.placeholder}
        loadOptions={this.fetchFriends}
        onChange={this.onChange}
        onInputChange={this.limitInputLength}
        styles={this.customStyles()}
        onKeyDown={Disable_keys}
        isSearchable={true}
        isMulti={true}
        cacheOptions
        defaultOptions
        isClearable
      />
    )
  }
}
