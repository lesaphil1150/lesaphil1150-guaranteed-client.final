import React, { Component } from "react";
import {
  Navbar,
  Button,
  Container,
  Row,
  Col,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  NavItem,
  Nav,
} from "reactstrap";
import { Link } from "react-router-dom";
import "../App.css";
import logo3 from "../assets/logo2notext.png";

class LoggedInNav extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <div>
        <Navbar color="none" light expand="sm" className="loggedinNav ">
          <Link to="/">
            <NavbarBrand>
              <img src={logo3} alt="logo" className="logoNoText"></img>
            </NavbarBrand>
          </Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <Button
                  outline
                  color="black"
                  className="signup-button"
                  id="homeButton"
                >
                  <Link to="/">Home </Link>
                </Button>
              </NavItem>
              &nbsp; &nbsp;
              <NavItem>
                <Button
                  outline
                  color="black"
                  className="signup-button"
                  onClick={this.props.clearToken}
                >
                  Logout
                </Button>{" "}
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default LoggedInNav;
