import React, { Component } from "react";
//import PropTypes from 'prop-types';
import { connect } from "react-redux";
/*  TOdo CHANGE ACTION(S) **/
import { selector, acts } from "../actions";
import HTMLPreview from "../components/HTMLPreview";

import R from "ramda";

const templateConfig = [
  {
    number: 0,
    fields: ["NONE"]
  },
  {
    number: 1,
    fields: ["recommendRating"]
  },
  {
    number: 2,
    fields: ["recommendRating", "recommendation"]
  },
  {
    number: 3,
    fields: ["keyfacts"]
  }
];

class HTMLPreviewContainer extends Component {
  componentDidMount() {
    console.log("componentDidMount HTML PREVIEW ");
  }

  render() {
    return (
      <HTMLPreview
        data={this.props.selectedObj}
        config={templateConfig[this.props.templateChosen]["fields"]}
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
