import React, { Component, Fragment } from 'react'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import Group_IndividualPost from './Group_IndividualPost'
import ComposeSection from '../ComposeSection_v2'
import { DraftCompose } from '../DraftCompose/DraftCompose'

import { logToElasticsearch } from '../../../integration/http/logger'

export default class Posts extends Component {
  constructor() {
    super()
    this.state = {
      counter: 0,
      myPosts: [],
      moreplease: true,
      post_submit_loading: false,
      activeTab: 'All',
      fetching: false,
    }
    this.scrollRef = React.createRef()
  }

  componentDidMount() {
    window.scrollTo({
      top: 500,
      behavior: 'smooth',
    })
    this.fetchMoreData()
  }

  showLatestPosts = () => {
    const { myPosts = [] } = this.state
    if (myPosts.length > 0) {
      return myPosts.map((item, index) => {
        try {
          let media_url = item.media_url.length > 0 ? JSON.parse(item.media_url) : ''
        } catch (e) {
          item.media_url = ''
        }
        return (
          <Group_IndividualPost
            current_user_permission={this.props.current_user_permission}
            post={item}
            key={index}
            user={this.props.initialData}
            source={'news_feed'}
          />
        )
      })
    }
  }

  fetchMoreData = () => {
    if (this.state.myPosts.length > 0) {
      window.scrollTo(0, document.documentElement.offsetHeight - 4000)
    }

    const getPosts = async () => {
      try {
        const myPosts = await axios.post('/api/get_group_posts', {
          counter: this.state.counter,
          group_id: this.props.group_id,
          type: this.state.activeTab,
        })
        if (myPosts.data.groupPosts.groupPosts.length == 0) {
          this.setState({
            moreplease: false,
            fetching: false,
          })
          return
        }

        this.setState({
          myPosts: this.state.myPosts.concat(myPosts.data.groupPosts.groupPosts),
          fetching: false,
        })
      } catch (error) {
        logToElasticsearch('error', 'Posts', 'Failed at myPosts' + ' ' + error)
      }
    }

    var myCounter = this.state.counter
    this.setState(
      {
        counter: this.state.counter + 1,
        fetching: true,
      },
      () => {
        getPosts()
      }
    )
  }

  composeSuccess = async (data) => {
    this.setState(
      {
        post_submit_loading: true,
      },
      () => {
        const { myPosts = [] } = this.state
        if (data.data && data.data.myPosts) {
          this.setState({
            myPosts: [...data.data.myPosts, ...myPosts],
            moreplease: data.data.myPosts.lastPage == 1 ? false : true,
            post_submit_loading: false,
          })
        }
      }
    )
  }

  handleTabOption = (activeTab) => {
    this.setState({ activeTab, counter: 1 }, async () => {
      const myPosts = await axios.post('/api/get_group_posts', {
        counter: this.state.counter,
        group_id: this.props.group_id,
        type: this.state.activeTab,
      })
      if (myPosts.data.groupPosts.groupPosts.length == 0) {
        this.setState({
          myPosts: [],
        })
        return
      }

      this.setState({
        myPosts: [...myPosts.data.groupPosts.groupPosts],
      })
    })
  }

  handleScroll = (event) => {
    const _event = event.currentTarget,
      _current = this.scrollRef.current
    if (_event.scrollTop + (3 / 2) * _current.offsetHeight > _event.scrollHeight && this.state.moreplease && !this.state.fetching) {
      const { counter = 1 } = this.state
      this.setState({ counter: counter + 1 }, () => {
        this.fetchMoreData()
      })
    }
  }

  render() {
    const { myPosts = [], moreplease, isFetching = false, post_submit_loading = false, activeTab } = this.state
    return (
      <Fragment>
        <div className='gamePost__tab'>
          <span className={activeTab == 'All' ? 'active' : ''} onClick={(e) => this.handleTabOption('All')}>
            All
          </span>
          <span className={activeTab == 'Recents' ? 'active' : ''} onClick={(e) => this.handleTabOption('Recents')}>
            Recent
          </span>
          <span className={activeTab == 'Featured' ? 'active' : ''} onClick={(e) => this.handleTabOption('Featured')}>
            Featured
          </span>
        </div>
        {[0, 1, 2, 3].includes(this.props.current_user_permission) && (
          <Fragment>
          <ComposeSection
            successCallback={this.composeSuccess}
            initialData={this.props.initialData == undefined ? 'loading' : this.props.initialData}
            communityBox={true}
            group_id={this.props.group_id}
          />
          </Fragment>
        )}
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
        <h1>Draft Box below</h1>
        <hr />
        {/* <DraftCompose></DraftCompose> */}
        <hr />
        {myPosts.length > 0 && !post_submit_loading && (
          <section id='posts' className={isFetching ? '' : `active`}>
            <div className='GroupMember__post__list' onScroll={this.handleScroll} ref={this.scrollRef}>
              {/* <InfiniteScroll dataLength={myPosts.length} next={this.fetchMoreData} hasMore={moreplease}> */}
              {this.showLatestPosts()}
              {/* </InfiniteScroll> */}
            </div>
          </section>
        )}
      </Fragment>
    )
  }
}
