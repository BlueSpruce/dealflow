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

  fSelect(item) {
    return (
      <FormSelectField
        choices={item.select}
        save={this.props.selectedObj[item.value]}
        item={item}
        onchange={this.handleSelectField}
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
        onchange: this.handleChangeFamily,

        select: selectFamily,
        multi: true
      },
      {
        name: "leadPerson",
        label: "Lead person",
        hint: "Lead person",
        value: "leadPerson",
        onchange: this.handleChangeLeadPerson,

        select: selectLeadPerson,
        multi: false
      },
      {
        name: "industry",
        label: "Industry type",
        hint: "Industry type",
        value: "industry",
        onchange: this.handleChangeInvestmentType,

        select: selectInvestment,
        multi: true
      },
      {
        name: "industrysubtype",
        label: "Industry SubType",
        hint: "Industry SubType",
        value: "industrysubtype",
        onchange: this.handleChangeInvestmentSubType,

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
          <TextField
            floatingLabelText="Production type =  SUB INDUSTRY (remove this) "
            name="productionType"
            ref="productionType"
            multiLine="true"
            key="productionType"
          />
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
