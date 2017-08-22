import React, { Component } from "react";
//import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { selector } from "../actions";
import DealTable from "../components/Table";
import { capitalMapping } from "../data";

import R from "ramda";

class TableContainer extends Component {
  componentWillMount() {
    console.log("TABLE CONTAINER WILL MOUNT");
    console.log("this prosp projects   :" + this.props.projects);
    this.props.f(1);
  }
  render() {
    console.log("projectStatuses " + this.props.projectStatuses);
    return (
      <div>
        {this.props.projects
          ? <DealTable
              onselect={this.props.f}
              data={this.props.items}
              capitalMapping={capitalMapping}
              select={[this.props.select]}
            />
          : <div>LOADING...</div>}
      </div>
    );
  }
}

const f2 = (prjects, projTypes, projStatuses) => {
  //console.log(" fprojects " + JSON.stringify(prjects));
  if (!prjects || projTypes || projStatuses) {
    return;
  }
  const getObj = (x, arr) => R.find(y => y.Id === x, arr);
  const getTypesObj = (x, prjTypes) => getObj(x.ProjectType_Id, prjTypes);
   
  const getStatusObj = (x, prjStatuses) => getObj(x.ProjectStatus_Id, prjStatuses);
    const strName = x => {
      if (!x) {
        return;
      }
      return R.prop("Name", x);
    };

  const d1 = R.map(
      x => R.merge(x, { projectType: strName(getTypesObj(x, projTypes)) }),
      prjects
    );

  const d2 = R.map(
      x => R.merge(x, { statusType: strName(getStatusObj(x, projStatuses)) }),
      d1
    );

  //console.log("d2 " + JSON.stringify(d2));

  return d2;
};
const mapStateToProps = (state, ownProps) => ({
  items: state.data.projects
    ? f2(
        state.data.projects,
        state.data.projectTypes,
        state.data.projectStatuses
      )
    : state.data.items,
  select: state.data.select,
  projects: f2(
    state.data.projects,
    state.data.projectTypes,
    state.data.projectStatuses
  ),

  });

const mapDispatchToProps = (dispatch, ownProps) => ({
  f: x => {
    dispatch(selector(x));
  },

  onClick2: id => {
    //dispatch(deleteNotification(id));
  }
});
const TableContainer2 = connect(mapStateToProps, mapDispatchToProps)(
  TableContainer
);

export default TableContainer2;
