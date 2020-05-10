import React, { Component } from 'react'
import axios from 'axios'

export default class AnalyticsBox extends Component {
  state = {
    userTransactionStates: {},
    youMayKnowUser: [],
    counter: 1,
  }

  async componentDidMount() {
    const get_stats = await axios.get('/api/userStatTransaction/master_controller')
    const getGamers_you_might_know = await axios.post('/api/connections/gamers_you_might_know', { counter: 1 })
    const youMayKnowUser = getGamers_you_might_know.data.data
    this.setState({ userTransactionStates: { ...get_stats }, youMayKnowUser })
  }

  refreshSuggestedUser = async () => {
    const getGamers_you_might_know = await axios.post('/api/connections/gamers_you_might_know', { counter: 1 })
    const youMayKnowUser = getGamers_you_might_know.data.data
    this.setState({ youMayKnowUser, counter: this.state.counter + 1 })
  }

  handleUserSuggestion = (username) => {
    window.location.href = `/profile/${username}`
  }

  render() {
    const { userTransactionStates = {}, youMayKnowUser } = this.state
    const {
      connections = 0,
      last_month_connections = 0,
      followers = 0,
      last_month_followers = 0,
      games = 0,
      last_month_games = 0,
      likes = 0,
      last_month_likes = 0,
      commendations = 0,
      last_month_commendations = 0,
      user_level = 0,
      user_experience = '0',
      user_xp_negative_balance = 0,
      level_max_points = 0,
    } = userTransactionStates

    return (
      <section className='social'>
        <div className='social__content'>
          <div className='level-container'>
            <section className='level-container-img'>
              <div className={`circle-wrap ${user_xp_negative_balance ? 'yellow' : 'red'}`}>
                <div className='inside-circle-level'>Level</div>
                <div className='inside-circle-value'>{user_level}</div>
                {/* <div className='inside-circle-value'>{level_max_points}</div> */}
              </div>
            </section>
            <div className='ratings'>
              {/* <p className='social-box-text'>Avg Rating</p>
              <p className='social-box-count'>4.66/5</p>
              <p className='social-box-text review bottom-border'>{user_experience} reviews</p> */}
              <p className='social-box-text'>Experience Pts.</p>
              <p className='social-box-count'>{user_experience}</p>
            </div>
          </div>

          <div className='social-box'>
            <img
              src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/connection.png'
              className='social-box-img'
            />
            <p className='social-box-count'>{connections}</p>
            <p className='social-box-text'>connections</p>
            <p className='social-box-month'>Last month: {last_month_connections}</p>
          </div>

          <div className='social-box'>
            <img
              src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/follower.png'
              className='social-box-img'
            />
            <p className='social-box-count'>{followers}</p>
            <p className='social-box-text'>followers</p>
            <p className='social-box-month'>Last month: {last_month_followers}</p>
          </div>

          <div className='social-box'>
            <img
              src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/games.png'
              className='social-box-img'
            />
            <p className='social-box-count'>{games}</p>
            <p className='social-box-text'>games</p>
            <p className='social-box-month'>Last month: {last_month_games}</p>
          </div>

          <div className='social-box'>
            <img
              src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/games.png'
              className='social-box-img'
            />
            <p className='social-box-count'>{likes}</p>
            <p className='social-box-text'>likes</p>
            <p className='social-box-month'>Last month: {last_month_likes}</p>
          </div>

          <div className='social-box'>
            <img
              src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/reviews.png'
              className='social-box-img'
            />
            <p className='social-box-count'>{commendations}</p>
            <p className='social-box-text'>reviews</p>
            <p className='social-box-month'>Last month: {last_month_commendations}</p>
          </div>
        </div>

        {youMayKnowUser && youMayKnowUser.length > 0 && (
          <div className='suggestion'>
            <div className='suggestion-box-text'>
              <p className='suggestion-box-text'>connections</p>
              <h2 className='suggestion-box-head'>Suggestions</h2>
            </div>
            <div className='show__user__suggestion'>
              {youMayKnowUser.map((user) => {
                return (
                  <div className='suggestion-box' key={user.alias} onClick={(e) => this.handleUserSuggestion(user.alias)}>
                    <div className='suggestion-box-input'>{`@${user.alias}`}</div>
                    <div className='input-outer'>
                      <p className='input-outer-label'>level</p>
                      <p className='input-outer-count'>{user.level}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className='suggestions-box-reset' onClick={(e) => this.refreshSuggestedUser()}>
              <img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/reset.png' className='' />
            </div>
          </div>
        )}
      </section>
    )
  }
}
