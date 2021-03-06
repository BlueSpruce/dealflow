import React, { Component } from "react";
//import PropTypes from 'prop-types';
import { connect } from "react-redux";
/*  TOdo CHANGE ACTION(S) **/
import { selector, acts } from "../actions";
import HTMLPreview from "../components/HTMLPreview";

import R from "ramda";

/* DOES NOT INCLUDE POSSIBLE FIELDS :  LOCATION?   ***/

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
  { field: "capitalCommitted", label: "Capital committed" },
  { field: "dealSummary", label: "Deal summary" },
  { field: "keyfacts", label: "Key facts" },
  { field: "prodBud", label: "Production budget" },
  { field: "financialProj", label: "Financial projections" },
  { field: "distribWaterfall", label: "Distribution waterfall" },
  { field: "recommendation", label: "Recommendation" }
];
const getConfig = n => {
  if (n == 1) {
    return templateConfig1;
  } else {
    return templateConfig2;
  }
};

class HTMLPreviewContainer extends Component {
  componentDidMount() {
    console.log("componentDidMount HTML PREVIEW ");
  }

  render() {
    return (
      <HTMLPreview
        data={this.props.selectedObj}
        config={getConfig(this.props.templateChosen)}
      />
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  selectedObj: state.data.projects
    ? state.data.projects[state.data.select - 1]
    : null
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  f: x => {
    dispatch(selector(x));
  },
  p: (name, value) => {
    dispatch(acts(name, value));
  }
  //acts = (name, value, id)
});
const HTMLPreviewContainer2 = connect(mapStateToProps, mapDispatchToProps)(
  HTMLPreviewContainer
);

export default HTMLPreviewContainer2;
