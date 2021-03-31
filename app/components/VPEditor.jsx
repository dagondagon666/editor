import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
// import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

export default class VPEditor extends React.Component {
  render() {
    return (
      <div className="VPEditor-root">
        <div className="ui-input-text-area article-title" typeof="text">
          <textarea
            placeholder="请输入标题（建议30字以内）"
            maxLength="60"
            rows="1"
            style={{ overflowY: "hidden" }}
          ></textarea>
          <span className="count">0/40</span>
        </div>

        <div className="editor">
          <Editor />
        </div>
      </div>
    );
  }
}
