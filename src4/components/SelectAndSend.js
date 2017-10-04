import React, { Component } from "react";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import muiThemeable from "material-ui/styles/muiThemeable";
import HTMLPreviewContainer from "../containers/HTMLPreviewContainer.js";
export const emailData = [
  { name: "Keyperson 1", value: "Keyperson 1" },
  { name: "Keyperson 2", value: "Keyperson 2" },
  { name: "Keyperson 3", value: "Keyperson 3" }
];

class SelectAndSend extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const sty = () => {
      return {
        backgroundColor: "orange",
        marginTop: "20px",
        marginLeft: "20px"
      };
    };
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ padding: "20px" }}>
          <h3>Create a customized executive summary...</h3>

          <div style={{ padding: "20px" }}>
            1) Select recipient of executive summary (optional)<br />
            <SelectField
              value={"person1"}
              onChange={""}
              multiple={true}
              name={"email"}
              style={{ padding: "20px" }}
            >
              <MenuItem
                key={"email" + 1}
                value={"person1"}
                primaryText={"Mr. Person"}
              />
              <MenuItem
                key={"email" + 2}
                value={"person2"}
                primaryText={"Mrs. Person"}
              />
              <MenuItem
                key={"email" + 3}
                value={"person3"}
                primaryText={"Ms. Person"}
              />
            </SelectField>
          </div>

          <div style={{ padding: "20px" }}>
            2) Select a template
            <RadioButtonGroup
              name="template"
              defaultSelected="1"
              style={{ padding: "20px" }}
            >
              <RadioButton value="1" label="Template 1" />
              <RadioButton value="2" label="Template 2" />
              <RadioButton value="3" label="Template 3" />
            </RadioButtonGroup>
          </div>

          <div style={{ padding: "20px" }}>
            3) Create executive summary<br />
            <RaisedButton
              label="Create"
              backgroundColor={this.props.muiTheme.palette.accent5Color}
              style={{
                marginTop: "20px",
                marginLeft: "20px"
              }}
            />
          </div>
        </div>
        <div
          style={{
            borderStyle: "solid",
            borderWidth: " 0px 0px 0px 2px",
            padding: "20px"
          }}
        >
          <HTMLPreviewContainer />
        </div>
      </div>
    );
  }
}

export default muiThemeable()(SelectAndSend);
