import React, { Component } from "react";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

class FormSelectField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name
    };
  }
  menuItems(arrLoad, arrSave, name) {
    return arrLoad.map((item, i) => (
      <MenuItem
        key={"fs" + i}
        checked={arrSave ? arrSave.indexOf(item.value) > -1 : null}
        value={item.value}
        primaryText={item.name}
      />
    ));
  }

  onchange = (event, index, value) => {
    this.props.onchange(this.state.name, value);
  };
  render() {
    return (
      <SelectField
        floatingLabelText={this.props.item.label}
        hint={this.props.item.hint}
        value={this.props.save}
        onChange={this.onchange}
        multiple={this.props.item.multi}
        style={this.props.item.style}
        name={this.props.item.name}
      >
        {this.menuItems(this.props.choices, this.props.save)}
      </SelectField>
    );
  }
}

export default FormSelectField;
