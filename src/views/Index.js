import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// reactstrap components
import { Container } from "reactstrap";

import Devices from "../components/Devices/Devices";

import Details from "../components/Details/Details.js";

// core components

import Header from "components/Headers/Header.js";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: 1,
      chartExample1Data: "data1"
    };
  }
  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === "data1" ? "data2" : "data1"
    });
  };
  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route path="/devices">
              <Header></Header>
              <Container className="mt-4" fluid>
                <Devices></Devices>
              </Container>
            </Route>
            <Route path="/details/:id" component={Details}></Route>
          </Switch>
        </Router>
      </>
    );
  }
}

export default Index;
