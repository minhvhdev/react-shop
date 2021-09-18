import AdminApi from "api/AdminApi";
import { formatDateTime } from "lib/Helper";
import Loading from "pages/layout/Loading";
import React, { useEffect, useState } from "react";
import { Button, Container, Modal, Table } from "react-bootstrap";
import { BiFilterAlt } from "react-icons/bi";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function AdminAllOrderPage() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("loading");
  const [show, setShow] =useState(false);
  const handleCloseModal = () => {
    setShow(false);
  };
  const handleStatus = (status) => {
    switch (status) {
      case -2:
        return <span className="text-danger">Không nhận hàng</span>;
      case -1:
        return <span className="text-danger">Hủy đơn</span>;
      case 0:
        return <span className="text-primary">Đợi duyệt</span>;
      case 1:
        return <span className="text-primary">Đang vận chuyển</span>;
      case 2:
        return <span className="text-primary">Hoàn thành</span>;
    }
  };
  useEffect(() => {
    if (status === "loading") {
      AdminApi.getAllOrder()
        .then((res) => {
          // @ts-ignore
          setOrders(res);
          setStatus("idle");
        })
        .catch(() => {
          setStatus("error");
        });
    }
  }, [status]);
  return (
    <Container fluid="xl" id="pending-order">
      <div className="d-flex">
        <span className="fs--8 my-3 d-none d-md-inline-block">
          Tất cả các đơn hàng
        </span>
        <Button
          className="ms-auto my-3"
          variant="outline-primary"
          onClick={()=>{setShow(true)}}
        >
          <BiFilterAlt className="icon" /> Lọc
        </Button>
      </div>
      {status === "loading" ? (
        <Loading type="inline" />
      ) : (
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>Họ và tên</th>
              <th>Ngày đặt</th>
              <th>Trạng thái</th>
              <th>Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.fullName}</td>
                  <td>{formatDateTime(item.orderDate, false)}</td>
                  <td>{handleStatus(item.orderStatus)}</td>
                  <td>
                    <Link to={"/admin/order?id=" + item.id}>
                      <i className="icon-eye"></i> Xem
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
      <Modal show={show} onHide={handleCloseModal}>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
              <p>Modal body text</p>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center">
              <Button onClick={handleCloseModal}>
                  Lọc đơn hàng
              </Button>
          </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AdminAllOrderPage;
