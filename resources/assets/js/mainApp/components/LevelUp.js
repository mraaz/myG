import React from 'react'
import { loadAnimation } from 'lottie-web'
import { connect } from 'react-redux'
import { checkedLevelAction } from '../../redux/actions/userAction'

class LevelUp extends React.Component {
  state = {
    leveledUp: false,
  }

  componentDidMount() {
    if (this.props.levelUpWhileOffline && !this.state.leveledUp) {
      this.setState({ leveledUp: true }, () =>
        this.loadLevelUpAnimation(`https://myg.gg/animations/lvl_up/myG_Level-up_${this.props.level}.json`)
      )
    }
  }

  componentDidUpdate(previous) {
    const hasLeveledUp = this.props.levelUpWhileOffline || (this.props.statsUpdatedFromWebsocket && this.props.level > previous.level)
    if (!hasLeveledUp || this.state.leveledUp) return
    this.setState({ leveledUp: true }, () =>
      this.loadLevelUpAnimation(`https://myg.gg/animations/lvl_up/myG_Level-up_${this.props.level}.json`)
    )
  }

  loadLevelUpAnimation = (path) => {
    loadAnimation({
      container: document.getElementById('level-up-content'),
      renderer: 'svg',
      loop: false,
      autoplay: true,
      path: path,
    })
  }

  render() {
    if (!this.state.leveledUp) return null
    return (
      <div id='level-up'>
        <div id='level-up-content' />
        <div
          className='next-button clickable'
          onClick={() => {
            this.props.checkedLevel().then(() => this.setState({ leveledUp: false }))
          }}>
          Nice!
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    levelUpWhileOffline: !!state.user.leveled_up_offline,
    statsUpdatedFromWebsocket: !!state.user.statsUpdatedFromWebsocket,
    level: (state.user.userTransactionStates || {}).user_level,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    checkedLevel: () => dispatch(checkedLevelAction()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LevelUp)
