import React, { Component } from "react";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
//import Toggle from "material-ui/Toggle";
import DatePicker from "material-ui/DatePicker";
import Divider from "material-ui/Divider";
import theme from "react-quill/dist/quill.snow.css";
import MenuItem from "material-ui/MenuItem";
import FlatButton from "material-ui/FlatButton";

import { isNumber, numberAddCommas, numberDeleteCommas, prependDollarSign, deleteDollarSign } from "../utils/utils";

const customContentStyle = {
  width: "100%",
  maxWidth: "none"
};

const persons = [
  { value: 0, first: "Oliver ", last: "Hansen" },
  { value: 1, first: "Van", last: "Henry" },
  { value: 2, first: "April", last: "Tucker" },
  { value: 3, first: "Ralph", last: "Hubbard" },
  { value: 4, first: "Omar", last: "Alexander" }
];

class DealForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      modal: false,
      values: []
    };
    //injectTapEventPlugin();
  }

  handleChangeFamily = (event, index, values) => {
    //this.setState({ values });
    this.props.f("familymembers", values, this.props.selectedObj.Id);
  };


  handleChangeKeyPeople = event => {
    this.props.f("keypeople", event.target.value, this.props.selectedObj.Id);
  };
  /*
  handleChangeLeadPerson =  event => {
    this.props.f("leadPerson", event.target.value, this.props.selectedObj.Id);
  };
  */

  handleChangeLeadPerson = (event, index, values) => {
  //  this.setState({ values });
    this.props.f("leadperson", values, this.props.selectedObj.Id);
  };

  handleChangeInvestmentType = (event, index, values) => {
    //this.setState({ values });
    this.props.f("investmenttype", values, this.props.selectedObj.Id);
  };
  handleChangeInvestmentSubType = (event, index, values) => {
    //this.setState({ values });
    this.props.f("investmentSubType", values, this.props.selectedObj.Id);
  };
  handleChangeFinancials = (event, index, values) => {
    //this.setState({ values });
    this.props.f("financials", values, this.props.selectedObj.Id);
  };
  handleChangeLegal = (event, index, values) => {
    //this.setState({ values });
    this.props.f("legal", values, this.props.selectedObj.Id);
  };
  handleChangeBackground = (event, index, values) => {
    //  this.setState({ values });
    this.props.f("background", values, this.props.selectedObj.Id);
  };
  handleChangeReviewStatus = (event, index, values) => {
    //this.setState({ values });
    this.props.f("reviewStatus", values, this.props.selectedObj.Id);
  };
  handleChangeStatusNotes = event => {
    this.props.f("statusNotes", event.target.value, this.props.selectedObj.Id);
  };

  handleCurrencyChange = event => {
    if (isNumber(numberDeleteCommas(deleteDollarSign(event.target.value))) === false) {
      return;
    }
    this.props.f(
      event.target.name,
      numberDeleteCommas(deleteDollarSign(event.target.value)),
      this.props.selectedObj.Id
    );
  };

  selectionRenderer = () => {
   console.log('selectionRenderer')
    return this.props.selectedObj.Id;

  };

  menuItems(arrLoad, arrSave) {
    return arrLoad.map(item =>
      <MenuItem
        key={Math.random()}
        checked={arrSave ? arrSave.indexOf(item.value) > -1 : null}
        value={item.value}
        primaryText={item.name}
      />
    );
  }
  render() {
    const { values } = this.state;
    const {
      selectedObj,
      capitalMapping,
      selectFamily,
      selectKeyPeople,
      selectInvestment,
      selectSubTypeInvestment,
      selectLegal,
      selectBackground,
      selectReviewStatus,
      selectFinancials,
      selectLeadPerson
    } = this.props;

    const getDate = d => new Date(d);
    return (
      <div style={{ padding: 20 }}>

        <TextField
          hintText="Deal name"
          floatingLabelText="Deal name"
          disabled={true}
          name="dealname"
          value={selectedObj.Name}
          onChange={this.handleChangeDealName}
          style={{ width: "90%" }}
        />
        <div style={{ display: "flex" }}>
          <DatePicker
            hintText="Date initiated"
            floatingLabelText="Date intiated"
            disabled={true}
            container="inline"
            locale="en-US"
            value={getDate(selectedObj.ScheduleStartDate)}
            onChange={""}
          />
          <DatePicker
            hintText="Funding date"
            floatingLabelText="Funding date"
            container="inline"
            locale="en-US"
            value={getDate()}
            onChange={""}
          />
        </div>
        <SelectField
          floatingLabelText="Family members"
          multiple={true}
          hintText="Family members"
          id="familymembers"
          value={selectedObj.familymembers ? selectedObj.familymembers : null}
          onChange={this.handleChangeFamily}
          style={{ height: 87 }}
        >
          {this.menuItems(selectFamily, selectedObj.familymembers)}
        </SelectField>



        <SelectField
          floatingLabelText="Lead person"
          multiple={true}
          hintText="Lead person"
          name="leadperson"
          value={selectedObj.leadperson ? selectedObj.leadperson : null}
          onChange={this.handleChangeLeadPerson}
          style={{ height: 87 }}

        >
          {this.menuItems(selectLeadPerson, selectedObj.leadperson)}
        </SelectField>

        <SelectField
          floatingLabelText="Industry type"
          multiple={false}
          hintText="Industry type"
          name="investmenttype"
          value={selectedObj.investmenttype ? selectedObj.investmenttype : null}
          onChange={this.handleChangeInvestmentType}
          style={{ height: 87 }}

        >
          {this.menuItems(selectInvestment, selectedObj.investmenttype)}
        </SelectField>
        <SelectField
          floatingLabelText="Industry SubType"
          multiple={false}
          hintText="Industry SubType"
          name="investmentsubtype"
          value={selectedObj.investmentsubtype}
          onChange={this.handleChangeInvestmentSubType}
          style={{ height: 87 }}
        >
          {this.menuItems(
            selectSubTypeInvestment,
            selectedObj.investmentsubtype
          )}
        </SelectField>

        <TextField
          hintText="Required minimum capital"
          floatingLabelText="Required minimum capital"
          name="minCapital"
          value={
            selectedObj.minCapital
              ? prependDollarSign(numberAddCommas(selectedObj.minCapital))
              : ""
          }
          onChange={this.handleCurrencyChange}
          defaultValue=""
        />
        <TextField
          hintText="Required maximum capital"
          floatingLabelText="Required maximum capital"
          name="maxCapital"
          value={
            selectedObj.maxCapital
              ? prependDollarSign(numberAddCommas(selectedObj.maxCapital))
              : ""
          }
          onChange={this.handleCurrencyChange}
        />
        <TextField
          hintText="Capital committed"
          floatingLabelText="Capital Committed"
          name="capitalCommitted"
          value={
            selectedObj.capitalCommitted
              ? prependDollarSign(numberAddCommas(selectedObj.capitalCommitted))
              : ""
          }
          onChange={this.handleCurrencyChange}
        />

        <SelectField
          floatingLabelText="Financials"
          multiple={false}
          hintText="Financials"
          name="financials"
          value={selectedObj.financials}
          onChange={this.handleChangeFinancials}
          style={{ height: 87 }}
        >
          {this.menuItems(selectFinancials, selectedObj.financials)}
        </SelectField>

        <SelectField
          floatingLabelText="Legal"
          multiple={false}
          hintText="Legal"
          name="legal"
          value={selectedObj.legal}
          onChange={this.handleChangeLegal}
          style={{ height: 87 }}
        >
          {this.menuItems(selectLegal, selectedObj.legal)}
        </SelectField>

        <SelectField
          floatingLabelText="Background"
          multiple={false}
          hintText="Background"
          name="background"
          value={selectedObj.background}
          onChange={this.handleChangeBackground}
          style={{ height: 87 }}
        >
          {this.menuItems(selectBackground, selectedObj.background)}
        </SelectField>

        <SelectField
          floatingLabelText="Review status"
          multiple={false}
          hintText="Review status"
          name="reviewStatus"
          value={selectedObj.reviewStatus}
          onChange={this.handleChangeReviewStatus}
          style={{ height: 87 }}
        >
          {this.menuItems(selectReviewStatus, selectedObj.reviewStatus)}
        </SelectField>
        <div style={{ display: "flex" }}>
          <TextField
            hintText="Status notes..."
            floatingLabelText="Status notes"
            name="statusnotes"
            onChange={this.handleChangeStatusNotes}
            value={selectedObj.statusNotes ? selectedObj.statusNotes : ""}
            multiLine={true}
            rows={2}
          />
          <TextField
            hintText="Key people"
            floatingLabelText="Key people"
            name="keypeople"
            onChange={this.handleChangeKeyPeople}
            value={selectedObj.keypeople ? selectedObj.keypeople : ""}
            multiLine={true}
            rows={2}
          />
        </div>
      </div>
    );
  }
}

export default DealForm;
