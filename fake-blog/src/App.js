import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import PostsList  from "./features/posts/PostsList";
import PostsForm from "./features/posts/PostsForm";
import UsersList from "./features/users/UsersList";
import FakeLogin from "./features/auth/FakeLogin";
import NavBar from "./app/NavBar";

function App() {
  return (
    <div className="App">
      <Router>
      <NavBar />

        <div className="App">
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <>
                  {/* TODO: Make a home Component */}
                  <h1>Welcome to Fake Blog!</h1>
                  <img src={logo} className="App-logo" alt="logo" />
                  <PostsList />
                </>
              )}
            />
            <Route
              exact
              path="/login"
              render={() => (
                <>
                  <FakeLogin />
                </>
              )}
            />
            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
