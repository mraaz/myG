import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import Uploader from '../../common/Uploader'
import AnalyticsBox from '../../AnalyticsBox';
import Header from './header';
import MobileHeader from './MobileHeader';
import MobileAction from './MobileAction';
import { ignoreFunctions } from '../../../../common/render'
import { sendFriendRequestAction, confirmFriendRequestAction, unfriendAction, followAction, unfollowAction, cancelFriendRequestAction, uploadProfileImageAction, uploadProfileBackgroundAction } from '../../../../redux/actions/profileAction';

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
      <div className="hover-banner clickable" onClick={() => {
        const uploader = document.querySelector('.uploader > input');
        if (uploader) uploader.click();
      }}>Update Background Image</div>
    );
  }

  onUpload = (image, key) => {
    this.props.uploadProfileBackground(this.props.profile.alias, image, key)
  }
  
  render() {
    const background = this.props.profile.background ? 
      { backgroundImage: `url('${this.props.profile.background}')` } : 
      { backgroundImage: `url(https://myg.gg/platform_images/Profile/Silver-Stamping-Logo-MockUp.jpg)` };
    return(
      <Fragment>
      <div id="profile-banner" className={`background ${this.props.isSelf && 'clickable'}`} style={background}  
        onMouseEnter={() => this.setState({ hoveringBanner: true })}
        onMouseLeave={() => this.setState({ hoveringBanner: false })}
      >
        <Uploader background onUpload={this.onUpload}>
            <AnalyticsBox alias={this.props.profile.alias} containerStyle='analytics' />
        </Uploader>
        {this.renderBannerUploader()}
        <div className="desktopShow zIndex">
          <Header
            alias={this.props.profile.alias}
            profile={this.props.profile}
            isSelf={this.props.profile.isSelf}
            sendFriendRequest={this.props.sendFriendRequest}
            confirmFriendRequest={this.props.confirmFriendRequest}
            unfriend={this.props.unfriend}
            follow={this.props.follow}
            unfollow={this.props.unfollow}
            cancelFriendRequest={this.props.cancelFriendRequest}
            uploadProfileImage={this.props.uploadProfileImage}
            updateProfile={this.props.updateProfile}
            onlyProfile={this.props.onlyProfile}
          />
        </div>
        <div className="mobileShow"> 
          <MobileHeader
            alias={this.props.profile.alias}
            profile={this.props.profile}
            userTransactionStates={this.props.userTransactionStates}
            isSelf={this.props.profile.isSelf}
            sendFriendRequest={this.props.sendFriendRequest}
            confirmFriendRequest={this.props.confirmFriendRequest}
            unfriend={this.props.unfriend}
            follow={this.props.follow}
            unfollow={this.props.unfollow}
            cancelFriendRequest={this.props.cancelFriendRequest}
            uploadProfileImage={this.props.uploadProfileImage}
            updateProfile={this.props.updateProfile}
            onlyProfile={this.props.onlyProfile}
          />
        </div>
        <div className="profile-banner-shadow"></div>
      </div>  
      <div className="mobileShow"> 
          <MobileAction 
            alias={this.props.profile.alias}
            profile={this.props.profile}
            userTransactionStates={this.props.userTransactionStates}
            isSelf={this.props.profile.isSelf}
            sendFriendRequest={this.props.sendFriendRequest}
            confirmFriendRequest={this.props.confirmFriendRequest}
            unfriend={this.props.unfriend}
            follow={this.props.follow}
            unfollow={this.props.unfollow}
            cancelFriendRequest={this.props.cancelFriendRequest}
            uploadProfileImage={this.props.uploadProfileImage}
            updateProfile={this.props.updateProfile}
            onlyProfile={this.props.onlyProfile} 
          />
        </div>
    </Fragment>
    );
  }
} 

function mapStateToProps(state) {
  return {
    userTransactionStates: state.user.userTransactionStates || {},
  }
}
 
function mapDispatchToProps(dispatch) {
  return {
    sendFriendRequest: (alias, id) => dispatch(sendFriendRequestAction(alias, id)),
    confirmFriendRequest: (alias, id, notificationId) => dispatch(confirmFriendRequestAction(alias, id, notificationId)),
    unfriend: (alias, id) => dispatch(unfriendAction(alias, id)),
    follow: (alias, id) => dispatch(followAction(alias, id)),
    unfollow: (alias, id) => dispatch(unfollowAction(alias, id)),
    cancelFriendRequest: (alias, id) => dispatch(cancelFriendRequestAction(alias, id)),
    uploadProfileImage: (alias, image, key) => dispatch(uploadProfileImageAction(alias, image, key)),
    uploadProfileBackground: (alias, image, key) => dispatch(uploadProfileBackgroundAction(alias, image, key)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Banner)
