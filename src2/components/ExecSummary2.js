import React, { Component } from "react";
import muiThemeable from "material-ui/styles/muiThemeable";
import ReactQuill from "react-quill";
import theme from "react-quill/dist/quill.snow.css";
import FlatButton from "material-ui/FlatButton";
class ExecSummary2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //selected: "Deal summary"
      text: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  componentWillMount() {
    this.setState({ text: this.props.data });
  }
  handleChange(value) {
    console.log("handleChange f ExecSummary2 " + value);
    this.setState({ text: value });
  }
  handleSave() {
    console.log("handleSave");
    this.props.onsave(this.props.name, this.state.text);
  }

  render() {
    const modules = {
      toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" }
        ],
        ["link", "image"],
        ["clean"]
      ]
    };
    const formats = [
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
      "image"
    ];
    return (
      <span>
        <span style={{ marginLeft: "10px" }}>{this.props.label}</span>
        <FlatButton
          label="SAVE"
          secondary={true}
          onClick={() => this.handleSave()}
        />
        <ReactQuill
          value={this.state.text}
          theme={"snow"}
          modules={modules}
          formats={formats}
          onChange={this.handleChange}
        />
      </span>
    );
  }
}

export default muiThemeable()(ExecSummary2);
