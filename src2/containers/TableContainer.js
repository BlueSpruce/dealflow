import React, { Component } from "react";
//import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { selector, acts } from "../actions";
import DealTable from "../components/Table";
import TableComponent from "../components/Table.js";
//import { capitalMapping } from "../data";
import { selectFinancials, selectLegal, selectBackground } from "../data";

import R from "ramda";

class TableContainer extends Component {
  componentDidMount() {
    console.log("componentDidMount Table ");
    this.props.f(1);
  }

  render() {
    return (
      <div>
        {this.props.projects ? (
          <TableComponent
            onselect={this.props.f}
            onEdit={this.props.onEdit}
            data={this.props.projects}
            select={[this.props.select]}
            selectFinancials={selectFinancials}
            selectLegal={selectLegal}
            selectBackground={selectBackground}
            change={this.props.p}
          />
        ) : (
          <div>LOADING...</div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  select: state.data.select,
  projects: state.data.projects
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
const TableContainer2 = connect(mapStateToProps, mapDispatchToProps)(
  TableContainer
);

export default TableContainer2;
