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
  selectLeadPerson,
  selectRecommendationRating
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

  handleSave = (name, value) => {
    console.log("handleSave " + [name, value]);
    this.props.f(name, value);
  };

  render() {
    const arr = [
      {
        name: "recommendRating",
        label: "Recommendation rating",
        hint: "Recommendation rating",
        value: "recommendRating",
        onchange: this.handleChangeFamily,
        style: {},
        select: selectRecommendationRating,
        multi: false
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
          {this.fSelect(arr[0])}
          <div
            style={{
              fontWeight: 600,
              paddingTop: "15px",
              borderWidth: "2px",
              borderStyle: "solid",
              margin: "4px"
            }}
          >
            <ExecSummary2
              data={this.props.selectedObj.recommendation}
              label="Recommendation"
              name="recommendation"
              onsave={this.handleSave}
            />
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
            <ExecSummary2
              data={this.props.selectedObj.keyfacts}
              label="Key facts"
              name="keyfacts"
              onsave={this.handleSave}
            />
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
            <ExecSummary2
              data={this.props.selectedObj.investmentOverview}
              label="Investment overiew"
              name="investmentOverview"
              onsave={this.handleSave}
            />
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
            <ExecSummary2
              data={this.props.selectedObj.dealSummary}
              label="Deal summary"
              name="dealSummary"
              onsave={this.handleSave}
            />
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
