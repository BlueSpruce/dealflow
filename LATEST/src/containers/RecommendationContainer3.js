import React, { Component } from "react";
//import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { acts } from "../actions";
import ReactQuill from "react-quill";
import { debounce } from "throttle-debounce";


class RecommendationContainer extends Component {
  constructor(props) {
    super(props);
    this.handleChangeQuill = this.handleChangeQuill.bind(this);
    this.state = {
      recommendation:null,
      previousSelect:null,
    }
  }
  modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" }
      ],
      ["link", "image"],
      ["clean"],
      [{ color: [] }, { background: [] }]
    ]
  };
  formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "background"
  ];
  handleChangeQuill(value){
  console.log('hcq '+[this.state.previousSelect,this.props.select])
      this.setState({recommendation:value})
      this.props.f("recommendation", value, this.props.selectedObj.Id);
      this.setState({previousSelect: this.props.select ?  this.props.select : null})
      /*
      if(this.state.previousSelect == this.props.select){
        console.log('hcq2 here ')
          this.setState({previousSelect: this.props.select ?  this.props.select : null})
      }
      */
/*

SOMETHING LIKE....
STATE.SELECT = PROPS.select
IFSTATE.SELECT = PREVIOUS.STATE
    if(this.state.previousSelect == this.props.select){
      console.log('handleChangeQuill1:  ')
      this.setState({recommendation:value})
      this.props.f("recommendation", value, this.props.selectedObj.Id);
    }else{
      console.log('handleChangeQuill2: '+[this.state.previousSelect,this.props.select])
      this.setState({recommendation:this.props.selectedObj.recommendation ? this.props.selectedObj.recommendation : null})
      this.setState({previousSelect: this.props.select ?  this.props.select : null})
      this.setState({previousSelectedObj: this.props.selectedObj ?  this.props.selectedObj : null})

    }
  */
  }

  fValue(){
    if(this.state.previousSelect == this.props.select){
      return this.state.recommendation;
    }else{
      return this.props.selectedObj.recommendation ? this.props.selectedObj.recommendation : null
    }
  }

  render() {
    return (
      <div>
{this.props.select ?
        <ReactQuill
          onChange={debounce(1000, this.handleChangeQuill)}
          placeholder={this.props.placeholder}
          value={() => this.state.recommendation}
          theme={"snow"}
          modules={this.modules}
          formats={this.formats}
        />
      : null
    }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  select: state.data.projects ? state.data.select-1 : null,
  selectedObj: state.data.projects ? state.data.projects[state.data.select-1] : null,
  recommendation: state.data.projects ? state.data.projects[state.data.select-1].recommendation : null,
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  f: (name, value, id) => {
    //UNDO!!!!!!!!!!!
    //dispatch(acts(name, value, id));
  },

  onClick2: id => {
    //dispatch(deleteNotification(id));
  }
});
const RecommendationContainer2 = connect(mapStateToProps, mapDispatchToProps)(
  RecommendationContainer
);

export default RecommendationContainer2;
