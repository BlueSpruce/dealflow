import React, { Component } from "react";
//import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { acts } from "../actions";
import DealForm from "../components/Form";
import { capitalMapping, selectFamily, selectInvestment, selectSubTypeInvestment,selectFinancials,selectLegal,
selectBackground, selectReviewStatus } from "../data";

class FormContainer extends Component {
  render() {
    return (
      <div>
        <DealForm
          f={this.props.f}
          selectedObj={this.props.selectedObj}
          capitalMapping={capitalMapping}
          selectFamily ={selectFamily}
          selectInvestment = {selectInvestment}
          selectSubTypeInvestment = {selectSubTypeInvestment}
          selectFinancials = {selectFinancials}
          selectLegal = {selectLegal}
          selectBackground = {selectBackground}
          selectReviewStatus = {selectReviewStatus}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  //selectedObj : state.data.items[state.data.select]
  selectedObj: state.data.projects ? state.data.projects[state.data.select] : state.data.items[state.data.select]
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
