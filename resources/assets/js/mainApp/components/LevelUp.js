import React from 'react'
import { loadAnimation } from 'lottie-web'
import { connect } from 'react-redux'

class LevelUp extends React.Component {
  state = {
    leveledUp: false,
  }

  componentDidUpdate(previous) {
    const hasLeveledUp = this.props.level > previous.level
    if (!hasLeveledUp) return
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
        <div className='next-button clickable' onClick={() => this.setState({ leveledUp: false })}>
          Nice!
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    level: (state.user.userTransactionStates || {}).user_level,
  }
}

export default connect(mapStateToProps)(LevelUp)
