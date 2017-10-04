import React, { Component } from "react";
//import RichTextEditor from "react-rte";
import RichTextEditor from "react-rte-image";

class MyStatefulEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value:
        this.props.p === ""
          ? RichTextEditor.createEmptyValue()
          : RichTextEditor.createValueFromString(this.props.p, "html")
    };
  }
  componentWillReceiveProps(nextProps) {
    //console.log("componentWillReceiveProps " + nextProps.p);
    //console.log("cwrp: " + [nextProps.p, this.state.value.toString("html")]);
    if (nextProps.p !== this.state.value.toString("html")) {
      //  console.log("HERE");
      this.setState({
        value: nextProps.p
          ? RichTextEditor.createValueFromString(nextProps.p, "html")
          : RichTextEditor.createEmptyValue()
      });
    }
  }
  onChange = value => {
    console.log("RTE ON CHANGE " + value.toString("html"));
    this.setState({ value });
    this.props.onChange(value.toString("html"));
  };
  bubbleUp = () => {
    console.log("bubbleUp");
    this.props.onChange(this.state.value.toString("html"));
  };
  onBlur = value => {
    console.log("RTE ON BLURRR");
    //  this.setState({ value });
    this.bubbleUp();
    //console.log("ONBLUR " +value.toString("html"));
    //this.props.onChange(value.toString("html"));
  };
  render() {
    return (
      <RichTextEditor
        value={this.state.value}
        onChange={this.onChange}
        onBlur={this.onBlur}
      />
    );
  }
}
export default MyStatefulEditor;
