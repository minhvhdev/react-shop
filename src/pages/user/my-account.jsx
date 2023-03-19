import AddressTab from "components/AddressTab";
import ChangePasswordForm from "components/Form/ChangePasswordForm";
import InfoTab from "components/InfoTab";
import Link from "next/link";
import React, { useState } from "react";
import { Breadcrumb, Col, Container, Nav, Row, Tab } from "react-bootstrap";

function AccountPage() {
  const [show,setShow] = useState(false);
  return (
    <Container>
      <Breadcrumb className="fs--11 mt-3">
        <li className="breadcrumb-item">
          <Link href="/">Trang chủ</Link>
        </li>
        <Breadcrumb.Item active>Quản lý tài khoản</Breadcrumb.Item>
      </Breadcrumb>
      <Tab.Container id="left-tabs-example" defaultActiveKey="1">
        <Row>
          <Col xs={12} md={3} className="mb-3 mb-md-0">
            <Nav variant="pills" className="flex-row flex-md-column shadow-lg">
              <Nav.Item>
                <Nav.Link eventKey="1"  onClick={()=>setShow(false)}>Thông tin</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="2"  onClick={()=>setShow(false)}>Địa chỉ</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="3" onClick={()=>setShow(true)}>Mật khẩu</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col xs={12} md={9}>
            <Tab.Content>
              <Tab.Pane eventKey="1">
                <InfoTab/>
              </Tab.Pane>
              <Tab.Pane eventKey="2">
                <AddressTab/>
              </Tab.Pane>
              <Tab.Pane eventKey="3">
                {show?<ChangePasswordForm/>:null}
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}

export default React.memo(AccountPage);
