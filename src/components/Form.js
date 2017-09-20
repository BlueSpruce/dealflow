import React, { Component } from "react";
import DatePicker from "material-ui/DatePicker";
//import { Tabs, Tab } from "material-ui/Tabs";
import ModeEdit from "material-ui/svg-icons/editor/mode-edit";
import NoteAdd from "material-ui/svg-icons/action/note-add";
import FormSelectField from "./FormSelectField";
import FormTextField from "./FormTextField";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";
import TextField from "material-ui/TextField";
import muiThemeable from "material-ui/styles/muiThemeable";
import FlatButton from "material-ui/FlatButton";
import SelectAndSend from "./SelectAndSend";
import ExecSummary1 from "./ExecSummary1";
import ExecSummary2 from "./ExecSummary2";
import { dataExecSummary1, dataExecSummary2 } from "../common/data.js";
import Tab1 from "./Tab1";
import Tab2 from "./Tab2";
import Tab3 from "./Tab3";
import Tab4 from "./Tab4";
//import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
//import Tabs from "muicss/lib/react/tabs";
//import Tab from "muicss/lib/react/tab";

import {
  isNumber,
  numberAddCommas,
  numberDeleteCommas,
  prependDollarSign,
  deleteDollarSign
} from "../utils/utils";

class DealForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      modal: false,
      values: [],
      tab: "a",
      ops: null
    };
    //injectTapEventPlugin();    MOVED to App.js
  }
  componentWillMount() {
    this.setState({ ops: this.props.multipleOptions });
  }
  handleChangeTabs = value => {
    console.log("handleChangeTabs " + value);
    this.setState({
      tab: value
    });
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
  handleSelectField = (a, b) => {
    console.log("handleSelectField f " + [a, b]);
    this.props.f(a, b, this.props.selectedObj.Id);
  };
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
    const { values } = this.state;
    const { selectedObj } = this.props;

    const getDate = d => new Date(d);

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
    const sty = (a, b) => {
      //  console.log("sty " + [a, b]);
      return a == b
        ? {
            borderWidth: "1px 1px 0px 1px",
            borderStyle: "solid",
            marginRight: "1px",
            height: "28px",
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
            paddingBottom: "4px"
          }
        : {
            backgroundColor: this.props.muiTheme.palette.accent5Color,
            borderWidth: "1px 1px 0px 1px",
            borderStyle: "solid",
            marginRight: "1px",
            height: "28px",
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
            paddingBottom: "4px"
          };
    };
    return (
      <div>
        <h2>{dataTextDealName[0].value}</h2>
        <FlatButton
          onClick={() => this.handleChangeTabs("a")}
          label="Snap shot"
          style={sty(this.state.tab, "a")}
        />
        <FlatButton
          onClick={() => this.handleChangeTabs("b")}
          label="Review"
          style={sty(this.state.tab, "b")}
        />
        <FlatButton
          onClick={() => this.handleChangeTabs("c")}
          label="Review summary"
          style={sty(this.state.tab, "c")}
        />
        <FlatButton
          onClick={() => this.handleChangeTabs("d")}
          label="Financials"
          style={sty(this.state.tab, "d")}
        />
        {this.state.tab == "a" && (
          <Tab1
            selectedObj={this.props.selectedObj}
            selectFamily={[
              {
                name: "familymembers",
                label: "Family members",
                hint: "Family members",
                value: "familymembers",
                onchange: this.handleChangeFamily,
                style: {},
                select: "selectFamily",
                multi: true
              }
            ]}
          />
        )}

        {this.state.tab == "b" && <Tab2 selectedObj={this.props.selectedObj} />}

        {this.state.tab == "c" && <Tab3 selectedObj={this.props.selectedObj} />}

        {this.state.tab == "d" && <Tab4 selectedObj={this.props.selectedObj} />}
      </div>
    );
  }
}

export default muiThemeable()(DealForm);
