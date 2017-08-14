import React, { Component } from "react";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import { tablePage } from "./data";

import { Provider } from "react-redux";
import { configureStore } from "./store";

import FormContainer from './containers/FormContainer.js'
import TableContainer from './containers/TableContainer.js'

//import RaisedButton from 'material-ui/RaisedButton';


const store = configureStore();


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [0],
      data: tablePage,
      selectedObj: tablePage[0]
    };

  }
 

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
