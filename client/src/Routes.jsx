import React from "react";
import { Route, Switch } from "react-router-dom";
import Index from "./Routes/Index";
import Login from "./Routes/Login";
import Signup from "./Routes/Signup";
import Home from "./Routes/Home";
import Profile from "./Routes/Profile";
import Settings from "./Routes/Settings";
import Thread from "./Routes/Thread";
import Error from "./Routes/Error";
import PrivateRoute from "./Routes/PrivateRoute";
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
