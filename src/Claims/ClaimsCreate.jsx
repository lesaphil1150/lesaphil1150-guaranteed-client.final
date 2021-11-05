import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Collapse } from "reactstrap";
import APIURL from "../helpers/environment";

class ClaimsCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name_of_item: "",
      date_of_claim: "",
      resolution: "",
      notes: "",
      isOpen: false,
    };
  }

  handleSubmit = (e) => {
    let token = localStorage.getItem("token");
    e.preventDefault();
    fetch(`${APIURL}/claim/create`, {
      method: "POST",
      body: JSON.stringify({
        name_of_item: this.state.name_of_item,
        date_of_claim: this.state.date_of_claim,
        resolution: this.state.resolution,
        notes: this.state.notes,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token,
      }),
    })
      .then((res) => res.json())
      .then((logData) => {
        console.log(logData);
        window.location.href = "/claims";
        this.setState({ name_of_item: "" });
        this.setState({ date_of_claim: "" });
        this.setState({ resolution: "" });
        this.setState({ notes: "" });
        this.props.fetchClaims();
      });
  };

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    return (
      <div className="claimsCreate">
        <Button
          color="none"
          onClick={this.toggle}
          style={{ marginBottom: "1rem" }}
          className="warranty-button"
          id="warrantyIndex"
        >
          Add Claim.
        </Button>
        <Collapse isOpen={this.state.isOpen}>
          <Form onSubmit={this.handleSubmit}>
            {/* <h1 className="signUpTitle">Log a Claim.</h1> */}
            <FormGroup>
              <Label htmlFor="name of item" />
              Name of Item
              <Input
                Input
                name="Name of Item"
                value={this.name_of_item}
                onChange={(e) =>
                  this.setState({ name_of_item: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="date of claim" />
              Date of Claim
              <Input
                name="date of claim"
                type="date"
                value={this.date_of_claim}
                onChange={(e) =>
                  this.setState({ date_of_claim: e.target.value })
                }
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="resolution" />
              Resolution
              <Input
                name="resolution"
                value={this.resolution}
                onChange={(e) => this.setState({ resolution: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="notes" />
              Notes
              <Input
                name="notes"
                type="textarea"
                value={this.notes}
                onChange={(e) => this.setState({ notes: e.target.value })}
              />
            </FormGroup>
            <Button
              color="none"
              light
              expand="md"
              className="login-button "
              type="submit"
              onClick={this.toggle}
            >
              Click to submit
            </Button>
          </Form>
        </Collapse>
      </div>
    );
  }
}

export default ClaimsCreate;
