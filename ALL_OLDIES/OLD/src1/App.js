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

//import {Link} from 'react-router';
import RaisedButton from "material-ui/RaisedButton";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import Toggle from "material-ui/Toggle";
import DatePicker from "material-ui/DatePicker";
import { grey400 } from "material-ui/styles/colors";
import Divider from "material-ui/Divider";

import { tablePage } from "./data";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [0],
      data: tablePage,
      selectedObj: tablePage.items[0]
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = event => {
    console.log("handleChange name: " + event.target.name);
    const name = event.target.name
    const value = event.target.value

    this.setState({
     selectedObj: Object.assign({},this.state.selectedObj, {[name]:value})
    });
  };
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
          width: "15%"
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
        }
      }
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
    /* handleRowSelection is called on any click on page?
    check selectRows.length for error check */
    const handleRowSelection = selectedRows => {
      console.log("selected rows " + selectedRows);
      if (!selectedRows.length) return;
      this.setState({
        selected: selectedRows,
        selectedObj: tablePage.items[selectedRows]
      });
    };

    return (
      <MuiThemeProvider>
        <div>
          <Table onRowSelection={handleRowSelection}>
            <TableHeader
              displaySelectAll={this.state.showCheckboxes}
              adjustForCheckbox={this.state.showCheckboxes}
              enableSelectAll={this.state.enableSelectAll}
            >
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
            <TableBody>
              {tablePage.items.map(item =>
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

          <form>
            <TextField
              hintText="Date received"
              floatingLabelText="Date received"
              name='dateReceived'
              fullWidth={true}
              value={this.state.selectedObj.dateReceived}
              onChange={this.handleChange}
            />
            <TextField
              hintText="Family members"
              floatingLabelText="Family members"
              name='familymembers'
              fullWidth={true}
              value={this.state.selectedObj.familymembers}
              onChange={this.handleChange}

            />
            <TextField
              hintText="Deal name"
              floatingLabelText="Deal name"
              name='dealname'
              fullWidth={true}
              value={this.state.selectedObj.dealname}
              onChange={this.handleChange}
            />
            <TextField
              hintText="investmenttype"
              floatingLabelText="investmenttype"
              name='investmenttype'
              fullWidth={true}
              value={this.state.selectedObj.investmenttype}
              onChange={this.handleChange}
            />
            <TextField
              hintText="financials"
              floatingLabelText="investmenttype"
              name='financials'
              fullWidth={true}
              value={this.state.selectedObj.financials}
              onChange={this.handleChange}
            />



            <Divider />

            <div style={styles.buttons}>

              <RaisedButton
                label="Save"
                style={styles.saveButton}
                type="submit"
                primary={true}
              />
            </div>
          </form>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
