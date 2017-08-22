import React, { Component } from "react";
import R from "ramda";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
//import Toggle from "material-ui/Toggle";
import DatePicker from "material-ui/DatePicker";
import Divider from "material-ui/Divider";
import theme from "react-quill/dist/quill.snow.css";
import MenuItem from "material-ui/MenuItem";
import FlatButton from "material-ui/FlatButton";
//import { debounce } from "throttle-debounce";

import { isNumber, numberAddCommas, numberDeleteCommas, prependDollarSign, deleteDollarSign } from "../utils/utils";

import {Input} from 'react-materialize'

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
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this)
  }
  /* IF AND WHEN CURRY make sure props.selectedObj.Id is correct, it should eq id of current project */

  handleChangeFamily = (event, index, values) => {
    //this.setState({ values });
    this.props.f("familymembers", values, this.props.selectedObj.Id);
    //this.curriedBubble("familymembers", values)
  };
  handleChangeKeyPeople = event => {
    this.props.f("keypeople", event.target.value, this.props.selectedObj.Id);
  };
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
    console.log('handleChangeLegal '+values)
    this.setState({ values });
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
    console.log('handleCurrencyChange '+event.target.value)
    console.log('isnumber '+isNumber(numberDeleteCommas(deleteDollarSign(event.target.value))))
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
  fSelect(item) {
    return  <SelectField floatingLabelText={item.label} hint={item.hint} value={item.value} onChange={item.onchange}
      multiple={false} style={item.style}>
       {this.menuItems(item.select, item.value)}
     </SelectField>
  }
  fText(item) {
      return   <TextField
          hintText={item.hintText}
          floatingLabelText={item.label}
          name={item.name}
          onChange={item.onchange}
          value={item.value? item.value:''}
          multiLine={item.multiLine}
          rows={item.rows}
          disabled={item.disabled}
        />
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
        value:selectedObj.familymembers, onchange:this.handleChangeFamily, style:{},select:selectFamily},
      {name:'leadPerson', label:'Lead person', hint:'Lead person',
          value:selectedObj.leadperson, onchange:this.handleChangeLeadPerson, style:{},select:selectLeadPerson},
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
    const dataTextFields = [
      {name:'statusnotes', label:'Status notes', hint:'Status notes...', value:selectedObj.statusNotes, onchange:this.handleChangeStatusNotes,
      multiLine: true, rows: 2  },
      {name:'keypeople', label:'Key people', hint:'Key people', value:selectedObj.keypeople, onchange:this.handleChangeKeyPeople,
      multiLine: true, rows: 2  },
    ]
    const dataTextDealName = [
      {name:'dealname', label:'Deal name', hint:'Deal name', value:selectedObj.Name, onchange:this.handleChangeDealName,
       disabled:true}
    ]
    /*  text currency fields will call fText, but wrap value with currency util functions */
    const dataCurrency = [
      {name:'minCapital', label:'Required minimum capital', hint:'Required minimum capital',
      value:prependDollarSign(numberAddCommas(selectedObj.minCapital)), onchange:this.handleCurrencyChange},
      {name:'maxCapital', label:'Required maximum capital', hint:'Required maximum capital',
      value:prependDollarSign(numberAddCommas(selectedObj.maxCapital)), onchange:this.handleCurrencyChange},
      {name:'capitalCommitted', label:'Capital committed!', hint:'Capital committed!',
      value:prependDollarSign(numberAddCommas(selectedObj.capitalCommitted)), onchange:this.handleCurrencyChange}
    ]

    return (
      <div style={{ padding: 20 }}>
        { this.fText(dataTextDealName[0]) }
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
        <Input s={12} type='select' label="Materialize Select" defaultValue='2'>
		<option value='1'>Option 1</option>
		<option value='2'>Option 2</option>
		<option value='3'>Option 3</option>
	</Input>
        {dataSelectFields.map( item =>
           this.fSelect(item)
        )}
        {dataCurrency.map( item =>
           this.fText(item)
        )}
        <div style={{ display: "flex" }}>
          {dataTextFields.map( item =>
             this.fText(item)
        )}
        </div>
      </div>
    );
  }
}

export default DealForm;
