import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Collapse } from "reactstrap";
import APIURL from "../helpers/environment";

class WarrantyCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      date_purchased: "",
      warranty_expiration: "",
      model_number: "",
      serial_number: "",
      receipt: "",
      notes: "",
      isOpen: false,
      image: "",
      loading: false,
    };
  }

  UploadImage = async (e) => {
    let files = e.target.files;
    let data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "guaranteed.");
    this.setState({ loading: true });
    let res = await fetch(
      "https://api.cloudinary.com/v1_1/do0viwio7/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    let File = await res.json();
    // console.log(File.secure_url);
    this.setState({ image: File.secure_url });
    this.setState({ loading: false });
  };

  handleSubmit = (e) => {
    let token = localStorage.getItem("token");
    e.preventDefault();
    fetch(`${APIURL}/warranty/create`, {
      method: "POST",
      body: JSON.stringify({
        name: this.state.name,
        date_purchased: this.state.date_purchased,
        warranty_expiration: this.state.warranty_expiration,
        model_number: this.state.model_number,
        serial_number: this.state.serial_number,
        receipt: this.state.image,
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
        window.location.href = "/warranties";
        this.setState({ name: "" });
        this.setState({ date_purchased: "" });
        this.setState({ warranty_expiration: "" });
        this.setState({ model_number: "" });
        this.setState({ serial_number: "" });
        this.setState({ receipt: "" });
        this.setState({ notes: "" });
        this.props.fetchWarranty();
      });
  };

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    return (
      <div className="claimsCreate" id="warrantyIndex">
        <Button
          color="none"
          onClick={this.toggle}
          style={{ marginBottom: "1rem" }}
          className="warranty-button"
        >
          Add Warranty Item.
        </Button>
        <Collapse isOpen={this.state.isOpen}>
          <Form onSubmit={(e) => this.handleSubmit(e)}>
            <FormGroup>
              <Label htmlFor="name of item" />
              Name of Item
              <Input
                Input
                name="name"
                value={this.name}
                onChange={(e) => this.setState({ name: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label />
              Purchase Date
              <Input
                name="Purchase Date"
                type="date"
                value={this.date_purchased}
                onChange={(e) =>
                  this.setState({ date_purchased: e.target.value })
                }
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="warranty_expiration" />
              Warranty Expiration Date
              <Input
                name="Warranty Expiration Date"
                type="date"
                value={this.warranty_expiration}
                onChange={(e) =>
                  this.setState({ warranty_expiration: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="model_number" />
              Model Number
              <Input
                name="model_number"
                value={this.model_number}
                onChange={(e) =>
                  this.setState({ model_number: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="serial_number" />
              Serial Number
              <Input
                name="serial_number"
                value={this.serial_number}
                onChange={(e) =>
                  this.setState({ serial_number: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="pic_url" />
              <h6>Upload Image of Receipt</h6>
              <Input
                type="file"
                name="file"
                placeholder="Upload Image here"
                onChange={this.UploadImage}
              />
              <br />
            </FormGroup>{" "}
            {/* <FormGroup>
              <Label htmlFor="receipt" />
              Receipt
              <Input
                name="receipt"
                value={this.receipt}
                onChange={(e) => this.setState({ receipt: e.target.value })}
              />
            </FormGroup> */}
            <FormGroup>
              <Label htmlFor="notes" />
              Notes
              <Input
                name="notes"
                value={this.notes}
                className="notesBox"
                type="textarea"
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

export default WarrantyCreate;
