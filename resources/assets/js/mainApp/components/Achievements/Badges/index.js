import React from 'react';
import { connect } from 'react-redux';
import { ignoreFunctions } from '../../../../common/render'
import { fetchBadgesAction, redeemBadgeAction } from '../../../../redux/actions/userAction';
import { getAssetUrl } from '../../../../common/assets';
import Progress from '../../common/ProgressCircle/progress'
import Help from '../Help';
import notifyToast from '../../../../common/toast';
import levelIndicators from '../../../static/LevelIndicators';

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
        {!badge.collected && !!badge.unlocked && (
          <div className="button clickable" onClick={() => this.redeemBadge(badge)}>Collect {badge.experience}xp</div>
        )}
        {!badge.collected && !badge.unlocked && (
          <div className={`hint ${lockedStyle}`}>Not Achieved</div>
        )}
        {!!badge.collected && (
          <div className={`hint ${lockedStyle}`}>Achieved</div>
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

  renderLevelIndicators = () => {
    return(
      <div className="level-indicators">
        {levelIndicators.map(this.renderLevelIndicator)}
      </div>
    );
  }

  renderLevelIndicator = ({ label, subtitle, minValue, maxValue }) => {
    const locked = this.props.level < minValue;
    const unlocked = this.props.level >= maxValue;
    const levelProgress = (this.props.level / maxValue) * 100;
    const progress = locked ? 0 : levelProgress > 100 ? 100 : levelProgress;
    return(
      <div className="level-indicator" style={{ opacity: locked ? 0.3 : 1 }}>
        <Progress
          className='circle-wrap'
          borderColor='#E5C746'
          progress={progress}
          value={unlocked ? 'unlocked' : subtitle}
          label={label}
          labelStyle={{ color: unlocked ? '#e5c746' : '#fff', fontSize: 14, marginTop: 0, marginBottom: 0 }}
          valueStyle={{ fontSize: 12, marginTop: 0, marginBottom: 0 }}
          reduction={0}
          hideBall
          strokeWidth={8}
          background={'#fff'}
        />
      </div>
    );
  }

  render() {
    return(
      <div id="badges">
        {this.renderHelp()}
        {this.renderHelpButton()}
        {this.renderLevelIndicators()}
        {this.props.badges.map(this.renderBadge)}
        {this.renderTotalCount(this.props.redeemedBadges, this.props.totalBadges)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    level: (state.user.userTransactionStates || {}).user_level,
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

