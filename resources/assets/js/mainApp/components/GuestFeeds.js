import React, { Component, Fragment } from 'react'
import axios from 'axios'

import IndividualPost from './IndividualPost'
import IndividualSponsoredPost from './IndividualSponsoredPost'
import GuestBanner from './Guest/Banner'
import SignUpModal from './Guest/SignUpModal'
import GameExperiences from './Profile/GameExperiences/guest'
import MobileGameExperiences from './Profile/GameExperiences/mobile'

import { logToElasticsearch } from '../../integration/http/logger'

class GuestFeeds extends Component {
  constructor() {
    super()
    this.state = {
      counter: 0,
      myPosts: [],
      moreplease: true,
      post_submit_loading: false,
      showEvents: false,
      showModal: false
    }
  }

  componentDidMount() {
    document.title = 'myG - Home'

    window.scrollTo({ top: 500, behavior: 'smooth' })
    this.fetchMoreData()
    document.addEventListener('scroll', this.handleScroll, { passive: true })
    document.addEventListener('wheel', this.handleScroll, { passive: true })
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll, false)
    document.removeEventListener('wheel', this.handleScroll, false)
  }

  showLatestPosts = () => {
    const { myPosts = [] } = this.state
    return myPosts.map(this.showthis_Post)
  }

  handleScroll = () => {
    if (!document.getElementById('posts')) return
    const windowHeight = window.innerHeight
    const container = document.getElementById('posts')
    const containerHeight = container.offsetHeight
    const containerPosition = container.getBoundingClientRect()
    const containerOffset = containerPosition.y
    const needsMoreData = windowHeight - (containerHeight + containerOffset) > 0
    if (needsMoreData && this.state.moreplease && !this.state.fetching) {
      const { counter = 1 } = this.state
      this.setState({ counter: counter + 1 }, () => {
        this.fetchMoreData()
      })
    }
  }

  showthis_Post = (item, index) => {
    if (item == null) return
    const { sponsored_post = false } = item
    if (sponsored_post) {
      return (
        <IndividualSponsoredPost
          refreshme={this.props.refreshme}
          handleGuestModal={this.handleGuestModal}
          guest
          post={item}
          key={index}
          source={'news_feed'}
        />
      )
    } else {
      return (
        <IndividualPost
          refreshme={this.props.refreshme}
          handleGuestModal={this.handleGuestModal}
          guest
          post={item}
          key={index}
          user={{}}
          source={'news_feed'}
        />
      )
    }
  }

  fetchMoreData = () => {
    if (this.state.myPosts.length > 0) {
      window.scrollTo(0, document.documentElement.offsetHeight - 1000)
    }
    const self = this

    const getPosts = async function () {
      try {
        const myPosts = await axios.post('/api/post/guest_feed', {
          counter: self.state.counter
        })

        if (myPosts.data == '' || myPosts.data == {} || (myPosts.data.myPosts && myPosts.data.myPosts.length == 0)) {
          self.setState({
            moreplease: false
          })
          return
        } else if (myPosts.data.myPosts.length < 5) {
          if (myPosts.data.myPosts[0].id == 1) {
            self.setState({
              myPosts: self.state.myPosts.concat(myPosts.data.myPosts),
              moreplease: false
            })
            return
          }
        }

        if (myPosts.data.myPosts) {
          self.setState({
            myPosts: self.state.myPosts.concat(myPosts.data.myPosts)
          })
        } else {
          self.setState({
            moreplease: false
          })
          return
        }
      } catch (error) {
        logToElasticsearch('error', 'Posts', 'Failed at myPosts' + ' ' + error)
      }
    }

    this.setState(
      {
        counter: this.state.counter + 1
      },
      () => {
        getPosts()
      }
    )
  }

  composeSuccess = async (data) => {
    this.setState(
      {
        post_submit_loading: true
      },
      () => {
        const { myPosts = [] } = this.state
        this.setState({
          myPosts: [...data.data.myPosts, ...myPosts],
          moreplease: data.data.myPosts.lastPage == 1 ? false : true,
          post_submit_loading: false
        })
      }
    )
  }

  handleGuestModal = () => {
    this.setState({ showModal: !this.state.showModal })
  }
  render() {
    const { myPosts = [], isFetching = false } = this.state
    return (
      <div className=' app-container home-page'>
        <section id='content-container'>
          <div id='post' className='guest-page active'>
            <div className='content-area'>
              <GuestBanner handleGuestModal={this.handleGuestModal} />
              {this.state.showModal && <SignUpModal handleGuestModal={this.handleGuestModal} />}
              <div id='profile'>
                <div className='desktopShow'>
                  <GameExperiences
                    guest={true}
                    userId={''}
                    selectedGame={''}
                    commendUser={this.commendUser}
                    deleteExperience={this.deleteExperience}
                    alias={this.props.alias}
                    profile={this.props.profile}
                    updateGame={this.props.updateGame}
                  />
                </div>
                <div className='mobileShow'>
                  <MobileGameExperiences
                    guest={true}
                    userId={''}
                    selectedGame={''}
                    commendUser={this.commendUser}
                    deleteExperience={this.deleteExperience}
                    alias={this.props.alias}
                    profile={this.props.profile}
                    updateGame={this.props.updateGame}
                  />
                </div>
              </div>
              {myPosts.length > 0 && (
                <section id='posts' className={isFetching ? '' : `active`}>
                  {this.showLatestPosts()}
                </section>
              )}
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default GuestFeeds
