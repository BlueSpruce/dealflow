import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { selector } from "../actions";
import DealTable from '../components/Table'

class TableContainer extends Component {

  render() {

    return (
      <div>
      <DealTable onselect={this.props.f} data={this.props.items}/>

      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
 items : state.data.items
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
