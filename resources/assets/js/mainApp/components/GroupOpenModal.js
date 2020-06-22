import React, { Component } from 'react'
import axios from 'axios'
import Select from 'react-select'
import { Redirect } from 'react-router-dom'

import Dropzone from 'react-dropzone-uploader'

import { toast } from 'react-toastify'
import { Toast_style } from './Utility_Function'

const privacy_options = [{ value: 1, label: 'Public' }, { value: 2, label: 'Closed' }, { value: 3, label: 'Secret' }]

export default class GroupOpenModal extends Component {
  constructor() {
    super()

    this.state = {
      file_src: '',
      file_key: '',
      store_files: [],
      lock: false,
      group_name_box: '',
      privacy_box: '',
      all_accept_chkbox: true,
      show_group_name_error: false,
      show_group_name_unique_error: false,
      is_unique: false,
      redirect_groups: false,
      groups_id: '',
      uploading: '',
      submitButtonContent: 'Submit',
    }

    this.closeModal = this.closeModal.bind(this)
    this.doUploadS3 = this.doUploadS3.bind(this)
  }

  removeIndivdualfromAWS() {
    if (this.state.file_key != '') {
      const formData = new FormData()
      formData.append('key', this.state.file_key)

      try {
        const post = axios.post('/api/deleteFile', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      } catch (error) {
        toast.success(<Toast_style text={'Opps, something went wrong. Unable to upload your file. Close this window and try again'} />)
      }
    }
  }

  closeModal() {
    this.props.callbackClose()
    if (this.state.file_key != '') {
      const formData = new FormData()
      formData.append('key', this.state.file_key)

      axios
        .post('/api/deleteFile', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(function(resp) {
          instance.setState({
            file_src: resp.data.Location,
          })
        })
        .catch((error) => {})
    }

    const tmparray = [...this.state.store_files]
    this.state.lock = true

    for (var i = 0; i < tmparray.length; i++) {
      tmparray[i].remove()
    }
    this.state.lock = false

    this.setState({
      file_key: '',
      file_src: '',
      store_files: [],
    })
  }

  async clickSave() {
    if (this.state.uploading) {
      return
    }

    if (this.state.group_name_box.trim() == '' || this.state.group_name_box == null) {
      this.setState({
        show_group_name_error: true,
        show_group_name_unique_error: false,
      })
      toast.success(<Toast_style text={"Hmmmm, blank group name can't be. The rules it is"} />)
      return
    }

    if (this.state.is_unique == false) {
      toast.success(<Toast_style text={'Hmmmm, be unique group name must'} />)
      return
    }

    try {
      if (this.state.file_src == '' || this.state.file_src == null) {
        const post = await axios.post('/api/groups/create', {
          name: this.state.group_name_box.trim(),
          type: this.state.privacy_box.value,
          all_accept: this.state.all_accept_chkbox,
        })
        this.state.group_id = post.data.id
      } else {
        const post = await axios.post('/api/groups/create', {
          name: this.state.group_name_box.trim(),
          group_img: this.state.file_src,
          type: this.state.privacy_box.value,
          all_accept: this.state.all_accept_chkbox,
        })
        this.state.group_id = post.data.id
      }
    } catch (error) {
      console.log(error)
    }

    this.setState({
      group_name_box: '',
      file_src: '',
      privacy_box: [privacy_options[0]],
      all_accept_chkbox: true,
      file_preview: '',
      file_key: '',
      redirect_groups: true,
    })
  }

  onBlur_group_name = async () => {
    if (this.state.group_name_box.trim() == '' || this.state.group_name_box == null) {
      this.setState({
        show_group_name_unique_error: false,
      })
      return
    }
    const getgroup_name = await axios.get(`/api/groups/groupName/${this.state.group_name_box.trim()}`)
    if (getgroup_name.data.getOne[0].no_of_names == 0) {
      this.state.is_unique = true
      this.setState({
        show_group_name_unique_error: false,
        show_group_name_error: false,
      })
    } else {
      this.setState({
        show_group_name_unique_error: true,
        is_unique: false,
        show_group_name_error: false,
      })
    }
  }

  async doUploadS3(file, name) {
    var instance = this
    this.state.submitButtonContent = 'Uploading...'
    this.setState({
      uploading: true,
    })

    const formData = new FormData()
    formData.append('upload_file', file)
    formData.append('filename', name)

    try {
      const post = await axios.post('/api/uploadFile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      instance.setState({
        file_src: post.data.Location,
        file_key: post.data.Key,
      })
    } catch (error) {
      toast.success(<Toast_style text={'Opps, something went wrong. Unable to upload your file. Close this window and try again'} />)
    }

    this.state.submitButtonContent = 'Submit'
    this.setState({
      uploading: false,
    })
  }

  handleChangeStatus = ({ meta }, status, allFiles) => {
    if (status === 'done') {
      const file = allFiles[0].file
      const name = allFiles[0].meta.name
      this.doUploadS3(file, name)
    }
    this.state.store_files = allFiles
    if (status == 'removed' && this.state.lock == false) {
      this.removeIndivdualfromAWS()
    }
  }

  handleSubmit = (files, allFiles) => {
    this.props.callbackConfirm(this.state.file_src)

    this.setState({
      store_files: [],
      file_key: '',
      file_src: '',
    })

    this.state.lock = true
    allFiles.forEach((f) => f.remove())
    this.state.lock = false
  }

  handleChange_Privacy = (privacy_box) => {
    this.setState({ privacy_box })
  }

  toggleChange_all_accept = () => {
    this.setState({
      all_accept_chkbox: !this.state.all_accept_chkbox,
    })
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value })
  }

  render() {
    if (this.state.redirect_groups === true) {
      const tmp = '/groups/' + this.state.group_id
      return <Redirect push to={tmp} />
    }

    var class_modal_status = ''

    if (this.props.bOpen) {
      class_modal_status = 'modal--show'
    }
    var instance = this
    return (
      <div className={'groups-modal-container ' + class_modal_status}>
        <div className='modal-wrap'>
          <div className='modal-header'>Create Group</div>
          <div className='modal-close-btn' onClick={() => this.closeModal()}>
            <i className='fas fa-times'></i>
          </div>
          <div className='modal-content'>
            <div className='group-name'>
              <span style={{ color: 'red' }}>*</span> Enter your group name here (names must be unique)
              <input
                type='text'
                id='group_name_box'
                className='group-name-box'
                onChange={this.handleChange}
                onBlur={this.onBlur_group_name}
                value={this.state.group_name_box}
                maxLength='254'
              />
            </div>
            <div className='privacy'>
              Select privacy
              <Select
                onChange={this.handleChange_Privacy}
                options={privacy_options}
                className='privacy_box'
                defaultValue={[privacy_options[0]]}
              />
            </div>

            <div className='all_accept'>
              <input id='all_accept_ChkBox' type='checkbox' defaultChecked='true' onChange={this.toggleChange_all_accept} /> All members can
              accept group invitations
            </div>
            <Dropzone
              onChangeStatus={this.handleChangeStatus}
              onSubmit={this.handleSubmit}
              accept='image/*'
              inputContent={(files, extra) => (extra.reject ? 'Image files only' : 'Drag Files or Click to Browse')}
              styles={{
                dropzone: { minHeight: 200, maxHeight: 250 },
                dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
                inputLabel: (files, extra) => (extra.reject ? { color: 'red' } : {}),
              }}
              maxFiles={1}
              maxSizeBytes={26214400}
              submitButtonDisabled={true}
              submitButtonContent={null}
              submitButtonContent={this.state.submitButtonContent}
            />
            <div className={this.state.uploading ? 'save-btn btn--disable' : 'save-btn'} onClick={() => this.clickSave()}>
              Create Group
            </div>
          </div>
        </div>
      </div>
    )
  }
}
