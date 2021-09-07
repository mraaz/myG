import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import IndividualPost from './IndividualPost'
import IndividualSponsoredPost from './IndividualSponsoredPost'
import ComposeSection from './ComposeSection_v2'
import GamerSuggestions from './Profile/GamerSuggestions'
import Channel from './Channel'
import Events from './Events/main'
import Games from './Games'
import MobileGames from './Games/mobile'
import notifyToast from '../../common/toast'

import { logToElasticsearch } from '../../integration/http/logger'

class Posts extends Component {
  constructor() {
    super()
    this.state = {
      counter: 0,
      myPosts: [],
      moreplease: true,
      post_submit_loading: false,
      showEvents: false
    }
  }

  componentDidMount() {
    document.title = 'myG - Home'

    window.scrollTo({
      top: 500,
      behavior: 'smooth'
    })
    //window.history.pushState('myG', 'myG', '/')
    const selectedGame = window.localStorage.getItem('selectedGame')
    if (selectedGame == null) {
      this.fetchMoreData()
    } else {
      this.gameClicked()
    }
  }

  showLatestPosts = () => {
    const { myPosts = [] } = this.state
    return myPosts.map(this.showthis_Post)
  }

  showthis_Post = (item, index) => {
    if (item == null) return
    const { sponsored_post = false } = item
    if (sponsored_post) {
      return <IndividualSponsoredPost post={item} key={index} source={'news_feed'} />
    } else {
      return <IndividualPost post={item} key={index} user={this.props.initialData.userInfo} source={'news_feed'} />
    }
  }

  fetchMoreData = () => {
    // if (this.state.myPosts.length > 0) {
    //   // window.scrollTo(0, document.documentElement.offsetHeight - 4000)
    // }
    const self = this

    const getPosts = async function () {
      try {
        const myPosts = await axios({
          method: 'GET',
          url: `/api/post/${self.state.counter}`
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

  gameClicked = (id = '', game_name = '') => {
    const selectedGame = window.localStorage.getItem('selectedGame')

    this.setState(
      {
        counter: 1,
        myPosts: []
      },
      async () => {
        if (id) {
          if (selectedGame == null) {
            const d = []
            d.push(id)
            window.localStorage.setItem('selectedGame', JSON.stringify(d))
          } else {
            const p = JSON.parse(selectedGame)
            if (!p.includes(id)) {
              p.push(id)
              window.localStorage.setItem('selectedGame', JSON.stringify(p))
              notifyToast(`Got it! ${game_name} selected`)
            } else {
              const d = p.filter((item) => item != id)
              window.localStorage.setItem('selectedGame', JSON.stringify(d))
            }
          }
        }
        const data = window.localStorage.getItem('selectedGame')
        const gamePayload = typeof data == 'string' ? JSON.parse(data) : data
        if (!gamePayload.length) {
          this.setState(
            {
              counter: 0
            },
            () => {
              this.fetchMoreData()
            }
          )
          return
        }
        try {
          const myPosts = await axios.post('/api/post/guest_feed', {
            counter: 1,
            game_names_ids: JSON.stringify(gamePayload)
          })
          if (myPosts.data == '' || myPosts.data == {}) {
            this.setState({
              moreplease: false
            })
            return
          }
          if (myPosts.data.myPosts) {
            this.setState({
              myPosts: [...myPosts.data.myPosts]
            })
          } else {
            this.setState({
              moreplease: false
            })
            return
          }
        } catch (error) {
          logToElasticsearch('error', 'Posts', 'Failed at myPosts' + ' ' + error)
        }
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

  render() {
    const { myPosts = [], moreplease, isFetching = false, post_submit_loading = false } = this.state
    const sg = window.localStorage.getItem('selectedGame')
    return (
      <Fragment>
        {post_submit_loading && (
          <div className='timeline-item'>
            <div className='animated-background'>
              <div className='background-masker header-top'></div>
              <div className='background-masker header-left'></div>
              <div className='background-masker header-right'></div>
              <div className='background-masker header-bottom'></div>
              <div className='background-masker subheader-left'></div>
              <div className='background-masker subheader-right'></div>
              <div className='background-masker subheader-bottom'></div>
              <div className='background-masker content-top'></div>
              <div className='background-masker content-first-end'></div>
              <div className='background-masker content-second-line'></div>
              <div className='background-masker content-second-end'></div>
              <div className='background-masker content-third-line'></div>
              <div className='background-masker content-third-end'></div>
            </div>
          </div>
        )}
        <GamerSuggestions />
        {!!this.props.mainChannelEnabled && <Channel channelId='main' />}
        {this.state.showEvents && <Events props={this.props} />}
        <ComposeSection
          successCallback={this.composeSuccess}
          initialData={this.props.initialData == undefined ? 'loading' : this.props.initialData}
        />
        <div id='profile'>
          <div className='desktopShow'>
            <Games
              userId={this.props.userId}
              selectedGame={sg ? JSON.parse(sg) : []}
              alias={this.props.alias}
              handleGameClick={this.gameClicked}
            />
          </div>
          <div className='mobileShow'>
            <MobileGames
              userId={this.props.userId}
              selectedGame={sg ? JSON.parse(sg) : []}
              alias={this.props.alias}
              handleGameClick={this.gameClicked}
            />
          </div>
        </div>
        {myPosts.length > 0 && !post_submit_loading && (
          <section id='posts' className={isFetching ? '' : `active`}>
            <InfiniteScroll dataLength={myPosts.length} next={this.fetchMoreData} hasMore={moreplease}>
              {this.showLatestPosts()}
            </InfiniteScroll>
          </section>
        )}
      </Fragment>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    mainChannelEnabled: state.user.mainChannelEnabled
  }
}

export default connect(mapStateToProps)(Posts)
