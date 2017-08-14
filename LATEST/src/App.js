import React, { Component } from "react";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import ThemeDefault from "./theme-default";

import { tablePage } from "./data";

import { Provider } from "react-redux";
import { configureStore } from "./store";

import FormContainer from "./containers/FormContainer.js";
import TableContainer from "./containers/TableContainer.js";
import RecommendationContainer from "./containers/RecommendationContainer.js";


import { Tabs, Tab } from "material-ui/Tabs";
import ViewList from "material-ui/svg-icons/action/view-list";
import ModeEdit from "material-ui/svg-icons/editor/mode-edit";
import NoteAdd from "material-ui/svg-icons/action/note-add";

import injectTapEventPlugin from "react-tap-event-plugin";

import { ContentExplorer } from "box-ui-elements";
import messages from "box-ui-elements/lib/i18n/en-US";
import "box-ui-elements/dist/explorer.css";

const token = "HmpHauAtINCqx336DVk0ui6CrPzeVShp";
const getLocalizedMessage = (id, replacements) =>
  messages[id].replace(/{\s*(\w+)\s*}/g, (match, key) => replacements[key]);

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
    injectTapEventPlugin();
  }
  handleChange = value => {
    this.setState({
      tab: value
    });
  };
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={ThemeDefault}>
          <div>
            <img
              style={{ padding: 10, height: 25 }}
              src={require("./images/BlueSpruce_LogoOnly.png")}
            />
            <TableContainer />
            <hr />

            <Tabs value={this.state.tab} onChange={this.handleChange}>
              <Tab icon={<ViewList />} label="Project documents" value="a">
                <div style={{ padding: 20 }}>
                  <h3>
                    DOCUMENTS FOR SELECTED PROJECT -- (connected to Box.com API;
                    currently with 1 hour dev token)
                  </h3>

                  <ContentExplorer
                    token={token}
                    getLocalizedMessage={getLocalizedMessage}
                    rootFolderId='0'
                    logoUrl='box'
                    canPreview={true}
                  />
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
