import React, { Component } from "react";
import moment from "moment";
//import { numberAddCommas, prependDollarSign } from "../utils/utils";
class HTMLPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  createMarkup(text) {
    return { __html: text };
  }
  concatMarkup(data) {
    let markup = moment().format(" MMMM Do, YYYY");
    data.map(
      item => (markup += `<h3>${item.label}</h3>` + item.field + "<br />")
    );
    return markup;
  }
  render() {
    const { data } = this.props;
    return (
      <div
        dangerouslySetInnerHTML={this.createMarkup(this.concatMarkup(data))}
      />
    );
  }
}

export default HTMLPreview;
