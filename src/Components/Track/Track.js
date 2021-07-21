import React from "react";
import "./Track.css";

class Track extends React.Component {
    renderAction() {
        return <button>{this.props.isRemoval? '+' : '-' }</button>
    }
    render() {
        return (
                <div className="Track">
                <div className="Track-information">
                    <h3>track name </h3>
                    <p>track artist | track album </p>
                </div>
                {this.renderAction}
                </div>
        );
    }
}

export default Track;
