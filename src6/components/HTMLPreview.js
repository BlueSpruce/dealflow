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
      <div
        dangerouslySetInnerHTML={this.createMarkup(
          this.concatMarkup(data, config)
        )}
      />
    );
  }
}

export default HTMLPreview;
