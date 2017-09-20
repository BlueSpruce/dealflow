import React, { Component } from "react";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

class TableSelectField extends Component {
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
  render() {
    return (
      <SelectField value={this.props.save} autoWidth={true}>
        {this.menuItems(this.props.choices, this.props.save)}
      </SelectField>
    );
  }
}

export default TableSelectField;
