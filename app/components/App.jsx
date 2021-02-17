
import React from 'react';
import VPEditor from './VPEditor';

export default class App extends React.Component {


  // titleAreaStyle = {
  //   overflowY: "hidden",
  //   height: "64px"
  // }

  render() {
    return (
      <div id="content">
        <h1>Draft.js Editor</h1>
        <VPEditor></VPEditor>
      </div>
    );
  }
}
