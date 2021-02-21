import React from 'react';
import get from 'lodash.get';
import { connect } from 'react-redux';
import { ignoreFunctions } from '../../../../common/render'
import { getAssetUrl } from '../../../../common/assets';
import { fetchWeeklyQuestsAction, redeemWeeklyQuestsAction } from '../../../../redux/actions/questsAction';
import MyGProgressBar from '../../common/MyGProgressBar';

class Weekly extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  componentDidMount() {
    this.props.fetchWeeklyQuests();
  }

  collect = () => {
    if (!this.props.collectable || this.props.collected) return;
    this.props.redeemWeeklyQuests();
  }

  renderHeader = () => (
    <div className="header">
      <div className="icon" style={{ backgroundImage: `url(${getAssetUrl('ic_achievements_clock')})` }}/>
      <div className="content">
        <span className="hint">Complete 3 out of 7 Weekly Quests</span>
        <div className="progress">
          <div className="progress-hint">
            <span className="completed">{this.props.completed}/</span>
            <span className="total">3</span>
          </div>
          <span className="progress-bar">
            <MyGProgressBar completed={this.props.collectable ? 100 : (this.props.completed / 3) * 100} />
          </span>
          <div className={`button ${this.props.collectable ? 'clickable' : 'opaque'}`} onClick={this.collect}>Collect 250xp</div>
        </div>
      </div>
    </div>
  )

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

  render() {
    return(
      <div id="quests">
        {this.renderHeader()}
        {this.props.quests.map(this.renderQuest)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    quests: get(state, 'quests.weekly.quests') || [],
    collected: get(state, 'quests.weekly.collected') || false,
    collectable: get(state, 'quests.weekly.collectable') || false,
    completed: get(state, 'quests.weekly.completed') || 0,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchWeeklyQuests: () => dispatch(fetchWeeklyQuestsAction()),
    redeemWeeklyQuests: () => dispatch(redeemWeeklyQuestsAction()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Weekly)
