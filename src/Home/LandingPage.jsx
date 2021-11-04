import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../App.css";
import logo from "../assets/logo with tagline.png";
import logo2 from "../assets/logo2.png";

const LandingPage = (props) => {
  return (
    <div className="container-img" fluid={true}>
      <Col fluid>
        <Row>
          <div className="header">
            <img src={logo2} alt="logo" className="logo"></img>
          </div>
        </Row>
      </Col>
      <br />
    </div>
  );
};

export default LandingPage;
