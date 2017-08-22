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
    this.state = {select: this.props.select -1,
       previousState: 0,
       currentText:'',
       previousSelectObj :''

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
  handleChangeQuill(value) {
    if(this.props.select == this.state.previousState){
      console.log('handleChangeQuill return '+[this.state.select, this.state.previousState])
      this.setState({currentText: value})
      this.setState({previousSelectObj: this.props.selectedObj})
      return
    }else{
      console.log('handleChangeQuill set previousState')
      this.setState({previousState:this.props.select})
      this.props.f("recommendation", this.state.currentText,this.state.previousSelectObj.Id);
    }
  }

  render() {
    return (
      <div>
{this.props.selectedObj ?
        <ReactQuill
          onChange={debounce(5, this.handleChangeQuill)}
          placeholder={this.props.placeholder}
          value={this.props.selectedObj.recommendation}
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
select: state.data.select - 1,
  selectedObj: state.data.projects ? state.data.projects[state.data.select-1] : null
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  f: (name, value, id) => {
    dispatch(acts(name, value, id));
  },

  onClick2: id => {
    //dispatch(deleteNotification(id));
  }
});
const RecommendationContainer2 = connect(mapStateToProps, mapDispatchToProps)(
  RecommendationContainer
);

export default RecommendationContainer2;
