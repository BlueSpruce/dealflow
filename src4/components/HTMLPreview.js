import React, { Component } from "react";
class HTMLPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>HTML PREVIEW for {this.props.data.Name}</h1>
      </div>
    );
  }
}

export default HTMLPreview;
