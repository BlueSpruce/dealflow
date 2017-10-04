import React, { Component } from "react";
import moment from "moment";
import { numberAddCommas, prependDollarSign } from "../utils/utils";
class HTMLPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  createMarkup(text) {
    return { __html: text };
  }
  concatMarkup(data, config) {
    let markup = moment().format(" MMMM Do, YYYY");
    config.map(
      item => (markup += `<h3>${item.label}</h3>` + data[item.field] + "<br />")
    );
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
