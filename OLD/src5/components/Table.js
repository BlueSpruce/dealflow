import React, { Component } from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";

class DealTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [0]
    };
  }
  isSelected = index => {
    return this.state.selected.indexOf(index) !== -1;
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
console.log('this.props.data '+this.props.data)
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn style={styles.columns.dateReceived}>
              Date
            </TableHeaderColumn>
            <TableHeaderColumn style={styles.columns.familymembers}>
              Family members
            </TableHeaderColumn>
            <TableHeaderColumn style={styles.columns.dealname}>
              Deal name
            </TableHeaderColumn>
            <TableHeaderColumn style={styles.columns.investmenttype}>
              Inv. type
            </TableHeaderColumn>
            <TableHeaderColumn style={styles.columns.financials}>
              Financials
            </TableHeaderColumn>
            <TableHeaderColumn style={styles.columns.legalreview}>
              Legal review
            </TableHeaderColumn>
            <TableHeaderColumn style={styles.columns.reqcapital}>
              Req capital
            </TableHeaderColumn>
            <TableHeaderColumn style={styles.columns.status}>
              Status
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody stripedRows={true}>
          {this.props.data.map(item =>
            <TableRow key={item.id} selected={this.isSelected(item.id - 1)}>
              >
              <TableRowColumn style={styles.columns.dateReceived}>
                {item.dateReceived}
              </TableRowColumn>
              <TableRowColumn style={styles.columns.familymembers}>
                {item.familymembers}
              </TableRowColumn>
              <TableRowColumn style={styles.columns.dealname}>
                {item.dealname}
              </TableRowColumn>
              <TableRowColumn style={styles.columns.investmenttype}>
                {item.investmenttype}
              </TableRowColumn>
              <TableRowColumn style={styles.columns.financials}>
                {item.financials}
              </TableRowColumn>
              <TableRowColumn style={styles.columns.legalreview}>
                {item.legalreview}
              </TableRowColumn>
              <TableRowColumn style={styles.columns.reqcapital}>
                {item.reqcapital}
              </TableRowColumn>
              <TableRowColumn style={styles.columns.status}>
                {item.status}
              </TableRowColumn>
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  }
}

export default DealTable;
