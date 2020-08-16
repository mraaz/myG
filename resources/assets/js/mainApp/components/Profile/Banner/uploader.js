import React from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import notifyToast from '../../../../common/toast'

export default class Uploader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleChangeStatus = ({ meta }, status, allFiles) => {
    this.state.store_files = allFiles
    if (status === 'done') {
      const file = allFiles[0].file
      const name = allFiles[0].meta.name
      this.uploadToAws(file, name)
    }
    if (status == 'removed' && this.state.lock == false) {
      this.removeFromAws()
    }
  }

  handleDrop = (files, rejected) => {
    if (rejected.length > 0) return notifyToast('Sorry mate! file rejected because of bad format or file size limit exceed (10mb)')
    if (files.length > 1) return notifyToast("Sorry mate! Can't upload more than one at a time")
    const file = files[0]
    const type = file.type.split('/')[0]
    const name = `post_${type}_${+new Date()}_${file.name}`
    return this.uploadToAws(file, name)
  }

  async uploadToAws(file, name) {
    this.setState({ uploading: true })
    const formData = new FormData()
    formData.append('upload_file', file)
    formData.append('filename', name)
    try {
      const post = await axios.post('/api/uploadFile', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      this.setState({
        file_src: post.data.Location,
        file_key: post.data.Key,
      })
      this.props.onUpload(post.data.Location, post.data.Key);
    } catch (error) {
      console.log(error);
      notifyToast('Oops, something went wrong. Unable to upload your file. Close this window and try again.')
    }
    this.state.submitButtonContent = 'Submit'
    this.setState({
      uploading: false,
    })
  }

  removeFromAws() {
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
        console.log(error);
        toast.success(<Toast_style text={'Oops, something went wrong. Unable to upload your file. Close this window and try again'} />)
      }
    }
  }

  uploadStyle = () => {
    if (this.props.background) return this.backgroundStyle
    return this.imageStyle
  }

  imageStyle = {
    dropzone: {
      display: 'flex',
      border: 'none',
    },
  }

  backgroundStyle = {
    dropzone: {
      display: 'flex',
      position: 'absolute',
      left: '0',
      right: '300px',
      width: 'inherit',
      height: '320px',
      overflow: 'unset',
      border: 'none',
    },
  }

  render() {
    return (
      <Dropzone
        className='uploader'
        onDrop={this.handleDrop}
        activeStyle={this.uploadStyle()}
        accept='image/jpeg,image/jpg,image/png,image/gif,video/mp4,video/webm,video/ogg'
        minSize={0}
        maxSize={52428800}>
        {this.props.children}
      </Dropzone>
    )
  }
}
