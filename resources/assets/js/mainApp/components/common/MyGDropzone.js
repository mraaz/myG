import React from 'react'
import Dropzone from 'react-dropzone'
import { FormattedMessage, injectIntl } from 'react-intl';
import { Upload_to_S3, Remove_file } from '../AWS_utilities'
const buckectBaseUrl = 'https://myG.gg/platform_images/'

class MyGDropzone extends React.Component {

  state = {
    preview_files: [],
    uploading: false,
  }

  handlePreviewRemove = (e, src) => {
    e.preventDefault()
    let preview_files = [...this.state.preview_files]
    preview_files = preview_files.filter((data) => data.src != src)
    if (this.state.preview_files != [] && this.state.preview_files[0].key != '') {
      Remove_file(this.state.preview_files[0].key, this.state.preview_files[0].id)
    }
    this.setState({ preview_files: preview_files })
    this.props.onChange(null);
  }

  handleAcceptedFiles = async (file, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      toast.error(
        <Toast_style
          text={`Sorry mate! ${rejectedFiles.length} File(s) rejected because of bad format or file size limit exceed (10mb). Yes, hmmm`}
        />
      )
    }
    if (file.length > 0) {
      this.setState({ uploading: true })
      let post = await Upload_to_S3(file[0], file[0].name, 0, null)
      this.setState({ uploading: false })
      if (!post) return
      const new_preview_files = []
      new_preview_files.push({
        src: post.data.Location,
        key: post.data.Key,
        id: post.data.aws_key_id,
      });
      this.setState({ preview_files: new_preview_files, uploading: false });
      this.props.onChange(new_preview_files[0]);
    }
  }

  render() {
    const hasImage = this.state.preview_files.length > 0 || !!this.props.image;
    const imagePreview = !!hasImage && this.state.preview_files.length > 0 ? this.state.preview_files[0] : this.props.image;
    return (
      <div className='media__container myg-dropzone clickable' style={this.props.containerStyle || {}}>
        {!hasImage && (
          <Dropzone
            onDrop={(acceptedFiles, rejectedFiles) => this.handleAcceptedFiles(acceptedFiles, rejectedFiles)}
            maxFiles={1}
            minSize={0}
            maxSize={11185350}
            accept='image/jpeg,image/jpg,image/png,image/gif'
            disabled={this.state.uploading}
            className='dropzone-thumb'>
            {() => {
              return (
                <section className='custom__html dropzone-section myg-dropzone-section'>
                  <div className='text'>
                    <FormattedMessage
                      id="myg.dropzone.hint"
                      defaultMessage="Drop your image"
                    />
                  </div>
                  <div className='images community-images-container myg-dropzone-image'>
                    <span className=' button photo-btn'>
                      <img src={`${buckectBaseUrl}Dashboard/BTN_Attach_Image.svg`} />
                    </span>
                  </div>
                  <div className='text'>
                    <FormattedMessage
                      id="myg.dropzone.call-to-action"
                      defaultMessage="Or <highlight>click here</highlight> to select"
                      values={{ level: 2, highlight: text => <span className="myg-dropzone-link">{text}</span> }}
                    />
                  </div>
                  {this.state.uploading && (
                    <div className='text'>
                      <span>
                        <FormattedMessage
                          id="myg.dropzone.loading"
                          defaultMessage="Uploading..."
                        />
                      </span>
                    </div>
                  )}
                </section>
              )
            }}
          </Dropzone>
        )}
        <section>
          {hasImage && (
            <div className='myg-dropzone-preview'>
              <span className='image' key={imagePreview.src}>
                <img src={imagePreview.src} key={imagePreview.src} />
                <span className='remove' onClick={(e) => this.handlePreviewRemove(e, imagePreview.src)}>
                  X
                    </span>
              </span>
              {this.state.preview_files.length > 3 ? `(${this.state.preview_files.length})...` : ''}
            </div>
          )}
        </section>
      </div>
    );
  }
}

export default injectIntl(MyGDropzone);
