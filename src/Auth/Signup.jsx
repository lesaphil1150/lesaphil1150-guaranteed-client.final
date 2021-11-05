//warranty

import React from "react";
import { Form, Label, Input, Button, FormGroup } from "reactstrap";
import { Route, Link, Swtich, withRouter } from "react-router-dom";
import APIURL from "../helpers/environment";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", email: "", password: "", isAdmin: false };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    fetch(`${APIURL}/user/signup`, {
      method: "POST",
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
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
      });
  };

  handleClick = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="signUp">
        <h1 className="signUpTitle">Sign up. </h1>

        <Form onSubmit={this.handleSubmit} className="signup">
          <FormGroup>
            <Label htmlFor="name">Name:&nbsp;</Label>
            <Input
              onChange={(e) => this.setState({ name: e.target.value })}
              name="name"
              type="text"
              id="firstname"
              required
              value={this.name}
            />
          </FormGroup>
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
              Submit
            </Button>
            <br />
            <br />
            <p className="shadowText">
              <Link to="/login">I already have an account. </Link>
            </p>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default withRouter(Signup);
