import React, { Component } from "react";
//import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { acts } from "../actions";
import ReactQuill from "react-quill";
import { debounce } from "throttle-debounce";

import MyStatefulEditor from "./rte";

class RecommendationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      prevId: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(value) {
    console.log(
      "RC handleChange " + [value.toString(), this.props.selectedObj.Id]
    );
    //this.props.f("recommendation", value.toString(),this.props.selectedObj.Id);
    this.props.f("recommendation", value.toString(), this.state.prevId);
    console.log(
      "RC id,prevId " + [this.props.selectedObj.Id, this.state.prevId]
    );
    if (this.props.selectedObj.Id !== this.state.prevId) {
      this.setState({ prevId: this.props.selectedObj.Id });
    }

    this.setState({ value: value.toString() });
  }

  fCall(id) {
    //  console.log('fCall '+[this.props.selectedObjId,this.state.value])
  }

  componentWillReceiveProps(nextProps) {
    //console.log("componentWillReceiveProps " + nextProps.p);
    //console.log("RC cwrp: " + [nextProps.selectedObjId, this.props.selectedObjId]);
    if (nextProps.selectedObjId !== this.props.selectedObjId) {
      //  console.log("HERE");
      this.fCall(this.props.selectedObjId);
      /*
      if(this.state.value){
        this.props.f("recommendation",this.state.value,this.props.selectedObjId);
      }
      */
    }
  }

  render() {
    return (
      <div>
        {this.props.projects && this.props.select ? (
          <MyStatefulEditor
            onChange={this.handleChange}
            p={this.props.recommendation}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  recommendation: state.data.projects
    ? state.data.projects[state.data.select - 1].recommendation
    : "null",
  projects: state.data.projects ? state.data.projects : null,
  selectedObj: state.data.projects
    ? state.data.projects[state.data.select - 1]
    : null,
  select: state.data.select,
  selectedObjId: state.data.projects
    ? state.data.projects[state.data.select - 1].Id
    : null
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  f: (name, value, id) => {
    dispatch(acts(name, value, id));
  },

  onClick2: id => {
    //dispatch(deleteNotification(id));
  }
});
const RecommendationContainer2 = connect(mapStateToProps, mapDispatchToProps)(
  RecommendationContainer
);
export default RecommendationContainer2;
