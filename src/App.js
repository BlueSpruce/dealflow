import React, { Component } from "react";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import ThemeDefault from "./theme-default";
import { Provider } from "react-redux";
import { configureStore } from "./store";
import FormContainer from "./containers/FormContainer.js";
import TableContainer from "./containers/TableContainer.js";
import SelectAndSendContainer from "./containers/SelectAndSendContainer";
import { filterAndProps } from "./utils/utils";
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
  { name: "form", component: <FormContainer key="fc" /> },
  {
    name: "docs",
    component: (
      <ContentExplorer
        token={token}
        getLocalizedMessage={getLocalizedMessage}
        rootFolderId="0"
        logoUrl="box"
        canPreview={true}
        key="ce"
      />
    )
  },
  { name: "execSummary", component: <SelectAndSendContainer key="ss" /> }
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
    const editing = i => {
      console.log("App editing " + i);
      this.setState({ modalOpen: true, modalType: i });
    };
    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={ThemeDefault}>
          <div>
            <TableContainer onEdit={editing} />
            <Dialog
              actions={actions}
              modal={false}
              open={this.state.modalOpen}
              onRequestClose={() => this.setState({ modalOpen: false })}
              contentStyle={{
                width: "90%",
                maxWidth: "none",
                top: "0"
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
