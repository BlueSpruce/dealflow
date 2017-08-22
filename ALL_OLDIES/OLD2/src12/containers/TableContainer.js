import React, { Component } from "react";
//import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { selector } from "../actions";
import DealTable from "../components/Table";
import { capitalMapping } from "../data";

class TableContainer extends Component {
  render() {
    return (
      <div>
        <DealTable
          onselect={this.props.f}
          data={this.props.items}
          capitalMapping={capitalMapping}
          select={[this.props.select]}
        />

      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  items: state.data.items,
  select: state.data.select
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
