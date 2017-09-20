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
import {
  capitalMapping,
  selectFamily,
  selectKeyPeople,
  selectInvestment,
  selectSubTypeInvestment,
  selectFinancials,
  selectLegal,
  selectBackground,
  selectReviewStatus,
  selectLeadPerson
} from "../data";

class Tab3 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    this.setState({ selectFamily: this.props.selectFamily });
  }
  menuItems(arrLoad, arrSave, name) {
    console.log("menuItems " + arrLoad);
    return arrLoad.map((item, i) => (
      <MenuItem
        key={"fs" + i}
        checked={arrSave ? arrSave.indexOf(item.value) > -1 : null}
        value={item.value}
        primaryText={item.name}
      />
    ));
  }
  render() {
    const arr = [
      {
        name: "familymembers",
        label: "Family members",
        hint: "Family members",
        value: "familymembers",
        onchange: this.handleChangeFamily,
        style: {},
        select: this.props.selectFamily,
        multi: true
      }
    ];

    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginRight: "40px"
          }}
        >
          <SelectField
            name="recommendationRating"
            floatingLabelText="Recommendation rating"
          >
            {this.menuItems(
              [
                { name: 1, value: 1 },
                { name: 2, value: 2 },
                { name: 3, value: 3 },
                { name: 4, value: 4 },
                { name: 5, value: 5 }
              ],
              this.props.save
            )}
          </SelectField>
          <div
            style={{
              fontWeight: 600,
              paddingTop: "15px",
              borderWidth: "2px",
              borderStyle: "solid",
              margin: "4px"
            }}
          >
            <span style={{ marginLeft: "10px" }}>Recommendation</span>
            <ExecSummary2 />
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
            <span style={{ marginLeft: "10px" }}>Key facts</span>
            <ExecSummary2 />
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
            <span style={{ marginLeft: "10px" }}>Investment overview</span>
            <ExecSummary2 />
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
            <span style={{ marginLeft: "10px" }}>Deal summary</span>
            <ExecSummary2 />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginRight: "40px"
          }}
        />
      </div>
    );
  }
}

export default muiThemeable()(Tab3);
