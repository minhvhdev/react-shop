import React from "react";
import { Col, Container, Nav, Row, Tab } from "react-bootstrap";

function AccountPage() {
  return (
    <Container>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">Tab 1</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Tab 2</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Pariatur, ut autem aliquid quaerat facere nesciunt, quod unde
                eligendi, perspiciatis illum accusamus id quis amet explicabo
                nisi expedita? Soluta, rem aliquid?
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
                molestiae, repellendus inventore voluptatum illum sint accusamus
                nesciunt adipisci autem? Consectetur maiores aspernatur
                recusandae ea dolor ipsam beatae pariatur saepe iste!
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}

export default AccountPage;
