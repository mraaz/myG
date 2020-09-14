/*
 * Author : nitin Tyagi
 * github  : https://github.com/realinit
 * Email : nitin.1992tyagi@gmail.com
 */
import React, { Component } from 'react'
import axios from 'axios'
import Progress from './common/ProgressCircle/progress'

export default class AnalyticsBox extends Component {
  state = {
    userTransactionStates: {},
    counter: 1,
  }

  async componentDidMount() {
    const get_stats = await axios.get('/api/userStatTransaction/master_controller')
    this.setState({ userTransactionStates: { ...get_stats.data } })
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

    const progress = Math.floor((user_experience / level_max_points) * 100)

    return (
      <section className={`social-main ${this.props.containerStyle ? this.props.containerStyle : ''}`}>
        <div className='social-content'>
          <div className='level-container'>
            <section className='level-container-img'>
              {/* <div className={`circle-wrap ${user_xp_negative_balance ? 'red' : 'yellow'}`}>
                <div className='inside-circle-level'>Level</div>
                <div className='inside-circle-value'>{user_level}</div>
               <div className='inside-circle-value'>{level_max_points}</div>
              </div> */}
              <Progress
                className={`circle-wrap`}
                borderColor={`${user_xp_negative_balance ? '#d70f46' : '#E5C746'}`}
                progress={progress || 0}
                value={user_level}
                subtitle={'Level'}
                reduction={0}
                hideBall
                strokeWidth={8}
                background={'#ffffff'}
              />
              <div className='ratings'>
                {/* <p className='social-box-text'>Avg Rating</p>
              <p className='social-box-count'>4.66/5</p>
              <p className='social-box-text review bottom-border'>{user_experience} reviews</p> */}
                <p className='social-box-text'>Experience Pts.</p>
                <p className='social-box-count'>{user_experience}</p>
              </div>
            </section>
          </div>

          <div className='social-box'>
            <img src='https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/btn_Network.svg' className='social-box-img' />
            <p className='social-box-count'>{connections}</p>
            <p className='social-box-text'>connections</p>
            <p className='social-box-month'>Last month: {last_month_connections}</p>
          </div>

          <div className='social-box'>
            <img src='https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/btn_followers.svg' className='social-box-img' />
            <p className='social-box-count'>{followers}</p>
            <p className='social-box-text'>followers</p>
            <p className='social-box-month'>Last month: {last_month_followers}</p>
          </div>

          <div className='social-box'>
            <img src='https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/btn_games.svg' className='social-box-img' />
            <p className='social-box-count'>{games}</p>
            <p className='social-box-text'>games</p>
            <p className='social-box-month'>Last month: {last_month_games}</p>
          </div>

          <div className='social-box'>
            <img src='https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/Header_btn_likes.svg' className='social-box-img' />
            <p className='social-box-count'>{likes}</p>
            <p className='social-box-text'>likes</p>
            <p className='social-box-month'>Last month: {last_month_likes}</p>
          </div>

          <div className='social-box'>
            <img src='https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/btn_reviews.svg' className='social-box-img' />
            <p className='social-box-count'>{commendations}</p>
            <p className='social-box-text'>reviews</p>
            <p className='social-box-month'>Last month: {last_month_commendations}</p>
          </div>
        </div>
      </section>
    )
  }
}
