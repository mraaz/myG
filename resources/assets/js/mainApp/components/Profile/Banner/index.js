import React from 'react';
import { connect } from 'react-redux'
import Uploader from './uploader'
import AnalyticsBox from '../../AnalyticsBox';
import Header from './header';
import { ignoreFunctions } from '../../../../common/render'
import { sendFriendRequestAction, confirmFriendRequestAction, unfriendAction, followAction, unfollowAction, uploadProfileImageAction, uploadProfileBackgroundAction } from '../../../../redux/actions/profileAction';

export class Banner extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  render() {
    const background = this.props.profile.background ? { backgroundImage: `url('${this.props.profile.background}')` } : {};
    return(
      <div id="profile-banner" className={`background ${this.props.isSelf && 'clickable'}`} style={background}>
        <Uploader background onUpload={this.onUpload}>
            <AnalyticsBox containerStyle='analytics' />
        </Uploader>
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
