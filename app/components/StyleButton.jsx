import React from 'react';

export default class StyleButton extends React.Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style)
        };
    }

    render() {
        let className = "VPEditor-styleButton"
        if (this.props.active) {
            className += " VPEditor-activeButton";
        }

        return (
            <span className={className} onMouseDown={this.onToggle}>
                {this.props.label}
            </span>
        );
    }
}