import React from "react";
import Cell from './Cell';
// import TableBody from "./TableBody";
// import TableHeader from "./TableHeader";

export default class DataTable extends React.Component {

    constructor(props) {
      super(props);
  
      this.state = {
        cellHeights: [],
        rows:[],
        sortableStatus:false
      };
      
      this.tableRef = React.createRef();
      this.renderHeadingRow = this.renderHeadingRow.bind(this);
      this.renderRow = this.renderRow.bind(this);
    }
  
    componentDidMount() {
      const {data={}} = this.props;
      this.setState({rows:data.items})
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
      const {data={}} = this.props;
      const {header} = data;
      const headings =  Object.values(header)
      const headingsKey =  Object.keys(header)
  
      return (
        <Cell
          key={`heading-${cellIndex}`}
          content={headings[cellIndex]}
          headerkey={headingsKey[cellIndex]}
          header={true}
          fixed={cellIndex < 2}
          handleSortable={this.handleSortable} 
        />
      );
    };
    
    renderRow = (_row, rowIndex) => {
      const {data={}} = this.props;
      const {header} = data;
  
      return (
        <tr key={`row-${rowIndex}`}>
          {Object.keys(header).map((_cell, cellIndex) => {
            return (
              <Cell
                key={`${rowIndex}-${cellIndex}`}
                content={_row[_cell]}
                fixed={cellIndex < 2}
              />
            )
          })}
        </tr>
      )
    };
  
    render() {
    const {data={}} = this.props;
    const {rows={}} = this.state;
      const {header={}} = data;
      const headings =  Object.keys(header)
      const theadMarkup = (
        <tr key="heading">
          {headings.map(this.renderHeadingRow)}
        </tr>
      );
  
      const tbodyMarkup = rows.map(this.renderRow);
    
      return (
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
      );
    }
  }