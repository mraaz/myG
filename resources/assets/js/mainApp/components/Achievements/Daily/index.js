import React from 'react';
import get from 'lodash.get';
import { connect } from 'react-redux';
import { ignoreFunctions } from '../../../../common/render'
import { getAssetUrl } from '../../../../common/assets';
import { fetchDailyQuestsAction, redeemDailyQuestsAction } from '../../../../redux/actions/questsAction';
import MyGProgressBar from '../../common/MyGProgressBar';
import Help from '../Help';

class Daily extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    help: false,
  }

  componentDidMount() {
    this.props.fetchDailyQuests();
  }

  collect = () => {
    if (!this.props.collectable || this.props.collected) return;
    this.props.redeemDailyQuests();
  }

  renderHeader = () => {
    if (this.props.collected) return null;
    return(
      <div className="header header-top">
      <div className="icon" style={{ backgroundImage: `url(${getAssetUrl('ic_achievements_clock')})` }}/>
      <div className="content">
        <span className="hint">Complete all Daily Quests</span>
        <div className="progress">
          <div className="progress-hint">
            <span className="completed">{this.props.completed}/</span>
            <span className="total">3</span>
          </div>
          <span className="progress-bar">
            <MyGProgressBar completed={this.props.collectable ? 100 : (this.props.completed / 3) * 100} />
          </span>
          <div className={`button ${(this.props.collectable && !this.props.collected) ? 'clickable' : 'opaque'}`} onClick={this.collect}>Collect 250xp</div>
        </div>
      </div>
    </div>
    );
  }

  renderQuests = () => {
    if (this.props.collected) return null;
    return this.props.quests.map(this.renderQuest);
  }

  renderQuest = ({ label, completed, total, progress, url }) => (
    <div className={`header header-row ${progress === 100 ? 'opaque' : ''}`}>
      <div className="content">
        <span className="hint">{label}</span>
        <div className="progress">
          <div className="progress-hint">
            <span className="completed">{completed}/</span>
            <span className="total">{total}</span>
          </div>
          <span className="progress-bar">
            <MyGProgressBar completed={progress} />
          </span>
          <div className="button clickable" onClick={() => window.router.push(url)}>Go to page</div>
        </div>
      </div>
    </div>
  )

  renderCompleted = () => {
    if (!this.props.collected) return null;
    return(
      <div className="completed-message">Epic! You've completed all your quests. Y'all come back tomorrow ya hear!</div>
    );
  }

  renderHelpButton = () => {
    return(
      <div className="help quests-help clickable" onClick={() => this.setState({ help: true })}>?</div>
    );
  }

  renderHelp = () => {
    if (!this.state.help) return;
    return <Help {...this.props} onClose={() => this.setState({ help: false })}/>;
  }

  render() {
    return(
      <div id="quests">
        {this.renderHelp()}
        {this.renderHelpButton()}
        {this.renderHeader()}
        {this.renderQuests()}
        {this.renderCompleted()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    quests: get(state, 'quests.daily.quests') || [],
    collected: get(state, 'quests.daily.collected') || false,
    collectable: get(state, 'quests.daily.collectable') || false,
    completed: get(state, 'quests.daily.completed') || 0,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDailyQuests: () => dispatch(fetchDailyQuestsAction()),
    redeemDailyQuests: () => dispatch(redeemDailyQuestsAction()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Daily)
