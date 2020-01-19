import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import ScheduledGamePost from './ScheduledGamePost'
import InfiniteScroll from 'react-infinite-scroll-component'

export default class MyScheduledGames extends Component {
  constructor() {
    super()
    this.state = {
      counter: 0,
      moreplease: true,
      isChecked: true,
      myScheduledGames: [],
    }
  }

  componentDidMount() {
    this.pullData()
  }

  showLatestPosts = () => {
    if (this.state.myScheduledGames != undefined) {
      return this.state.myScheduledGames.map((item, index) => {
        return <ScheduledGamePost schedule_game={item} key={index} user={this.props.initialData} />
      })
    }
  }

  pullData = async () => {
    this.state.counter = this.state.counter + 1

    if (this.state.counter != 1) {
      this.setState({
        show_top_btn: true,
      })
    }
    try {
      const myScheduledGames = await axios.get(`/api/myScheduledGames/${this.state.counter}/${this.state.isChecked}`)

      if (myScheduledGames.data.myScheduledGames.data.length == 0) {
        this.setState({
          moreplease: false,
        })
        return
      }

      this.setState({
        myScheduledGames: this.state.myScheduledGames.concat(myScheduledGames.data.myScheduledGames.data),
      })
    } catch (error) {
      console.log(error)
    }
  }

  toggleChange = () => {
    this.setState(
      {
        isChecked: !this.state.isChecked,
        counter: 0,
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
              <input type='checkbox' defaultChecked={this.state.isChecked} onChange={this.toggleChange} />
              &nbsp;Exclude Expired Games?
            </div>
            <div className='da-gap'></div>
            <InfiniteScroll dataLength={this.state.myScheduledGames.length} next={this.pullData} hasMore={this.state.moreplease}>
              {this.showLatestPosts()}
            </InfiniteScroll>
          </div>
        </section>
      )
    } else {
      return <div className='content-area scheduleGames-page'>Loading</div>
    }
  }
}
