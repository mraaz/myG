import React from 'react';
import { connect } from 'react-redux';
import { ignoreFunctions } from '../../../../common/render'
import { fetchBadgesActions } from '../../../../redux/actions/userAction';
import { getAssetUrl } from '../../../../common/assets';

class Badges extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  componentDidMount() {
    this.props.fetchBadges(this.props.alias);
  }

  renderBadge = (badge) => {
    return(
      <div className="badge">
      <div className="icon-container">
        <div className="icon" style={{ backgroundImage: `url(${getAssetUrl(badge.activeIcon)})` }}/>
      </div>
        <span className="label">{badge.label}</span>
        <div className="button clickable">Collect {badge.experience}xp</div>
      </div>
    );
  }

  render() {
    return(
      <div id="badges">
        {this.props.badges.map(this.renderBadge)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    badges: Array.isArray(state.achievements.badges) ? state.achievements.badges : [],
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchBadges: (alias) => dispatch(fetchBadgesActions(alias)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Badges)

