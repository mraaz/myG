import React from 'react';
import { connect } from 'react-redux';
import { ignoreFunctions } from '../../../../common/render'
import { getAssetUrl } from '../../../../common/assets';
import MyGProgressBar from '../../common/MyGProgressBar';

class Daily extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  collect = () => {
    console.log('collect');
  }

  renderHeader = () => (
    <div className="header">
      <div className="icon" style={{ backgroundImage: `url(${getAssetUrl('ic_achievements_clock')})` }}/>
      <div className="content">
        <span className="hint">Complete 3 out of 6 Daily Quests</span>
        <div className="progress">
          <div className="progress-hint">
            <span className="completed">1/</span>
            <span className="total">3</span>
          </div>
          <span className="progress-bar">
            <MyGProgressBar completed={85} />
          </span>
          <div className="button clickable" onClick={this.collect}>Collect 250xp</div>
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
        {this.renderQuest({ label: 'Add new Friends', completed: 1, total: 2, progress: 50, url: '/find-gamers/search' })}
        {this.renderQuest({ label: 'Give Likes', completed: 14, total: 35, progress: 63, url: '/find-gamers/search' })}
        {this.renderQuest({ label: 'Completed', completed: 1, total: 1, progress: 100, url: '/find-gamers/search' })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    
  }
}

function mapDispatchToProps(dispatch) {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Daily)

