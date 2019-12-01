import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import ScheduledGamePost from './ScheduledGamePost'

export default class MyScheduledGames extends Component {
  constructor() {
    super()
    this.state = {
      db_row_counter: 0,
      show_prev: false,
      show_more: false,
      isChecked: true,
    }
  }

  componentWillMount() {
    this.fetchMoreData()
  }

  fetchMoreData = () => {
    this.setState(
      {
        db_row_counter: this.state.db_row_counter + 1,
      },
      () => {
        this.pullData()
        if (this.state.db_row_counter > 1) {
          this.setState({ show_prev: true })
        }
      }
    )
  }

  fetchPrevData = () => {
    this.setState(
      {
        db_row_counter: this.state.db_row_counter - 1,
      },
      () => {
        this.pullData()
        if (this.state.db_row_counter < 2) {
          this.setState({ show_prev: false })
        }
      }
    )
  }

  showLatestPosts = () => {
    if (this.state.myScheduledGames != undefined) {
      return this.state.myScheduledGames.map((item, index) => {
        return (
          <ScheduledGamePost
            schedule_game={item}
            key={index}
            user={this.props.initialData}
          />
        )
      })
    }
  }

  async pullData() {
    try {
      //BUG: Without this, it keeps old posts. not sure why, so doing a hard reset, as a added bonus, it scrolls up to the top. for some reason window.scollTo isn't working
      this.setState({
        myScheduledGames: [],
      })
      const myScheduledGames = await axios.get(
        `/api/myScheduledGames/${this.state.db_row_counter}/${this.state.isChecked}`
      )
      if (myScheduledGames.data.myScheduledGames.data.length > 10) {
        this.setState({
          show_more: true,
        })
        myScheduledGames.data.myScheduledGames.data.pop()
      } else {
        this.setState({
          show_more: false,
        })
      }
      this.setState({
        myScheduledGames: myScheduledGames.data.myScheduledGames.data,
      })
    } catch (error) {
      console.log(error)
    }
  }

  toggleChange = () => {
    this.setState(
      {
        isChecked: !this.state.isChecked,
        db_row_counter: 1,
      },
      () => {
        this.pullData()
      }
    )
  }

  render() {
    if (this.state.myScheduledGames !== undefined) {
      return (
        <section id='posts'>
          <div className='content-area scheduleGames-page'>
            <div id='header-2'>
              <img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/headers/headers_v1-19.png' />
            </div>
            <div className='full-game'>
              <input
                type='checkbox'
                defaultChecked={this.state.isChecked}
                onChange={this.toggleChange}
              />
              &nbsp;Exclude Expired Games?
            </div>
            <div className='da-gap'></div>
            {this.showLatestPosts()}
            {this.state.show_prev && (
              <div className='prev_pls' onClick={this.fetchPrevData}>
                {'<'}- Previous
              </div>
            )}
            {this.state.show_more && (
              <div className='more_pls' onClick={this.fetchMoreData}>
                Next ->
              </div>
            )}
          </div>
        </section>
      )
    } else {
      return <div className='content-area scheduleGames-page'>Loading</div>
    }
  }
}
