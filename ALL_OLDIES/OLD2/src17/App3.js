import React, { Component } from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

class App extends Component {

  state = {
    selected: [1],
  };
  isSelected = (index) => {
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

        familymembers: {
          width: "20%"
        },
        dealname: {
          width: "20%"
        },
        investmenttype: {
          width: "10%"
        },
        financials: {
          width: "10%"
        },
        legalreview: {
          width: "10%"
        },

      }
    };

    const tablePage = {
      items: [
        {
          id: 1,
          familymembers: "Iris",
          dealname: "Freedom run",
          investmenttype: "Entertainment",
          financials: "Yes",
          legalreview: "Yes",
          reqcapital: "2M",
          status: "Done"
        },
        {
          id: 2,
          familymembers: "Iris/MS/Kaily",
          dealname: "Freedom run",
          investmenttype: "Entertainment",
          financials: "Yes",
          legalreview: "Yes",
          reqcapital: "2M",
          status: "Done"
        },
        {
          id: 3,
          familymembers: "Tara/Brian/Adam",
          dealname: "Freedom run",
          investmenttype: "Entertainment",
          financials: "Yes",
          legalreview: "Yes",
          reqcapital: "2M",
          status: "Done"
        },
        {
          id: 4,
          familymembers: "Iris",
          dealname: "Freedom run",
          investmenttype: "Entertainment",
          financials: "Yes",
          legalreview: "Yes",
          reqcapital: "2M",
          status: "Done"
        },
        {
          id: 5,
          familymembers: "Iris",
          dealname: "Freedom run",
          investmenttype: "Entertainment",
          financials: "Yes",
          legalreview: "Yes",
          reqcapital: "2M",
          status: "Done"
        },
        {
          id: 6,
          familymembers: "Iris",
          dealname: "Freedom run",
          investmenttype: "Entertainment",
          financials: "Yes",
          legalreview: "Yes",
          reqcapital: "2M",
          status: "Done"
        },
        {
          id: 7,
          familymembers: "Iris",
          dealname: "Freedom run",
          investmenttype: "Entertainment",
          financials: "Yes",
          legalreview: "Yes",
          reqcapital: "2M",
          status: "Done"
        }
      ]
    };

    const columns = [
      { key: "received", name: "Date received" },
      { key: "familymembers", name: "Family members" },
      { key: "dealname", name: "Deal name" },
      { key: "investmenttype", name: "Investment type" },
      { key: "keypeople", name: "Key people" },
      { key: "financials", name: "Fiancials" },
      { key: "legalreview", name: "Legal review" },
      { key: "background", name: "Background" },
      { key: "reqcapital", name: "Req capital" },
      { key: "recommend", name: "Recommend" },
      { key: "status", name: "Status" },
      { key: "leadperson", name: "Lead person" }
    ];
    const handleRowSelection = (selectedRows) => {
      console.log('selected rows '+selectedRows)
        this.setState({
          selected: selectedRows,
        });
      };
    return (
      <MuiThemeProvider>
        <Table onRowSelection={handleRowSelection}>
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
          >
            <TableRow>

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
          <TableBody>
            {tablePage.items.map(item =>
              <TableRow key={item.id}     selected={this.isSelected(item.id-1)}>>

                <TableRowColumn style={styles.columns.familymembers}>
                  {item.familymembers}
                </TableRowColumn>
                <TableRowColumn style={styles.columns.dealname}>
                  {item.dealname}
                </TableRowColumn>
                <TableRowColumn style={styles.columns.investmenttype}>
                  {item.investmenttype}
                </TableRowColumn>
                <TableRowColumn style={styles.columns.financials} >
                  {item.financials}
                </TableRowColumn>
                <TableRowColumn style={styles.columns.legalreview} >
                  {item.legalreview}
                </TableRowColumn>
                <TableRowColumn style={styles.columns.reqcapital} >
                  {item.reqcapital}
                </TableRowColumn>
                <TableRowColumn style={styles.columns.status} >
                  {item.status}
                </TableRowColumn>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </MuiThemeProvider>
    );
  }
}

export default App;
