import React, { Component } from 'react'
import axios from 'axios'
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

import { toast } from 'react-toastify'
import { Toast_style } from './Utility_Function'

export default class FileOpenModal extends Component {
  constructor() {
    super()

    this.state = {
      file_src: '',
      file_key: '',
      store_files: [],
      lock: false,
      uploading: false,
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
        toast.success(<Toast_style text={'Opps, something went wrong. Unable to upload your file.'} />)
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

  async doUploadS3(file, name) {
    var instance = this
    this.state.uploading = true

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
      toast.success(<Toast_style text={'Opps, something went wrong. Unable to upload your file.'} />)
    }
    this.state.uploading = false
  }

  getUploadParams = async ({ file, meta: { id, name } }) => {
    this.doUploadS3(file, name)
    return { url: 'https://httpbin.org/post' }
  }

  handleChangeStatus = ({ meta }, status, allFiles) => {
    this.state.store_files = allFiles
    if (status == 'removed' && this.state.lock == false) {
      this.removeIndivdualfromAWS()
    }
  }

  handleSubmit = (files, allFiles) => {
    if (this.state.uploading == true) {
      return
    }
    this.props.callbackConfirm(this.state.file_src, this.state.file_key)

    this.setState({
      store_files: [],
      file_key: '',
      file_src: '',
    })

    this.state.lock = true
    allFiles.forEach((f) => f.remove())
    this.state.lock = false
  }

  render() {
    var class_modal_status = ''

    if (this.props.bOpen) {
      class_modal_status = 'modal--show'
    }

    var filepath = 'https://s3-ap-southeast-2.amazonaws.com/mygame-media/blank-profile-picture-973460_1280.png'
    var instance = this
    return (
      <div className={'modal-container ' + class_modal_status}>
        <div className='modal-wrap'>
          <div className='modal-header'>Update Picture</div>
          <div className='modal-close-btn' onClick={() => this.closeModal()}>
            <i className='fas fa-times'></i>
          </div>
          <div className='modal-content'>
            <Dropzone
              getUploadParams={this.getUploadParams}
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
            />
          </div>
        </div>
      </div>
    )
  }
}
