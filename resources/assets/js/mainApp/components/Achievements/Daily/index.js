import React from 'react';
import get from 'lodash.get';
import { connect } from 'react-redux';
import { ignoreFunctions } from '../../../../common/render'
import { getAssetUrl } from '../../../../common/assets';
import { fetchDailyQuestsAction, redeemDailyQuestsAction } from '../../../../redux/actions/questsAction';
import MyGProgressBar from '../../common/MyGProgressBar';

class Daily extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
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
      <div className="header">
      <div className="icon" style={{ backgroundImage: `url(${getAssetUrl('ic_achievements_clock')})` }}/>
      <div className="content">
        <span className="hint">Complete 3 out of 6 Daily Quests</span>
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

  render() {
    return(
      <div id="quests">
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
