import { Editor, EditorState, RichUtils } from 'draft-js';
import React from 'react';

export default class VPEditor extends React.Component {


    constructor(props) {
        super(props);
        this.state = { editorState: EditorState.createEmpty() };
        this.onChange = (editorState) => this.setState({ editorState });
    }

    _onBoldClick() {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, `BOLD`));
    }

    render() {
        const {editorState} = this.state;

        let className = "VPEditor";
        var contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== "unstyled") {
                className += ' VPEditor-hidPlaceholder';
            }
        }

        return (
            <div className="VPEditor-root">
                <div className="ui-input-text-area article-title" typeof="text">
                    <textarea placeholder="请输入标题（建议30字以内）" maxLength="60" rows="1" style={{ overflowY: "hidden" }}></textarea>
                    <span className="count">0/40</span>
                </div>
                
                <div>
                    <button onClick={this._onBoldClick.bind(this)}>Bold</button>
                </div>
                <div className="editor">
                    <Editor editorState={this.state.editorState} onChange={this.onChange} />
                </div>
            </div>
        );
    }
}