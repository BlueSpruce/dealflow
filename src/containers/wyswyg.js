import React, { Component } from "react";
//import PropTypes from 'prop-types';
import ReactQuill from "react-quill";
import { debounce } from "throttle-debounce";
import TextField from "material-ui/TextField";



class WyswygContainer extends Component {
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
      console.log('hcq '+value )
    // this.props.f("recommendation", value, this.props.data.Id);
  }
  handleChangeRecommendation = event => {
    console.log('handleChangeRecommendation')
    this.props.f("recommendation", event.target.value, this.props.data.Id);
  };

  render() {
    const {recommendation} = this.props.data

    return (
      <div>

          <TextField
              hintText={'hint'}
              floatingLabelText={'float'}
              name={'recommendation'}
              onChange={this.handleChangeRecommendation}
              value={recommendation}
              multiLine={true}
              rows={2}
            />


      </div>
    );
  }
}



export default WyswygContainer;
