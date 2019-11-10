import React, { Component } from "react";
import "./App.css";
import Home from './app/view/home/index';
import { BrowserRouter, Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Home} exact />
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
