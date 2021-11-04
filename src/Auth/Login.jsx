import React, { Component } from "react";
import { Form, Label, Input, Button, FormGroup } from "reactstrap";
import { Route, Link, Swtich, withRouter } from "react-router-dom";
import "../App.css";
import background from "../assets/background.png";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      isAdmin: false,
      modal: false,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/user/login", {
      method: "POST",
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        // name: this.state.name,
        isAdmin: this.state.isAdmin,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.props.updateToken(data.sessionToken);
        this.props.updateName(data.User.name);
        this.handleClick();
        // console.log(data.User.isAdmin);
        localStorage.setItem("name", data.User.name);
        localStorage.setItem("isAdmin", data.User.isAdmin);
      });
  };

  handleClick = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="signup">
        <Form onSubmit={this.handleSubmit} className="signUp">
          <h1 className="signUpTitle"> Login.</h1>
          {/* <p>les.a.phil@outlook.com, 1234</p>
          <p>Admin: admin@email.com, 1234</p> */}
          <FormGroup>
            <Label htmlFor="email">Email: &nbsp;</Label>
            <Input
              onChange={(e) => this.setState({ email: e.target.value })}
              name="email"
              type="email"
              id="email"
              required
              value={this.email}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password:&nbsp;</Label>
            <Input
              input
              type="password"
              required
              onChange={(e) => this.setState({ password: e.target.value })}
              name="password"
              value={this.password}
            />
            <br></br>
            <Button
              color="none"
              light
              expand="md"
              className="login-button "
              type="submit"
            >
              Login
            </Button>
            <br /> <br />
            <p className="shadowText">
              <Link to="/signup">Create an account </Link>
            </p>{" "}
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default withRouter(Login);
