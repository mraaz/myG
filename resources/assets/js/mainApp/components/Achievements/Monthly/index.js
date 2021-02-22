import React from 'react';
import get from 'lodash.get';
import { connect } from 'react-redux';
import { ignoreFunctions } from '../../../../common/render'
import { getAssetUrl } from '../../../../common/assets';
import { fetchMonthlyQuestsAction, redeemMonthlyQuestsAction } from '../../../../redux/actions/questsAction';
import MyGProgressBar from '../../common/MyGProgressBar';
import Help from '../Help';

class Monthly extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }
  
  state = {
    help: false,
  }

  componentDidMount() {
    this.props.fetchMonthlyQuests();
  }

  collect = () => {
    if (!this.props.collectable || this.props.collected) return;
    this.props.redeemMonthlyQuests();
  }

  renderHeader = () => {
    if (this.props.collected) return null;
    return(
      <div className="header">
        <div className="icon" style={{ backgroundImage: `url(${getAssetUrl('ic_achievements_clock')})` }}/>
        <div className="content">
          <span className="hint">Complete 3 out of 7 Monthly Quests</span>
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

  renderQuests = () => {
    if (this.props.collected) return null;
    return this.props.quests.map(this.renderQuest);
  }

  renderCompleted = () => {
    if (!this.props.collected) return null;
    return(
      <div className="completed-message">Epic! You've completed all your quests. Roger roger, I'll be back first thing next month...</div>
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
    quests: get(state, 'quests.monthly.quests') || [],
    collected: get(state, 'quests.monthly.collected') || false,
    collectable: get(state, 'quests.monthly.collectable') || false,
    completed: get(state, 'quests.monthly.completed') || 0,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchMonthlyQuests: () => dispatch(fetchMonthlyQuestsAction()),
    redeemMonthlyQuests: () => dispatch(redeemMonthlyQuestsAction()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Monthly)
