import React, { Component } from "react";
import R from "ramda";
import FlatButton from "material-ui/FlatButton";
import FormTextField from "./FormTextField";
import FormSelectField from "./FormSelectField";
import muiThemeable from "material-ui/styles/muiThemeable";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import {
  capitalMapping,
  selectFamily,
  selectKeyPeople,
  selectInvestment,
  selectSubTypeInvestment,
  selectFinancials,
  selectLegal,
  selectBackground,
  selectReviewStatus,
  selectLeadPerson
} from "../data";
import {
  isNumber,
  numberAddCommas,
  numberDeleteCommas,
  prependDollarSign,
  deleteDollarSign
} from "../utils/utils";

class Tab1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    this.setState({ selectFamily: this.props.selectFamily });
  }

  handleCurrencyChange = event => {
    console.log("handleCurrencyChange " + event.target.value);
    console.log(
      "isnumber " +
        isNumber(numberDeleteCommas(deleteDollarSign(event.target.value)))
    );
    if (
      isNumber(numberDeleteCommas(deleteDollarSign(event.target.value))) ===
      false
    ) {
      return;
    }
    this.props.f(
      event.target.name,
      numberDeleteCommas(deleteDollarSign(event.target.value)),
      this.props.selectedObj.Id
    );
    //this.refs.minCapital.focus();
  };
  onchange(value) {
    this.props.f(value);
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
  render() {
    const arr = [
      {
        name: "familymembers",
        label: "Family members",
        hint: "Family members",
        value: "familymembers",
        onchange: this.onchange,

        select: selectFamily,
        multi: true
      },
      {
        name: "leadPerson",
        label: "Lead person",
        hint: "Lead person",
        value: "leadPerson",
        onchange: this.onchange,

        select: selectLeadPerson,
        multi: false
      },
      {
        name: "industry",
        label: "Industry type",
        hint: "Industry type",
        value: "industry",
        onchange: this.onchange,

        select: selectInvestment,
        multi: true
      },
      {
        name: "industrysubtype",
        label: "Industry SubType(Production type)",
        hint: "Industry SubType(Production type)",
        value: "industrysubtype",
        onchange: this.onchange,

        select: selectSubTypeInvestment,
        multi: true
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
            floatingLabelText="Key people"
            name="keypeople"
            ref="keypeople"
            multiLine="true"
            key="keypeople"
            value={this.props.selectedObj["keypeople"]}
          />
          {this.fSelect(arr[1])}
          <TextField
            floatingLabelText="Company"
            name="company"
            ref="company"
            multiLine="true"
            key="company"
            value={this.props.selectedObj["company"]}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginRight: "40px"
          }}
        >
          {this.fSelect(arr[2])}
          {this.fSelect(arr[3])}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginRight: "40px"
          }}
        >
          <TextField
            floatingLabelText="Minimum capital"
            name="minCapital"
            ref="minCapital"
            multiLine="false"
            key="minCapital"
            onChange={this.handleCurrencyChange}
            value={
              this.props.selectedObj["minCapital"] ? (
                prependDollarSign(
                  numberAddCommas(this.props.selectedObj["minCapital"])
                )
              ) : (
                ""
              )
            }
          />
          <TextField
            floatingLabelText="Maximum capital"
            name="maxCapital"
            ref="maxCapital"
            multiLine="false"
            key="maxCapital"
            onChange={this.handleCurrencyChange}
            value={
              this.props.selectedObj["maxCapital"] ? (
                prependDollarSign(
                  numberAddCommas(this.props.selectedObj["maxCapital"])
                )
              ) : (
                ""
              )
            }
          />
          <TextField
            floatingLabelText="Committed capital"
            name="committedCapital"
            ref="committedCapital"
            multiLine="false"
            key="committedCapital"
            onChange={this.handleCurrencyChange}
            value={
              this.props.selectedObj["capitalCommitted"] ? (
                prependDollarSign(
                  numberAddCommas(this.props.selectedObj["capitalCommitted"])
                )
              ) : (
                ""
              )
            }
          />
        </div>
      </div>
    );
  }
}

export default muiThemeable()(Tab1);
