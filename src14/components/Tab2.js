import React, { Component } from "react";
import FormSelectField from "./FormSelectField";
import muiThemeable from "material-ui/styles/muiThemeable";
import TextField from "material-ui/TextField";
import {
  selectFinancials,
  selectLegal,
  selectBackground,
  selectReviewStatus
} from "../data";

class Tab2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    this.setState({ selectFamily: this.props.selectFamily });
  }

  fSelect(item) {
    return (
      <FormSelectField
        choices={item.select}
        save={this.props.selectedObj[item.value]}
        item={item}
        onchange={this.props.f}
        name={item.name}
      />
    );
  }
  onchange(value) {
    this.props.f(value);
  }
  render() {
    const arr = [
      {
        name: "reviewStatus",
        label: "Review status",
        hint: "Review status",
        value: "reviewStatus",
        onchange: this.onchange,

        select: selectReviewStatus
      },

      {
        name: "legal",
        label: "Legal",
        hint: "Legal",
        value: "legal",
        onchange: this.onchange,

        select: selectLegal
      },
      {
        name: "background",
        label: "Background",
        hint: "Background",
        value: "background",
        onchange: this.onchange,

        select: selectBackground
      },
      {
        name: "financials",
        label: "Financials",
        hint: "Financials",
        value: "financials",
        onchange: this.onchange,

        select: selectFinancials
      }
    ];

    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginRight: "40px"
          }}
        >
          {this.fSelect(arr[0])}

          <TextField
            floatingLabelText="Status notes"
            name="statusNotes"
            ref="statusNotes"
            multiLine="true"
            key="statusNotes"
            value={this.props.selectedObj["statusNotes"]}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginRight: "40px"
          }}
        >
          {this.fSelect(arr[1])}
          {this.fSelect(arr[2])}
          {this.fSelect(arr[3])}
        </div>
      </div>
    );
  }
}

export default muiThemeable()(Tab2);
