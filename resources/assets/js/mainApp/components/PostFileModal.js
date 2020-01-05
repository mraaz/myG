import React, { Component } from 'react'
import axios from 'axios'

import { toast } from 'react-toastify'
import { Toast_style } from './Utility_Function'

import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

export default class PostFileModal extends Component {
  constructor() {
    super()

    this.state = {
      preview_files: [],
      post_content: '',
      store_files: [],
      lock: false,
      uploading: false,
    }

    this.closeModal = this.closeModal.bind(this)
    this.doUploadS3 = this.doUploadS3.bind(this)
  }

  removeIndivdualfromAWS(id) {
    for (var i = 0; i < this.state.preview_files.length; i++) {
      if (this.state.preview_files[i].id == id) {
        const formData = new FormData()
        formData.append('key', this.state.preview_files[i].key)

        try {
          const post = axios.post('/api/deleteFile', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
        } catch (error) {
          toast.success(<Toast_style text={'Opps, something went wrong. Unable to upload your file. Close this window and try again'} />)
        }
        this.state.preview_files.splice(i, 1)
        break
      }
    }
  }

  closeModal() {
    this.props.callbackClose()
    if (this.state.preview_files.length != 0) {
      axios
        .post('/api/deleteFiles', {
          files: this.state.preview_files,
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
      preview_files: [],
      post_content: '',
      store_files: [],
    })
  }

  async doUploadS3(file, id, name) {
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
      var new_preview_files = instance.state.preview_files
      new_preview_files.push({
        src: post.data.Location,
        key: post.data.Key,
        id: id,
      })
      instance.setState({
        preview_files: new_preview_files,
      })
    } catch (error) {
      toast.success(<Toast_style text={'Opps, something went wrong. Unable to upload your file. Close this window and try again'} />)
    }
    this.state.uploading = false
  }

  getUploadParams = async ({ file, meta: { id, name } }) => {
    this.doUploadS3(file, id, name)
    return { url: 'https://httpbin.org/post' }
  }

  handleChangeStatus = ({ meta }, status, allFiles) => {
    this.state.store_files = allFiles
    if (status == 'removed' && this.state.lock == false) {
      this.removeIndivdualfromAWS(meta.id)
    }
  }

  handleSubmit = (files, allFiles) => {
    if (this.state.uploading == true) {
      return
    }
    var tmp = []
    var keys = []

    for (var i = 0; i < this.state.preview_files.length; i++) {
      tmp.push(this.state.preview_files[i].src)
      keys.push(this.state.preview_files[i].key)
    }

    this.props.callbackConfirm(
      {
        media_url: tmp,
        content: this.state.post_content,
      },
      keys
    )

    this.state.lock = true
    allFiles.forEach((f) => f.remove())
    this.state.lock = false

    this.setState({
      preview_files: [],
      post_content: '',
    })
  }

  handleChange = (event) => {
    const name = event.target.name
    const value = event.target.type == 'checkbox' ? event.target.checked : event.target.value
    this.setState({
      [name]: value,
    })
  }

  render() {
    var class_modal_status = ''

    if (this.props.bOpen) {
      class_modal_status = 'modal--show'
    }

    var accept = ''

    if (this.props.fileType == 'photo') {
      accept = 'image/*'
    } else {
      accept = 'video/*'
    }

    var filepath = 'https://s3-ap-southeast-2.amazonaws.com/mygame-media/blank-profile-picture-973460_1280.png'
    var instance = this
    return (
      <div className={'modal-container ' + class_modal_status}>
        <div className='modal-wrap'>
          <div className='modal-header'>{this.props.fileType == 'photo' ? 'Upload Photos' : 'Upload Videos'}</div>
          <div className='modal-close-btn' onClick={() => this.closeModal()}>
            <i className='fas fa-times'></i>
          </div>
          <div className='modal-content'>
            <textarea
              name='post_content'
              rows={8}
              cols={80}
              defaultValue={''}
              onChange={this.handleChange}
              value={this.state.post_content}
              maxLength='254'
              placeholder="What's up..."
            />
            <Dropzone
              getUploadParams={this.getUploadParams}
              onChangeStatus={this.handleChangeStatus}
              onSubmit={this.handleSubmit}
              accept={accept}
              inputContent={(files, extra) => (extra.reject ? 'Image or video files only' : 'Drag Files or Click to Browse')}
              styles={{
                dropzone: { minHeight: 200, maxHeight: 250 },
                dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
                inputLabel: (files, extra) => (extra.reject ? { color: 'red' } : {}),
              }}
              maxFiles={4}
              maxSizeBytes={26214400}
            />
          </div>
        </div>
      </div>
    )
  }
}
