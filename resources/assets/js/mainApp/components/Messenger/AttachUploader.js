import 'react-dropzone-uploader/dist/styles.css';
import React from 'react';
import Dropzone from 'react-dropzone-uploader';
import axios from 'axios'
import LoadingIndicator from '../LoadingIndicator';
import notifyToast from '../../../common/toast';

export default class AttachUploader extends React.PureComponent {

  state = {
    loading: false
  }

  handleSubmit = async (_, allFiles) => {
    this.setState({ loading: true });

    const formData = new FormData()
    formData.append('upload_file', allFiles[0].file);
    formData.append('filename', allFiles[0].meta.name);
    formData.append('chat', true);

    try {
      const post = await axios.post('/api/uploadFile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      await this.props.sendMessage(`myg-image|${post.data.Location}`, post.data.Key);
    } catch (error) {
      notifyToast('Oops, something went wrong. Unable to upload your file. Please try again.');
    }

    this.props.onFinish();
  }

  render() {
    if (this.state.loading) {
      return(
        <div className="chat-component-attach-window-loading">
          <p className="chat-component-attach-window-loading-hint">Uploading Your File...</p>
          <LoadingIndicator color={'#F0F0F0'} />
        </div>
      );
    }
    return (
      <Dropzone
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
            margin: '15px 0 0 0',
            padding: '40px 0',
          },
        }}
      />
    );
  }

}
