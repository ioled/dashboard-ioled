import React from "react";

import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";

import {
  setDeviceInfo,
  setLastSeen,
  setDeviceStatusColour
} from "../../functions/Devices";

class Device extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceName: this.props.info.deviceID,
      owner:
        this.props.info.user !== null ? this.props.info.user.fullName : "-",
      info: {
        state: {
          hum: "",
          temp: "",
          timestamp: ""
        },
        config: {
          duty: "",
          timestamp: ""
        }
      },
      loading: true,
      textInfo: "",
      lastSeen: "-",
      deviceColour: "",
      intervalID: ""
    };
  }

  setLastSeen() {
    if (
      this.state.info.config.timestamp !== null &&
      this.state.info.state.timestamp !== null
    )
      this.setState({
        lastSeen: setLastSeen(
          this.state.info.config.timestamp,
          this.state.info.state.timestamp
        )
      });
  }

  cleanInfo() {
    let state, config;

    if (this.state.info.state === null) {
      state = {
        hum: "-",
        temp: "-",
        timestamp: null
      };
    } else {
      state = {
        hum: `${this.state.info.state.hum.toFixed(2)}%`,
        temp: `${this.state.info.state.temp.toFixed(2)}°C`,
        timestamp: this.state.info.state.datetime
      };
    }

    if (this.state.info.config === null) {
      config = {
        duty: "-",
        timestamp: null
      };
    } else {
      config = {
        duty: `${this.state.info.config.duty.toFixed(2) * 100}%`,
        timestamp: this.state.info.config.datetime
      };
    }

    this.setState({
      info: {
        state,
        config
      }
    });
  }

  componentDidMount() {
    this.componentInit();
    const intervalID = setInterval(() => {
      this.componentInit();
    }, 60000);
    this.setState({ intervalID: intervalID });
  }

  async componentInit() {
    const data = await setDeviceInfo(this.state.deviceName);
    this.setState({ info: data });
    this.cleanInfo();
    this.setState({ loading: false });
    this.setLastSeen();
    this.setState({
      deviceColour: setDeviceStatusColour(this.state.info.state)
    });
    this.addInfo();
  }

  addInfo() {
    if (this.state.loading === false) {
      this.setState({
        textInfo: (
          <p className="mt-3 mb-0 text-sm text-dark">
            <span className="text-nowrap">
              Temperature: {this.state.info.state.temp}
            </span>
            <br></br>
            <span className="text-nowrap">
              Humidity: {this.state.info.state.hum}
            </span>
            <br></br>
            <span className="text-nowrap">
              Duty: {this.state.info.config.duty}
            </span>
            <br></br>
            <span className="text-nowrap">
              Last Seen: {this.state.lastSeen}
            </span>
          </p>
        )
      });
    }
  }

  addStateColour() {
    return (
      <>
        <Col className="col-auto">
          <div
            className={`icon icon-shape text-white rounded-circle shadow ${this.state.deviceColour}`}
          >
            <i className="fas fa-wifi"></i>
          </div>
        </Col>
      </>
    );
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalID);
  }

  render() {
    if (this.state.loading === false) {
      return (
        <>
          <Link to={`/details/${this.state.deviceName}`}>
            <Card className="card-stats mb-4">
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase text-muted mb-0"
                    >
                      {this.state.deviceName}
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0">
                      {this.state.owner}
                    </span>
                  </div>
                  {this.addStateColour()}
                </Row>
                {this.state.textInfo}
              </CardBody>
            </Card>
          </Link>
        </>
      );
    } else {
      return null;
    }
  }
}

export default Device;
