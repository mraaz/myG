import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Toast_style } from '../Utility_Function'
import YourCommunityBox from './YourCommunityBox'
import SuggestedCommunityBox from './SuggestedCommunitybox'

import { logToElasticsearch } from '../../../integration/http/logger'

export default class GroupMain extends Component {
  constructor() {
    super()
    this.state = {
      open_compose_textTab: true,
      isShowAllGroup: false,
      counter: 1,
      all_my_communities: [],
      more_data: true,
      less_data: false,
      all_my_suggested_communities: [],
      suggested_counter: 0,
      suggested_more_data: true,
      suggested_less_data: true,
    }
  }

  componentDidMount() {
    const self = this

    const getALLmyGroups = async function() {
      try {
        const getmyGroups = await axios.get('/api/groups/get_my_communities/1')

        self.setState({
          all_my_communities: getmyGroups.data.all_my_communities,
          total_number_of_communities: getmyGroups.data.total_number_of_communities,
        })
      } catch (error) {
        logToElasticsearch('error', 'List_Community', 'Failed getGroups in Mount' + ' ' + error)
      }
    }

    getALLmyGroups()
  }

  togglePostTypeTab = (label) => {
    let open_compose_textTab = true
    if (label == 'media') {
      this.next_data_suggested()
      open_compose_textTab = false
    }
    if (label == 'text') {
      setTimeout(function() {
        document.getElementById('composeTextarea').focus()
      }, 0)
    }
    this.setState({ open_compose_textTab, overlay_active: true })
  }

  toggleShowAllGroup = () => {
    this.setState({ isShowAllGroup: !this.state.isShowAllGroup })
  }

  showGroupCard = () => {
    const { all_my_communities = [] } = this.state
    if (all_my_communities.length > 0) {
      return all_my_communities.map((item, index) => {
        return <YourCommunityBox data={item} key={index} routeProps={this.props.routeProps} />
      })
    }
  }

  showSuggestedGroupCard = () => {
    const { all_my_suggested_communities = [] } = this.state
    if (all_my_suggested_communities.length > 0) {
      return all_my_suggested_communities.map((item, index) => {
        return <YourCommunityBox data={item} key={index} routeProps={this.props.routeProps} />
      })
    }
  }

  next_data_suggested = () => {
    const self = this

    const getALLmySuggestedGroups = async function() {
      try {
        const getALLmySuggestedGroups = await axios.post('/api/connections/communities_you_might_know', {
          counter: self.state.suggested_counter + 1,
        })

        if (getALLmySuggestedGroups.data.getCommunities.length == 0) {
          self.setState({
            suggested_more_data: false,
          })
          return
        }

        console.log(getALLmySuggestedGroups)
        self.setState({
          all_my_suggested_communities: getALLmySuggestedGroups.data.getCommunities,
          suggested_less_data: true,
        })
      } catch (error) {
        logToElasticsearch('error', 'List_Community', 'Failed at getALLmySuggestedGroups' + ' ' + error)
      }
    }

    getALLmySuggestedGroups()
  }

  next_data = () => {
    const self = this

    const getGroups = async function() {
      try {
        const getmyGroups = await axios.get(`/api/groups/get_my_communities/${self.state.counter}`)
        if (getmyGroups.data.all_my_communities.length == 0) {
          self.setState({
            more_data: false,
          })
          return
        }

        self.setState({
          all_my_communities: getmyGroups.data.all_my_communities,
          total_number_of_communities: getmyGroups.data.total_number_of_communities,
          less_data: true,
        })
      } catch (error) {
        logToElasticsearch('error', 'List_Community', 'Failed at getGroups' + ' ' + error)
      }
    }

    this.setState(
      {
        counter: this.state.counter + 1,
      },
      () => {
        getGroups()
      }
    )
  }

  prev_data = () => {
    const self = this

    const getGroups = async function() {
      try {
        const getmyGroups = await axios.get(`/api/groups/get_my_communities/${self.state.counter}`)
        if (getmyGroups.data.all_my_communities.length == 0) {
          self.setState({
            less_data: false,
          })
          return
        }

        self.setState({
          all_my_communities: getmyGroups.data.all_my_communities,
          total_number_of_communities: getmyGroups.data.total_number_of_communities,
          more_data: true,
        })
      } catch (error) {
        logToElasticsearch('error', 'List_Community', 'Failed at getGroups' + ' ' + error)
      }
    }

    if (this.state.counter == 1) {
      this.setState({
        less_data: false,
      })
      return
    }

    this.setState(
      {
        counter: this.state.counter - 1,
      },
      () => {
        getGroups()
      }
    )
  }

  render() {
    const { open_compose_textTab, overlay_active } = this.state

    return (
      <Fragment>
        <section className={`postCompose__container ${overlay_active ? 'zI1000' : ''}`}>
          <div className='arrow__right' onClick={this.next_data}>
            {this.state.more_data && (
              <img src='https://mygame-media.s3.amazonaws.com/platform_images/Communities/Group+971.svg' alt='arrow-right' />
            )}
          </div>
          <div className='arrow__left' onClick={this.prev_data}>
            {this.state.less_data && (
              <img src='https://mygame-media.s3.amazonaws.com/platform_images/Communities/Group+971.svg' alt='arrow-left' />
            )}
          </div>
          <div className='compose__type__section'>
            <div className={`share__thought ${open_compose_textTab ? 'active' : ''}`} onClick={(e) => this.togglePostTypeTab('text')}>
              {`Your Communities`}
            </div>
            <div className='devider'></div>
            <div className={`add__post__image ${open_compose_textTab ? '' : 'active'}`} onClick={(e) => this.togglePostTypeTab('media')}>
              {` Suggested Communities`}
            </div>
          </div>
          <div className='community__search_container'>
            <div className='community__search'>
              <input type='text' class='form-control' placeholder='Search' />
              <img src='https://mygame-media.s3.amazonaws.com/platform_images/Communities/btn_Search.png' />
            </div>
          </div>
          {open_compose_textTab && (
            <Fragment>
              <div className='community-cards'>
                <div className='row'>{this.showGroupCard()}</div>
              </div>
            </Fragment>
          )}
          {!open_compose_textTab && (
            <Fragment>
              <div className='community-cards'>
                <div className='row'>{this.showSuggestedGroupCard()}</div>
              </div>
            </Fragment>
          )}
        </section>
      </Fragment>
    )
  }
}
