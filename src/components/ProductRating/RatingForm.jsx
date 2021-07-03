import RatingApi from "api/RatingApi";
import { addRate, updateRate } from "app/slice/ratingSlice";
import store from "app/store";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Form as BForm, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import StarRatings from "react-star-ratings";

const RatingForm = (props) => {
  const [rated, setRated] = useState();
  const handleClose = props.handleClose;
  const [star, setStar] = useState();
  // @ts-ignore
  const rates = useSelector((state) => state.rates);
  // @ts-ignore
  const logged = useSelector((state) => state.logged);
  const handleChangeStar = (star) => {
    setStar(star);
  };
  console.log("render form");
  useEffect(() => {
    rates.data.forEach((rate) => {
      if (rate.yourRate) {
        setRated(rate);
        setStar(rate.star);
      }
    });
  }, [rates]);
  return (
    <>
      <Modal show={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Đánh giá</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-0"></Modal.Body>
      </Modal>
      <Formik
        enableReinitialize={true}
        initialValues={{
          // @ts-ignore
          content: rated ? rated.content : "",
          star: star,
          id: +props.productId,
        }}
        onSubmit={async (values, { setSubmitting }) => {
          if(rated)
          store.dispatch(
            addRate({
              ...values,
              createDate: new Date(),
              fullName: logged.data.fullName,
              avatarLink: logged.data.avatarLink,
            })
          );
          store.dispatch(updateRate({ ...values }));
          handleClose();
          RatingApi.rating(values);
        }}
      >
        <Modal show={true} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Đánh giá</Modal.Title>
          </Modal.Header>
          <Modal.Body className="pt-0">
            <Form>
              <div className="d-flex justify-content-center mb-3">
                <StarRatings
                  starRatedColor="#008248"
                  rating={star}
                  changeRating={handleChangeStar}
                  numberOfStars={5}
                  name="rating"
                />
              </div>
              <BForm.Group className="mb-3" controlId="username">
                <Field name="content">
                  {({ field }) => (
                    <BForm.Control
                      autoComplete="off"
                      as="textarea"
                      {...field}
                      placeholder="Cho mọi người biết cảm nhận của bạn"
                    />
                  )}
                </Field>
              </BForm.Group>
              <Button
                variant="primary"
                className="my-3 float-end"
                type="submit"
              >
                Gửi đánh giá
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Formik>
    </>
  );
};
export default React.memo(RatingForm);
