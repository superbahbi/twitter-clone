import React from "react";
import { Route, Switch } from "react-router-dom";
import Index from "./Views/Index";
import Login from "./Views/Login";
import Signup from "./Views/Signup";
import Home from "./Views/Home";
import Explorer from "./Views/Explorer";
import Notification from "./Views/Notification";
import Messages from "./Views/Messages";
import Bookmarks from "./Views/Bookmarks";
import Settings from "./Views/Settings";
import Profile from "./Views/Profile";
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
        <PrivateRoute path="/explorer" component={Explorer} />
        <PrivateRoute path="/notification" component={Notification} />
        <PrivateRoute path="/messages" component={Messages} />
        <PrivateRoute path="/bookmarks" component={Bookmarks} />
        <PrivateRoute path="/settings" component={Settings} />
        <PrivateRoute path="/:profile" component={Profile} />
        <PrivateRoute path="/status/:threadID" component={Thread} />
        <Route component={Error} />
      </Switch>
    </main>
  );
}
export default Routes;
