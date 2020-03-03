import React from "react";
// reactstrap components
import { Navbar } from "reactstrap";

class AdminNavbar extends React.Component {
  render() {
    return (
      <>
        <Navbar
          className="navbar-top navbar-dark"
          expand="md"
          id="navbar-main"
        ></Navbar>
      </>
    );
  }
}

export default AdminNavbar;
