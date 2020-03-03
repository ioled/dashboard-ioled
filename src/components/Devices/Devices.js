import React from "react";

import { Row, Col } from "reactstrap";

import Device from "./Device";

import { getDevices } from "../../functions/Devices";

class Devices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      devices: {},
      items: []
    };
  }

  componentDidMount() {
    (async () => {
      const devices = await getDevices();
      this.setState({ devices: devices });
      for (let index = 0; index < this.state.devices.length; index++) {
        this.state.items.push(
          <Col s="12" lg="3" key={index}>
            <Device info={this.state.devices[index]}></Device>
          </Col>
        );
      }
      this.setState({ loading: false });
    })();
  }

  render() {
    if (this.state.loading === false) {
      return (
        <>
          <Row>{this.state.items}</Row>
        </>
      );
    } else return null;
  }
}

export default Devices;
