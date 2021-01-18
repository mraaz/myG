import React from 'react';
import { connect } from 'react-redux';
import { ignoreFunctions } from '../../../../common/render'
import { fetchBadgesAction, redeemBadgeAction } from '../../../../redux/actions/userAction';
import { getAssetUrl } from '../../../../common/assets';
import Help from '../Help';
import notifyToast from '../../../../common/toast';

class Badges extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    help: false,
  }

  componentDidMount() {
    this.props.fetchBadges(this.props.alias);
  }

  redeemBadge = (badge) => {
    const finish = () => notifyToast(`Got it mate! You just got ${badge.experience}xp!`);
    this.props.redeemBadge(this.props.alias, badge.type, badge.value).then(finish);
  }

  renderBadge = (badge) => {
    const lockedStyle = !badge.unlocked ? 'locked' : '';
    return(
      <div className="badge">
        <div className="icon-container">
          <div className="icon" style={{ backgroundImage: `url(${getAssetUrl(badge.icon)})` }}/>
        </div>
        <span className={`label ${lockedStyle}`}>{badge.label}</span>
        {!!badge.unlocked && (
          <div className="button clickable" onClick={() => this.redeemBadge(badge)}>Collect {badge.experience}xp</div>
        )}
        {!badge.unlocked && (
          <div className={`hint ${lockedStyle}`}>Not Achieved</div>
        )}
      </div>
    );
  }

  renderHelpButton = () => {
    return(
      <div className="help clickable" onClick={() => this.setState({ help: true })}>?</div>
    );
  }

  renderHelp = () => {
    if (!this.state.help) return;
    return <Help {...this.props} onClose={() => this.setState({ help: false })}/>;
  }

  renderTotalCount = (redeemed, total) => {
    return(
      <div className="count">Total Badges {redeemed}/{total}</div>
    );
  }

  render() {
    return(
      <div id="badges">
        {this.renderHelp()}
        {this.renderHelpButton()}
        {this.props.badges.map(this.renderBadge)}
        {this.renderTotalCount(this.props.redeemedBadges, this.props.totalBadges)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    badges: Array.isArray(state.achievements.badges) ? state.achievements.badges : [],
    redeemedBadges: state.achievements.redeemedBadges || 0,
    totalBadges: state.achievements.totalBadges || 50,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchBadges: (alias) => dispatch(fetchBadgesAction(alias)),
    redeemBadge: (alias, type, value) => dispatch(redeemBadgeAction(alias, type, value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Badges)

