import React, { Component } from "react";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

class TableSelectField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name
    };
  }
  menuItems(arrLoad, arrSave) {
    return arrLoad.map((item, i) => (
      <MenuItem
        key={"tsf" + i}
        checked={arrSave ? arrSave.indexOf(item.value.trim()) > -1 : null}
        value={item.value}
        primaryText={item.name}
      />
    ));
  }
  onchange = (event, index, value) => {
    //  console.log("tsf onchange value= " + [value, event.target.value]);
    this.props.change(this.state.name, value);
    //this.props.change(value);
  };
  render() {
    return (
      <SelectField
        value={this.props.save}
        onChange={this.onchange}
        autoWidth={true}
        name="test"
      >
        {this.menuItems(this.props.choices, this.props.save)}
      </SelectField>
    );
  }
}

export default TableSelectField;
