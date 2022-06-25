import React from "react";
import { Routes, Route } from "react-router-dom";
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
import Error from "./Views/Error";
import PrivateRoute from "./Views/PrivateRoute";
function CustomRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/explorer"
          element={
            <PrivateRoute>
              <Explorer />
            </PrivateRoute>
          }
        />
        <Route
          path="/notification"
          element={
            <PrivateRoute>
              <Notification />
            </PrivateRoute>
          }
        />
        <Route
          path="/messages"
          element={
            <PrivateRoute>
              <Messages />
            </PrivateRoute>
          }
        >
          <Route
            path=":id"
            element={
              <PrivateRoute>
                <Messages />
              </PrivateRoute>
            }
          />
        </Route>
        {/* <Route
          path="/messages/:roomid?"
          element={
            <PrivateRoute>
              <Messages />
            </PrivateRoute>
          }
        /> */}
        <Route
          path="/bookmarks"
          element={
            <PrivateRoute>
              <Bookmarks />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />
        <Route
          path="/:profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route element={<Error />} />
      </Routes>
    </>
  );
}
export default CustomRoutes;
