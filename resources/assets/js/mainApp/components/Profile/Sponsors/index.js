import React from 'react';
import axios from 'axios';
import { ignoreFunctions } from '../../../../common/render'
import notifyToast from '../../../../common/toast'
import ManageSponsors from '../../CommunityView/MangeSponsors'

const defaultSponsorImage = 'https://mygame-media.s3.amazonaws.com/platform_images/Communities/myG_logo.jpg';
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
    return(
      <div className='sponsor' key={sponsor.id}
        onMouseEnter={() => this.setState({ hovering: sponsor.id })}
        onMouseLeave={() => this.setState({ hovering: null })}
      >
        <div
          className='image'
          style={{ backgroundImage: `url(${sponsor.media_url}), url(${defaultSponsorImage})` }}
          onClick={() => sponsor.link && window.open(sponsor.link.includes('http') ? sponsor.link : `https://${sponsor.link}`, '_blank')}
        />
        <div className="hover-bar">
          {!!isHovering && <div className="tiny-button clickable" onClick={() => this.editSponsor(sponsor.id)}>Edit</div>}
          {!!isHovering && <div className="tiny-button clickable" onClick={() => this.deleteSponsor(sponsor.id)}>Delete</div>}
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
    return(
      <div id="profile-sponsors">
        {this.renderEditSponsor()}
        <span className="title">Sponsors</span>
        <div className="vertical-divider" />
        {this.props.sponsors.map(this.renderSponsor)}
      </div>
    );
  }
}
