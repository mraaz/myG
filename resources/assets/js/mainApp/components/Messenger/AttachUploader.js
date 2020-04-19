import 'react-dropzone-uploader/dist/styles.css';
import React from 'react';
import Dropzone from 'react-dropzone-uploader';

export default class AttachUploader extends React.PureComponent {

  getUploadParams = async ({ file, meta: { id, name } }) => {
    console.log(`Get Upload Params: ${id} | ${name} - ${file}`);
    // this.doUploadS3(file, name)
    return { url: 'https://httpbin.org/post' }
  }

  handleChangeStatus = ({ meta }, status, allFiles) => {
    console.log(`handleChangeStatus: ${status} - ${allFiles}`);
    // this.state.store_files = allFiles
    // if (status == 'removed' && this.state.lock == false) {
    //   this.removeIndivdualfromAWS()
    // }
  }

  handleSubmit = (files, allFiles) => {
    console.log(`handleChangeStatus: ${allFiles}`);
    this.props.onFinish();
    // if (this.state.uploading == true) {
    //   return
    // }
    // this.props.callbackConfirm(this.state.file_src, this.state.file_key)

    // this.setState({
    //   store_files: [],
    //   file_key: '',
    //   file_src: '',
    // })

    // this.state.lock = true
    // allFiles.forEach((f) => f.remove())
    // this.state.lock = false
  }

  render() {
    return (
      <Dropzone
        getUploadParams={this.getUploadParams}
        onChangeStatus={this.handleChangeStatus}
        onSubmit={this.handleSubmit}
        accept="image/*,audio/*,video/*"
        maxFiles={1}
        maxSizeBytes={10485760}
        styles={{
          dropzone: {
            justifyContent: 'center',
            border: 'none',
            padding: 0,
            margin: 0,
            height: 0,
          },
          preview: {
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 0,
            padding: '8px',
            border: 'none',
          },
          submitButtonContainer: {
            margin: 0,
          },
          inputLabel: {
            fontSize: 14,
            fontFamily: 'Montserrat',
            fontWeight: 400,
            color: '#FAFAFA',
            position: 'relative',
            margin: 0,
          },
        }}
      />
    );
  }

}
