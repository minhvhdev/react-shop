import AdminApi from "api/AdminApi";
import DatePickerForm from "components/Form/DatePickerForm";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { formatDateTime } from "lib/Helper";
import Loading from "layout/Loading";
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form as BForm,
  Row,
  Table,
} from "react-bootstrap";
import * as Yup from "yup";

function AdminPromotionPage() {
  const [status, setStatus] = useState("loading2");
  const [promotions, setPromotions] = useState([]);
  const handleRemove = (id, index) => {
    setStatus("loading2");
    AdminApi.removePromotion({ id })
      .then(() => {
        setStatus("idle");
        promotions.splice(index, 1);
        setPromotions([...promotions]);
      })
      .catch(() => {
        alert("Có lỗi xảy ra");
      });
  };

  useEffect(() => {
    AdminApi.getAllPromotion()
      .then((res) => {
        // @ts-ignore
        setPromotions(res);
      })
      .then(() => {
        setStatus("error");
      });
  }, []);
  return (
    <Container id="admin-promotion">
      <span className="fs--8 my-3 d-none d-md-inline-block">Mã giảm giá</span>
      <Row>
        <Col lg={5}>
          <Formik
            initialValues={{ code: "", endDate: "", max: 0 }}
            validationSchema={Yup.object({
              code: Yup.string().required("Đây là trường bắt buộc"),
              endDate: Yup.date().required("Đây là trường bắt buộc"),
              max: Yup.number().min(0, "Vui lòng nhập lớn hơn hoặc bằng 0"),
            })}
            onSubmit={(values) => {
              setStatus("loading");
              AdminApi.createPromotion(values).then((res) => {
                setStatus("idle");
                promotions.push(res);
                setPromotions([...promotions]);
              });
            }}
          >
            <Form>
              {status === "loading" ? (
                <div className="position-relative">
                  <Loading type="inline" />
                </div>
              ) : (
                <p className="text-danger text-center">
                  {status === "wrong"
                    ? "Sai tên đăng nhập hoặc mật khẩu"
                    : null}
                </p>
              )}
              <BForm.Group className="mb-3" controlId="email">
                <BForm.Label>Mã giảm giá*:</BForm.Label>
                <Field name="code">
                  {({ field }) => (
                    <BForm.Control
                      autoComplete="code"
                      type="text"
                      {...field}
                      placeholder="Nhập mã giảm giá"
                    />
                  )}
                </Field>
                <BForm.Text className="text-danger">
                  <ErrorMessage name="code" />
                </BForm.Text>
              </BForm.Group>
              <BForm.Group className="mb-3" controlId="email">
                <BForm.Label>Ngày hết hạn*:</BForm.Label>
                <DatePickerForm
                  name="endDate"
                  placeholder="Nhập ngày hết hạn (dd/MM/YYYY)"
                />
                <BForm.Text className="text-danger">
                  <ErrorMessage name="endDate" />
                </BForm.Text>
              </BForm.Group>
              <BForm.Group className="mb-3" controlId="password">
                <BForm.Label>
                  Lượt dùng tối đa (0 nếu không giới hạn):
                </BForm.Label>
                <Field name="max">
                  {({ field }) => (
                    <BForm.Control
                      autoComplete="password"
                      type="number"
                      {...field}
                      placeholder="Nhập mật khẩu"
                    />
                  )}
                </Field>
                <BForm.Text className="text-danger">
                  <ErrorMessage name="max" />
                </BForm.Text>
              </BForm.Group>
              <Button variant="primary" className="w-100 my-3" type="submit">
                Thêm mã
              </Button>
            </Form>
          </Formik>
        </Col>
        <Col lg={7} className="position-relative">
          {status === "loading2" ? (
            <Loading type="inline" />
          ) : (
            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>Mã</th>
                  <th>Ngày hết hạn</th>
                  <th>Tối đa</th>
                  <th>Đã dùng</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {promotions.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.code}</td>
                      <td>{formatDateTime(item.endDate, false)}</td>
                      <td>{item.max ? item.max : "Không giới hạn"}</td>
                      <td>{item.used}</td>
                      <td>
                        <button
                          className="btn btn-link p-0"
                          onClick={() => {
                            handleRemove(item.id, index);
                          }}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default AdminPromotionPage;
