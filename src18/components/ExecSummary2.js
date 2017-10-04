import React, { Component } from "react";
import muiThemeable from "material-ui/styles/muiThemeable";
import ReactQuill from "react-quill";
import theme from "react-quill/dist/quill.snow.css";
import FlatButton from "material-ui/FlatButton";
import R from "ramda";
class ExecSummary2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      savedValue: null,
      buttonDisabled: true,
      initialHandleChange: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  componentWillMount() {
    console.log("CWM data: " + this.props.data);
    this.setState({
      text: this.replaceExtraBreaks(this.props.data)
    });
  }
  componentDidMount() {
    console.log("CD M data: " + this.props.data);
    /*
    this.setState({
      text: this.replaceExtraBreaks(this.state.text)
    });
    */
  }
  /* replace break tags for ordered and unordered lists tags **/
  replaceExtraBreaks(str) {
    let s = null;
    s = R.replace(/(<p><br><\/p>)+<ul>/g, "<ul>", str);
    s = R.replace(/(<p><br><\/p>)+<ol>/g, "<ol>", s);
    return s;
  }
  handleChange(value) {
    console.log(
      "handleChange f ExecSummary2: " + [this.state.initialHandleChange, value]
    );

    this.setState({ text: value });
    if (!this.state.savedValue) {
      this.setState({ savedValue: value });
      return;
    }
    console.log("state.text : " + this.state.text);
    console.log("value : " + value);
    /*toggle save button */
  }
  handleSave() {
    console.log("handleSave");
    /*find and replace to set text */
    //  R.replace(/<br\/>/g, '', '<p><br/></p>');
    console.log("before REPLACE TEXT: " + this.state.text);
    const replaced = R.replace(/<p><br><\/p><ul>/g, "<ul>", this.state.text);
    console.log("REPLACED TEXT:  " + replaced);
    this.props.onsave(this.props.name, this.state.text);
    this.setState({ buttonDisabled: true });
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
          label="SAVE CHANGES"
          secondary={true}
          onClick={() => this.handleSave()}
          disabled={this.state.buttonDisabled}
        />
        <ReactQuill
          value={this.state.text}
          theme={"snow"}
          modules={modules}
          formats={formats}
          onChange={this.handleChange}
          onChangeSelection={() => this.setState({ buttonDisabled: false })}
        />
      </span>
    );
  }
}

export default muiThemeable()(ExecSummary2);
