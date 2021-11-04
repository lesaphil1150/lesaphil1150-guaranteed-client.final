import "./App.css";
import Signup from "./Auth/Signup";
import React, { Component } from "react";
import Login from "./Auth/Login";
import ClaimsIndex from "./Claims/ClaimsIndex";
import WarrantyIndex from "./Warranty/WarrantyIndex";
import LandingPage from "./Home/LandingPage";
import Navbar from "./Home/Navbar";
import { Route, Switch } from "react-router-dom";
import LoggedInLanding from "./Home/LoggedInLanding";
import LoggedInNav from "./Home/LoggedInNav";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { sessionToken: "", localStorage: "", name: "" };
  }

  updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    this.setState({ sessionToken: newToken });
    console.log(localStorage.getItem("token", newToken));
  };

  updateName = (newName) => {
    localStorage.setItem("name", newName);
    this.setState({ name: newName });
  };

  componentDidMount() {
    let token = localStorage.getItem("token");
    let name = localStorage.getItem("name");
    if (token && token != null) {
      this.setState({
        sessionToken: token,
      });
    }
    if (name && name != null) {
      this.setState({
        name: name,
      });
    }
  }

  clearToken = () => {
    localStorage.clear();
    this.setState({ sessionToken: "" });
  };

  protectedViews = () => {
    return localStorage.getItem("token") ? (
      <>
        <LoggedInNav clearToken={this.clearToken.bind(this)} />
        <LoggedInLanding name={this.state.name} />
      </>
    ) : (
      <>
        <Navbar sessionToken={this.sessionToken} /> <LandingPage />
      </>
    );
  };

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/">
            {this.protectedViews()}
          </Route>
          <Route exact path="/login">
            <Login
              updateToken={this.updateToken}
              updateName={this.updateName}
            />
          </Route>
          <Route exact path="/signup">
            <Signup
              updateToken={this.updateToken}
              updateName={this.updateName}
            />
          </Route>
          <Route exact path="/claims">
            <LoggedInNav clearToken={this.clearToken.bind(this)} />
            <ClaimsIndex
              sessionToken={this.sessionToken}
              updateToken={this.updateToken}
            />
          </Route>
          <Route exact path="/">
            <LoggedInNav clearToken={this.clearToken.bind(this)} />
            <LoggedInLanding name={this.state.name} />
          </Route>
          <Route exact path="/warranties">
            <LoggedInNav clearToken={this.clearToken.bind(this)} />
            <WarrantyIndex
              sessionToken={this.sessionToken}
              updateToken={this.updateToken}
            />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
