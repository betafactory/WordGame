import React, { Component } from "react";
import "./App.css";
import Home from './app/view/home/index';
import Profile from './app/view/profile/index';
import Settings from './app/view/settings/index';
import Challenges from './app/view/challenges/index';
import Terms from './app/view/terms/index';
import Privacy from './app/view/privacy/index';
import Disclaimer from './app/view/disclaimer/index';
import DataPolicy from './app/view/datapolicy/index';
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
            <Route path="/challenges" component={Challenges} exact />
            <Route path="/terms" component={Terms} exact />
            <Route path="/privacy" component={Privacy} exact />
            <Route path="/disclaimer" component={Disclaimer} exact />
            <Route path="/datapolicy" component={DataPolicy} exact />
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
