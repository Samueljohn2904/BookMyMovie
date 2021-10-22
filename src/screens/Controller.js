import React, {useState, useEffect} from "react";
import Home from "../screens/home/Home";
import Details from "../screens/details/Details";
import { BrowserRouter as Router, Route } from "react-router-dom";
import BookShow from "../screens/bookshow/BookShow";
import Confirmation from "../screens/confirmation/Confirmation";
import LoginStatusContext from "../common/header/LoginStatusContext"

const Controller = () => {
  const baseUrl = "/api/v1/";

  const [isUserLogged, setIsUserLoggedIn] = useState("false");

  const loginStatus = {
    isUserLoggedIn:isUserLogged,
    setIsUserLoggedIn
  }

  return (
    <Router>
      <div className="main-container">
        <LoginStatusContext.Provider value={loginStatus}>
        <Route
          exact
          path="/"
          render={(props) => <Home {...props} baseUrl={baseUrl} />}
        />
        <Route
          path="/movie/:id"
          render={(props) => <Details {...props} baseUrl={baseUrl} />}
        />
        <Route
          path="/bookshow/:id"
          render={(props) => <BookShow {...props} baseUrl={baseUrl} />}
        />
        <Route
          path="/confirm/:id"
          render={(props) => <Confirmation {...props} baseUrl={baseUrl} />}
        />
        </LoginStatusContext.Provider>
      </div>
    </Router>
  );
};

export default Controller;
