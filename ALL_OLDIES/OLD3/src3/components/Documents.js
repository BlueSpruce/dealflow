import React, { Component } from "react";
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';


const tableData = [
  {
    name: 'File one name',
    url: 'https://box.com/projectName/fileOneName.xls',
  },
  {
    name: 'File two name',
      url: 'https://box.com/projectName/fileTwoName.xls',
  },

];
export default class Documents extends Component {
  constructor(props) {
    super(props);
    this.state = {
          fixedHeader: true,
        fixedFooter: true,
        stripedRows: false,
        showRowHover: false,
        selectable: true,
        multiSelectable: false,
        enableSelectAll: false,
        deselectOnClickaway: true,
        showCheckboxes: false,
        height: '300px',
    };

  }

  handleChange = (event) => {
   this.setState({height: event.target.value});
 };

  render() {

    return (
      <div>
        <Table
                  height={this.state.height}
                  fixedHeader={this.state.fixedHeader}
                  fixedFooter={this.state.fixedFooter}
                  selectable={this.state.selectable}
                  multiSelectable={this.state.multiSelectable}
                >
                  <TableHeader
                    displaySelectAll={this.state.showCheckboxes}
                    adjustForCheckbox={this.state.showCheckboxes}
                    enableSelectAll={this.state.enableSelectAll}
                  >

                    <TableRow>
                      <TableHeaderColumn tooltip="The ID">ID</TableHeaderColumn>
                      <TableHeaderColumn tooltip="The Name">Name</TableHeaderColumn>
                      <TableHeaderColumn tooltip="The Status">URL</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody
                    displayRowCheckbox={this.state.showCheckboxes}
                    deselectOnClickaway={this.state.deselectOnClickaway}
                    showRowHover={this.state.showRowHover}
                    stripedRows={this.state.stripedRows}
                  >
                    {tableData.map( (row, index) => (
                      <TableRow key={index}>
                        <TableRowColumn>{index}</TableRowColumn>
                        <TableRowColumn>{row.name}</TableRowColumn>
                        <TableRowColumn>{row.url}</TableRowColumn>
                      </TableRow>
                    ))}
       </TableBody>
        
     </Table>


      </div>
    );
  }
}
