import React from 'react';
import { connect } from 'react-redux'
import Uploader from '../../common/Uploader'
import AnalyticsBox from '../../AnalyticsBox';
import Header from './header';
import { ignoreFunctions } from '../../../../common/render'
import { sendFriendRequestAction, confirmFriendRequestAction, unfriendAction, followAction, unfollowAction, uploadProfileImageAction, uploadProfileBackgroundAction } from '../../../../redux/actions/profileAction';

export class Banner extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    hoveringBanner: false
  }

  renderBannerUploader = () => {
    if (!this.props.profile.isSelf || !this.state.hoveringBanner) return;
    return(
      <div className="hover-banner">Update Background Image</div>
    );
  }

  onUpload = (image, key) => {
    this.props.uploadProfileBackground(this.props.profile.alias, image, key)
  }

  render() {
    const background = this.props.profile.background ? { backgroundImage: `url('${this.props.profile.background}')` } : {};
    return(
      <div id="profile-banner" className={`background ${this.props.isSelf && 'clickable'}`} style={background}  
        onMouseEnter={() => this.setState({ hoveringBanner: true })}
        onMouseLeave={() => this.setState({ hoveringBanner: false })}
      >
        <Uploader background onUpload={this.onUpload}>
            <AnalyticsBox containerStyle='analytics' />
        </Uploader>
        {this.renderBannerUploader()}
        <Header
          alias={this.props.profile.alias}
          profile={this.props.profile}
          isSelf={this.props.profile.isSelf}
          sendFriendRequest={this.props.sendFriendRequest}
          confirmFriendRequest={this.props.confirmFriendRequest}
          unfriend={this.props.unfriend}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          uploadProfileImage={this.props.uploadProfileImage}
          updateProfile={this.props.updateProfile}
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sendFriendRequest: (alias, id) => dispatch(sendFriendRequestAction(alias, id)),
    confirmFriendRequest: (alias, id, notificationId) => dispatch(confirmFriendRequestAction(alias, id, notificationId)),
    unfriend: (alias, id) => dispatch(unfriendAction(alias, id)),
    follow: (alias, id) => dispatch(followAction(alias, id)),
    unfollow: (alias, id) => dispatch(unfollowAction(alias, id)),
    uploadProfileImage: (alias, image, key) => dispatch(uploadProfileImageAction(alias, image, key)),
    uploadProfileBackground: (alias, image, key) => dispatch(uploadProfileBackgroundAction(alias, image, key)),
  }
}

export default connect(null, mapDispatchToProps)(Banner)
