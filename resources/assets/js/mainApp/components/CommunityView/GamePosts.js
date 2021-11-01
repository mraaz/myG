import React, { Component, Fragment } from 'react'
import axios from 'axios'
import Group_IndividualPost from './Group_IndividualPost'
import ComposeSection from '../ComposeSection_v2'

import { logToElasticsearch } from '../../../integration/http/logger'
// import TableComponent from '../common/TableComponent'
import TableComponent from '../common/TableComponent/table'

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
      clanTagDataFetching: false,
      clanTagData: ''
    }
  }

  componentDidMount() {
    window.scrollTo({ top: 500, behavior: 'smooth' })
    this.fetchMoreData()
    // this.getClanTagGameData()
    document.addEventListener('scroll', this.handleScroll, { passive: true })
    document.addEventListener('wheel', this.handleScroll, { passive: true })
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll, false)
    document.removeEventListener('wheel', this.handleScroll, false)
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

  showLatestPosts = () => {
    const { myPosts = [] } = this.state
    if (myPosts.length > 0) {
      return myPosts.map((item, index) => {
        try {
          item.media_url.length > 0 ? JSON.parse(item.media_url) : ''
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

  getClanTagGameData = () => {
    const getData = async () => {
      try {
        this.setState({
          clanTagDataFetching: true
        })
        const clanTag = this.props.stats_header
        const response = await axios.get(`/api/clashroyale/show/${clanTag}`)
        console.log(response)
        this.setState({
          clanTagDataFetching: false,
          clanTagData: response.data ? response.data : ''
        })
      } catch (error) {
        logToElasticsearch('error', 'Clan Tag Game Stats', 'Failed at Clan Tag Game Stats' + ' ' + error)
        this.setState({
          clanTagDataFetching: false,
          clanTagData: data
        })
      }
    }
    getData()
  }

  fetchMoreData = () => {
    const getPosts = async () => {
      try {
        const myPosts = await axios.post('/api/get_group_posts', {
          counter: this.state.counter,
          group_id: this.props.group_id,
          type: this.state.activeTab
        })
        if (myPosts.data.groupPosts.groupPosts.length == 0) {
          this.setState({
            moreplease: false,
            fetching: false
          })
          return
        }

        this.setState({
          myPosts: this.state.myPosts.concat(myPosts.data.groupPosts.groupPosts),
          fetching: false
        })
      } catch (error) {
        logToElasticsearch('error', 'Posts', 'Failed at myPosts' + ' ' + error)
      }
    }

    this.setState(
      {
        counter: this.state.counter + 1,
        fetching: true
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
        if (data.data && data.data.myPosts) {
          this.setState({
            myPosts: [...data.data.myPosts, ...myPosts],
            moreplease: data.data.myPosts.lastPage == 1 ? false : true,
            post_submit_loading: false
          })
        }
      }
    )
  }

  handleTabOption = (activeTab) => {
    this.setState({ activeTab, counter: 1 }, async () => {
      if( activeTab== "Stats"){
        this.getClanTagGameData()
        return 
      }
      const myPosts = await axios.post('/api/get_group_posts', {
        counter: this.state.counter,
        group_id: this.props.group_id,
        type: this.state.activeTab
      })

      this.setState({
        myPosts: []
      })

      if (myPosts.data.groupPosts.groupPosts.length == 0) return

      this.setState({
        myPosts: [...myPosts.data.groupPosts.groupPosts]
      })
    })
    if (activeTab == 'Stats') {
      this.getClanTagGameData()
    }
  }

  render() {
    const {
      myPosts = [],
      moreplease,
      isFetching = false,
      post_submit_loading = false,
      activeTab,
      clanTagDataFetching = false,
      clanTagData = ''
    } = this.state
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
          <span className={activeTab == 'Stats' ? 'active' : ''} onClick={(e) => this.handleTabOption('Stats')}>
            Stats
          </span>
        </div>
        {[0, 1, 2, 3].includes(this.props.current_user_permission) && activeTab !== 'Stats' && (
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
        <hr />
        {myPosts.length > 0 && !post_submit_loading && activeTab !== 'Stats' && (
          <section id='posts' className={isFetching ? '' : `active`}>
            {this.showLatestPosts()}
          </section>
        )}
        {activeTab === 'Stats' && clanTagData && !clanTagDataFetching && (
          <section className={` stats_section_main ${clanTagDataFetching ? '' : 'active'}`}>
            <div className='stats_section__container'>
              <TableComponent data={clanTagData} />
            </div>
          </section>
        )}
        {activeTab === 'Stats' && !clanTagData && clanTagDataFetching && (
          <section className={`stats_section_main ${!clanTagDataFetching ? '' : 'active'}`}>
            <div className='stats_section__container table__loader'>
              <table>
                <tbody>
                  <tr>
                    <td class='td-1'>
                      <span></span>
                    </td>
                    <td class='td-2'>
                      <span></span>
                    </td>
                    <td class='td-3'>
                      <span></span>
                    </td>
                    <td class='td-4'></td>
                    <td class='td-5'>
                      <span></span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}
      </Fragment>
    )
  }
}
