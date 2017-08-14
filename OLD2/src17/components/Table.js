import React, { Component } from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";

import RaisedButton from "material-ui/RaisedButton";

import moment from 'moment'

class DealTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //selected: [1]
      height: '300',
      position:'',
      top:''
    };
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
  }
  isSelected = index => {
    return this.props.select.indexOf(index) !== -1;
  };
  render() {
    const styles = {
      floatingActionButton: {
        margin: 0,
        top: "auto",
        right: 20,
        bottom: 20,
        left: "auto",
        position: "fixed"
      },
      editButton: {
        fill: "#334444"
      },
      columns: {
        dateReceived: {
          width: "10%"
        },
        familymembers: {
          width: "15%"
        },
        dealname: {
          width: "15%"
        },
        investmenttype: {
          width: "15%"
        },
        financials: {
          width: "10%"
        },
        legalreview: {
          width: "10%"
        },
        reqcapital: {
          width: "10%"
        }
      }
    };

    const handleRowSelection = selectedRows => {
      console.log("Tbl selected rows " + selectedRows);
      //this.setState({height:200})
      //this.setState({position: 'relative',top:'100px'})
      if (!selectedRows.length) {
        this.setState({
          selected: this.props.select
        });
        return;
      }
      let t = selectedRows[0];
      if (t === null) return;
      console.log("t  " + t);
      this.props.onselect(Number(t) + 1);
      this.setState({
        selected: [Number(t) + 1]
      });
    };
    return (
      <Table
        onRowSelection={handleRowSelection}
        fixedHeader={true}
        height={this.state.height}

      >
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn style={styles.columns.dateReceived}>
            ACTION
            </TableHeaderColumn>
            <TableHeaderColumn style={styles.columns.dateReceived}>
              Date
            </TableHeaderColumn>
            <TableHeaderColumn style={styles.columns.dealname}>
              Deal name
            </TableHeaderColumn>
            <TableHeaderColumn style={styles.columns.dealname}>
              Project type
            </TableHeaderColumn>
            <TableHeaderColumn style={styles.columns.dealname}>
              Project status
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody   displayRowCheckbox={false} stripedRows={true} showRowHover={true} style={{position: this.state.position,top:this.state.top}}>
          {this.props.data.map(item =>
            <TableRow
              key={  Math.random(1000)}
              selected={this.isSelected(item.id)}
            >
            <TableRowColumn style={styles.columns.dateReceived}>
              <RaisedButton primary={true}>ACTION</RaisedButton>
            </TableRowColumn>
              <TableRowColumn style={styles.columns.dateReceived}>
                {moment(item.ScheduleStartDate).format('l')}
              </TableRowColumn>
              <TableRowColumn style={styles.columns.dealname}>
                {item.Name}
              </TableRowColumn>
              <TableRowColumn style={styles.columns.dealname}>
                {item.projectType}
              </TableRowColumn>
              <TableRowColumn style={styles.columns.dealname}>
                {item.statusType}
              </TableRowColumn>
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  }
}

export default DealTable;
