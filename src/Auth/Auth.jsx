import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import Signup from "./Signup";

class Auth extends Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <Container className="auth-container">
        <Row>
          <Col md="6">
            <Signup updateToken={this.props.updateToken} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Auth;
