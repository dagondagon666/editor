import { EditorState, RichUtils } from "draft-js";

import Editor, { composeDecorators } from "@draft-js-plugins/editor";

import createImagePlugin from "@draft-js-plugins/image";

import createAlignmentPlugin from "@draft-js-plugins/alignment";

import createFocusPlugin from "@draft-js-plugins/focus";

import createResizeablePlugin from "@draft-js-plugins/resizeable";

import createBlockDndPlugin from "@draft-js-plugins/drag-n-drop";

import React from "react";
import StyleButton from "./StyleButton";

const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
const alignmentPlugin = createAlignmentPlugin();

const decorator = composeDecorators(
  resizeablePlugin.decorator,
  alignmentPlugin.decorator,
  focusPlugin.decorator,
  blockDndPlugin.decorator
);
const imagePlugin = createImagePlugin({ decorator });

// const dragNDropFileUploadPlugin = createDragNDropUploadPlugin({
//   handleUpload: mockUpload,
//   addImage: imagePlugin.addImage,
// });

const plugins = [
//   dragNDropFileUploadPlugin,
  blockDndPlugin,
  focusPlugin,
  alignmentPlugin,
  resizeablePlugin,
  imagePlugin,
];

export default class VPEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = (editorState) => this.setState({ editorState });

    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }

  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, `BOLD`));
  }

  render() {
    const { editorState } = this.state;

    let className = "VPEditor";
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== "unstyled") {
        className += " VPEditor-hidPlaceholder";
      }
    }

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

        <div className="toolbar">
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
        </div>

        <div className="editor">
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            // ref={(element) => {
            //     this.editor = element
            // }}
          />
        </div>
        <div>
          <h3 className="block-title">Category</h3>
          <ul className="category-list">
            <li className="list-item">
              <a className="class-block">Dota2</a>
            </li>
          </ul>
          <div>
            <i className="icon-mark"></i>
            <span>
              If not choosen, default category will be choosen: More Esports
            </span>
          </div>
        </div>
        <div>
          <h3 className="block-title">Upload Thumbnail</h3>
        </div>
        <div>
          <button>Post</button>
          <button>Save as Draft</button>
          <button>Preview</button>
        </div>
      </div>
    );
  }
}

var INLINE_STYLES = [
  { label: "B", style: "BOLD" },
  { label: "I", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
];

const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="VPEditor-controls">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};
