import React from 'react'
import axios from 'axios'
import { fetchCommunity } from '../../../integration/http/guest'
import { ignoreFunctions } from '../../../common/render'
import GuestBanner from './Banner'
import SignUpModal from './SignUpModal'
import Group_IndividualPost from '../CommunityView/Group_IndividualPost'
import { copyToClipboard } from '../../../common/clipboard'
import { createShortLink } from '../../../integration/http/links'
import NewTable from '../common/TableComponent/newTable'
import TableComponent from '../common/TableComponent/table'
import { logToElasticsearch } from '../../../integration/http/logger'


const data = {"items":[{"tag":"#98G9YUC8Q","name":"Crimpeh","role":"coLeader","lastSeen":"20211025T094706.000Z","expLevel":13,"trophies":6013,"arena":{"id":54000015,"name":"Master I"},"clanRank":1,"previousClanRank":1,"donations":54,"donationsReceived":80,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":1},{"tag":"#LJCCV9V","name":"Azdogs","role":"member","lastSeen":"20211025T035935.000Z","expLevel":13,"trophies":5905,"arena":{"id":54000014,"name":"Challenger III"},"clanRank":2,"previousClanRank":2,"donations":24,"donationsReceived":40,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#909ULPGQ8","name":"Jbattz","role":"leader","lastSeen":"20211024T224933.000Z","expLevel":13,"trophies":5770,"arena":{"id":54000014,"name":"Challenger III"},"clanRank":3,"previousClanRank":3,"donations":0,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#9UCL8YPP","name":"matt","role":"elder","lastSeen":"20211025T093831.000Z","expLevel":13,"trophies":5529,"arena":{"id":54000013,"name":"Challenger II"},"clanRank":4,"previousClanRank":6,"donations":8,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#2YCCR808G","name":"Hawkwind","role":"elder","lastSeen":"20211025T023758.000Z","expLevel":13,"trophies":5472,"arena":{"id":54000013,"name":"Challenger II"},"clanRank":5,"previousClanRank":5,"donations":0,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#8VCV89V92","name":"Sir smash alot","role":"member","lastSeen":"20211025T082222.000Z","expLevel":12,"trophies":5431,"arena":{"id":54000013,"name":"Challenger II"},"clanRank":6,"previousClanRank":4,"donations":0,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#9QRQQ8RR0","name":"Jbattz 2.0","role":"coLeader","lastSeen":"20211024T091725.000Z","expLevel":12,"trophies":5411,"arena":{"id":54000013,"name":"Challenger II"},"clanRank":7,"previousClanRank":8,"donations":0,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#QCUVGQG","name":"MrSebKaufmann","role":"member","lastSeen":"20211023T084235.000Z","expLevel":12,"trophies":5402,"arena":{"id":54000013,"name":"Challenger II"},"clanRank":8,"previousClanRank":9,"donations":0,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#PYVVYY8R8","name":"lost","role":"elder","lastSeen":"20211025T101351.000Z","expLevel":10,"trophies":5388,"arena":{"id":54000013,"name":"Challenger II"},"clanRank":9,"previousClanRank":10,"donations":34,"donationsReceived":40,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#2CQRY8JCC","name":"bradjay2000","role":"member","lastSeen":"20211025T105757.000Z","expLevel":12,"trophies":5365,"arena":{"id":54000013,"name":"Challenger II"},"clanRank":10,"previousClanRank":7,"donations":0,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#QLGUJP0R","name":"Sonic Attack","role":"elder","lastSeen":"20211025T024611.000Z","expLevel":13,"trophies":5329,"arena":{"id":54000013,"name":"Challenger II"},"clanRank":11,"previousClanRank":11,"donations":18,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#JJYC0C8V","name":"Hezekiah","role":"coLeader","lastSeen":"20211025T022926.000Z","expLevel":13,"trophies":5327,"arena":{"id":54000013,"name":"Challenger II"},"clanRank":12,"previousClanRank":15,"donations":8,"donationsReceived":40,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#RRV0R8JVR","name":"Hamish","role":"member","lastSeen":"20211025T083753.000Z","expLevel":10,"trophies":5300,"arena":{"id":54000013,"name":"Challenger II"},"clanRank":13,"previousClanRank":13,"donations":28,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#R99RVUUPJ","name":"Dragonstone","role":"elder","lastSeen":"20211025T105546.000Z","expLevel":11,"trophies":5286,"arena":{"id":54000012,"name":"Legendary Arena"},"clanRank":14,"previousClanRank":12,"donations":34,"donationsReceived":40,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#CLQY8GL","name":"ERROR219","role":"elder","lastSeen":"20211025T050324.000Z","expLevel":12,"trophies":5235,"arena":{"id":54000012,"name":"Legendary Arena"},"clanRank":15,"previousClanRank":17,"donations":0,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#2V9822G8J","name":"WAR MASTER","role":"member","lastSeen":"20211025T111438.000Z","expLevel":10,"trophies":5225,"arena":{"id":54000012,"name":"Legendary Arena"},"clanRank":16,"previousClanRank":18,"donations":16,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#YUVUUQQC","name":"TewChaynz","role":"elder","lastSeen":"20211025T094022.000Z","expLevel":11,"trophies":5221,"arena":{"id":54000012,"name":"Legendary Arena"},"clanRank":17,"previousClanRank":14,"donations":64,"donationsReceived":80,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#9PJVC20VV","name":"jodh","role":"member","lastSeen":"20211025T024305.000Z","expLevel":10,"trophies":5207,"arena":{"id":54000012,"name":"Legendary Arena"},"clanRank":18,"previousClanRank":19,"donations":18,"donationsReceived":24,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#29CQ0Y8UV","name":"earlII","role":"elder","lastSeen":"20211025T085812.000Z","expLevel":13,"trophies":5197,"arena":{"id":54000012,"name":"Legendary Arena"},"clanRank":19,"previousClanRank":16,"donations":10,"donationsReceived":40,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#R0RLPCYCL","name":"Dotsbru","role":"member","lastSeen":"20211025T055839.000Z","expLevel":10,"trophies":5138,"arena":{"id":54000012,"name":"Legendary Arena"},"clanRank":20,"previousClanRank":20,"donations":0,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#GP822VJR","name":"JAMESRULES","role":"member","lastSeen":"20211024T163311.000Z","expLevel":11,"trophies":5117,"arena":{"id":54000012,"name":"Legendary Arena"},"clanRank":21,"previousClanRank":22,"donations":0,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#LY998GLVR","name":"TJ11","role":"elder","lastSeen":"20211025T015452.000Z","expLevel":11,"trophies":5114,"arena":{"id":54000012,"name":"Legendary Arena"},"clanRank":22,"previousClanRank":21,"donations":34,"donationsReceived":40,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#JYCUP08U2","name":"IGC123","role":"elder","lastSeen":"20211024T110016.000Z","expLevel":10,"trophies":5030,"arena":{"id":54000012,"name":"Legendary Arena"},"clanRank":23,"previousClanRank":23,"donations":0,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#PUPGJJ9U","name":"raaz","role":"member","lastSeen":"20211025T102450.000Z","expLevel":13,"trophies":5007,"arena":{"id":54000012,"name":"Legendary Arena"},"clanRank":24,"previousClanRank":25,"donations":0,"donationsReceived":0,"clanChestPoints":0,"myG_user_id":1,"myG_alias":"Raaz","decksUsed":0,"decksUsedToday":0},{"tag":"#80YJVQVLV","name":"CASH CARTIII","role":"member","lastSeen":"20211025T030917.000Z","expLevel":11,"trophies":5000,"arena":{"id":54000012,"name":"Legendary Arena"},"clanRank":25,"previousClanRank":24,"donations":0,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#YLL8YJP9L","name":"StudderSteve","role":"elder","lastSeen":"20211025T021148.000Z","expLevel":10,"trophies":4846,"arena":{"id":54000056,"name":"Arena 14"},"clanRank":26,"previousClanRank":26,"donations":8,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#YJYY0J2GL","name":"caleb","role":"member","lastSeen":"20211025T090839.000Z","expLevel":10,"trophies":4762,"arena":{"id":54000056,"name":"Arena 14"},"clanRank":27,"previousClanRank":29,"donations":22,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#JQ0RLGVVY","name":"Carlton is good","role":"elder","lastSeen":"20211025T090725.000Z","expLevel":10,"trophies":4756,"arena":{"id":54000056,"name":"Arena 14"},"clanRank":28,"previousClanRank":28,"donations":62,"donationsReceived":40,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#222CPVV9Q","name":"epic lol","role":"member","lastSeen":"20211025T101242.000Z","expLevel":10,"trophies":4754,"arena":{"id":54000056,"name":"Arena 14"},"clanRank":29,"previousClanRank":31,"donations":8,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#G9Q9GCJY0","name":"Crimpeh’s Daddy","role":"elder","lastSeen":"20211025T095314.000Z","expLevel":10,"trophies":4722,"arena":{"id":54000056,"name":"Arena 14"},"clanRank":30,"previousClanRank":27,"donations":32,"donationsReceived":40,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#2QU9UQJG0","name":"super master","role":"elder","lastSeen":"20211025T105810.000Z","expLevel":10,"trophies":4639,"arena":{"id":54000056,"name":"Arena 14"},"clanRank":31,"previousClanRank":32,"donations":8,"donationsReceived":8,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#GG80L2YCY","name":"Clayton","role":"elder","lastSeen":"20211025T092141.000Z","expLevel":10,"trophies":4630,"arena":{"id":54000056,"name":"Arena 14"},"clanRank":32,"previousClanRank":33,"donations":0,"donationsReceived":40,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#RJ0290CCJ","name":"Johany","role":"elder","lastSeen":"20211025T023503.000Z","expLevel":10,"trophies":4626,"arena":{"id":54000056,"name":"Arena 14"},"clanRank":33,"previousClanRank":36,"donations":44,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#R9Y8QU2VV","name":"D$N_LEVIATHAN","role":"member","lastSeen":"20211025T103152.000Z","expLevel":10,"trophies":4600,"arena":{"id":54000056,"name":"Arena 14"},"clanRank":34,"previousClanRank":0,"donations":62,"donationsReceived":32,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#RPGJ0P0JP","name":"Ashton","role":"member","lastSeen":"20211025T081640.000Z","expLevel":9,"trophies":4590,"arena":{"id":54000055,"name":"Arena 13"},"clanRank":35,"previousClanRank":34,"donations":0,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#8GGQJYJ8U","name":"kk","role":"member","lastSeen":"20211018T045554.000Z","expLevel":10,"trophies":4487,"arena":{"id":54000055,"name":"Arena 13"},"clanRank":36,"previousClanRank":35,"donations":0,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#RJY8JC0C0","name":"</3","role":"member","lastSeen":"20211025T050639.000Z","expLevel":10,"trophies":4427,"arena":{"id":54000055,"name":"Arena 13"},"clanRank":37,"previousClanRank":43,"donations":42,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#RQYQL8Q22","name":"IGGYOK","role":"member","lastSeen":"20211025T092534.000Z","expLevel":10,"trophies":4399,"arena":{"id":54000055,"name":"Arena 13"},"clanRank":38,"previousClanRank":39,"donations":24,"donationsReceived":40,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#J2P8QQUYG","name":"Dametime","role":"member","lastSeen":"20211025T050858.000Z","expLevel":10,"trophies":4378,"arena":{"id":54000055,"name":"Arena 13"},"clanRank":39,"previousClanRank":37,"donations":0,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#G9URVCJQL","name":"DilDevil","role":"member","lastSeen":"20211024T074958.000Z","expLevel":10,"trophies":4377,"arena":{"id":54000055,"name":"Arena 13"},"clanRank":40,"previousClanRank":38,"donations":0,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#QRYJLLR2U","name":"boras","role":"member","lastSeen":"20211022T115210.000Z","expLevel":9,"trophies":4301,"arena":{"id":54000055,"name":"Arena 13"},"clanRank":41,"previousClanRank":40,"donations":0,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#PLY0VG0LL","name":"Hog Rider","role":"member","lastSeen":"20211024T012232.000Z","expLevel":9,"trophies":4298,"arena":{"id":54000055,"name":"Arena 13"},"clanRank":42,"previousClanRank":41,"donations":0,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#RV9CYPLC","name":"ZakyBoyPlayzYT","role":"member","lastSeen":"20211021T113808.000Z","expLevel":10,"trophies":4234,"arena":{"id":54000055,"name":"Arena 13"},"clanRank":43,"previousClanRank":42,"donations":0,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#89QVL929R","name":"tejas starc","role":"member","lastSeen":"20211025T001419.000Z","expLevel":11,"trophies":4232,"arena":{"id":54000055,"name":"Arena 13"},"clanRank":44,"previousClanRank":45,"donations":16,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#LVP8UY8","name":"SilverFox","role":"member","lastSeen":"20211025T095300.000Z","expLevel":11,"trophies":4216,"arena":{"id":54000055,"name":"Arena 13"},"clanRank":45,"previousClanRank":44,"donations":24,"donationsReceived":40,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#LGUG9YYRC","name":"UFatOon","role":"member","lastSeen":"20211025T045441.000Z","expLevel":10,"trophies":4200,"arena":{"id":54000055,"name":"Arena 13"},"clanRank":46,"previousClanRank":46,"donations":8,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#JLYLGV229","name":"josh","role":"member","lastSeen":"20211025T013547.000Z","expLevel":10,"trophies":4105,"arena":{"id":54000011,"name":"Arena 12"},"clanRank":47,"previousClanRank":0,"donations":0,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#PLQ9U8VCL","name":"duke","role":"member","lastSeen":"20211024T014902.000Z","expLevel":10,"trophies":4104,"arena":{"id":54000011,"name":"Arena 12"},"clanRank":48,"previousClanRank":48,"donations":0,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#QR02RJQUQ","name":"leon2699","role":"member","lastSeen":"20211025T074156.000Z","expLevel":10,"trophies":4062,"arena":{"id":54000011,"name":"Arena 12"},"clanRank":49,"previousClanRank":47,"donations":26,"donationsReceived":72,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#JCC0G2PCV","name":"Grenicide","role":"member","lastSeen":"20211021T113914.000Z","expLevel":8,"trophies":2224,"arena":{"id":54000008,"name":"Arena 7"},"clanRank":50,"previousClanRank":49,"donations":0,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0}],"paging":{"cursors":{}},"header":{
  name:'Player',
  myG_alias: 'myG Alias',
  decksUsed: 'Total decks used',
  donations: 'Donated',
  donationsReceived: 'Received',
  decksUsedToday: 'Total decks used today',
  fame: 'Fame',
  repairPoints: 'Repair Points',
  boatAttacks: 'Boat Attacks',
  trophies: 'Trophies',
  lastSeen: 'Last logged into CR',
  tag: 'Tag'
}}


export default class GuestCommunity extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    loading: true,
    community: null,
    showModal: false,
    activeTab:'All'
  }

  componentDidMount() {
    fetchCommunity(this.props.id).then((community) => this.setState({ community, loading: false }))
  }

  handleTabOption = (activeTab) => {
      this.setState({ activeTab}, async () => {
        if( activeTab== "Stats"){
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
          clanTagDataFetching:true
        })
        const {stats_header = ''} = this.state.community
        const clanTag = stats_header;
        const response = await axios.get(`/api/clashroyale/show/${clanTag}`)
        console.log("response   ",response);
        this.setState({
          clanTagDataFetching:false,
          clanTagData:response.data ? response.data : ''
        })
      } catch (error) {
        logToElasticsearch('error', 'Clan Tag Game Stats for guest', 'Failed at Clan Tag Game Stats for guest' + ' ' + error)
        this.setState({
          clanTagDataFetching:false,
          clanTagData:data,
        })
      }
    }
    getData();
  }

  renderStats = (clanTagData) =>{
    switch (clanTagData) {
      case '404a':
      case '404':
        return ( 
            <div className="stats_section__container">
              <h1>Sorry mate, Clan Tag not found.</h1>
            </div>
        );
        case '404b':
        return ( 
                  <div className="stats_section__container">
                    <h1>Sorry mate, River Race not found.</h1>
                  </div>
        );
        case 'Auth Error':
        return ( 
          <div className="stats_section__container">
            <h1>Sorry mate, error! Its not you, its us! We'll get this fixed shortly.</h1>
          </div>
        );
        case 'Auth Error':
        return ( 
          <div className="stats_section__container">
                    <h1>Supercell servers cannot be reached (503).</h1>
                    
<span>Clash Royale may be on maintenance break. Please check status on Twitter @ClashRoyale (https://twitter.com/ClashRoyale) and try again later.</span>
                  </div>
        );
    
      default:
        return (
          <div className="stats_section__container">
                    <NewTable guest={true} data={clanTagData}/>
                  </div>
        )
    }
  }

  render() {
    const { activeTab,
      clanTagDataFetching=false,
      clanTagData='',
     } = this.state
    if (this.state.loading || !this.state.community) return null
    return (
      <div id='community' className='guest-page' style={{ backgroundColor: '#000' }}>
        {this.state.showModal && <SignUpModal handleGuestModal={() => this.setState({ showModal: false })} />}
        <GuestBanner handleGuestModal={() => this.setState({ showModal: true })} />
        <div className='gamePost__tab'>
          <span className={activeTab == 'All' ? 'active' : ''} onClick={(e) => this.handleTabOption('All')}>
            All
          </span>
          <span className={activeTab == 'Stats' ? 'active' : ''} onClick={(e) => this.handleTabOption('Stats')}>
            Stats
          </span>
        </div>
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
          { activeTab !== "Stats" && <section id='posts' className='active'>
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
            }
            { activeTab === "Stats" &&  clanTagData && !clanTagDataFetching && (
              <section  className={` guest stats_section_main ${clanTagDataFetching ? '' : 'active'}`}>
                 {this.renderStats(clanTagData)}
              </section>
            )
            }
          </div>
        </div>
      </div>
    )
  }
}
