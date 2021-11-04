import React, { Component } from "react";
import { Table, Button } from "reactstrap";

class WarrantyTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  deleteWarranty = (warranty) => {
    let token = localStorage.getItem("token");
    fetch(`http://localhost:3000/warranty/delete/${warranty.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token,
      }),
    }).then(() => this.props.fetchWarranty());
    console.log(this.props.fetchWarranty());
  };

  warrantyMapper = () => {
    console.log(this.props.warranties);
    return this.props.warranties.map((warranty, index) => {
      return (
        <tr key={index}>
          <th scope="row">{warranty.id}</th>
          <td>{warranty.name}</td>
          <td>{warranty.date_purchased}</td>
          <td>{warranty.warranty_expiration}</td>
          <td>{warranty.model_number}</td>
          <td>{warranty.serial_number}</td>
          <td>
            <a href={warranty.receipt} target="_blank" rel="noreferrer">
              <img
                src={warranty.receipt}
                alt="receipt_image"
                height="75px"
                target="_blank"
              ></img>
            </a>
          </td>
          <td>{warranty.notes}</td>
          <td style={{ width: "100%" }}>
            <Button
              className="login-button "
              color="none"
              onClick={() => {
                console.log(warranty);
                this.props.editUpdateWarranty(warranty);
                // this.props.updateOn();
              }}
            >
              Update
            </Button>
            <Button
              className="login-button "
              color="none"
              onClick={() => {
                this.deleteWarranty(warranty);
              }}
            >
              Delete
            </Button>
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <>
        <h1 className="tableTitles">Warranty History.</h1>

        <Table responsive className="warrantyTable">
          <thead>
            <tr>
              <th className="tableHeaders">ID</th>
              <th className="tableHeaders">Name</th>
              <th className="tableHeaders">Date Purchased</th>
              <th className="tableHeaders">Warranty Expiration</th>
              <th className="tableHeaders">Model Number</th>
              <th className="tableHeaders">Serial Number</th>
              <th className="tableHeaders">Receipt</th>
              <th className="tableHeaders">Notes</th>
              <th className="tableHeaders">Update | Delete</th>
            </tr>
          </thead>

          <tbody>{this.warrantyMapper()}</tbody>
        </Table>
      </>
    );
  }
}

export default WarrantyTable;
