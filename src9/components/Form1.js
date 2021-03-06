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
//TO DO add debounce
import { debounce } from "throttle-debounce";
import { Tabs, Tab } from "material-ui/Tabs";
import ModeEdit from "material-ui/svg-icons/editor/mode-edit";
import NoteAdd from "material-ui/svg-icons/action/note-add";

import {
  isNumber,
  numberAddCommas,
  numberDeleteCommas,
  prependDollarSign,
  deleteDollarSign
} from "../utils/utils";

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
    this.handleChangeFamily = this.handleChangeFamily.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
  }
  /* IF AND WHEN CURRY make sure props.selectedObj.Id is correct, it should eq id of current project */

  handleChangeFamily = (event, index, values) => {
    //  this.setState({ familymembers: values });
    console.log("handleChangeFamily " + values);
    this.props.f("familymembers", values, this.props.selectedObj.Id);
    //this.curriedBubble("familymembers", values)
  };

  handleChangeLeadPerson = (event, index, values) => {
    //this.setState({ leadPerson:values });
    console.log(
      "handleChangeLeadPerson " + [values, this.props.selectedObj.Id]
    );
    this.props.f("leadPerson", values, this.props.selectedObj.Id);
  };

  handleChangeInvestmentType = (event, index, values) => {
    console.log("handleChangeInvestmentType " + values);
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
    console.log("handleChangeLegal " + values);

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
  handleChangeKeyPeople = event => {
    this.props.f("keypeople", event.target.value, this.props.selectedObj.Id);
  };
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
  selectionRenderer = () => {
    console.log("selectionRenderer");
    return this.props.selectedObj.Id;
  };
  menuItems(arrLoad, arrSave) {
    //console.log('menuItems '+JSON.stringify(arrLoad)+"|"+JSON.stringify(arrSave))
    return arrLoad.map(item => (
      <MenuItem
        key={Math.random()}
        checked={arrSave ? arrSave.indexOf(item.value) > -1 : null}
        value={item.value}
        primaryText={item.name}
      />
    ));
  }
  fSelect(item) {
    return (
      <SelectField
        floatingLabelText={item.label}
        hint={item.hint}
        value={item.value}
        onChange={item.onchange}
        multiple={item.multi}
        style={item.style}
        key={Math.random()}
      >
        {this.menuItems(item.select, item.value)}
      </SelectField>
    );
  }
  fText(item, i) {
    return (
      <TextField
        hintText={item.hintText}
        floatingLabelText={item.label}
        name={item.name}
        ref={item.name}
        onChange={item.onchange}
        value={item.value ? item.value : ""}
        multiLine={item.multiLine}
        rows={item.rows}
        disabled={item.disabled}
        key={item.name}
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
      {
        name: "familymembers",
        label: "Family members",
        hint: "Family members",
        value: selectedObj.familymembers,
        onchange: this.handleChangeFamily,
        style: {},
        select: selectFamily,
        multi: true
      },
      {
        name: "leadPerson",
        label: "Lead person",
        hint: "Lead person",
        value: selectedObj.leadPerson,
        onchange: this.handleChangeLeadPerson,
        style: {},
        select: selectLeadPerson,
        multi: false
      },
      {
        name: "industry",
        label: "Industry type",
        hint: "Industry type",
        value: selectedObj.industry,
        onchange: this.handleChangeInvestmentType,
        style: {},
        select: selectInvestment,
        multi: true
      },
      {
        name: "industrysubtype",
        label: "Industry SubType",
        hint: "Industry SubType",
        value: selectedObj.industrysubtype,
        onchange: this.handleChangeInvestmentSubType,
        style: {},
        select: selectSubTypeInvestment,
        multi: true
      },
      {
        name: "financials",
        label: "Financials",
        hint: "Financials",
        value: selectedObj.financials,
        onchange: this.handleChangeFinancials,
        style: {},
        select: selectFinancials
      },
      {
        name: "legal",
        label: "Legal",
        hint: "Legal",
        value: selectedObj.legal,
        onchange: this.handleChangeLegal,
        style: {},
        select: selectLegal
      },
      {
        name: "background",
        label: "Background",
        hint: "Background",
        value: selectedObj.background,
        onchange: this.handleChangeBackground,
        style: {},
        select: selectBackground
      },
      {
        name: "reviewStatus",
        label: "Review status",
        hint: "Review status",
        value: selectedObj.reviewStatus,
        onchange: this.handleChangeReviewStatus,
        style: {},
        select: selectReviewStatus
      }
    ];
    const dataTextFields = [
      {
        name: "statusnotes",
        label: "Status notes",
        hint: "Status notes...",
        value: selectedObj.statusNotes,
        onchange: this.handleChangeStatusNotes,
        multiLine: true,
        rows: 2
      },
      {
        name: "keypeople",
        label: "Key people",
        hint: "Key people",
        value: selectedObj.keypeople,
        onchange: this.handleChangeKeyPeople,
        multiLine: true,
        rows: 2
      }
    ];
    const dataTextDealName = [
      {
        name: "dealname",
        label: "Deal name",
        hint: "Deal name",
        value: selectedObj.Name,
        onchange: this.handleChangeDealName,
        disabled: true
      }
    ];
    /*  text currency fields will call fText, but wrap value with currency util functions */
    const dataCurrency = [
      {
        name: "minCapital",
        label: "Required minimum capital",
        hint: "Required minimum capital",
        value: selectedObj.minCapital
          ? prependDollarSign(numberAddCommas(selectedObj.minCapital))
          : 0,
        onchange: this.handleCurrencyChange
      },
      {
        name: "maxCapital",
        label: "Required maximum capital",
        hint: "Required maximum capital",
        value: selectedObj.maxCapital
          ? prependDollarSign(numberAddCommas(selectedObj.maxCapital))
          : 0,
        onchange: this.handleCurrencyChange
      },
      {
        name: "capitalCommitted",
        label: "Capital committed",
        hint: "Capital committed",
        value: selectedObj.capitalCommitted
          ? prependDollarSign(numberAddCommas(selectedObj.capitalCommitted))
          : 0,
        onchange: this.handleCurrencyChange
      }
    ];

    return (
      <div style={{ padding: 20 }}>
        <Tabs value={this.state.tab} onChange={this.handleChange}>
          <Tab icon={<NoteAdd />} label="Group of fields 1" value="c">
            {this.fText(dataTextDealName[0])}
            <div style={{ display: "flex" }}>
              <DatePicker
                hintText="Date initiated"
                floatingLabelText="Date intiated"
                disabled={true}
                container="inline"
                locale="en-US"
                value={getDate(selectedObj.ScheduleStartDate)}
              />
              <DatePicker
                hintText="Funding date"
                floatingLabelText="Funding date"
                container="inline"
                locale="en-US"
                value={getDate()}
              />
            </div>

            <div>{dataSelectFields.map(item => this.fSelect(item))}</div>
          </Tab>
          <Tab icon={<ModeEdit />} label="Group of fields 2" value="b">
            <div>
              {dataCurrency.map(item => this.fText(item))}
              <div style={{ display: "flex" }}>
                {dataTextFields.map(item => this.fText(item))}
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default DealForm;
