import React from "react";

import { Card, CardBody, CardHeader, Container, Row, Col } from "reactstrap";

class Header extends React.Component {
  render() {
    return (
      <>
        <div className="header bg-gradient-lighter pb-3 pt-5 pt-md-5">
          <Container fluid>
            <div className="header-body">
              <Row>
                <Col sm="12">
                  <Card className="card-stats mb-4 mb-xl-0 bg-light">
                    <CardHeader className="bg-gradient-gray">
                      <h2>Colour code & behaviour</h2>
                    </CardHeader>
                    <CardBody>
                      <h4>
                        Device colour will be <b> red</b> if it has never sent a
                        status to the system
                      </h4>
                      <h4>
                        Device colour will be <b> green</b> if the last state
                        was sent 60 seconds ago or less
                      </h4>
                      <h4>
                        In any other scenario the color will be <b>yellow</b>
                      </h4>
                      <h4>
                        The field: "Last seen" represents the last date and time
                        where the device received its last configuration or it
                        sent its last state (The most recent event)
                      </h4>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default Header;
