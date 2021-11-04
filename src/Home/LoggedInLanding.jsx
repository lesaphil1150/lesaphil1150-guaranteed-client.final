import React, { Component } from "react";
import { Button } from "reactstrap";
import { Route, Link, Swtich } from "react-router-dom";

class LoggedInLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hour: "",
    };
  }

  componentDidMount() {
    this.getHour();
  }

  getHour = () => {
    const date = new Date();
    const hour = date.getHours();
    this.setState({
      hour,
    });
  };

  render() {
    const { hour } = this.state;
    return (
      <div>
        <h2 className="LandingPageHeader">
          {" "}
          <h1 className="greeting">
            {hour < 12
              ? `Good Morning, ${this.props.name}`
              : `Good Evening, ${this.props.name}`}
          </h1>
          <br />
          View.
        </h2>{" "}
        <Link to="/claims">
          <Button color="none" className="claimsButton">
            Claims.
          </Button>
        </Link>
        <Link to="/warranties">
          <Button color="none" className="claimsButton">
            Warranties.
          </Button>
        </Link>
      </div>
    );
  }
}

export default LoggedInLanding;
