import React, { Component } from "react";
import { Container, Row, Col, Input } from "reactstrap";
import ClaimsCreate from "./ClaimsCreate";
import ClaimsTable from "./ClaimsTable";
import ClaimsEdit from "./ClaimsEdit";
import APIURL from "../helpers/environment";

class ClaimsIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      claims: [], //is this right?
      updateActive: false,
      claimToUpdate: {},
      searchWord: "",
    };
  }

  fetchClaims = () => {
    let token = localStorage.getItem("token");

    localStorage.getItem("isAdmin") === "true"
      ? fetch(`${APIURL}/claim/getall`, {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: token,
          }),
        })
          .then((res) => res.json())
          .then((logClaim) => {
            console.log(logClaim);
            this.setState({ claims: logClaim });
          })
      : fetch(`${APIURL}/claim/mine`, {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: token,
          }),
        })
          .then((res) => res.json())
          .then((logClaim) => {
            console.log(logClaim);
            this.setState({ claims: logClaim });
          });
  };

  editUpdateClaim = (claim) => {
    this.setState({ claimToUpdate: claim });
    // console.log(claim);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.claimToUpdate !== this.state.claimToUpdate) {
      this.setState({ updateActive: true });
    }
  }

  updateOn = () => {
    console.log("updateOn works");
  };

  updateOff = () => {
    this.setState({ updateActive: false });
  };

  componentDidMount() {
    this.fetchClaims();
  }

  onSearch = (e) => {
    this.setState({ searchWord: e.target.value });
  };

  render() {
    const filteredClaims = this.state.claims.filter((claim) =>
      claim.name_of_item
        .toLowerCase()
        .includes(this.state.searchWord.toLowerCase())
    );
    return (
      <Container fluid={true}>
        <Row>
          <Col md="3">
            <ClaimsCreate
              fetchClaims={this.fetchClaims}
              sessionToken={this.props.sessionToken}
            />
            <Input
              type="text"
              placeholder="Search."
              className="searchBar"
              onChange={(event) => this.onSearch(event)}
            />
          </Col>
        </Row>
        {/* <Col></Col> */}
        <Col md="12">
          <ClaimsTable
            claims={filteredClaims}
            editUpdateClaim={this.editUpdateClaim}
            updateOn={this.updateOn}
            fetchClaims={this.fetchClaims}
            token={this.props.token}
          />
        </Col>
        {this.state.updateActive ? (
          <ClaimsEdit
            updateActive={this.state.updateActive}
            claimToUpdate={this.state.claimToUpdate}
            updateOff={this.updateOff}
            token={this.props.token}
            fetchClaims={this.fetchClaims}
          />
        ) : (
          <></>
        )}
      </Container>
    );
  }
}

export default ClaimsIndex;
