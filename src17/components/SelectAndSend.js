import React, { Component } from "react";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";
import RaisedButton from "material-ui/RaisedButton";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import muiThemeable from "material-ui/styles/muiThemeable";
//import HTMLPreviewContainer from "../containers/HTMLPreviewContainer.js";
import HTMLPreview from "./HTMLPreview";
import R from "ramda";
export const emailData = [
  { name: "Keyperson 1", value: "Keyperson 1" },
  { name: "Keyperson 2", value: "Keyperson 2" },
  { name: "Keyperson 3", value: "Keyperson 3" }
];
const templateConfig1 = [
  { field: "Name", label: "Deal name" },
  { field: "dealSummary", label: "Deal summary" },
  { field: "recommendation", label: "Recommendation" }
];
const templateConfig2 = [
  { field: "Name", label: "Name" },
  { field: "company", label: "Company" },
  { field: "industrysubtype", label: "Investment sub type (Production type)" },
  { field: "investmentOverview", label: "Investment overview" },
  { field: "totalProdCap", label: "Total production capitalization" },
  {
    field: "capitalCommitted",
    label: "Capital committed",
    func: "R.compose(numberAddCommas,prependDollarSign)"
  },
  { field: "dealSummary", label: "Deal summary" },
  { field: "keyfacts", label: "Key facts" },
  { field: "prodBud", label: "Production budget" },
  { field: "financialProj", label: "Financial projections" },
  { field: "distribWaterfall", label: "Distribution waterfall" },
  { field: "recommendation", label: "Recommendation" }
];

const getTemplate = n => {
  if (n == 1) {
    return templateConfig1;
  } else {
    return templateConfig2;
  }
};

const mergeObjAndArr = (obj, arr) => {
  const newArr = [];
  R.map(x => newArr.push({ field: obj[x.field], label: x.label }), arr);
  return newArr;
};
class SelectAndSend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      template: 1
    };
  }
  onRadio(value) {
    console.log("onradio f " + value);
    this.setState({ template: value });
  }
  render() {
    const { primary2Color } = this.props.muiTheme.palette;
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div>
          <h4 style={{ color: primary2Color }}>
            Create a customized executive summary...
          </h4>
          <div style={{ padding: "20px" }}>
            1) Select recipient of executive summary (optional)<br />
            <SelectField
              value={"person1"}
              multiple={true}
              name={"email"}
              style={{ padding: "20px" }}
            >
              <MenuItem
                key={"email" + 1}
                value={"person1"}
                primaryText={"Mr. Person"}
              />
              <MenuItem
                key={"email" + 2}
                value={"person2"}
                primaryText={"Mrs. Person"}
              />
              <MenuItem
                key={"email" + 3}
                value={"person3"}
                primaryText={"Ms. Person"}
              />
            </SelectField>
          </div>

          <div style={{ padding: "20px" }}>
            2) Select a template
            <RadioButtonGroup
              name="template"
              defaultSelected="1"
              style={{ padding: "20px" }}
              onChange={event => this.onRadio(event.target.value)}
            >
              <RadioButton value="1" label="Iris" />
              <RadioButton value="2" label="Rick" />
            </RadioButtonGroup>
          </div>

          <div style={{ padding: "20px" }}>
            3) Create executive summary<br />
            <RaisedButton
              label="Create"
              backgroundColor={this.props.muiTheme.palette.accent5Color}
              style={{
                marginTop: "20px",
                marginLeft: "20px"
              }}
            />
          </div>
        </div>
        <div
          style={{
            borderStyle: "solid",
            borderWidth: " 0px 0px 0px 2px",
            padding: "20px"
          }}
        />
        <div>
          <HTMLPreview
            data={mergeObjAndArr(
              this.props.data,
              getTemplate(this.state.template)
            )}
          />
        </div>
      </div>
    );
  }
}

export default muiThemeable()(SelectAndSend);
