/*
 * Author : Nitin Tyagi
 * github  : https://github.com/realinit
 * Email : nitin.1992tyagi@gmail.com
 */
import React, { Component } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import axios from 'axios'

// Import React Table
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css"  

// Import React Table HOC Fixed columns
import withFixedColumns from "react-table-hoc-fixed-columns";
import "react-table-hoc-fixed-columns/lib/styles.css";

import { MyGModal,MyGTextarea,MyGButton } from '../../common'
import { logToElasticsearch } from '../../../../integration/http/logger'
import notifyToast from '../../../../common/toast'

const ReactTableFixedColumns = withFixedColumns(ReactTable);



const data = {"items":[{"tag":"#98G9YUC8Q","name":"Crimpeh","role":"coLeader","lastSeen":"20211025T094706.000Z","expLevel":13,"trophies":6013,"arena":{"id":54000015,"name":"Master I"},"clanRank":1,"previousClanRank":1,"donations":54,"donationsReceived":80,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":1},{"tag":"#LJCCV9V","name":"Azdogs","role":"member","lastSeen":"20211025T035935.000Z","expLevel":13,"trophies":5905,"arena":{"id":54000014,"name":"Challenger III"},"clanRank":2,"previousClanRank":2,"donations":24,"donationsReceived":40,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#909ULPGQ8","name":"Jbattz","role":"leader","lastSeen":"20211024T224933.000Z","expLevel":13,"trophies":5770,"arena":{"id":54000014,"name":"Challenger III"},"clanRank":3,"previousClanRank":3,"donations":0,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#9UCL8YPP","name":"matt","role":"elder","lastSeen":"20211025T093831.000Z","expLevel":13,"trophies":5529,"arena":{"id":54000013,"name":"Challenger II"},"clanRank":4,"previousClanRank":6,"donations":8,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#2YCCR808G","name":"Hawkwind","role":"elder","lastSeen":"20211025T023758.000Z","expLevel":13,"trophies":5472,"arena":{"id":54000013,"name":"Challenger II"},"clanRank":5,"previousClanRank":5,"donations":0,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#8VCV89V92","name":"Sir smash alot","role":"member","lastSeen":"20211025T082222.000Z","expLevel":12,"trophies":5431,"arena":{"id":54000013,"name":"Challenger II"},"clanRank":6,"previousClanRank":4,"donations":0,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#9QRQQ8RR0","name":"Jbattz 2.0","role":"coLeader","lastSeen":"20211024T091725.000Z","expLevel":12,"trophies":5411,"arena":{"id":54000013,"name":"Challenger II"},"clanRank":7,"previousClanRank":8,"donations":0,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#QCUVGQG","name":"MrSebKaufmann","role":"member","lastSeen":"20211023T084235.000Z","expLevel":12,"trophies":5402,"arena":{"id":54000013,"name":"Challenger II"},"clanRank":8,"previousClanRank":9,"donations":0,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#PYVVYY8R8","name":"lost","role":"elder","lastSeen":"20211025T101351.000Z","expLevel":10,"trophies":5388,"arena":{"id":54000013,"name":"Challenger II"},"clanRank":9,"previousClanRank":10,"donations":34,"donationsReceived":40,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#2CQRY8JCC","name":"bradjay2000","role":"member","lastSeen":"20211025T105757.000Z","expLevel":12,"trophies":5365,"arena":{"id":54000013,"name":"Challenger II"},"clanRank":10,"previousClanRank":7,"donations":0,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#QLGUJP0R","name":"Sonic Attack","role":"elder","lastSeen":"20211025T024611.000Z","expLevel":13,"trophies":5329,"arena":{"id":54000013,"name":"Challenger II"},"clanRank":11,"previousClanRank":11,"donations":18,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#JJYC0C8V","name":"Hezekiah","role":"coLeader","lastSeen":"20211025T022926.000Z","expLevel":13,"trophies":5327,"arena":{"id":54000013,"name":"Challenger II"},"clanRank":12,"previousClanRank":15,"donations":8,"donationsReceived":40,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#RRV0R8JVR","name":"Hamish","role":"member","lastSeen":"20211025T083753.000Z","expLevel":10,"trophies":5300,"arena":{"id":54000013,"name":"Challenger II"},"clanRank":13,"previousClanRank":13,"donations":28,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#R99RVUUPJ","name":"Dragonstone","role":"elder","lastSeen":"20211025T105546.000Z","expLevel":11,"trophies":5286,"arena":{"id":54000012,"name":"Legendary Arena"},"clanRank":14,"previousClanRank":12,"donations":34,"donationsReceived":40,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#CLQY8GL","name":"ERROR219","role":"elder","lastSeen":"20211025T050324.000Z","expLevel":12,"trophies":5235,"arena":{"id":54000012,"name":"Legendary Arena"},"clanRank":15,"previousClanRank":17,"donations":0,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#2V9822G8J","name":"WAR MASTER","role":"member","lastSeen":"20211025T111438.000Z","expLevel":10,"trophies":5225,"arena":{"id":54000012,"name":"Legendary Arena"},"clanRank":16,"previousClanRank":18,"donations":16,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#YUVUUQQC","name":"TewChaynz","role":"elder","lastSeen":"20211025T094022.000Z","expLevel":11,"trophies":5221,"arena":{"id":54000012,"name":"Legendary Arena"},"clanRank":17,"previousClanRank":14,"donations":64,"donationsReceived":80,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#9PJVC20VV","name":"jodh","role":"member","lastSeen":"20211025T024305.000Z","expLevel":10,"trophies":5207,"arena":{"id":54000012,"name":"Legendary Arena"},"clanRank":18,"previousClanRank":19,"donations":18,"donationsReceived":24,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#29CQ0Y8UV","name":"earlII","role":"elder","lastSeen":"20211025T085812.000Z","expLevel":13,"trophies":5197,"arena":{"id":54000012,"name":"Legendary Arena"},"clanRank":19,"previousClanRank":16,"donations":10,"donationsReceived":40,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#R0RLPCYCL","name":"Dotsbru","role":"member","lastSeen":"20211025T055839.000Z","expLevel":10,"trophies":5138,"arena":{"id":54000012,"name":"Legendary Arena"},"clanRank":20,"previousClanRank":20,"donations":0,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#GP822VJR","name":"JAMESRULES","role":"member","lastSeen":"20211024T163311.000Z","expLevel":11,"trophies":5117,"arena":{"id":54000012,"name":"Legendary Arena"},"clanRank":21,"previousClanRank":22,"donations":0,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#LY998GLVR","name":"TJ11","role":"elder","lastSeen":"20211025T015452.000Z","expLevel":11,"trophies":5114,"arena":{"id":54000012,"name":"Legendary Arena"},"clanRank":22,"previousClanRank":21,"donations":34,"donationsReceived":40,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#JYCUP08U2","name":"IGC123","role":"elder","lastSeen":"20211024T110016.000Z","expLevel":10,"trophies":5030,"arena":{"id":54000012,"name":"Legendary Arena"},"clanRank":23,"previousClanRank":23,"donations":0,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#PUPGJJ9U","name":"raaz","role":"member","lastSeen":"20211025T102450.000Z","expLevel":13,"trophies":5007,"arena":{"id":54000012,"name":"Legendary Arena"},"clanRank":24,"previousClanRank":25,"donations":0,"donationsReceived":0,"clanChestPoints":0,"myG_user_id":1,"myG_alias":"Raaz","decksUsed":0,"decksUsedToday":0},{"tag":"#80YJVQVLV","name":"CASH CARTIII","role":"member","lastSeen":"20211025T030917.000Z","expLevel":11,"trophies":5000,"arena":{"id":54000012,"name":"Legendary Arena"},"clanRank":25,"previousClanRank":24,"donations":0,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#YLL8YJP9L","name":"StudderSteve","role":"elder","lastSeen":"20211025T021148.000Z","expLevel":10,"trophies":4846,"arena":{"id":54000056,"name":"Arena 14"},"clanRank":26,"previousClanRank":26,"donations":8,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#YJYY0J2GL","name":"caleb","role":"member","lastSeen":"20211025T090839.000Z","expLevel":10,"trophies":4762,"arena":{"id":54000056,"name":"Arena 14"},"clanRank":27,"previousClanRank":29,"donations":22,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#JQ0RLGVVY","name":"Carlton is good","role":"elder","lastSeen":"20211025T090725.000Z","expLevel":10,"trophies":4756,"arena":{"id":54000056,"name":"Arena 14"},"clanRank":28,"previousClanRank":28,"donations":62,"donationsReceived":40,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#222CPVV9Q","name":"epic lol","role":"member","lastSeen":"20211025T101242.000Z","expLevel":10,"trophies":4754,"arena":{"id":54000056,"name":"Arena 14"},"clanRank":29,"previousClanRank":31,"donations":8,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#G9Q9GCJY0","name":"Crimpeh’s Daddy","role":"elder","lastSeen":"20211025T095314.000Z","expLevel":10,"trophies":4722,"arena":{"id":54000056,"name":"Arena 14"},"clanRank":30,"previousClanRank":27,"donations":32,"donationsReceived":40,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#2QU9UQJG0","name":"super master","role":"elder","lastSeen":"20211025T105810.000Z","expLevel":10,"trophies":4639,"arena":{"id":54000056,"name":"Arena 14"},"clanRank":31,"previousClanRank":32,"donations":8,"donationsReceived":8,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#GG80L2YCY","name":"Clayton","role":"elder","lastSeen":"20211025T092141.000Z","expLevel":10,"trophies":4630,"arena":{"id":54000056,"name":"Arena 14"},"clanRank":32,"previousClanRank":33,"donations":0,"donationsReceived":40,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#RJ0290CCJ","name":"Johany","role":"elder","lastSeen":"20211025T023503.000Z","expLevel":10,"trophies":4626,"arena":{"id":54000056,"name":"Arena 14"},"clanRank":33,"previousClanRank":36,"donations":44,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#R9Y8QU2VV","name":"D$N_LEVIATHAN","role":"member","lastSeen":"20211025T103152.000Z","expLevel":10,"trophies":4600,"arena":{"id":54000056,"name":"Arena 14"},"clanRank":34,"previousClanRank":0,"donations":62,"donationsReceived":32,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#RPGJ0P0JP","name":"Ashton","role":"member","lastSeen":"20211025T081640.000Z","expLevel":9,"trophies":4590,"arena":{"id":54000055,"name":"Arena 13"},"clanRank":35,"previousClanRank":34,"donations":0,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#8GGQJYJ8U","name":"kk","role":"member","lastSeen":"20211018T045554.000Z","expLevel":10,"trophies":4487,"arena":{"id":54000055,"name":"Arena 13"},"clanRank":36,"previousClanRank":35,"donations":0,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#RJY8JC0C0","name":"</3","role":"member","lastSeen":"20211025T050639.000Z","expLevel":10,"trophies":4427,"arena":{"id":54000055,"name":"Arena 13"},"clanRank":37,"previousClanRank":43,"donations":42,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#RQYQL8Q22","name":"IGGYOK","role":"member","lastSeen":"20211025T092534.000Z","expLevel":10,"trophies":4399,"arena":{"id":54000055,"name":"Arena 13"},"clanRank":38,"previousClanRank":39,"donations":24,"donationsReceived":40,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#J2P8QQUYG","name":"Dametime","role":"member","lastSeen":"20211025T050858.000Z","expLevel":10,"trophies":4378,"arena":{"id":54000055,"name":"Arena 13"},"clanRank":39,"previousClanRank":37,"donations":0,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#G9URVCJQL","name":"DilDevil","role":"member","lastSeen":"20211024T074958.000Z","expLevel":10,"trophies":4377,"arena":{"id":54000055,"name":"Arena 13"},"clanRank":40,"previousClanRank":38,"donations":0,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#QRYJLLR2U","name":"boras","role":"member","lastSeen":"20211022T115210.000Z","expLevel":9,"trophies":4301,"arena":{"id":54000055,"name":"Arena 13"},"clanRank":41,"previousClanRank":40,"donations":0,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#PLY0VG0LL","name":"Hog Rider","role":"member","lastSeen":"20211024T012232.000Z","expLevel":9,"trophies":4298,"arena":{"id":54000055,"name":"Arena 13"},"clanRank":42,"previousClanRank":41,"donations":0,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#RV9CYPLC","name":"ZakyBoyPlayzYT","role":"member","lastSeen":"20211021T113808.000Z","expLevel":10,"trophies":4234,"arena":{"id":54000055,"name":"Arena 13"},"clanRank":43,"previousClanRank":42,"donations":0,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#89QVL929R","name":"tejas starc","role":"member","lastSeen":"20211025T001419.000Z","expLevel":11,"trophies":4232,"arena":{"id":54000055,"name":"Arena 13"},"clanRank":44,"previousClanRank":45,"donations":16,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#LVP8UY8","name":"SilverFox","role":"member","lastSeen":"20211025T095300.000Z","expLevel":11,"trophies":4216,"arena":{"id":54000055,"name":"Arena 13"},"clanRank":45,"previousClanRank":44,"donations":24,"donationsReceived":40,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#LGUG9YYRC","name":"UFatOon","role":"member","lastSeen":"20211025T045441.000Z","expLevel":10,"trophies":4200,"arena":{"id":54000055,"name":"Arena 13"},"clanRank":46,"previousClanRank":46,"donations":8,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#JLYLGV229","name":"josh","role":"member","lastSeen":"20211025T013547.000Z","expLevel":10,"trophies":4105,"arena":{"id":54000011,"name":"Arena 12"},"clanRank":47,"previousClanRank":0,"donations":0,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#PLQ9U8VCL","name":"duke","role":"member","lastSeen":"20211024T014902.000Z","expLevel":10,"trophies":4104,"arena":{"id":54000011,"name":"Arena 12"},"clanRank":48,"previousClanRank":48,"donations":0,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#QR02RJQUQ","name":"leon2699","role":"member","lastSeen":"20211025T074156.000Z","expLevel":10,"trophies":4062,"arena":{"id":54000011,"name":"Arena 12"},"clanRank":49,"previousClanRank":47,"donations":26,"donationsReceived":72,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0},{"tag":"#JCC0G2PCV","name":"Grenicide","role":"member","lastSeen":"20211021T113914.000Z","expLevel":8,"trophies":2224,"arena":{"id":54000008,"name":"Arena 7"},"clanRank":50,"previousClanRank":49,"donations":0,"donationsReceived":0,"clanChestPoints":0,"decksUsed":0,"decksUsedToday":0}],"paging":{"cursors":{}},"header":[
  { label: 'Player', key: 'name', type: 'text' },
  { label: 'myG Alias', key: 'myG_alias', type: 'text' },
]} 

class PlayerHistroyModal extends Component {
  state = {
    items: '',
    player_details:{},
    history_details:[]
  }

  async componentDidMount() {
    try {
      const tmp = await axios.post('/api/clashroyale/cr_player_manager_show/', {
        user_id: this.props.player_id,
        group_id: this.props.group_id,
      })
    } catch (error) {
      this.setState({ loading: false })
      logToElasticsearch('error', 'HelpModal.js', 'Failed componentDidMount:' + ' ' + error)
    }
  }

  onTextAreaChange = (e) => {
    const { player_details = {} } = this.state;
    const value = e.target.value;
    player_details['notes'] = value;
    this.setState({player_details})
  }

  handleSave = async () =>{
    const {player_details = {} } = this.state;
    const tmp = await axios.post('/api/clashroyale/cr_player_manager_update/', {
      player_details_id: this.props.player_id,
      group_id: this.props.group_id,
      notes: player_details.notes
    })
    if(tmp){
      notifyToast('Yeah ! Notes Saved successfully!')
      this.props.handleModalToggle()
    }
  }

  renderColumns = (header) => {
      let w = '50%';
      return (
        header.map(head=>{
          return {
            Header: head.label,
            accessor: head.key,
            width: w,
            Cell: row => (
              <div title={row.value}>{row.value}</div>
            )
          }
            
        }) 
      )
  }


  render() {
    const { handleModalToggle,player_name='',player_tag='' } = this.props;
    const { items,player_details } = this.state;
    const columns = this.renderColumns(data.header);
    return (
      <MyGModal isOpen ariaHideApp={false}>
        <div className='modal-container sortable-Container__container playerHistory'>
          <div className='modal-wrap'>
            <div className='modal__header'>
              <div className="header__left"><a href={`/profile/${player_name}`}>@{player_name}</a></div>
              <div className="header__right">{player_tag}</div>
            </div>
            <div className='modal__body'>
              <div className='field-title'>Notes</div>
              <div className='description-text-area'>
                <div>
                  <MyGTextarea
                    onChange={this.onTextAreaChange}
                    value={player_details.notes}
                    placeholder='Enter Note'
                    maxLength={250}
                  />
                </div>
              </div>
              <div className='field-title'>History Logs</div>
              <ReactTableFixedColumns
                  showPaginationBottom={false}
                  data={data.items}
                  columns={columns}
                  style={{
                      height: "100vh"
                    }}
              />  
            </div>
            <div className='modal__footer'>
              <MyGButton
                customStyles={{ color: '#fff', border: '2px solid #fff', background: '#000' }}
                // onClick={() => this.handleClose()}
                text='Cancel'
              />
              <button type='button' onClick={this.handleSave}>
                Save
              </button>
            </div>
            <div className='modal__close' onClick={(e) => handleModalToggle(true)}>
              <img src='https://myG.gg/platform_images/Dashboard/X_icon.svg' />
            </div>
          </div>
        </div>
      </MyGModal>
    )
  }
}

export default injectIntl(PlayerHistroyModal)
