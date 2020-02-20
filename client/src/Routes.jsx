import React from "react";
import { Route, Switch } from "react-router-dom";
import Index from "./Routes/Index";
import Login from "./Routes/Login";
import Signup from "./Routes/Signup";
import Home from "./Routes/Home";
import Error from "./Routes/Error";
function Routes() {
  return (
    <main>
      <Switch>
        <Route path="/" component={Index} exact />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/home" component={Home} />
        <Route component={Error} />
      </Switch>
    </main>
  );
}
export default Routes;
