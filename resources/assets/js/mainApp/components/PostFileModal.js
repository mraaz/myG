import React, { Component } from 'react'
import axios from 'axios'

import { toast } from 'react-toastify'
import { Toast_style } from './Utility_Function'

import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

class FilePreview extends Component {
  constructor(props) {
    super(props)

    this.clickDelete = this.clickDelete.bind(this)
  }

  clickDelete() {
    if (typeof this.props.callbackDelete != 'undefined') {
      this.props.callbackDelete(this.props.srcKey)
    }
  }

  render() {
    if (this.props.fileType == 'video') {
      return (
        <div className='file-preview-wrap'>
          <div className='file-preview-overlay'>
            <span className='file-preview-delete' onClick={() => this.clickDelete()}>
              <i className='fas fa-times'></i>
            </span>
          </div>
          <video controls>
            <source src={this.props.src}></source>
          </video>
        </div>
      )
    } else {
      return (
        <div className='file-preview-wrap'>
          <div className='file-preview-overlay'>
            <span className='file-preview-delete' onClick={() => this.clickDelete()}>
              <i className='fas fa-times'></i>
            </span>
          </div>
          <img src={this.props.src}></img>
        </div>
      )
    }
  }
}
export default class PostFileModal extends Component {
  constructor() {
    super()

    this.state = {
      file: null,
      file_preview: '',
      preview_files: [],
      uploading: false,
      file_src: '',
      file_key: '',
      post_content: '',
    }

    this.closeModal = this.closeModal.bind(this)
    this.doUploadS3 = this.doUploadS3.bind(this)
    this.clickSave = this.clickSave.bind(this)

    this.callbackDeletePreview = this.callbackDeletePreview.bind(this)
  }

  componentWillMount() {}

  callbackDeletePreview(key) {
    var instance = this

    const formData = new FormData()
    formData.append('key', key)

    axios
      .post('/api/deleteFile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(function(resp) {
        var preview_files = instance.state.preview_files
        for (var index = 0; index < preview_files.length; index++) {
          if (instance.state.preview_files[index].key == key) {
            preview_files.splice(index, 1)
          }
        }

        instance.setState({
          preview_files: preview_files,
        })
      })
      .catch((error) => {})
  }

  closeModal() {
    if (this.state.uploading) {
      return
    }

    this.props.callbackClose()

    if (this.state.preview_files.length != 0) {
      axios
        .post('/api/deleteFiles', {
          files: this.state.preview_files,
        })
        .then(function(resp) {
          instance.setState({
            file_src: resp.data.Location,
          })
        })
        .catch((error) => {})
    }

    this.setState({
      preview_files: [],
      post_content: '',
    })
  }

  clickSave() {
    if (this.state.uploading) {
      return
    }

    this.props.callbackConfirm({
      media_url: this.state.preview_files,
      content: this.state.post_content,
    })

    this.setState({
      preview_files: [],
      post_content: '',
    })
  }

  async doUploadS3(file, name) {
    var instance = this
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
      console.log('asfsadfds!!!')
      console.log(post)
    } catch (error) {
      toast.success(<Toast_style text={'Opps, something went wrong. Unable to upload your file. Max file size is 100MB.'} />)
      instance.setState({
        uploading: false,
      })
    }
    this.setState({
      uploading: true,
    })

    // const post = await axios
    //   .post('/api/uploadFile', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   })
    //   .then(function(resp) {
    //     var new_preview_files = instance.state.preview_files
    //     new_preview_files.push({
    //       src: resp.data.Location,
    //       key: resp.data.Key,
    //     })
    //     instance.setState({
    //       uploading: false,
    //       preview_files: new_preview_files,
    //     })
    //   })
    //   .catch((error) => {
    //     // handle your error
    //   })
  }

  onChangeFile(event) {
    event.stopPropagation()
    event.preventDefault()

    var instance = this
    var file = event.target.files[0]

    var reader = new FileReader()

    reader.onload = function(e) {
      instance.setState({
        file_preview: e.target.result,
      })
    }

    reader.readAsDataURL(file)

    this.doUploadS3(file)
  }

  handleChange = (event) => {
    const name = event.target.name
    const value = event.target.type == 'checkbox' ? event.target.checked : event.target.value
    this.setState({
      [name]: value,
    })
  }

  getUploadParams = async ({ file, meta: { name } }) => {
    this.doUploadS3(file, name)
    return { url: 'https://httpbin.org/post' }
  }

  handleChangeStatus = ({ meta }, status) => {
    console.log(status, meta)
  }

  handleSubmit = (files, allFiles) => {
    console.log(files.map((f) => f.meta))
    allFiles.forEach((f) => f.remove())
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
      accept = '.ogv, .mp4, .m4v, .mpeg, .wmv, .mov, .ogm, .webm, .asx, .mpg'
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
              styles={{ dropzone: { minHeight: 200, maxHeight: 250 } }}
            />
            <div className={this.state.uploading ? 'save-btn btn--disable' : 'save-btn'} onClick={() => this.clickSave()}>
              <i className='fas fa-save'></i> Save
            </div>
          </div>
        </div>
      </div>
    )
  }
}
