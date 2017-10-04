import React, { Component } from "react";
class HTMLPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  createMarkup(text) {
    return { __html: text };
  }
  concatMarkup(data, config) {
    let markup = "";
    config.map(item => (markup += data[item]));
    return markup;
  }
  render() {
    const { data, config } = this.props;
    const allText = "";
    return (
      <div>
        <div>test1</div>
        <div>{this.concatMarkup(data, config)}</div>
      </div>
    );
  }
}

export default HTMLPreview;
