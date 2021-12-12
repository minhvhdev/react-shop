import AdminApi from "api/AdminApi";
import { formatDateTime } from "lib/Helper";
import Loading from "layout/Loading";
import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { AiOutlineReload } from "react-icons/ai";
import Link from "next/link";

function AdminPendingOrderPage() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("loading");
  const handleReload = () => {
    setStatus("loading");
  };
  useEffect(() => {
    if (status === "loading") {
      AdminApi.getPendingOrder()
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
          Các đơn hàng đang chờ duyệt
        </span>
        <Button
          className="ms-auto my-3"
          variant="outline-primary"
          onClick={handleReload}
        >
          <AiOutlineReload className="icon" /> Làm mới
        </Button>
      </div>
      {status === "loading" ? (
        <Loading type="inline" />
      ) : (
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Họ và tên</th>
              <th>Ngày đặt</th>
              <th>Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.fullName}</td>
                  <td>{formatDateTime(item.orderDate, false)}</td>
                  <td>
                    <Link href={"/admin/order?id=" + item.id}>
                      <a>
                        <i className="icon-eye"></i> Xem
                      </a>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default AdminPendingOrderPage;
