import React, { Component } from "react";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
//import Toggle from "material-ui/Toggle";
import DatePicker from "material-ui/DatePicker";
import Divider from "material-ui/Divider";
import theme from "react-quill/dist/quill.snow.css";

import MenuItem from "material-ui/MenuItem";

import FlatButton from "material-ui/FlatButton";

import { isNumber, numberAddCommas, numberDeleteCommas } from "../utils/utils";

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
  handleModal = () => {
    console.log("handleModal");
    this.setState({ modal: !this.state.modal });
  };
  handleChangeSelect2(value) {
    console.log("handleChangeSelect " + value.toString());
    this.props.f("reqcapital", value);
  }
  handleChangeSelect = (event, index, value) => {
    console.log("handleChangeSelect " + [index, value]);
    this.props.f("reqcapital", value);
  };
  handleChangePeople = (event, index, values) => {
    this.setState({ values });
    this.props.f("keypeople", values);
  };
  handleChangeFamily = (event, index, values) => {
    this.setState({ values });
    this.props.f("familymembers", values, this.props.selectedObj.Id);
  };
  handleChange = event => {
    console.log("handleChange name: " + event.target.name);
    //  Id:"d9d68a40-5f64-428e-b429-9cacf5586a69"
    this.props.f(
      event.target.name,
      event.target.value,
      this.props.selectedObj.Id
    );
  };

  handleCurrencyChange = event => {
    console.log("handleCurrencyChange name: " + event.target.value);
    if (isNumber(numberDeleteCommas(event.target.value)) === false) {
      return;
    }
    this.props.f(
      event.target.name,
      numberDeleteCommas(event.target.value),
      this.props.selectedObj.Id
    );
  };

  selectionRenderer = values => {
    console.log('selectionRenderer  values: '+values)

    return
    switch (values.length) {
      case 0:
        return "";
      case 1:
        return persons[values[0]].name;
      default:
        //  return `${values.length} names selected`;
        return values.map(v => persons[v].name + ", ");
    }
  };
  menuItems(arr) {
    return arr.map(item =>
      <MenuItem
        key={item.value}
        checked={this.state.values.indexOf(item.value) > -1}
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
      selectInvestment,
      selectSubTypeInvestment,
      selectLegal,
      selectBackground,
      selectReviewStatus,
      selectFinancials
    } = this.props;
    const actions = [
      <FlatButton label="Close" primary={true} onTouchTap={this.handleModal} />
    ];
    const getDate = d => new Date(d);
    return (
      <div>
        <form style={{ padding: 20 }}>
          <DatePicker
            hintText="Date initiated"
            floatingLabelText="Date intiated"
            container="inline"
            locale="en-US"
            value={getDate(selectedObj.ScheduleStartDate)}
            onChange={""}
          />
          <SelectField
            floatingLabelText="Family members"
            multiple={true}
            hintText="Family members"
            name="familymembers"
            value={selectedObj.familymembers}
            onChange={this.handleChangeFamily}
            selectionRenderer={this.selectionRenderer}
            style={{ height: 87 }}
          >
            {this.menuItems(selectFamily)}
          </SelectField>

          <SelectField
            floatingLabelText="Key people"
            multiple={true}
            hintText="Key people"
            name="keypeople"
            value={selectedObj.keypeople}
            onChange={this.handleChangePeople}
            selectionRenderer={this.selectionRenderer}
            style={{ height: 87 }}
          >
            {this.menuItems(persons)}
          </SelectField>
          <SelectField
            floatingLabelText="Lead person"
            multiple={false}
            hintText="Lead person"
            name="leadPerson"
            value={values}
            onChange={this.handleChangePeople}
            selectionRenderer={this.selectionRenderer}
            style={{ height: 87 }}
          >
            {this.menuItems(persons)}
          </SelectField>

          <TextField
            hintText="Deal name"
            floatingLabelText="Deal name"
            name="dealname"
            value={selectedObj.Name}
            onChange={this.handleChange}
          />
          <SelectField
            floatingLabelText="Investment type"
            multiple={true}
            hintText="Investment type"
            name="investmenttype"
            value={values}
            onChange={this.handleChangePeople}
            selectionRenderer={this.selectionRenderer}
            style={{ height: 87 }}
          >
            {this.menuItems(selectInvestment)}
          </SelectField>
          <SelectField
            floatingLabelText="Investment SubType"
            multiple={true}
            hintText="Investment SubType"
            name="investmentSubType"
            value={values}
            onChange={this.handleChangePeople}
            selectionRenderer={this.selectionRenderer}
            style={{ height: 87 }}
          >
            {this.menuItems(selectSubTypeInvestment)}
          </SelectField>

          <TextField
            hintText="Required minimum capital"
            floatingLabelText="Required minimum capital"
            name="minCapital"
            value={numberAddCommas(selectedObj.minCapital)}
            onChange={this.handleCurrencyChange}
          />
          <TextField
            hintText="Required maximum capital"
            floatingLabelText="Required maximum capital"
            name="maxCapital"
            value={numberAddCommas(selectedObj.maxCapital)}
            onChange={this.handleCurrencyChange}
          />
          <TextField
            hintText="Capital committed"
            floatingLabelText="Capital Committed"
            name="capitalCommitted"
            value={numberAddCommas(selectedObj.capitalCommitted)}
            onChange={this.handleCurrencyChange}
          />
          <DatePicker
            hintText="FUNDING DATE"
            floatingLabelText="Funding date"
            container="inline"
            locale="en-US"
            value={getDate()}
            onChange={""}
          />
          <SelectField
            floatingLabelText="Financials"
            multiple={true}
            hintText="Financials"
            name="financials"
            value={values}
            onChange={this.handleChangePeople}
            selectionRenderer={this.selectionRenderer}
            style={{ height: 87 }}
          >
            {this.menuItems(selectFinancials)}
          </SelectField>

          <SelectField
            floatingLabelText="Legal"
            multiple={true}
            hintText="Legal"
            name="legal"
            value={values}
            onChange={this.handleChangePeople}
            selectionRenderer={this.selectionRenderer}
            style={{ height: 87 }}
          >
            {this.menuItems(selectLegal)}
          </SelectField>

          <SelectField
            floatingLabelText="Background"
            multiple={true}
            hintText="Background"
            name="background"
            value={values}
            onChange={this.handleChangePeople}
            selectionRenderer={this.selectionRenderer}
            style={{ height: 87 }}
          >
            {this.menuItems(selectBackground)}
          </SelectField>

          <SelectField
            floatingLabelText="Review status"
            multiple={true}
            hintText="Review status"
            name="reviewStatus"
            value={values}
            onChange={this.handleChangePeople}
            selectionRenderer={this.selectionRenderer}
            style={{ height: 87 }}
          >
            {this.menuItems(selectReviewStatus)}
          </SelectField>

          <TextField
            hintText="STATUS NOTES"
            floatingLabelText="STATUS NOTES"
            name=""
            onChange={this.handleChange}
          />

          <div />

        </form>
      </div>
    );
  }
}

export default DealForm;
