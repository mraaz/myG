import React, { Component } from 'react'
import axios from 'axios'

export default class AnalyticsBox extends Component {
  state = {
    userTransactionStates: {},
  }

  async componentDidMount() {
    const get_stats = await axios.get('/api/userStatTransaction/master_controller')
    this.setState({ userTransactionStates: { ...get_stats } })
  }

  render() {
    const { userTransactionStates = {} } = this.state
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
      <section class='social'>
        <div class='social__content'>
          <div class='level-container'>
            <section class='level-container-img'>
              <div class='circle-wrap'>
                <div class='circle'>
                  <div class='mask full'>
                    <div class='fill'></div>
                  </div>
                  <div class='mask half'>
                    <div class='fill'></div>
                  </div>
                  <div class='inside-circle'>
                    <span class='inside-circle-level'>level</span>
                    <br />
                    <span class='inside-circle-value'>{user_level}</span>
                  </div>
                </div>
              </div>
            </section>
            <div class='ratings'>
              {/* <p class='social-box-text'>Avg Rating</p>
              <p class='social-box-count'>4.66/5</p>
              <p class='social-box-text review bottom-border'>{user_experience} reviews</p> */}
              <p class='social-box-text'>Experience Pts.</p>
              <p class='social-box-count'>{user_experience}</p>
            </div>
          </div>

          <div class='social-box'>
            <img
              src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/connection.png'
              class='social-box-img'
            />
            <p class='social-box-count'>{connections}</p>
            <p class='social-box-text'>connections</p>
            <p class='social-box-month'>Last month: {last_month_connections}</p>
          </div>

          <div class='social-box'>
            <img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/follower.png' class='social-box-img' />
            <p class='social-box-count'>{followers}</p>
            <p class='social-box-text'>followers</p>
            <p class='social-box-month'>Last month: {last_month_followers}</p>
          </div>

          <div class='social-box'>
            <img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/games.png' class='social-box-img' />
            <p class='social-box-count'>{games}</p>
            <p class='social-box-text'>games</p>
            <p class='social-box-month'>Last month: {last_month_games}</p>
          </div>

          <div class='social-box'>
            <img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/games.png' class='social-box-img' />
            <p class='social-box-count'>{likes}</p>
            <p class='social-box-text'>likes</p>
            <p class='social-box-month'>Last month: {last_month_likes}</p>
          </div>

          <div class='social-box'>
            <img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/reviews.png' class='social-box-img' />
            <p class='social-box-count'>{commendations}</p>
            <p class='social-box-text'>reviews</p>
            <p class='social-box-month'>Last month: {last_month_commendations}</p>
          </div>
        </div>

        <div class='suggestion'>
          <div class='suggestion-box'>
            <p class='suggestion-box-text'>connections</p>
            <h2 class='suggestion-box-head'>Suggestions</h2>
          </div>

          <div class='suggestion-box'>
            <input type='text' value='@playerone' disabled class='suggestion-box-input' />
            <div class='input-outer'>
              <p class='input-outer-label'>level</p>
              <p class='input-outer-count'>99</p>
            </div>
          </div>

          <div class='suggestion-box'>
            <input type='text' value='@playeronetool' disabled class='suggestion-box-input' />
            <div class='input-outer'>
              <p class='input-outer-label'>level</p>
              <p class='input-outer-count'>99</p>
            </div>
          </div>

          <div class='suggestion-box'>
            <input type='text' value='@playerone' disabled class='suggestion-box-input' />
            <div class='input-outer'>
              <p class='input-outer-label'>level</p>
              <p class='input-outer-count'>99</p>
            </div>
          </div>

          <div class='suggestion-box'>
            <input type='text' value='@playeronetool' disabled class='suggestion-box-input' />
            <div class='input-outer'>
              <p class='input-outer-label'>level</p>
              <p class='input-outer-count'>99</p>
            </div>
          </div>

          <div class='suggestions-box-reset'>
            <a href='javascript:;' onClick={(e) => alert('API is not integrated.')}>
              <img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/reset.png' class='' />
            </a>
          </div>
        </div>
      </section>
    )
  }
}
