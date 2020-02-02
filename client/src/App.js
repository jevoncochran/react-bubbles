import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Login, PrivateRoute, BubblePage } from "./components";
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute path="/protected" component={BubblePage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
