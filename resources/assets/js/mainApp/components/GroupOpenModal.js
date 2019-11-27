import React, { Component } from "react"
import axios from "axios"
import Select from 'react-select'
import {
  Redirect
} from "react-router-dom"

class FilePreview extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="file-preview-wrap" onClick={() => this.props.callbackClick(this.props.src)}>
                <img src={this.props.src}></img>
            </div>
        )
    }
}

const privacy_options = [
  { value: 1, label: 'Public' },
  { value: 2, label: 'Closed' },
  { value: 3, label: 'Secret' }
]

export default class GroupOpenModal extends Component {
  constructor() {
    super()

    this.state = {
        file: null,
        file_preview: '',
        preview_files: ['https://s3-ap-southeast-2.amazonaws.com/mygame-media/1556592223564-lg.jpg', 'https://s3-ap-southeast-2.amazonaws.com/mygame-media/1556630834362-lg.png'],
        uploading: false,
        file_src: '',
        file_key: '',
        group_name_box: '',
        privacy_box: '',
        all_accept_chkbox: true,
        show_group_name_error: false,
        show_group_name_unique_error: false,
        is_unique: false,
        redirect_groups: false,
        groups_id: ""
    }

    this.closeModal = this.closeModal.bind(this);
    this.doUploadS3 = this.doUploadS3.bind(this);
    this.clickSave = this.clickSave.bind(this);
  }

  componentWillMount(){
  }

  closeModal(){
    if(this.state.uploading){
      return;
    }

    this.props.callbackClose();

    if(this.state.file_key != ''){
      const formData = new FormData();
      formData.append('key', this.state.file_key);

      axios.post('/api/deleteFile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function(resp){
        instance.setState({
          file_src: resp.data.Location
        })
      }).catch(error => {
      });
    }

    this.setState({
      file_preview: '',
      file_key: '',
      file_src: ''
    })
  }

  async clickSave(){
    if(this.state.uploading){
      return
    }

    if (this.state.group_name_box.trim() == "" || this.state.group_name_box == null){
      this.setState({
        show_group_name_error: true,
        show_group_name_unique_error: false
      })
      return
    }

    if (this.state.is_unique == false){
      this.setState({
        show_group_name_unique_error: true,
        show_group_name_error: false,
      })
      return
    }

    try {
      if (this.state.file_src == "" || this.state.file_src == null){
        const post = await axios.post('/api/groups/create',{
         name: this.state.group_name_box.trim(),
         type: this.state.privacy_box.value,
         all_accept:this.state.all_accept_chkbox
       })
       this.state.group_id = post.data.id
      } else {
        const post = await axios.post('/api/groups/create',{
         name: this.state.group_name_box.trim(),
         group_img: this.state.file_src,
         type: this.state.privacy_box.value,
         all_accept:this.state.all_accept_chkbox
       })
       this.state.group_id = post.data.id
      }
    } catch(error){
     console.log(error)
    }

    this.setState({
      group_name_box: '',
      file_src: '',
      privacy_box: [privacy_options[0]],
      all_accept_chkbox: true,
      file_preview: '',
      file_key:'',
      redirect_groups: true
    })

    //this.props.callbackConfirm(this.state.file_src)
  }

  onBlur_group_name = async () => {
    if (this.state.group_name_box.trim() == "" || this.state.group_name_box == null){
      this.setState({
        show_group_name_unique_error: false,
      })
      return
    }
    const getgroup_name = await axios.get(`/api/groups/groupName/${this.state.group_name_box.trim()}`)
    if (getgroup_name.data.getOne[0].no_of_names == 0){
      this.state.is_unique = true
      this.setState({
        show_group_name_unique_error: false,
        show_group_name_error: false
      })
    }else{
      this.setState({
        show_group_name_unique_error: true,
        is_unique: false,
        show_group_name_error: false
      })
    }
  }

  doUploadS3(file){
    var instance = this;
    this.setState({
        uploading: true
    })
    const formData = new FormData();
    formData.append('upload_file', file);
    formData.append('filename', file.name);

    axios.post('/api/uploadFile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(function(resp){

      instance.setState({
        uploading: false,
        file_src: resp.data.Location,
        file_key: resp.data.Key
      })

    }).catch(error => {
      // handle your error
      instance.setState({
        uploading: false
      })
    });
  }

  onChangeFile(event){
    event.stopPropagation();
    event.preventDefault();

    var instance = this;
    var file = event.target.files[0];

    var reader = new FileReader();

    reader.onload = function(e) {
        instance.setState({
            file_preview: e.target.result
        })
    }

    if(this.state.file_key != ''){
      //delete file
      const formData = new FormData();
      formData.append('key', this.state.file_key);
      axios.post('/api/deleteFile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function(resp){
      }).catch(error => {
      });
    }
    reader.readAsDataURL(file);

    this.doUploadS3(file);
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
    this.setState({[e.target.id]: e.target.value})
  }

  render() {
    if (this.state.redirect_groups === true) {
      const tmp = '/groups/' + this.state.group_id
      return <Redirect push to={tmp} />
    }

    var class_modal_status = '';

    if(this.props.bOpen){
        class_modal_status = 'modal--show';
    }

    var filepath = "https://s3-ap-southeast-2.amazonaws.com/mygame-media/blank-profile-picture-973460_1280.png";
    var instance = this;
    return (
      <div className={"groups-modal-container " + class_modal_status}>
        <div className="modal-wrap">
            <div className="modal-header">Create Group</div>
            <div className="modal-close-btn" onClick={() => this.closeModal()}><i className="fas fa-times"></i></div>
            <div className="modal-content">
              <input id="myInput"
                type="file"
                ref={(ref) => this.ref_upload = ref}
                style={{display: 'none'}}
                accept="image/*"
                onClick={() => this.ref_upload.value = null}
                onChange={this.onChangeFile.bind(this)}
              />
              <div className="group-name">
                <span style={{color: "red"}}>*</span> Enter your group name here (names must be unique)
                {this.state.show_group_name_error && <div className="group-name-error-msg">
                  Error, group name can't be blank
                </div>}
                {this.state.show_group_name_unique_error && <div className="group-name-error-unique-msg">
                  Error, group name MUST be unique
                </div>}
                <input type="text" id="group_name_box" className="group-name-box" onChange={this.handleChange} onBlur={this.onBlur_group_name} value={this.state.group_name_box} maxLength="254"/>
              </div>


              <div className="privacy">
               Select privacy
                <Select
                  onChange={this.handleChange_Privacy}
                  options={privacy_options}
                  className="privacy_box"
                  defaultValue={[privacy_options[0]]}
                />
              </div>

              <div className="all_accept">
                <input id="all_accept_ChkBox" type="checkbox" defaultChecked="true" onChange={this.toggleChange_all_accept}/> All members can accept group invitations
              </div>

              <div className="open-btn" onClick={() => this.ref_upload.click()}>
                <i className="fas fa-upload"></i> Upload File
              </div>
              <div className={this.state.uploading ? "uploading-container" : "uploading-container uploading--hide"}>
                  <div className="uploading"></div>
              </div>
              <div className={this.state.file_preview == '' ? 'upload-image-preview' : 'upload-image-preview open'}>
                  <img src={this.state.file_preview}></img>
              </div>
              <div className={this.state.uploading ? "save-btn btn--disable" : "save-btn"} onClick={() => this.clickSave()}>Create Group</div>
            </div>
        </div>
      </div>
    )
  }
}
