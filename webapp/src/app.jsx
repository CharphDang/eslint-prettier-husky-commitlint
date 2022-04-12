import React, { Component } from 'react';
import ReactDom from 'react-dom';
class App extends Component {
  render() {
    return <div>{1 + 2 - 3}</div>;
  }
}
console.log(123); // Charph-log
ReactDom.render(<App />, document.querySelector('#app'));
