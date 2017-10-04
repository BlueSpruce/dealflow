import React, { Component } from "react";
import muiThemeable from "material-ui/styles/muiThemeable";
import ExecSummary2 from "./ExecSummary2";
class Tab4 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    this.setState({ selectFamily: this.props.selectFamily });
  }
  handleSave = (name, value) => {
    console.log("handleSave " + [name, value]);
    this.props.f(name, value);
  };

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
          <ExecSummary2
            data={this.props.selectedObj.totalProdCap}
            label="Total production capitalization"
            name="totalProdCap"
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
            data={this.props.selectedObj.prodBud}
            label="Production budget"
            name="prodBud"
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
            data={this.props.selectedObj.financialProj}
            label="Financial projections"
            name="financialProj"
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
            data={this.props.selectedObj.distribWaterfall}
            label="Distribution waterfall"
            name="distribWaterfall"
            onsave={this.handleSave}
          />
        </div>
      </div>
    );
  }
}

export default muiThemeable()(Tab4);
