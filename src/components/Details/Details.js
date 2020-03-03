import React from "react";

import { Link } from "react-router-dom";

// reactstrap components
import {
  Button,
  Container,
  Card,
  CardBody,
  CardHeader,
  Row,
  Col
} from "reactstrap";

import { Line } from "react-chartjs-2";

import {
  getDayGraph,
  getWeekGraph,
  getMonthGraph
} from "../../functions/Details";

import { getUserInfo } from "../../functions/Details";

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceName: this.props.match.params.id,
      dayGraph: {
        temp: {},
        hum: {}
      },
      weekGraph: {
        temp: {},
        hum: {}
      },
      monthGraph: {
        temp: {},
        hum: {}
      },
      user: {
        fullName: "",
        email: "",
        profilePic: ""
      }
    };
  }

  async getChartData() {
    const dataDay = await getDayGraph(this.state.deviceName);
    const dataWeek = await getWeekGraph(this.state.deviceName);
    const dataMonth = await getMonthGraph(this.state.deviceName);
    this.setState({
      dayGraph: { temp: dataDay.temperature, hum: dataDay.humidity }
    });
    this.setState({
      weekGraph: { temp: dataWeek.temperature, hum: dataWeek.humidity }
    });
    this.setState({
      monthGraph: { temp: dataMonth.temperature, hum: dataMonth.humidity }
    });
  }

  userInfo() {
    if (this.state.user !== null) {
      return (
        <>
          <div className="header bg-gradient-lighter pb-3 pt-5 pt-md-6">
            <Container fluid>
              <span className="avatar avatar-xl rounded-circle">
                <img alt="" src={this.state.user.profilePic} />
              </span>
              <h1>{`${this.state.user.fullName}${
                this.state.user.fullName[
                  this.state.user.fullName.length - 1
                ] !== "s"
                  ? "'s"
                  : "'"
              } device information`}</h1>
              <h3>{`Contact email: ${this.state.user.email}`}</h3>
              <h4>{`Device ID: ${this.state.deviceName}`}</h4>
            </Container>
          </div>
        </>
      );
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    getDayGraph(this.state.deviceName);
    (async () => {
      this.setState({ user: await getUserInfo(this.state.deviceName) });
      if (this.state.user === null) {
        this.setState({
          user: {
            profilePic: "",
            fullName: "",
            email: ""
          }
        });
      }
      await this.getChartData();
    })();
  }

  render() {
    return (
      <>
        {this.userInfo()}
        <Container fluid>
          <Link to={"/devices"}>
            <Button className="btn-icon btn-3" color="danger" type="button">
              <span className="btn-inner--icon">
                <i className="ni ni-bold-left" />
              </span>
              <span className="btn-inner--text">Back</span>
            </Button>
          </Link>
          <Row className="mt-4">
            <Col sm="12">
              <Card>
                <CardHeader className="bg-gradient-gray">
                  <h3>Day Graph</h3>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col sm="12" xl="6">
                      <Line data={this.state.dayGraph.hum}></Line>
                    </Col>
                    <Col sm="12" xl="6">
                      <Line data={this.state.dayGraph.temp}></Line>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col sm="12">
              <Card>
                <CardHeader className="bg-gradient-gray">
                  <h3>Week Graph</h3>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col sm="12" xl="6">
                      <Line data={this.state.weekGraph.hum}></Line>
                    </Col>
                    <Col sm="12" xl="6">
                      <Line data={this.state.weekGraph.temp}></Line>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col sm="12">
              <Card>
                <CardHeader className="bg-gradient-gray">
                  <h3>Month Graph</h3>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col sm="12" xl="6">
                      <Line data={this.state.monthGraph.hum}></Line>
                    </Col>
                    <Col sm="12" xl="6">
                      <Line data={this.state.monthGraph.temp}></Line>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Details;
