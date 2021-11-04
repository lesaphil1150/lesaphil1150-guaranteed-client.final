import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";

class ClaimsEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editName: this.props?.claimToUpdate?.name_of_item,
      editDate: this.props?.claimToUpdate?.date_of_claim,
      editResolution: this.props?.claimToUpdate?.resolution,
      editNotes: this.props?.claimToUpdate?.notes,
      isModalVisible: true,
    };
  }

  showModal() {
    this.setState({
      isModalVisible: true,
    });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  claimUpdate = (event, claim) => {
    // console.log(this.props.claimToUpdate);
    let token = localStorage.getItem("token");
    event.preventDefault();

    localStorage.getItem("isAdmin") === "false"
      ? fetch(
          `http://localhost:3000/claim/update/${this.props.claimToUpdate.id}`,
          {
            method: "PUT",
            body: JSON.stringify({
              name_of_item: this.state.editName,
              date_of_claim: this.state.editDate,
              resolution: this.state.editResolution,
              notes: this.state.editNotes,
            }),
            headers: new Headers({
              "Content-Type": "application/json",
              Authorization: token,
            }),
          }
        ).then((res) => {
          this.props.fetchClaims();
          this.props.updateOff();
        })
      : fetch(
          `http://localhost:3000/claim/update/admin/${this.props.claimToUpdate.id}`,
          {
            method: "PUT",
            body: JSON.stringify({
              name_of_item: this.state.editName,
              date_of_claim: this.state.editDate,
              resolution: this.state.editResolution,
              notes: this.state.editNotes,
            }),
            headers: new Headers({
              "Content-Type": "application/json",
              Authorization: token,
            }),
          }
        ).then((res) => {
          this.props.fetchClaims();
          this.props.updateOff();
        });
  };

  render() {
    return (
      <div>
        <Modal isOpen={true} toggle={this.props.updateOff}>
          <ModalHeader className="modalHeader" toggle={this.props.updateOff}>
            {" "}
            Edit a Claim
          </ModalHeader>
          <ModalBody className="warrantyModal">
            <Form onSubmit={this.claimUpdate}>
              <FormGroup>
                <Label htmlFor="name of item">Edit Name of Item</Label>
                <Input
                  name="name"
                  value={this.state.editName}
                  onChange={(e) => this.setState({ editName: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="date of claim">Edit Date of Claim</Label>
                <Input
                  name="date of claim"
                  type="date"
                  value={this.state.editDate}
                  onChange={(e) => this.setState({ editDate: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="resolution">Edit Resolution:</Label>
                <Input
                  name="definition"
                  value={this.state.editResolution}
                  onChange={(e) =>
                    this.setState({ editResolution: e.target.value })
                  }
                ></Input>
                <br />
                <Label htmlFor="resolution">Edit Notes:</Label>
                <Input
                  name="notes"
                  type="textarea"
                  value={this.state.editNotes}
                  onChange={(e) => this.setState({ editNotes: e.target.value })}
                ></Input>
              </FormGroup>
              <Button type="submit" className="signup-button" color="none">
                Update Claim
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default ClaimsEdit;
