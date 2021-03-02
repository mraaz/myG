import React from 'react'
import { connect } from 'react-redux'
import Progress from './common/ProgressCircle/progress'
import { fetchStatsAction } from '../../redux/actions/userAction'

class AnalyticsBox extends React.Component {
  state = {
    counter: 1,
    loading: true,
  }

  async componentDidMount() {
    const hasStats = Object.keys(this.props.userTransactionStates).length
    const shouldFetchStats = !this.props.isStatsForCurrentUser || parseInt(hasStats) < 10;
    if (shouldFetchStats) await this.props.fetchStats(this.props.alias)
    this.setState({ loading: false })
  }

  renderLevel = () => {
    const {
      user_level = 0,
      user_experience = 0,
      start_of_level_xp = 0,
      user_xp_negative_balance = 0,
      level_max_points = 0,
    } = this.props.userTransactionStates

    const progress = Math.floor(((user_experience - start_of_level_xp) / level_max_points) * 100)
    return (
      <div className='level-container'>
        <section className='level-container-img'>
          <Progress
            className={`circle-wrap`}
            borderColor={`${user_xp_negative_balance == 1 ? '#d70f46' : '#E5C746'}`}
            progress={progress || 0}
            value={user_level}
            subtitle={'Level'}
            reduction={0}
            hideBall
            strokeWidth={8}
            background={'#fff'}
          />
          <div className='ratings'>
            <p className='social-box-text'>Experience Pts.</p>
            <p className='social-box-count'>{user_experience}</p>
          </div>
        </section>
      </div>
    )
  }

  renderConnections = () => {
    const { connections = 0, last_month_connections = 0 } = this.props.userTransactionStates
    return (
      <div className='social-box'>
        <img src='https://cdn.myG.gg/platform_images/Dashboard/btn_Network.svg' className='social-box-img' />
        <p className='social-box-count'>{connections}</p>
        <p className='social-box-text'>connections</p>
        <p className='social-box-month'>Last month: {last_month_connections}</p>
      </div>
    )
  }

  renderFollowers = () => {
    if (this.props.onlyConnections) return null
    const { followers = 0, last_month_followers = 0 } = this.props.userTransactionStates
    return (
      <div className='social-box'>
        <img src='https://cdn.myG.gg/platform_images/Dashboard/btn_followers.svg' className='social-box-img' />
        <p className='social-box-count'>{followers}</p>
        <p className='social-box-text'>followers</p>
        <p className='social-box-month'>Last month: {last_month_followers}</p>
      </div>
    )
  }

  renderGames = () => {
    if (this.props.onlyConnections) return null
    const { games = 0, last_month_games = 0 } = this.props.userTransactionStates
    return (
      <div className='social-box'>
        <img src='https://cdn.myG.gg/platform_images/Dashboard/btn_games.svg' className='social-box-img' />
        <p className='social-box-count'>{games}</p>
        <p className='social-box-text'>games</p>
        <p className='social-box-month'>Last month: {last_month_games}</p>
      </div>
    )
  }

  renderLikes = () => {
    if (this.props.onlyConnections) return null
    const { likes = 0, last_month_likes = 0 } = this.props.userTransactionStates
    return (
      <div className='social-box'>
        <img src='https://cdn.myG.gg/platform_images/Dashboard/Header_btn_likes.svg' className='social-box-img' />
        <p className='social-box-count'>{likes}</p>
        <p className='social-box-text'>likes</p>
        <p className='social-box-month'>Last month: {last_month_likes}</p>
      </div>
    )
  }

  renderReviews = () => {
    if (this.props.onlyConnections) return null
    const { commendations = 0, last_month_commendations = 0 } = this.props.userTransactionStates
    return (
      <div className='social-box'>
        <img src='https://cdn.myG.gg/platform_images/Dashboard/btn_reviews.svg' className='social-box-img' />
        <p className='social-box-count'>{commendations}</p>
        <p className='social-box-text'>reviews</p>
        <p className='social-box-month'>Last month: {last_month_commendations}</p>
      </div>
    )
  }

  render() {
    if (this.state.loading) {
      return <div />
    }

    return (
      <section
        className={`social-main ${this.props.containerStyle ? this.props.containerStyle : ''}`}
        onClick={(event) => event.stopPropagation()}>
        <div className='social-content'>
          {this.renderLevel()}
          {this.renderConnections()}
          {this.renderFollowers()}
          {this.renderGames()}
          {this.renderLikes()}
          {this.renderReviews()}
        </div>
      </section>
    )
  }
}

function mapStateToProps(state, props) {
  const isStatsForCurrentUser = !props.alias || props.alias === state.user.alias
  const statsForCurrentUser = state.user.userTransactionStates || {} || {}
  const statsForOtherUser = (state.user.statsForAlias || {})[props.alias] || {}
  const userTransactionStates = isStatsForCurrentUser ? statsForCurrentUser : statsForOtherUser
  return { isStatsForCurrentUser, userTransactionStates }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchStats: (alias) => dispatch(fetchStatsAction(alias)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsBox)
