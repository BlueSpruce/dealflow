import React, { Component } from "react";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import ThemeDefault from "./theme-default";

import { tablePage } from "./data";

import { Provider } from "react-redux";
import { configureStore } from "./store";

import FormContainer from "./containers/FormContainer.js";
import TableContainer from "./containers/TableContainer.js";
import RecommendationContainer from "./containers/RecommendationContainer.js";
import Documents from "./components/Documents";

import { Tabs, Tab } from "material-ui/Tabs";
import ViewList from "material-ui/svg-icons/action/view-list";
import ModeEdit from "material-ui/svg-icons/editor/mode-edit";
import NoteAdd from "material-ui/svg-icons/action/note-add";
import Attachment from "material-ui/svg-icons/file/attachment";
import FileUpload from "material-ui/svg-icons/file/file-upload";

import injectTapEventPlugin from "react-tap-event-plugin";

const store = configureStore();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [0],
      data: tablePage,
      selectedObj: tablePage[0],
      tab: "a"
    };
    //this.handleChange = this.handleChange.bind(this)
    injectTapEventPlugin();
  }
  handleChange = value => {
    this.setState({
      tab: value
    });
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

    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={ThemeDefault}>
          <div>
            <TableContainer />
            <hr />
            <Tabs value={this.state.tab} onChange={this.handleChange}>
              <Tab icon={<ViewList />} label="Project documents" value="a">
                <div style={{ padding: 20 }}>
                  <h2>DOCUMENTS FOR SELECTED PROJECT</h2>
                  <FileUpload />
                  <Documents />
                </div>
              </Tab>

              <Tab icon={<NoteAdd />} label="Project recommendation" value="c">
                <div>
                  <RecommendationContainer />
                </div>
              </Tab>
              <Tab icon={<ModeEdit />} label="Edit project" value="b">
                <div>
                  <FormContainer />
                </div>
              </Tab>
            </Tabs>

          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
