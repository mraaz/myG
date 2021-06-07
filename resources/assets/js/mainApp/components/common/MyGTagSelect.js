import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify'
import { Toast_style } from '../Utility_Function'
import { MyGCreateableSelect } from '../common'
import { Disable_keys } from '../Utility_Function'

const MAX_TAGS_LENGTH = 3

const fetchTagOptions = (input, endpoint) => {
  return axios.get(endpoint, { params: { input } }).then((response) => response.data);
}

const MyGTagSelect = ({ tags, placeholder, endpoint, onChange }) => {
  const [input, setInput] = useState('');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetchTagOptions(input, endpoint).then((options) => setOptions(options));
  }, [input, endpoint, setOptions]);

  const createOption = (label, game_names_id) => ({
    label,
    value: label,
    game_names_id
  })

  const handleCreateTags = (input) => {
    if (tags && tags.length >= MAX_TAGS_LENGTH) {
      return toast.success(<Toast_style text={'Sorry mate! Max of 8 tags.'} />);
    }
    if (input.length > 250) {
      return toast.success(<Toast_style text={'Sorry mate! Game tags length is too long.'} />);
    }
    if (/['/.%#$,;`\\]/.test(input)) {
      return toast.success(<Toast_style text={'Sorry mate! Game tags can not have invalid characters'} />);
    }
    const tag = createOption(input, null);
    setOptions([...options, tag]);
    onChange([...tags, tag]);
  }

  const getNewOptionData = (input, optionLabel) => ({
    value: input,
    label: optionLabel,
    __isNew__: true,
    isEqual: () => false
  });

  const maxTags = tags && tags.length === MAX_TAGS_LENGTH;
  const maxOptions = options && options.length === MAX_TAGS_LENGTH;
  return (
    <MyGCreateableSelect
      onCreateOption={handleCreateTags}
      getNewOptionData={getNewOptionData}
      onInputChange={setInput}
      onKeyDown={Disable_keys}
      onChange={onChange}
      value={tags}
      isClearable
      isMulti
      placeholder={placeholder}
      options={maxTags ? [] : options.map(({ content }) => ({ label: content, value: content }))}
      noOptionsMessage={() => {
        return maxOptions
          ? 'You have reached the max options value'
          : 'Yo! Either nothing to display or you need to type in something'
      }}
    />
  )
}

export default MyGTagSelect;
