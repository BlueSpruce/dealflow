import React, { Component } from "react";
import R from "ramda";
import FlatButton from "material-ui/FlatButton";
import FormTextField from "./FormTextField";
import FormSelectField from "./FormSelectField";
import muiThemeable from "material-ui/styles/muiThemeable";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import MyStatefulEditor from "../containers/rte";
import RichTextEditor from "react-rte-image";
import ReactQuill from "react-quill";
import theme from "react-quill/dist/quill.snow.css";
import ExecSummary2 from "./ExecSummary2";
class Tab4 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    this.setState({ selectFamily: this.props.selectFamily });
  }

  render() {
    return (
      <div>
        <div
          style={{
            fontWeight: 600,
            paddingTop: "15px",
            borderWidth: "2px",
            borderStyle: "solid",
            margin: "4px"
          }}
        >
          <span style={{ marginLeft: "10px" }}>
            Total production capitalization
          </span>
          <ExecSummary2 data={this.props.selectedObj.totalProdCap} />
        </div>
        <div
          style={{
            fontWeight: 600,
            paddingTop: "15px",
            borderWidth: "2px",
            borderStyle: "solid",
            margin: "4px"
          }}
        >
          <span style={{ marginLeft: "10px" }}>Production budget</span>
          <ExecSummary2 data={this.props.selectedObj.prodBud} />
        </div>
        <div
          style={{
            fontWeight: 600,
            paddingTop: "15px",
            borderWidth: "2px",
            borderStyle: "solid",
            margin: "4px"
          }}
        >
          <span style={{ marginLeft: "10px" }}>Financial projections</span>
          <ExecSummary2 data={this.props.selectedObj.financialProj} />
        </div>
        <div
          style={{
            fontWeight: 600,
            paddingTop: "15px",
            borderWidth: "2px",
            borderStyle: "solid",
            margin: "4px"
          }}
        >
          <span style={{ marginLeft: "10px" }}>Distribution waterfall</span>
          <ExecSummary2 data={this.props.selectedObj.distribWaterfall} />
        </div>
      </div>
    );
  }
}

export default muiThemeable()(Tab4);
