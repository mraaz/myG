import React from 'react'
import axios from 'axios'
import { fetchCommunity } from '../../../integration/http/guest'
import { ignoreFunctions } from '../../../common/render'
import GuestBanner from './Banner'
import SignUpModal from './SignUpModal'
import Group_IndividualPost from '../CommunityView/Group_IndividualPost'
import { copyToClipboard } from '../../../common/clipboard'
import { createShortLink } from '../../../integration/http/links'
import TableComponent from '../common/TableComponent'
import { logToElasticsearch } from '../../../integration/http/logger'

export default class GuestCommunity extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    loading: true,
    community: null,
    showModal: false,
    activeTab: 'All',
    community: {}
  }

  componentDidMount() {
    fetchCommunity(this.props.id).then((community) => this.setState({ community, loading: false }))
  }

  handleTabOption = (activeTab) => {
    this.setState({ activeTab }, async () => {
      if (activeTab == 'Stats') {
        this.getClanTagGameData()
        return
      }
      fetchCommunity(this.props.id).then((community) => this.setState({ community, loading: false }))
    })
  }

  getClanTagGameData = () => {
    const getData = async () => {
      try {
        this.setState({
          clanTagDataFetching: true
        })
        const { stats_header = '' } = this.state.community
        const clanTag = stats_header
        const response = await axios.get(`/api/clashroyale/show/${clanTag}`)
        this.setState({
          clanTagDataFetching: false,
          clanTagData: response.data ? response.data : ''
        })
      } catch (error) {
        logToElasticsearch('error', 'Clan Tag Game Stats for guest', 'Failed at Clan Tag Game Stats for guest' + ' ' + error)
        this.setState({
          clanTagDataFetching: false,
          clanTagData: ''
        })
      }
    }
    getData()
  }

  renderStats = (clanTagData) => {
    switch (clanTagData) {
      case '404a':
      case '404':
        return (
          <div className='stats_section__container'>
            <h1>Sorry mate, Clan Tag not found.</h1>
          </div>
        )
      case '404b':
        return (
          <div className='stats_section__container'>
            <h1>Sorry mate, River Race not found.</h1>
          </div>
        )
      case 'Auth Error':
        return (
          <div className='stats_section__container'>
            <h1>Sorry mate, error! Its not you, its us! We'll get this fixed shortly.</h1>
          </div>
        )
      case 'Auth Error':
        return (
          <div className='stats_section__container'>
            <h1>Supercell servers cannot be reached (503).</h1>

            <span>
              Clash Royale may be on maintenance break. Please check status on Twitter @ClashRoyale (https://twitter.com/ClashRoyale) and
              try again later.
            </span>
          </div>
        )

      default:
        return (
          <div className='stats_section__container'>
            <TableComponent guest={true} data={clanTagData} />
          </div>
        )
    }
  }

  render() {
    const { activeTab, clanTagDataFetching = false, clanTagData = '', community = {} } = this.state
    const { stats_header = '' } = community
    if (this.state.loading || !this.state.community) return null
    return (
      <div id='community' className='guest-page' style={{ backgroundColor: '#000' }}>
        {this.state.showModal && <SignUpModal handleGuestModal={() => this.setState({ showModal: false })} />}
        <GuestBanner handleGuestModal={() => this.setState({ showModal: true })} />
        {stats_header && (
          <div className='gamePost__tab'>
            <span className={activeTab == 'All' ? 'active' : ''} onClick={(e) => this.handleTabOption('All')}>
              All
            </span>
            <span className={activeTab == 'Stats' ? 'active' : ''} onClick={(e) => this.handleTabOption('Stats')}>
              Stats
            </span>
          </div>
        )}
        <div id='guest-content' className='communityName__container'>
          <div className='guest-community-image' style={{ backgroundImage: `url(${this.state.community.group_img})` }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div className='guest-community-name'>{this.state.community.name}</div>
            <div
              className='share-community-button clickable'
              onClick={async () => copyToClipboard(await createShortLink(window.location.href))}
            >
              Share
            </div>
          </div>
          <div className='guest-community-description'>{this.state.community.grp_description}</div>
          <div className='guest-community-game'>Game - {this.state.community.game_name}</div>
          <div className='app-container home-page' style={{ background: 'unset', minHeight: 'unset' }}>
            {activeTab !== 'Stats' && (
              <section id='posts' className='active'>
                {this.state.community.groupPosts.map((post, index) => {
                  try {
                    post.media_url.length > 0 ? JSON.parse(post.media_url) : ''
                  } catch (_) {
                    post.media_url = ''
                  }
                  return (
                    <div onClick={() => this.setState({ showModal: true })} key={index}>
                      <Group_IndividualPost guest post={post} user={{}} source={'news_feed'} />
                    </div>
                  )
                })}
              </section>
            )}
            {activeTab === 'Stats' && clanTagData && !clanTagDataFetching && (
              <section className={` guest stats_section_main ${clanTagDataFetching ? '' : 'active'}`}>
                {this.renderStats(clanTagData)}
              </section>
            )}
          </div>
        </div>
      </div>
    )
  }
}
