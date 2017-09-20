import React, { Component } from "react";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import FormTextField from "./FormTextField";
import R from "ramda";
import muiThemeable from "material-ui/styles/muiThemeable";
import MyStatefulEditor from "../containers/rte";
import RichTextEditor from "react-rte-image";
import ReactQuill from "react-quill";
import theme from "react-quill/dist/quill.snow.css";

class ExecSummary1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "company",
      data: [this.props.data[0]]
    };
  }
  componentWillMount() {
    this.setState({ allData: this.props.data });
  }
  handleClick(w) {
    this.setState({ selected: w });
    const d = R.filter(item => item.name == w, this.props.data);
    this.setState({ data: d });
  }
  selectedRow(x) {
    return <FormTextField item={x} />;
  }
  render() {
    const sty = (a, b) => {
      return a == b
        ? {
            textDecoration: "none",
            fontSize: "20px",
            color: this.props.muiTheme.palette.accent5Color
          }
        : { textDecoration: "underline" };
    };
    return (
      <span>
        <div style={{ padding: "20px" }}>
          {this.state.allData.map(item => (
            <FlatButton
              label={item.label}
              primary={true}
              onClick={() => this.handleClick(item.name)}
              style={sty(this.state.selected, item.name)}
            />
          ))}
        </div>
        {this.state.data.map(x => this.selectedRow(x))}
      </span>
    );
  }
}

export default muiThemeable()(ExecSummary1);
