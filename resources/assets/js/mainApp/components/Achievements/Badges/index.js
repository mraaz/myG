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

  constructor() {
    super()
    this.state = {
      help: false,
      page: 0,
      changingPage: false,
    }
    this.contentAreaRef = React.createRef()
    this.lastScrollY = 0
  }

  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  componentDidMount() {
    this.props.fetchBadges(this.props.alias);
  }

  redeemBadge = (badge) => {
    const finish = () => notifyToast(`Got it mate! You just got ${badge.experience}xp!`);
    this.props.redeemBadge(this.props.alias, badge.type, badge.value).then(finish);
  }

  renderBadge = (badge) => {
    const isCollectable = !badge.collected && !!badge.unlocked;
    const isLocked = !badge.collected && !badge.unlocked;
    const isCollected = !!badge.collected;
    const labelStyle = isLocked ? 'locked' : isCollected ? 'collected' : '';
    return (
      <div className="badge">
        <div className="icon-container">
          <div className="icon" style={{ backgroundImage: `url(${getAssetUrl(badge.icon)})` }} />
        </div>
        <span className={`label ${labelStyle}`}>{badge.label}</span>
        {isCollectable && <div className="button clickable" onClick={() => this.redeemBadge(badge)}>Collect {badge.experience}xp</div>}
        {isLocked && <div className="hint locked">Not Achieved</div>}
        {isCollected && <div className="hint collected">Achieved</div>}
      </div>
    );
  }

  renderHelpButton = () => {
    return (
      <div className="help clickable" onClick={() => this.setState({ help: true })}>?</div>
    );
  }

  renderHelp = () => {
    if (!this.state.help) return;
    return <Help {...this.props} onClose={() => this.setState({ help: false })} />;
  }

  renderTotalCount = (redeemed, total) => {
    return (
      <div className="count">Total Badges {redeemed}/{total}</div>
    );
  }

  getBadgesPerPage = () => Math.floor((window.innerWidth - 96) / (96 + 8))

  changePage = (direction) => {
    const page = this.state.page;
    const newPage = direction === 'left' ? (page - 1) < 0 ? page : page - 1 : (page + 1) > (levelIndicators.length - this.getBadgesPerPage()) ? page : page + 1;
    this.setState({ changingPage: true }, () => setTimeout(() => this.setState({ page: newPage, changingPage: false }), 100));
  }

  renderPageButtons = () => {
    const fitsAllInScreen = levelIndicators.length <= this.getBadgesPerPage();
    const contentToTheLeft = !fitsAllInScreen && this.state.page > 0;
    const contentToTheRight = !fitsAllInScreen && this.state.page < (levelIndicators.length - this.getBadgesPerPage());
    return (
      <React.Fragment>
        {contentToTheLeft && (
          <div
            className={`go-left clickable`}
            onClick={() => this.changePage('left')}
            style={{ backgroundImage: `url(${getAssetUrl('ic_profile_chevron_left')})` }}
          />
        )}
        {contentToTheRight && (
          <div
            className={`go-right clickable`}
            onClick={() => this.changePage('right')}
            style={{ backgroundImage: `url(${getAssetUrl('ic_profile_chevron_right')})` }}
          />
        )}
      </React.Fragment>
    );
  }

  renderLevelIndicators = () => {
    return (
      <div className="level-indicators" style={{ opacity: this.state.changingPage ? 0.3 : 1 }}>
        {this.renderPageButtons()}
        {levelIndicators.slice(this.state.page, this.state.page + this.getBadgesPerPage()).map(this.renderLevelIndicator)}
      </div>
    );
  }

  renderLevelIndicator = ({ label, subtitle, minValue, maxValue }) => {
    const locked = this.props.level < minValue;
    const unlocked = this.props.level >= maxValue;
    const levelProgress = (this.props.level / maxValue) * 100;
    const progress = locked ? 0 : levelProgress > 100 ? 100 : levelProgress;
    return (
      <div className="level-indicator" style={{ opacity: locked ? 0.3 : 1 }}>
        <Progress
          rootClass="level-indicator-circle"
          className='circle-wrap'
          borderColor='#E5C746'
          progress={progress}
          value={unlocked ? 'unlocked' : subtitle}
          label={label}
          labelStyle={{ color: unlocked ? '#e5c746' : '#fff', fontSize: label === 'Baby Dragon' ? 10 : 14, marginTop: 0, marginBottom: 0 }}
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
    return (
      <div id="badges" ref={this.contentAreaRef}>
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

