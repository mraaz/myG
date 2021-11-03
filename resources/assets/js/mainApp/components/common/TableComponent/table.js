import React from "react";
import Cell from './Cell';
import { CSVLink } from "react-csv";
import { Fragment } from "react";
import SortTableHeader from "./SortTableHeader";

// import TableHeader from "./TableHeader";

export default class DataTable extends React.Component {

    constructor(props) {
      super(props);
  
      this.state = {
        cellHeights: [],
        rows:[],
        header:[],
        sortableStatus:false,
        isOpen:false
      };
      
      this.tableRef = React.createRef();
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

    handleSortable = (e,header) =>{
      const {rows,sortableStatus} = this.state;
      const data = [...rows];
      data.sort((a,b)=>{
        if(typeof b[header] == "string" || typeof a[header] == "string" || typeof b[header] == "undefined" || typeof a[header] == "undefined"){
          if(sortableStatus){
            return b[header] > a[header] ? 1 : -1;
          } else {
              return a[header] < b[header] ? -1: 1;
          }
        } else {
          if(sortableStatus){
            return b[header] - a[header];
          } else {
              return a[header]- b[header];
          }
        }
          
      })
      this.setState({rows:data,sortableStatus:!this.state.sortableStatus})
  }
  
    renderHeadingRow = (_cell, cellIndex) => {
      const {sortableStatus} = this.state;
  
      return (
        <Cell
          key={`heading-${cellIndex}`}
          content={_cell.label}
          headerkey={_cell.key}
          header={true}
          fixed={cellIndex < 2}
          handleSortable={this.handleSortable} 
          sortableStatus={sortableStatus}
        />
      );
    };
    
    renderRow = (_row, rowIndex) => {
      const {header=[]} = this.state;
  
      return (
        <tr key={`row-${rowIndex}`}>
          {header.map((_cell, cellIndex) => {
            return (
              <Cell
                key={`${rowIndex}-${cellIndex}`}
                content={_row[_cell.key]}
                fixed={cellIndex < 2}
              />
            )
          })}
        </tr>
      )
    };

    handleModalToggle = () =>{
      const {isOpen} = this.state
      this.setState({isOpen:!isOpen})
    }
    saveHeaderOrder = (data) =>{
      window.localStorage.setItem("statsHeaderOrder",JSON.stringify(data))
    }
  
    render() {
      const {rows=[],isOpen,header=[]} = this.state;
      const theadMarkup = (
        <tr key="heading">
          {header.map(this.renderHeadingRow)}
        </tr>
      );
  
      const tbodyMarkup = rows.map(this.renderRow);

      return (
        <Fragment>
            <SortTableHeader  saveHeaderOrder={this.saveHeaderOrder} isOpen ={isOpen} items={header} handleModalToggle={this.handleModalToggle}/>
            <span className="csv__download-button " onClick={e=>this.handleModalToggle()} style={{marginRight:"10px"}}>Edit Sort Header </span>
            {(rows && rows.length ) ? <CSVLink data={rows} headers={header} filename={`download.csv`}>
                <span className="csv__download-button">Download CSV </span>
            </CSVLink> : ''}
          <div className="DataTable">
            <div className="ScrollContainer">
            
              <table className="Table" ref={this.tableRef}>
                {/* // Add a caption */}
                {/* <caption>{title}</caption> */}
                <thead>{theadMarkup}</thead>
                <tbody>{tbodyMarkup}</tbody>
              </table>
            </div>
          </div>
        </Fragment>
      );
    }
  }