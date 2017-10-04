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
    this.state = {
      template: 1
    };
  }
  onRadio(value) {
    console.log("onradio f " + value);
    this.setState({ template: value });
  }
  render() {
    const { primary2Color } = this.props.muiTheme.palette;
    const sty = () => {
      return {
        backgroundColor: "orange",
        marginTop: "20px",
        marginLeft: "20px"
      };
    };
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div>
          <h4 style={{ color: primary2Color }}>
            Create a customized executive summary...
          </h4>
          <div style={{ padding: "20px" }}>
            1) Select recipient of executive summary (optional)<br />
            <SelectField
              value={"person1"}
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
              onChange={event => this.onRadio(event.target.value)}
            >
              <RadioButton value="1" label="Iris" />
              <RadioButton value="2" label="Rick" />
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
        />
        <div>
          <HTMLPreviewContainer templateChosen={this.state.template} />
        </div>
      </div>
    );
  }
}

export default muiThemeable()(SelectAndSend);
