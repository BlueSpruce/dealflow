import React, { Component } from "react";
//import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { acts } from "../actions";
import DealForm from "../components/Form";

import { capitalMapping } from "../data";

class FormContainer extends Component {
  render() {
    return (
      <div>
        <DealForm
          f={this.props.f}
          selectedObj={this.props.selectedObj}
          capitalMapping={capitalMapping}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  //selectedObj : state.data.selectedObj
  selectedObj: state.data.items[state.data.select - 1]
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  f: (name, value) => {
    dispatch(acts(name, value));
  },

  onClick2: id => {
    //dispatch(deleteNotification(id));
  }
});
const FormContainer2 = connect(mapStateToProps, mapDispatchToProps)(
  FormContainer
);

export default FormContainer2;
