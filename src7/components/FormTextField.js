import React, { Component } from "react";
import TextField from "material-ui/TextField";

class FormTextField extends Component {
  render() {
    return (
      <TextField
        hintText={this.props.item.hint}
        floatingLabelText={this.props.item.label}
        name={this.props.item.name}
        ref={this.props.item.name}
        onChange={this.props.item.onchange}
        value={this.props.item.value ? this.props.item.value : ""}
        multiLine={this.props.item.multiLine}
        rows={this.props.item.rows}
        disabled={this.props.item.disabled}
        key={this.props.item.name}
      />
    );
  }
}

export default FormTextField;
