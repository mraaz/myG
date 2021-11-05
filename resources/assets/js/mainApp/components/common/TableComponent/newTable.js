import React from "react";
import { CSVLink } from "react-csv";
import SortTableHeader from "./SortTableHeader";

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
        isOpen:false
      };
  }


  componentDidMount() {
    const {data={}} = this.props;
    const HeaderItem =  window.localStorage.getItem("statsHeaderOrder");
    if(HeaderItem){
        this.setState({rows:data.items,header:JSON.parse(HeaderItem)})
    } else {
      this.setState({rows:data.items,header:data.header})
    }
  }

  handleModalToggle = () =>{
    const {isOpen} = this.state
    this.setState({isOpen:!isOpen})
  }
  saveHeaderOrder = (data) =>{
    window.localStorage.setItem("statsHeaderOrder",JSON.stringify(data))
  }


  renderColumns = (header) => {
      return (
        header.map(head=>{
            console.log('head    ',head);
            if(head.fixed){
                return {
                    Header: head.label,
                    accessor: head.key,
                    width: 150,
                    fixed: "left",
                    Cell: row => (
                      <div onClick={e=>alert(row.value)}>{row.value}</div>
                    )
                  }
            } else{
                return {
                    Header: head.label,
                    accessor: head.key,
                    width: 150,
                  }
            }
            
        })
      )
  }
  render() {
    const { data } = this.state;
    console.log("data   ",data);
    const {rows=[],isOpen,header=[]} = this.state;
    const columns = this.renderColumns(header);
    return (
      <div>
            {!this.props.guest && <Fragment><SortTableHeader  saveHeaderOrder={this.saveHeaderOrder} isOpen ={isOpen} items={header} handleModalToggle={this.handleModalToggle}/>
            <span className="csv__download-button " onClick={e=>this.handleModalToggle()} style={{marginRight:"10px"}}>Edit Sort Header </span>
            {(rows && rows.length ) ? <CSVLink data={rows} headers={header} filename={`download.csv`}>
                <span className="csv__download-button">Download CSV </span>
            </CSVLink> : ''}
            </Fragment>}
        <ReactTableFixedColumns
            showPaginationBottom={false}
            data={rows}
            columns={columns}
            defaultPageSize={50}
            style={{ height: 400 }}
            className=""
        />
        <br />
      </div>
    );
  }
}

