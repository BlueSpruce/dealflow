import React, { Component } from "react";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import ThemeDefault from "./theme-default";

import { tablePage } from "./data";

import { Provider } from "react-redux";
import { configureStore } from "./store";

import FormContainer from "./containers/FormContainer.js";
import TableContainer from "./containers/TableContainer.js";
import SelectAndSend from "./components/SelectAndSend";
import RecommendationContainer from "./containers/RecommendationContainer.js";
//import Documents from "./components/Documents";

import { Tabs, Tab } from "material-ui/Tabs";
import ViewList from "material-ui/svg-icons/action/view-list";
import ModeEdit from "material-ui/svg-icons/editor/mode-edit";
import NoteAdd from "material-ui/svg-icons/action/note-add";
import { filterAndProps } from "./utils/utils";
//import Attachment from "material-ui/svg-icons/file/attachment";
//import FileUpload from "material-ui/svg-icons/file/file-upload";

import injectTapEventPlugin from "react-tap-event-plugin";

import { ContentExplorer } from "box-ui-elements";
import messages from "box-ui-elements/lib/i18n/en-US";
import "box-ui-elements/dist/explorer.css";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import "typeface-roboto";

/* BOX COM TOKE */
const token = "YhbFxDe3YaShke0pMEUCrGIGRlWPgcJY";
const getLocalizedMessage = (id, replacements) =>
  messages[id].replace(/{\s*(\w+)\s*}/g, (match, key) => replacements[key]);

const store = configureStore();
const dialogShowConfig = [
  { name: "form", component: <FormContainer /> },
  {
    name: "docs",
    component: (
      <ContentExplorer
        token={token}
        getLocalizedMessage={getLocalizedMessage}
        rootFolderId="0"
        logoUrl="box"
        canPreview={true}
      />
    )
  },
  { name: "execSummary", component: <SelectAndSend /> }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //  selected: [0],
      modalOpen: false
    };
    injectTapEventPlugin();
  }

  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={() => this.setState({ modalOpen: false })}
      />
    ];
    const handleClose = () => {
      console.log("handleClose f");
      this.setState({ modalOpen: false });
    };
    const editing = i => {
      console.log("App editing " + i);
      this.setState({ modalOpen: true, modalType: i });
    };
    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={ThemeDefault}>
          <div>
            <img
              style={{ padding: 10, height: 25 }}
              src={require("./images/BlueSpruce_LogoOnly.png")}
            />
            <TableContainer onEdit={editing} />
            <Dialog
              actions={actions}
              modal={false}
              open={this.state.modalOpen}
              onRequestClose={() => this.setState({ modalOpen: false })}
              contentStyle={{
                width: "90%",
                maxWidth: "none"
              }}
              autoDetectWindowHeight={true}
              autoScrollBodyContent={true}
            >
              {this.state.modalType ? (
                filterAndProps(
                  this.state.modalType,
                  "component",
                  dialogShowConfig
                )
              ) : null}
            </Dialog>
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
