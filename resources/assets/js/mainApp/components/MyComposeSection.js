import React, { Component } from "react"
import ReactDOM from "react-dom"
import axios from "axios"
import IndividualPost from "./IndividualPost"
import moment from "moment"
import PostFileModal from "./PostFileModal";

export default class MyComposeSection extends Component {
  constructor() {
    super()
    this.state = {
      show_post: false,
      myDate: moment(),
      profile_img: "",
      post_content: "",
      bFileModalOpen: false,
      fileType: 'photo',
      groups_post: false
    }

    this.openPhotoPost = this.openPhotoPost.bind(this);

    this.openVideoPost = this.openVideoPost.bind(this);
    this.callbackPostFileModalClose = this.callbackPostFileModalClose.bind(this);
    this.callbackPostFileModalConfirm=this.callbackPostFileModalConfirm.bind(this);
  }

  callbackPostFileModalClose(){
    this.setState({
      bFileModalOpen: false
    })
  }

  callbackPostFileModalConfirm = async (data) => {
    this.setState({
      bFileModalOpen: false
    })

    var url = '';

    if(this.state.fileType == 'photo'){
      url = '/api/postphoto';
    }
    else if(this.state.fileType == 'video'){
      url = '/api/postvideo';
    }
    else{
      url = '/api/postphoto';
    }

    //console.log('data:', data);
    if(data.media_url.length == 0 && data.content == ''){
      return;
    }

    try{
      if(this.state.groups_post){
        const post = await axios.post(url, {
          media_url: JSON.stringify(data.media_url),
          content: data.content,
          groups_id: this.props.groups_id.params.id
        });
      }else {
        const post = await axios.post(url, {
          media_url: JSON.stringify(data.media_url),
          content: data.content
        });
      }

      this.setState({
        myPosts: undefined,
      })
      await this.get_posts()

    } catch(error){
      console.log(error)
    }
  }

  openPhotoPost(){
    this.setState({
      bFileModalOpen: true,
      fileType: 'photo'
    })
  }

  openVideoPost(){
    this.setState({
      bFileModalOpen: true,
      fileType: 'video'
    })
  }

  submitForm = async () => {
    if(this.state.post_content.trim() ==""){
      this.setState({
        post_content: ""
      })
      return
    }
    try{
      if(this.state.groups_post){
        const post = await axios.post('/api/post',{
          content: this.state.post_content.trim(),
          user_id: this.props.initialData.userInfo.id,
          type: 'text',
          groups_id: this.props.groups_id.params.id
        })
      }else {
        const post = await axios.post('/api/post',{
          content: this.state.post_content.trim(),
          user_id: this.props.initialData.userInfo.id,
          type: 'text'
        })
      }

      this.setState({
        myPosts: undefined,
      })
      await this.get_posts()

    } catch(error){
      console.log(error)
    }
  }
  handleChange = (event) => {
    const name = event.target.name
    const value = event.target.type == 'checkbox' ? event.target.checked : event.target.value
    this.setState({
      [name]: value
    })
  }

  showLatestPosts = () => {
    if(this.state.myPosts != undefined){
      return this.state.myPosts.map((item, index) => {
        return <IndividualPost post={item} key={index} user={this.props.initialData}/>
      })
    }
  }

  get_posts = () => {
    const self = this
    const getPosts = async function(){
      try{
        const myPosts = await axios.get(`/api/mypost/${self.state.myDate}`)

        var i
        var myLikes

        for(i=0; i < myPosts.data.myPosts.length; i++){
          myLikes = await axios.get(`/api/likes/${myPosts.data.myPosts[i].id}`)
          myPosts.data.myPosts[i].total=myLikes.data.number_of_likes[0].total
          myPosts.data.myPosts[i].no_of_comments=myLikes.data.no_of_comments[0].no_of_comments
          if (myLikes.data.number_of_likes[0].total != 0){
            myPosts.data.myPosts[i].admirer_first_name=myLikes.data.admirer_UserInfo.first_name
            myPosts.data.myPosts[i].admirer_last_name=myLikes.data.admirer_UserInfo.last_name
          } else{
            myPosts.data.myPosts[i].admirer_first_name= ""
            myPosts.data.myPosts[i].admirer_last_name= ""
          }
          if (myLikes.data.do_I_like_it[0].myOpinion != 0){
            myPosts.data.myPosts[i].do_I_like_it= true
          } else{
            myPosts.data.myPosts[i].do_I_like_it= false
          }
        }

        self.setState({
          myPosts: myPosts.data.myPosts,
          show_post: true,
          post_content: ""
        })
        //self.forceUpdate()
      } catch(error){
        console.log(error)
      }
    }
    getPosts()
  }

  detectKey = (e) => {

    if (e.key === 'Enter' && e.shiftKey) {
      return
    }

    if(e.key === 'Escape') {
      this.setState({
        edit_post: false,
        value2: "",
      })
    }

    if (e.key === 'Enter') {
      event.preventDefault()
      event.stopPropagation()
      this.submitForm()
    }
  }

  componentWillMount(){
    try {
      if (this.props.groups_id.params.id != undefined){
        this.state.groups_post = true
      }
    } catch (e) {
      this.state.groups_post = false
    }


    //const now = moment.utc()
    //var now = moment().utc().format('YYYY-MM-DDTHH:mm:ss')
    var now = moment().subtract(5, 'seconds').utc().format('YYYY-MM-DDTHH:mm:ss')
    this.setState({
      myDate: now,
    })
    if (this.props != undefined){
      if (this.props.initialData.userInfo != undefined){
        this.setState({
          profile_img: this.props.initialData.userInfo.profile_img,
          user_id: this.props.initialData.userInfo.id,
        })
      }
    }
  }

  render() {
    return (
      <section className="compose-area">
        <div className="compose-section">
          <textarea name="post_content" rows={8} cols={80} defaultValue={''} onChange={this.handleChange} value={this.state.post_content} onKeyUp = {this.detectKey} maxLength="254" placeholder="What's up..."/>
          <div className="user-img" />
          <a href={`/profile/${this.state.user_id}`} className="user-img" style={{
            backgroundImage: `url('${this.state.profile_img}')`
          }}/>
          <PostFileModal
            bOpen={this.state.bFileModalOpen}
            fileType={this.state.fileType}
            callbackClose={this.callbackPostFileModalClose}
            callbackConfirm={this.callbackPostFileModalConfirm}
          ></PostFileModal>
          <div className="buttons">
            <div className="button photo-btn" onClick={() => this.openPhotoPost()}>
              <i className="far fa-images" />
            </div>
            <div className="button video-btn" onClick={() => this.openVideoPost()}>
              <i className="far fa-play-circle" />
            </div>
            <div className="button send-btn" onClick={this.submitForm}>
              <i className="far fa-paper-plane" />
            </div>
          </div>
        </div>
        <section id="posts">
          {this.state.show_post && this.showLatestPosts()}
        </section>
      </section>
    )
  }
}

const app = document.getElementById("app");
