import React, { Component } from "react"
import axios from "axios"
import CreatableSelect from 'react-select/lib/Creatable'

const reasons = [
  { value: 1, label: 'Real life issues, sorry all' },
  { value: 2, label: 'Technical issues, sorry all' },
  { value: 3, label: 'Totally forgot about this, my bad' },
  { value: 4, label: 'Not enuf players' },
  { value: 5, label: 'Decided not to play anymore, sorry all' }
]

type State = {
  value: string | void,
}

const createOption = (label: string) => ({
label,
  value:label,
})

function isValidNewOption(
  inputValue,
  selectValue,
  selectOptions
) {
  return !(
    !inputValue ||
    selectValue.some(option => compareOption(inputValue, option)) ||
    selectOptions.some(option => compareOption(inputValue, option))
  );
}

const compareOption = (inputValue, option) => {
  const candidate =
    typeof inputValue === "string" ? inputValue.toLowerCase() : inputValue;
  if (typeof option.value === "string") {
    if (option.value.toLowerCase() === candidate) {
      return true;
    }
  }
  if (typeof option.label === "string") {
    if (option.label.toLowerCase() === candidate) {
      return true;
    }
  }
  return option.value === candidate || option.label === candidate;
};


export default class DeleteScheduleGameModal extends Component <*, State> {
  constructor() {
    super()

    this.state = {
      value: "",
      isLoading: false,
    }
  }

  componentWillMount(){
  }


  closeModal(){
    this.state.value = ""
    this.props.callbackClose();

  }

  clickSave(){
    if (this.state.value == null || this.state.value.length == 0 ){
      alert("Sorry mate! Reason can not be blank")
      return
    }


    this.props.callbackConfirm(
      {
        value: this.state.value.label,
      }
    )
  }

  handleChange = (value: any) => {
    this.setState({ value })
  }

  handleCreate_game_name = (inputValue: any) => {
    setTimeout(() => {
      const newOption = createOption(inputValue, null)
      this.setState({ value:  newOption })
    }, 300)
  }

  render() {

    var class_modal_status = '';

    if(this.props.bOpen){
      class_modal_status = 'modal--show';
    }
    return (
      <div className={"modal-container " + class_modal_status}>
        <div className="modal-wrap">
            <div className="modal-close-btn" onClick={() => this.closeModal()}><i className="fas fa-times"></i></div>
            <div className="modal-header">
              <label> Looks like we have some approved players in this game, it going to suck for these players. Let's provide a reason why we're cancelling this game </label>
              <div className="reason_txtBox">
                <CreatableSelect
                  onChange={this.handleChange}
                  onCreateOption={this.handleCreate}
                  cacheOptions
                  defaultOptions
                  isValidNewOption={isValidNewOption}
                  options={reasons}
                  value={this.state.value}
                  isClearable
                  className="reason_name_box"
                  placeholder="Select a reason for cancelling"
                  onInputChange={inputValue => (inputValue.length <= 250 ? inputValue : inputValue.substr(0, 250))}
                />
              </div>

            </div>
            <div className="modal-content">
              <div className="save-btn" onClick={() => this.clickSave()}><i className="fas fa-save"></i> Save</div>
            </div>
        </div>
      </div>
    )
  }
}
