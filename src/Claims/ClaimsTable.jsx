import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import APIURL from "../helpers/environment";

class ClaimsTable extends Component {
  // constructor(props) {
  //   super(props);
  //   // this.state = {};
  // }

  deleteClaim = (claim) => {
    let token = localStorage.getItem("token");
    fetch(`${APIURL}/claim/delete/${claim.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token,
      }),
    }).then(() => this.props.fetchClaims());
  };

  claimMapper = () => {
    // console.log(this.props.claims);
    return this.props.claims.map((claim, index) => {
      return (
        <tr key={index}>
          <th scope="row">{claim.id}</th>
          <td>{claim.name_of_item}</td>
          <td>{claim.date_of_claim}</td>
          <td>{claim.resolution}</td>
          <td>{claim.notes}</td>
          <td>
            <Button
              color="none"
              className="login-button "
              onClick={() => {
                console.log(claim);
                this.props.editUpdateClaim(claim);
                // this.props.updateOn();
              }}
            >
              Update
            </Button>
            <Button
              color="none"
              onClick={() => {
                this.deleteClaim(claim);
              }}
              className="login-button "
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
        <h1 className="tableTitles">Claims History.</h1>

        <Table responsive className="tables">
          <thead>
            <tr className="tableHeaders">
              <th className="tableHeaders">ID</th>
              <th className="tableHeaders">Name of Item</th>
              <th className="tableHeaders">Date of Claim</th>
              <th className="tableHeaders">Resolution</th>
              <th className="tableHeaders">Notes</th>
              <th className="tableHeaders">Update | Delete</th>
            </tr>
          </thead>
          <tbody>{this.claimMapper()}</tbody>
        </Table>
      </>
    );
  }
}

export default ClaimsTable;
