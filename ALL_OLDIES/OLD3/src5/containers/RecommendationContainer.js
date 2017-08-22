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
    this.props.f("quill", value,this.props.selectedObj.Id);
  }

  render() {
    return (
      <div>
        <ReactQuill
          onChange={debounce(500, this.handleChangeQuill)}
          placeholder={this.props.placeholder}
          value={this.props.selectedObj.quill}
          theme={"snow"}
          modules={this.modules}
          formats={this.formats}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  //selectedObj : state.data.items[state.data.select]
  selectedObj: state.data.projects ? state.data.projects[state.data.select-1] : state.data.items[state.data.select-1]
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
