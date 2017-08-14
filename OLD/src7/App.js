import React, { Component } from "react";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

//import {Link} from 'react-router';

import { grey400 } from "material-ui/styles/colors";


import { tablePage } from "./data";

import { Provider } from "react-redux";
import { connect } from 'react-redux'
import { configureStore } from "./store";
import { acts } from './actions'

import  DealTable  from './components/Table.js'
//import  DealForm  from './containers/FormContainer.js'
import FormContainer from './containers/FormContainer.js'
import TableContainer from './containers/TableContainer.js'


const store = configureStore();


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [0],
      data: tablePage,
      selectedObj: tablePage[0]
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = event => {
    console.log("handleChange name: " + event.target.name);
    const name = event.target.name;
    const value = event.target.value;
    const newObj = Object.assign({}, this.state.selectedObj, { [name]: value });
    this.setState({
      selectedObj: Object.assign({}, newObj),

    });
    //this.props.onTodoClick(3)
  };

  onTest(id) {
    console.log('ontest')
  this.props.onTodoClick(id);
  }
  render() {
    const {onTodoClick} =this.props
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
        selectedObj: tablePage[selectedRows]
      });
    };

    return (
      <Provider store={store}>
      <MuiThemeProvider>
        <div>
         <TableContainer/>
         <hr/>
         <FormContainer />
        </div>
      </MuiThemeProvider>
    </Provider>
    );
  }
}

 export default App;
