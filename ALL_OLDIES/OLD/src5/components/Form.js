import React, { Component } from "react";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import Toggle from "material-ui/Toggle";
import DatePicker from "material-ui/DatePicker";
import Divider from "material-ui/Divider";

class DealForm extends Component {
  constructor(props) {
    super(props);
  }
  handleChange = event => {
    console.log("handleChange name: " + event.target.name);
    const name = event.target.name;
    const value = event.target.value;
    const newObj = Object.assign({}, this.props.selectedObj, { [name]: value });
    this.props.f(newObj);
  };
  render() {
    return (
      <form style={{ padding: 20 }}>
        <TextField
          hintText="Date received"
          floatingLabelText="Date received"
          name="dateReceived"
          fullWidth={true}
          value={this.props.selectedObj.dateReceived}
          onChange={this.handleChange}
        />
        <TextField
          hintText="Family members"
          floatingLabelText="Family members"
          name="familymembers"
          fullWidth={true}
          value={this.props.selectedObj.familymembers}
          onChange={this.handleChange}
        />
        <TextField
          hintText="Deal name"
          floatingLabelText="Deal name"
          name="dealname"
          fullWidth={true}
          value={this.props.selectedObj.dealname}
          onChange={this.handleChange}
        />
        <TextField
          hintText="investmenttype"
          floatingLabelText="investmenttype"
          name="investmenttype"
          fullWidth={true}
          value={this.props.selectedObj.investmenttype}
          onChange={this.handleChange}
        />
        <TextField
          hintText="financials"
          floatingLabelText="investmenttype"
          name="financials"
          fullWidth={true}
          value={this.props.selectedObj.financials}
          onChange={this.handleChange}
        />
        <Divider />
      </form>
    );
  }
}

export default DealForm;
