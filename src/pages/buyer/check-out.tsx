import orderApi from 'api/orderApi';
import CheckOutItem from 'components/CheckOutItem';
import AddressForm from 'components/Form/AddressForm';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import {
  Breadcrumb,
  Button,
  Col,
  Container,
  Form as BForm,
  Row,
  FormControlProps
} from 'react-bootstrap';
import { GoLocation } from 'react-icons/go';
import { useSelector } from 'react-redux';
import { checkShippingFee, resetOrder } from 'redux/slice/orderSlice';
import store, { RootState } from 'redux/store';
import * as Yup from 'yup';
//@ts-ignore
import Loading from 'layouts/Loading';
import NotFound from 'layouts/NotFound';
import { useRouter } from 'next/router';

import { resetCart } from 'redux/slice/shopcartSlice';
import { IOrder } from '@types';
import { genTemplateOrderInformationEmail, sendEmail } from '@helper';

interface formikValues {
  fullName: string;
  phone: string;
  note: string;
}

const CheckOutPage: React.FC = () => {
  const router = useRouter();
  const order = useSelector((state: RootState) => state.order).data;
  const refAddress = useRef<{ value: string }>({ value: '' });
  const [status, setStatus] = useState('idle');
  const sendEmailCallBacks: IEmailCallbacks<IOrder> = {
    genMessage: genTemplateOrderInformationEmail,
    onSuccess: function (): void {
      // TODO show notification
      if (!order.buyNow) {
        store.dispatch(resetCart());
      }
      router.push('/');
    },
    onError: function (): void {
      // TODO show notification
      setStatus('idle');
    }
  };

  const handleOnWard = (districtCode: string) => {
    store.dispatch(checkShippingFee(districtCode));
  };

  const handleSubmitNoLogin = (values: formikValues): IOrder | null => {
    const addressObj = JSON.parse(refAddress.current.value);
    const pCode = addressObj.province.value;
    const dCode = addressObj.district.value;
    const wCode = addressObj.ward.value;
    const street = addressObj.street;
    if (pCode && dCode && wCode && street !== '') {
      setStatus('idle');
      const addressStr = `${street} - ${addressObj.ward.label} - ${addressObj.district.label} - ${addressObj.province.label}`;
      return {
        fullName: values.fullName,
        phone: values.phone,
        note: values.note,
        address: addressStr,
        orderItems: order.orderItem
      };
    } else {
      setStatus('miss');
      return null;
    }
  };

  const handleSubmit = (values: formikValues) => {
    const order = handleSubmitNoLogin(values);

    if (order) {
      setStatus('loading');
      sendEmail(order, sendEmailCallBacks);
    }
  };

  return (
    <>
      {order.orderItem.length ? (
        <Container className=" position-relative">
          <Breadcrumb className="fs--11 mt-3">
            <li className="breadcrumb-item">
              <Link href="/">Trang chủ</Link>
            </li>
            <li className="breadcrumb-item">
              <Link href="/shopcart">Giỏ hàng của bạn</Link>
            </li>
            <Breadcrumb.Item active>Thanh toán</Breadcrumb.Item>
          </Breadcrumb>
          <Row>
            <Col xs={12} lg={7} className="order-2 order-lg-1 mb-3">
              <Formik
                enableReinitialize={true}
                initialValues={{
                  fullName: '',
                  phone: '',
                  note: ''
                }}
                validationSchema={Yup.object({
                  fullName: Yup.string().required('Đây là trường bắt buộc'),
                  phone: Yup.string().required('Đây là trường bắt buộc')
                })}
                onSubmit={handleSubmit}>
                <Form>
                  <>
                    <AddressForm ref={refAddress} onWard={handleOnWard} address={{}} />
                    <BForm.Text className="text-danger">
                      {status === 'miss' ? 'Chưa nhập đầy đủ địa chỉ!!!' : null}
                    </BForm.Text>
                  </>
                  <BForm.Group className="mb-3">
                    <BForm.Label>Họ và tên:*</BForm.Label>
                    <Field name="fullName">
                      {({ field }: { field: FormControlProps }) => (
                        <BForm.Control {...field} placeholder="Nhập họ và tên người nhận" />
                      )}
                    </Field>
                    <BForm.Text className="text-danger">
                      <ErrorMessage name="fullName" />
                    </BForm.Text>
                  </BForm.Group>
                  <BForm.Group className="mb-3">
                    <BForm.Label>Số điện thoại:*</BForm.Label>
                    <Field name="phone">
                      {({ field }: { field: FormControlProps }) => (
                        <BForm.Control {...field} placeholder="Nhập SĐT người nhận" />
                      )}
                    </Field>
                    <BForm.Text className="text-danger">
                      <ErrorMessage name="phone" />
                    </BForm.Text>
                  </BForm.Group>
                  <BForm.Group className="mb-3">
                    <BForm.Label>Ghi chú:</BForm.Label>
                    <Field name="note">
                      {({ field }: { field: FormControlProps }) => (
                        <BForm.Control
                          as="textarea"
                          {...field}
                          placeholder="Ghi chú thêm cho đơn hàng"
                        />
                      )}
                    </Field>
                  </BForm.Group>
                  <div className="d-flex justify-content-end">
                    <Button variant="primary" className="px-5" type="submit">
                      Đặt hàng
                    </Button>
                  </div>
                  {status === 'loading' ? (
                    <>
                      <div className="backdrop"></div>
                      <Loading type="inline" />
                    </>
                  ) : null}
                </Form>
              </Formik>
            </Col>
            <Col xs={12} lg={5} className="order-1 order-lg-2">
              <CheckOutItem />
              <hr className="d-block d-lg-none" />
            </Col>
          </Row>
        </Container>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default React.memo(CheckOutPage);
