/*
 * Author : Nitin Tyagi
 * github  : https://github.com/realinit
 * Email : nitin.1992tyagi@gmail.com
 */ 
import React from "react";
import { CSVLink } from "react-csv";
import SortTableHeader from "./SortTableHeader";
import AliasModal from "./AliasModal";
import HelpModal from "./HelpModal";
import PlayerHistroyModal from "./PlayerHistroyModal";
import moment from 'moment'
import GuestBanner from './../../Guest/Banner'
import SignUpModal from './../../Guest/SignUpModal'
import { detectMob } from '../../../utils/utils'

// Import React Table
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css"  

// Import React Table HOC Fixed columns
import withFixedColumns from "react-table-hoc-fixed-columns";
import "react-table-hoc-fixed-columns/lib/styles.css";
import { Fragment } from "react";

const ReactTableFixedColumns = withFixedColumns(ReactTable);

export default class NewTabe extends React.Component {
  constructor() {
    super();
    this.state = {
        cellHeights: [],
        rows:[],
        header:[],
        sortableStatus:false,
        isOpen:false,
        isAliasModal:false,
        showLoginModal:false,
        showHelpModal:false,
        showPlayerHistoryModal:false,
      };
  }


  componentDidMount() {
    const url_string = window.location.href;
    const url = new URL(url_string);
    const showPlayerHistoryModal = url.searchParams.get("showPlayerHistoryModal");
    const player_id = url.searchParams.get("player_id");
    const {data={}} = this.props;
    const HeaderItem =  window.localStorage.getItem("statsHeaderOrder");
    if(HeaderItem){
        this.setState({rows:data.items,header:JSON.parse(HeaderItem)})
    } else {
      this.setState({rows:data.items,header:data.header,showPlayerHistoryModal,player_id})
    }
  }

  handleModalToggle = (flag,data) =>{
    
    this.setState({isOpen:!isOpen})
  }
  
  saveHeaderOrder = (data) =>{
    window.localStorage.setItem("statsHeaderOrder",JSON.stringify(data))
  }

  handleAliasModal = (close=false,data,key,rowData={}) =>{
    const {rows,isAliasModal} = this.state
    if(close =="tableUpdate"){
      const mappedRow = rows.map(item=>{
        console.log("item",item);
        if(data.playerName == item.name){
          return {
              ...item,
              myG_alias:data.alias,
              myG_profile_img:data.profile_img,
              myG_user_id:data.id
            }
        }
        return item
      })
      this.setState({rows:mappedRow,isAliasModal:!isAliasModal})
      return
    }
    if(this.props.guest){
      this.setState({showLoginModal:true})
      return
    }
    if(key=="myG_alias" && (this.props.current_user_permission == 0 || this.props.current_user_permission == 1 || this.props.current_user_permission == 2)){
    // if(key=="myG_alias"){
      const { showPlayerHistoryModal } = this.state
      this.setState({
          showPlayerHistoryModal:!showPlayerHistoryModal,
          player_tag:rowData.tag,
          player_name:rowData.myG_alias,
          player_id:rowData.myG_user_id,
          player_img:rowData.myG_profile_img
        })
      return
    } else if(this.props.current_user_permission == 0 || this.props.current_user_permission == 1 || this.props.current_user_permission == 2){
      this.setState({isAliasModal:!isAliasModal,player_tag:rowData.tag,player_name:rowData.name})
    }
  }

  renderColumns = (header) => {
    const isMobile = detectMob()
    let w = isMobile ? 100 : 150
      return (
        header.map(head=>{
            if(head.fixed && !isMobile){
                return {
                    Header: head.label,
                    accessor: head.key,
                    width: w,
                    fixed: "left",
                    Cell: row => {
                      if(head.key=="name" || head.key=="myG_alias"){
                        return (
                              <div 
                              className={(head.key=="name" || head.key=="myG_alias")  ? "stats_hyperlink" : ''}  
                              onClick={e=>this.handleAliasModal(false,row.value,head.key,row.original)}
                              title={row.value}
                              >
                              {row.value}
                            </div>
                          )
                      } else {
                        return  <div  title={row.value} > {row.value} </div>
                      }
                    }
                  }
            } else if(head.fixed && isMobile && head.key=="name"){
              return {
                  Header: head.label,
                  accessor: head.key,
                  width: w,
                  fixed: "left",
                  Cell: row => {
                    return (
                          <div 
                          className={'stats_hyperlink'}  
                          onClick={e=>this.handleAliasModal(false,row.value,head.key,row.original)}
                          title={row.value}
                          >
                          {row.value}
                        </div>
                      )
                  }
                }
          }else if(head.type == "date"){
                return {
                    Header: head.label,
                    accessor: head.key,
                    width: w,
                    Cell: row => (
                      <div title={row.value}>{moment(row.value).format('LLL')}</div>
                    )
                  }
            } else{
                return {
                    Header: head.label,
                    accessor: head.key,
                    width: w,
                    Cell: row => (
                      <div title={row.value}>{row.value}</div>
                    )
                  }
            }
            
        }) 
      )
  }
  render() {
    const {
        rows=[],
        isOpen,
        header=[],
        isAliasModal,
        player_tag='',
        player_name='',
        player_id='',
        player_img='',
        showHelpModal,
        showPlayerHistoryModal
      } = this.state;
    const columns = this.renderColumns(header);
    return (
      <Fragment>
        <div class="help clickable" title={'How to find your player tag'} onClick={() => this.setState({ showHelpModal: true })}>?</div>
      <div>
        {this.state.showLoginModal && this.props.guest && <SignUpModal handleGuestModal={() => this.setState({ showLoginModal: false })} />}
        {this.props.guest && <GuestBanner handleGuestModal={() => this.setState({ showLoginModal: true })} />}
        {!this.props.guest && <Fragment><SortTableHeader  saveHeaderOrder={this.saveHeaderOrder} isOpen ={isOpen} items={header} handleModalToggle={this.handleModalToggle}/>
        {showHelpModal && <HelpModal isOpen ={showHelpModal}  handleModalToggle={() => this.setState({ showHelpModal: false })}/>}
        {showPlayerHistoryModal && <PlayerHistroyModal {...this.props} isOpen ={showPlayerHistoryModal}  player_tag ={player_tag} player_name={player_name} player_id={player_id} player_img={player_img} handleModalToggle={() => this.setState({ showPlayerHistoryModal: false })}/>}
        {isAliasModal && <AliasModal {...this.props} player_tag ={player_tag} player_name={player_name} isOpen ={isAliasModal}  handleModalToggle={this.handleAliasModal}/>}
        <span className="csv__download-button " onClick={e=>this.handleModalToggle()} style={{marginRight:"10px"}}>Edit Sort Header </span>
        {(rows && rows.length ) ? <CSVLink data={rows} headers={header} filename={`download.csv`}>
            <span className="csv__download-button">Download CSV </span>
        </CSVLink> : ''}
        </Fragment>
        }
        <ReactTableFixedColumns
            showPaginationBottom={false}
            data={rows}
            columns={columns}
            defaultPageSize={50}
            style={{
                height: "100vh"
              }}
            className=""
            getCellProps={cellInfo => ({
              style: {
                backgroundColor: `hsl(${120 * ((120 - cellInfo.value) / 120) * -1 +
                  120}, 100%, 67%)`,
              },
            })}
        />
        <br />
      </div>
      </Fragment>
    );
  }
}

