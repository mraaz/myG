import React from 'react';
import axios from 'axios';
import { ignoreFunctions } from '../../../../common/render'
import notifyToast from '../../../../common/toast'
import { registerSponsorClick } from '../../../../integration/http/quests'
import ManageSponsors from '../../CommunityView/MangeSponsors'

const defaultSponsorImage = 'https://myG.gg/platform_images/Communities/myG_logo.jpg';
export default class Sponsors extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = { hovering: null, editing: null }
  editSponsor = (editing) => this.setState({ editing })
  deleteSponsor = (id) => {
    axios.delete(`/api/sponsor/delete/${id}`).then(this.props.refetchSponsors)
    notifyToast('Yup, yup, yup... deleted successfully!')
  }
  onEdit = () => {
    this.props.refetchSponsors();
    this.setState({ editing: null });
  }

  renderSponsor = (sponsor) => {
    const isHovering = this.state.hovering === sponsor.id;
    const isLocked = `${sponsor.id}`.includes('locked');
    const isEmpty = `${sponsor.id}`.includes('empty');
    const hasSponsor = !!sponsor.link;
    const sponsorLink = hasSponsor && sponsor.link.includes('http') ? sponsor.link : `https://${sponsor.link}`;
    return(
      <div className='sponsor' key={sponsor.id}
        onMouseEnter={() => this.setState({ hovering: this.props.profile.isSelf && sponsor.id })}
        onMouseLeave={() => this.setState({ hovering: null })}
      >
        <div
          className='image'
          // style={{ backgroundImage: `url(${sponsor.media_url}), url(${defaultSponsorImage})` }}
          onClick={() => {
            if (!hasSponsor) return;
            registerSponsorClick();
            window.open(sponsorLink, '_blank');
          }}
        />
        <div className="hover-bar">
          {/* {!!isHovering && <div className={`tiny-button ${!isLocked && 'clickable'}`} onClick={() => !isLocked && this.editSponsor(sponsor.id)}>{isLocked ? 'Unlock at Lvl 5' : 'Edit'}</div>} */}
          {!!isHovering && !isEmpty && <div className="tiny-button clickable" onClick={() => this.deleteSponsor(sponsor.id)}>Delete</div>}
        </div>
      </div>
    );
  }

  renderEditSponsor = () => {
    if (!this.state.editing) return null;
    return(
      <div className="communityName__container">
        <ManageSponsors 
          sponsor={!`${this.state.editing}`.includes('empty') && this.props.sponsors.find((sponsor) => sponsor.id === this.state.editing)}
          userId={this.props.profile.id}
          handleModalStatus={this.onEdit}
        />
      </div>
    );
  }

  render() {
    return(<div className="profile__sponsors-container">
        {this.props.isSelf &&<button type="button" className="sponsors__btn">Manage your Sponsors</button>}
        <div id="profile-sponsors">
          {/* {this.renderEditSponsor()} */}
          {this.props.sponsors.map(this.renderSponsor)}
        </div>
      </div>
    );
  }
}
