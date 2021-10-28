import React from "react";
import Cell from './Cell';
// import TableBody from "./TableBody";
// import TableHeader from "./TableHeader";

export default class DataTable extends React.Component {

    constructor(props) {
      super(props);
  
      this.state = {
        cellHeights: [],
      };
      
      this.tableRef = React.createRef();
      this.renderHeadingRow = this.renderHeadingRow.bind(this);
      this.renderRow = this.renderRow.bind(this);
    }
  
    componentDidMount() {
    //   this.handleCellHeightResize();
    }
  
    renderHeadingRow = (_cell, cellIndex) => {
      const {data={}} = this.props;
      const {header} = data;
      const headings =  Object.values(header)
  
      return (
        <Cell
          key={`heading-${cellIndex}`}
          content={headings[cellIndex]}
          header={true}
          fixed={cellIndex < 2}
        />
      );
    };
    
    renderRow = (_row, rowIndex) => {
      const {data={}} = this.props;
      const {header} = data;
      const {cellHeights} = this.state;
      const heightIndex = rowIndex + 1;
  
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
  
    setTable = (table) => {
      this.table = table;
    }
  
    getTallestCellHeights = () => {
      const rows = Array.from(this.tableRef.current.getElementsByTagName('tr'));
      let {cellHeights} = this.state;
  
      (cellHeights = rows.map((row) => {
        const fixedCell = (row.childNodes)[0];
        return Math.max(row.clientHeight, fixedCell.clientHeight);
      }));
  
      return cellHeights;
    }
  
    handleCellHeightResize = () => {
      this.setState({cellHeights: this.getTallestCellHeights()});
    }
  
    render() {
    const {data={}} = this.props;
      const {header={},items=[]} = data;
      const headings =  Object.keys(header)

      console.log("headings   ",headings);
  
      
      
      const theadMarkup = (
        <tr key="heading">
          {headings.map(this.renderHeadingRow)}
        </tr>
      );
  
      const tbodyMarkup = items.map(this.renderRow);
    
      return (
        <div className="DataTable">
          <div className="ScrollContainer">
            {/* <EventListener event="resize" handler={this.handleCellHeightResize} /> */}
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