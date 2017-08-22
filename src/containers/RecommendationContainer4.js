import React, { Component } from "react";
//import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { acts } from "../actions";
import ReactQuill from "react-quill";
import { debounce } from "throttle-debounce";
import Wyswyg from './wyswyg'

class RecommendationContainer extends Component {
  constructor(props) {
    super(props);

  }



  render() {
    return (
      <div>
{this.props.projects && this.props.select
      ? <Wyswyg data={this.props.selectedObj}   f={this.props.f}/>
      : null
    }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  //selectedObj : state.data.items[state.data.select]
  projects: state.data.projects,
  selectedObj: state.data.projects
    ? state.data.projects[state.data.select - 1]
    : null,
    select: state.data.select
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
