import React, { Component } from "react";
import { Container, Row, Col, Input } from "reactstrap";
import WarrantyCreate from "./WarrantyCreate";
import WarrantyTable from "./WarrantyTable";
import WarrantyEdit from "./WarrantyEdit";

class WarrantyIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      warranties: [],
      updateActive: false,
      warrantyToUpdate: {},
      searchTerm: "",
    };
  }

  fetchWarranty = () => {
    let token = localStorage.getItem("token");

    localStorage.getItem("isAdmin") === "true"
      ? fetch("http://localhost:3000/warranty/getall", {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: token,
          }),
        })
          .then((res) => res.json())
          .then((logWarranty) => {
            // console.log(logClaim);
            this.setState({ warranties: logWarranty });
          })
      : fetch("http://localhost:3000/warranty/mine", {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: token,
          }),
        })
          .then((res) => res.json())
          .then((logWarranty) => {
            // console.log(logClaim);
            this.setState({ warranties: logWarranty });
          });
  };

  editUpdateWarranty = (warranty) => {
    this.setState({ warrantyToUpdate: warranty });
    console.log(warranty);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.warrantyToUpdate !== this.state.warrantyToUpdate) {
      this.setState({ updateActive: true });
    }
  }

  updateOn = () => {
    console.log("updateOn works");
    // this.setState({ updateActive: true });
  };

  updateOff = () => {
    this.setState({ updateActive: false });
  };

  componentDidMount() {
    this.fetchWarranty();
  }

  onSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  render() {
    const filteredWarranties = this.state.warranties.filter((warranty) =>
      warranty.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    );

    return (
      <Container fluid={true}>
        <Row>
          <Col md="3">
            <WarrantyCreate
              fetchWarranty={this.fetchWarranty}
              sessionToken={this.props.sessionToken}
            />
            <Input
              type="text"
              placeholder="Search."
              className="searchBar"
              onChange={(event) => this.onSearchChange(event)}
            />
          </Col>
        </Row>
        <Col md="12">
          <WarrantyTable
            warranties={filteredWarranties}
            editUpdateWarranty={this.editUpdateWarranty}
            updateOn={this.updateOn}
            fetchWarranty={this.fetchWarranty}
            token={this.props.token}
          />
        </Col>
        {this.state.updateActive ? (
          <WarrantyEdit
            updateActive={this.state.updateActive}
            warrantyToUpdate={this.state.warrantyToUpdate}
            updateOff={this.updateOff}
            token={this.props.token}
            fetchWarranty={this.fetchWarranty}
          />
        ) : (
          <></>
        )}
      </Container>
    );
  }
}

export default WarrantyIndex;
