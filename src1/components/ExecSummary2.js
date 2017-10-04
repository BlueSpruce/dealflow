import React, { Component } from "react";
import muiThemeable from "material-ui/styles/muiThemeable";
import ReactQuill from "react-quill";
import theme from "react-quill/dist/quill.snow.css";

class ExecSummary2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "Deal summary"
    };
  }
  componentWillMount() {}

  selectedRow(x) {
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
    return <ReactQuill theme={"snow"} modules={modules} formats={formats} />;
  }

  render() {
    return <span>{this.selectedRow("1")}</span>;
  }
}

export default muiThemeable()(ExecSummary2);
