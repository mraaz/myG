import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Toast_style } from '../Utility_Function'
import YourCommunityBox from './YourCommunityBox'
import SuggestedCommunityBox from './SuggestedCommunitybox'

export default class GroupMain extends Component {
  constructor() {
    super()
    this.state = {
      open_compose_textTab: true,
      isShowAllGroup: false,
      counter: 2,
      all_my_communities: [],
    }
  }

  componentDidMount() {
    const self = this

    const getALLmyGroups = async function() {
      try {
        const getmyGroups = await axios.get('/api/groups/get_my_communities/1')
        console.log(getmyGroups)
        self.setState({
          all_my_communities: getmyGroups.data.all_my_communities,
          total_number_of_communities: getmyGroups.data.total_number_of_communities,
        })
      } catch (error) {
        console.log(error)
      }
    }

    getALLmyGroups()
  }

  togglePostTypeTab = (label) => {
    let open_compose_textTab = true
    if (label == 'media') {
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
        return <YourCommunityBox data={item} key={index} />
      })
    }
  }

  render() {
    const { open_compose_textTab, overlay_active } = this.state

    return (
      <Fragment>
        <section className={`postCompose__container ${overlay_active ? 'zI1000' : ''}`}>
          <div className='arrow__right'>
            <img src='https://mygame-media.s3.amazonaws.com/platform_images/Communities/Group+971.svg' alt='arrow-right' />
          </div>
          <div className='arrow__left'>
            <img src='https://mygame-media.s3.amazonaws.com/platform_images/Communities/Group+971.svg' alt='arrow-left' />
          </div>
          <div className='compose__type__section'>
            <div className={`share__thought ${open_compose_textTab ? 'active' : ''}`} onClick={(e) => this.togglePostTypeTab('text')}>
              {`Your Communities`}
            </div>
            <div className='devider'></div>
            <div className={`add__post__image ${open_compose_textTab ? '' : 'active'}`} onClick={(e) => this.togglePostTypeTab('media')}>
              {` Suggest Communities`}
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
                <div className='row'>
                  <div className='col-md-4'>
                    <YourCommunityBox />
                  </div>
                  <div className='col-md-4'>
                    <YourCommunityBox />
                  </div>
                  <div className='col-md-4'>
                    <YourCommunityBox />
                  </div>
                  <div className='col-md-4'>
                    <YourCommunityBox />
                  </div>
                  <div className='col-md-4'>
                    <YourCommunityBox />
                  </div>
                  <div className='col-md-4'>
                    <YourCommunityBox />
                  </div>
                </div>
              </div>
            </Fragment>
          )}
          {!open_compose_textTab && (
            <Fragment>
              <div className='community-cards'>
                <div className='row'>
                  <div className='col-md-4'>
                    <SuggestedCommunityBox />
                  </div>
                  <div className='col-md-4'>
                    <SuggestedCommunityBox />
                  </div>
                  <div className='col-md-4'>
                    <SuggestedCommunityBox />
                  </div>
                  <div className='col-md-4'>
                    <SuggestedCommunityBox />
                  </div>
                  <div className='col-md-4'>
                    <SuggestedCommunityBox />
                  </div>
                  <div className='col-md-4'>
                    <SuggestedCommunityBox />
                  </div>
                  <div className='col-md-4'>
                    <SuggestedCommunityBox />
                  </div>
                  <div className='col-md-4'>
                    <SuggestedCommunityBox />
                  </div>
                  <div className='col-md-4'>
                    <SuggestedCommunityBox />
                  </div>
                  <div className='col-md-4'>
                    <SuggestedCommunityBox />
                  </div>
                </div>
              </div>
            </Fragment>
          )}
        </section>
      </Fragment>
    )
  }
}

const app = document.getElementById('app')
