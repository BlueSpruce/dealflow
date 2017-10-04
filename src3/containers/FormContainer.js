import React, { Component } from "react";
//import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { acts } from "../actions";
import DealForm from "../components/Form";
import {
  capitalMapping,
  selectFamily,
  selectKeyPeople,
  selectInvestment,
  selectSubTypeInvestment,
  selectFinancials,
  selectLegal,
  selectBackground,
  selectReviewStatus,
  selectLeadPerson
} from "../data";

const dataSelectFields = [
  {
    name: "familymembers",
    label: "Family members",
    hint: "Family members",
    value: "familymembers",
    onchange: this.handleChangeFamily,
    style: {},
    select: selectFamily,
    multi: true
  },
  {
    name: "leadPerson",
    label: "Lead person",
    hint: "Lead person",
    value: "leadPerson",
    onchange: this.handleChangeLeadPerson,
    style: {},
    select: selectLeadPerson,
    multi: false
  },
  {
    name: "industry",
    label: "Industry type",
    hint: "Industry type",
    value: "industry",
    onchange: this.handleChangeInvestmentType,
    style: {},
    select: selectInvestment,
    multi: true
  },
  {
    name: "industrysubtype",
    label: "Industry SubType",
    hint: "Industry SubType",
    value: "industrysubtype",
    onchange: this.handleChangeInvestmentSubType,
    style: {},
    select: selectSubTypeInvestment,
    multi: true
  },
  {
    name: "financials",
    label: "Financials",
    hint: "Financials",
    value: "financials",
    onchange: this.handleChangeFinancials,
    style: {},
    select: selectFinancials
  },
  {
    name: "legal",
    label: "Legal",
    hint: "Legal",
    value: "legal",
    onchange: this.handleChangeLegal,
    style: {},
    select: selectLegal
  },
  {
    name: "background",
    label: "Background",
    hint: "Background",
    value: "background",
    onchange: this.handleChangeBackground,
    style: {},
    select: selectBackground
  },
  {
    name: "reviewStatus",
    label: "Review status",
    hint: "Review status",
    value: "reviewStatus",
    onchange: this.handleChangeReviewStatus,
    style: {},
    select: selectReviewStatus
  }
];

class FormContainer extends Component {
  render() {
    return (
      <div>
        {this.props.projects && this.props.select ? (
          <DealForm
            f={this.props.f}
            selectedObj={this.props.selectedObj}
            multipleOptions={dataSelectFields}
          />
        ) : (
          <div>LOADING </div>
        )}
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
const FormContainer2 = connect(mapStateToProps, mapDispatchToProps)(
  FormContainer
);

export default FormContainer2;
