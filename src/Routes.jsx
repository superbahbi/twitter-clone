import React from "react";
import { Route, Switch } from "react-router-dom";
import Index from "./Views/Index";
import Login from "./Views/Login";
import Signup from "./Views/Signup";
import Home from "./Views/Home";
import Profile from "./Views/Profile";
import Settings from "./Views/Settings";
import Thread from "./Views/Thread";
import Error from "./Views/Error";
import PrivateRoute from "./Views/PrivateRoute";
function Routes() {
  return (
    <main>
      <Switch>
        <Route path="/" component={Index} exact />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <PrivateRoute path="/home" component={Home} />
        <PrivateRoute path="/settings" component={Settings} />
        <PrivateRoute path="/status/:threadID" component={Thread} />
        <PrivateRoute path="/:profile" component={Profile} />

        <Route component={Error} />
      </Switch>
    </main>
  );
}
export default Routes;
