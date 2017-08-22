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

class DealForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      modal: false,
      values: []
    };
    //injectTapEventPlugin();    MOVED to App.js
    this.handleChangeFamily = this.handleChangeFamily.bind(this)
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
  console.log('handleChangeLeadPerson '+ [values, this.props.selectedObj.Id])
    this.props.f("leadPerson", values, this.props.selectedObj.Id);
  };

  handleChangeInvestmentType = (event, index, values) => {
    //this.setState({ values });
    this.props.f("industry", values, this.props.selectedObj.Id);
  };
  handleChangeInvestmentSubType = (event, index, values) => {
    //this.setState({ values });
    this.props.f("industrysubtype", values, this.props.selectedObj.Id);
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
    const dataSelectFields = [
      {name:'familymembers', label:'Family members', hint:'Family members',
        value:selectedObj.familymembers, onchange:this.handleChangeFamily, style:{   },select:selectFamily},
      {name:'leadPerson', label:'Lead person', hint:'Lead person',
          value:selectedObj.leadperson, onchange:this.handleChangeLeadPerson, style:{   },select:selectLeadPerson},
      {name:'industry', label:'Industry type', hint:'Industry type',
        value:selectedObj.industry , onchange:this.handleChangeInvestmentType , style:{},select:selectInvestment },
      {name:'industrysubtype', label:'Industry SubType', hint:'Industry SubType',
        value:selectedObj.industrysubtype , onchange:this.handleChangeInvestmentSubType , style:{},select:selectSubTypeInvestment },
      {name:'financials', label:'Financials', hint:'Financials',
        value:selectedObj.financials , onchange:this.handleChangeFinancials , style:{},select:selectFinancials },
      {name:'legal', label:'Legal', hint:'Legal',
          value:selectedObj.legal , onchange:this.handleChangeLegal , style:{},select:selectLegal },
      {name:'background', label:'Background', hint:'Background',
            value:selectedObj.background , onchange:this.handleChangeBackground , style:{},select:selectBackground },
      {name:'reviewStatus', label:'Review status', hint:'Review status',
              value:selectedObj.reviewStatus , onchange:this.handleChangeReviewStatus , style:{},select:selectReviewStatus },
    ]

    return (
      <div style={{ padding: 20 }}>
        <TextField
          hintText="Deal name"
          floatingLabelText="Deal name"
          disabled={true}
          name="dealname"
          value={selectedObj.Name ? selectedObj.Name : null}
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
        {dataSelectFields.map( item =>
           <SelectField   floatingLabelText={item.label} hint={item.hint} value={item.value} onChange={item.onchange} style={item.style}>
             {this.menuItems(item.select, item.value)}
           </SelectField>
        )}
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
