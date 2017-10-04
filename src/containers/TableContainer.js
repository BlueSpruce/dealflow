import React, { Component } from "react";
//import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { selector, acts } from "../actions";
import TableComponent from "../components/Table.js";
import { selectFinancials, selectLegal, selectBackground } from "../data";

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

});
const TableContainer2 = connect(mapStateToProps, mapDispatchToProps)(
  TableContainer
);

export default TableContainer2;
