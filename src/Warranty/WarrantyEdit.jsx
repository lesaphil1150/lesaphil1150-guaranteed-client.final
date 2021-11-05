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
import APIURL from "../helpers/environment";

class WarrantyEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editName: this.props?.warrantyToUpdate?.name,
      editDate: this.props?.warrantyToUpdate?.date_purchased,
      editExpiration: this.props?.warrantyToUpdate?.warranty_expiration,
      editModel: this.props?.warrantyToUpdate?.model_number,
      editSerial: this.props?.warrantyToUpdate?.serial_number,
      editReceipt: this.props?.warrantyToUpdate?.receipt,
      editNotes: this.props?.warrantyToUpdate?.notes,
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

  warrantyUpdate = (event, warranty) => {
    // console.log(this.props.warrantyToUpdate);
    let token = localStorage.getItem("token");
    event.preventDefault();

    localStorage.getItem("isAdmin") === "false"
      ? fetch(`${APIURL}/warranty/update/${this.props.warrantyToUpdate.id}`, {
          method: "PUT",
          body: JSON.stringify({
            name: this.state.editName,
            date_purchased: this.state.editDate,
            warranty_expiration: this.state.editExpiration,
            model_number: this.state.editModel,
            serial_number: this.state.editSerial,
            receipt: this.state.editReceipt,
            notes: this.state.editNotes,
          }),
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: token,
          }),
        }).then((res) => {
          this.props.fetchWarranty();
          this.props.updateOff();
        })
      : fetch(
          `${APIURL}/warranty/update/admin/${this.props.warrantyToUpdate.id}`,
          {
            method: "PUT",
            body: JSON.stringify({
              name: this.state.editName,
              date_purchased: this.state.editDate,
              warranty_expiration: this.state.editExpiration,
              model_number: this.state.editModel,
              serial_number: this.state.editSerial,
              receipt: this.state.editReceipt,
              notes: this.state.editNotes,
            }),
            headers: new Headers({
              "Content-Type": "application/json",
              Authorization: token,
            }),
          }
        ).then((res) => {
          this.props.fetchWarranty();
          this.props.updateOff();
        });
  };

  render() {
    return (
      <div className="warrantyModal">
        <Modal
          isOpen={true}
          toggle={this.props.updateOff}
          className="warrantyModal"
        >
          <ModalHeader toggle={this.props.updateOff} className="modalHeader">
            {" "}
            Edit Warranty
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.warrantyUpdate}>
              <FormGroup>
                <Label htmlFor="name">Edit Name</Label>
                <Input
                  name="name"
                  type="text"
                  value={this.state.editName}
                  onChange={(e) => this.setState({ editName: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="Purchase Date">Edit Purchase Date</Label>
                <Input
                  name="Purchase Date"
                  type="Date"
                  value={this.state.editDate}
                  onChange={(e) => this.setState({ editDate: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="Expiration">Edit Expiration Date:</Label>
                <Input
                  name="Expiration"
                  type="Date"
                  value={this.state.editExpiration}
                  onChange={(e) =>
                    this.setState({ editExpiration: e.target.value })
                  }
                ></Input>{" "}
              </FormGroup>
              <FormGroup>
                <Label htmlFor="model number">Edit Model Number:</Label>
                <Input
                  name="model number"
                  value={this.state.editModel}
                  onChange={(e) => this.setState({ editModel: e.target.value })}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="model number">Edit Serial Number:</Label>
                <Input
                  name="serial number"
                  value={this.state.editSerial}
                  onChange={(e) =>
                    this.setState({ editSerial: e.target.value })
                  }
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="receipt">Edit Receipt:</Label>
                <Input
                  name="receipt"
                  value={this.state.editReceipt}
                  onChange={(e) =>
                    this.setState({ editReceipt: e.target.value })
                  }
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="notes">Edit Notes:</Label>
                <Input
                  name="notes"
                  type="textarea"
                  value={this.state.editNotes}
                  onChange={(e) => this.setState({ editNotes: e.target.value })}
                ></Input>
              </FormGroup>
              <Button type="submit" className="signup-button" color="none">
                Update Warranty
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default WarrantyEdit;
