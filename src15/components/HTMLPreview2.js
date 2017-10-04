import React, { Component } from "react";
class HTMLPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  createMarkup(text) {
    return { __html: text };
  }

  render() {
    const { data, fields } = this.props;
    return (
      <div>
        <h1>HTML PREVIEW for deal: {data.Name}</h1>

        <div
          dangerouslySetInnerHTML={this.createMarkup(
            `Recommendation rating: ${data.recommendRating}`
          )}
        />

        <div
          dangerouslySetInnerHTML={this.createMarkup(
            `Recommendation : ${data.recommendation}`
          )}
        />
      </div>
    );
  }
}

export default HTMLPreview;
