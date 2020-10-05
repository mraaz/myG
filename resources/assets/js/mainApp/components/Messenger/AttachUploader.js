import 'react-dropzone-uploader/dist/styles.css'
import React from 'react'
import Dropzone from 'react-dropzone-uploader'
import LoadingIndicator from '../LoadingIndicator'
import notifyToast from '../../../common/toast'
import { ignoreFunctions } from '../../../common/render'
import { uploadAttachmentIcon } from '../../../integration/http/chat'
import { Upload_to_S3 } from '../AWS_utilities'

export default class AttachUploader extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    loading: false,
  }

  handleSubmit = async (_, status, allFiles) => {
    if (status !== 'done') return

    this.setState({ loading: true })

    const file = allFiles[0].file
    const name = allFiles[0].meta.name
    const type = allFiles[0].meta.type
    const mygType = type.includes('image') ? 'image' : type.includes('video') ? 'video' : 'sound'

    try {
      const post = await Upload_to_S3(file, name, 0, null, true)
      const key = post.data.Key
      const response = await this.props.sendMessage(`myg-${mygType}|${post.data.Location}`, key)
      if (key) await uploadAttachmentIcon(response.value.message.chatId, response.value.message.messageId, key)
    } catch (error) {
      const message = error && error.response && error.response.data
      if (message === 'CHAT_UPLOAD_DISABLED') notifyToast('Sorry mate, file uploading is currently disabled.')
      else if (message === 'MAX_UPLOAD_REACHED') notifyToast('Sorry mate, you have reached your upload limit for the day.')
      else if (message === 'USER_CREATION') notifyToast('Sorry mate, you need to be a member for at least one day to upload files.')
      else if (message === 'FILE_INFECTED') notifyToast('Fair dinkum! Mate this file is infected! Deleting this off our servers!')
      else notifyToast('Oops, something went wrong. Unable to upload your file. Please try again.')
    }

    this.props.onFinish()
  }

  render() {
    if (this.state.loading) {
      return (
        <div className='chat-component-attach-window-loading'>
          <p className='chat-component-attach-window-loading-hint'>Uploading Your File...</p>
          <LoadingIndicator color={'#F0F0F0'} />
        </div>
      )
    }
    return (
      <Dropzone
        accept='image/jpeg,image/jpg,image/png,image/gif,audio/*,video/*'
        maxFiles={1}
        maxSizeBytes={10485760}
        PreviewComponent={null}
        onChangeStatus={this.handleSubmit}
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
    )
  }
}
