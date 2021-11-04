import React, { Component } from "react";
import {
  Navbar,
  Button,
  NavbarText,
  Collapse,
  Container,
  NavbarToggler,
} from "reactstrap";
import { Route, Link, Swtich } from "react-router-dom";
import Auth from "../Auth/Auth";
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";
import LandingPage from "./LandingPage";
import LoggedInNav from "./LoggedInNav";

class Navbar2 extends Component {
  clearToken = () => {
    localStorage.clear();
    this.setState({ sessionToken: "" }); //need to add to state on line 13
  };

  loginSignupHide = () => {
    return this.props.sessionToken === localStorage.getItem("token") ? (
      <LoggedInNav />
    ) : (
      <LandingPage />
    );
  };

  toggle = () => {
    this.setState({ isOpen: true });
  };

  render() {
    return (
      <div>
        <Container fluid>
          <Navbar color="none" expand="md" className="navbar2">
            <div>
              <Button outline color="black" className="login-button">
                <Link to="/login">Login </Link>
              </Button>{" "}
              <Button outline color="black" className="signup-button">
                <Link to="/signup">Sign up </Link>
              </Button>{" "}
            </div>
          </Navbar>
        </Container>
      </div>
    );
  }
}

export default Navbar2;
