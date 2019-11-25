import React, { Component } from "react";
import "./App.css";
import Home from './app/view/home/index';
import Profile from './app/view/profile/index';
import Settings from './app/view/settings/index';
import { BrowserRouter, Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/profile" component={Profile} exact />
            <Route path="/settings" component={Settings} exact />
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
