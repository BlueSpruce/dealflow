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
          : <div>LOADING </div>}
      </div>
    );
  }
}

const f2 = (prjects, projTypes, projStatuses) => {
  //console.log(" fprojects " + JSON.stringify(prjects));
  if (!prjects) {
    return;
  }
  const getObj = (x, arr) => R.find(y => y.Id === x, arr);
  const getTypesObj = (x, prjTypes) => getObj(x.ProjectType_Id, prjTypes);
  ///NULL PROJECTS>STATUS ID CAUSES PROBLEMS
  ///const getStatusObj = (x, prjStatuses) => getObj("ede2986a-8ae1-45c4-bfa5-dc06c57bd59b", prjStatuses);
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
    /*
  projectTypes: [
    { Name: "TYPE ONE", Id: "dff212ef-2cf1-4917-a278-e3591720dc41" }
  ],

  projectStatuses: [
    {
      Name: "Active",
      Code: "",
      Icon: "",
      DisplayType: 0,
      Order: 3,
      IsDefaultValue: false,
      IsActive: true,
      ChartColor: "",
      Id: "fe3424aa-66ee-4dbd-90ec-0244cea112d4",
      IdExternal: null
    },
    {
      Name: "Active2",
      Code: "",
      Icon: "",
      DisplayType: 0,
      Order: 3,
      IsDefaultValue: false,
      IsActive: true,
      ChartColor: "",
      Id: "ede2986a-8ae1-45c4-bfa5-dc06c57bd59b",
      IdExternal: null
    }
  ]
*/
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
