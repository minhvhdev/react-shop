import { fetchAllRate } from "app/slice/ratingSlice";
import store from "app/store";
import LoginForm from "components/Form/LoginForm";
import { formatDateTime } from "lib/Helper";
import Loading from "pages/layout/Loading";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import Select from "react-select";
import StarRatings from "react-star-ratings";
import RatingForm from "./RatingForm";

ProductRating.propTypes = {
  productId: PropTypes.number.isRequired,
};
function ProductRating(props) {
  const productId= props.productId;
  const [show, setShow] = useState(false);
  // @ts-ignore
  const logged = useSelector((state) => state.logged);
  // @ts-ignore
  const rates = useSelector((state) => state.rates);
  const [rateFilter, setRateFilter] = useState([]);
  const handleCloseForm = () => setShow(false);
  const [offset, setOffset] = useState(0);
  const perPage = 6;
  const [pageCount, setPageCount] = useState(0);
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage * perPage);
  };
  const handleSelectFilter = (filter) => {
    if (filter.value === 0) {
      setRateFilter(rates.data);
    } else {
      setRateFilter(
        rates.data.filter((item) => {
          return item.star === filter.value;
        })
      );
    }
  };
  
  useEffect(() => {
    setPageCount(Math.ceil(rates.data.length / perPage));
    setRateFilter(rates.data);

  }, [rates.data]);
  useEffect(() => {
    //@ts-ignore
    store.dispatch(fetchAllRate({ id: productId }))
  }, [productId,logged]);
  return (
    <>
      <div id="rating">
        {console.log("render rating")}
        {show ? (
          <>
            {logged.data ? (
              <RatingForm
                productId={props.productId}
                handleClose={handleCloseForm}
              />
            ) : (
              <LoginForm handleClose={handleCloseForm} />
            )}
          </>
        ) : null}
        <Row className="mb-3">
          <Col xs={12} lg={6}>
            <Row>
              <div className="col-xs-12 col-ssm-6 mb-2 m-ssm-0">
                <div className="d-flex">
                  <label
                    htmlFor="rating__filter"
                    className="rating__filter--label"
                  >
                    Lọc theo:
                  </label>
                  <Select
                    placeholder={"Chọn"}
                    onChange={handleSelectFilter}
                    className="w-100"
                    styles={{
                      option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isSelected ? "#008248" : "white",
                        "&:hover":{
                          backgroundColor:"#0082487e"
                        }
                      }),
                    }}
                    options={[
                      { value: 0, label: "Tất cả" },
                      { value: 1, label: "1 Sao" },
                      { value: 2, label: "2 Sao" },
                      { value: 3, label: "3 Sao" },
                      { value: 4, label: "4 Sao" },
                      { value: 5, label: "5 Sao" },
                    ]}
                  />
                </div>
              </div>
              <div className="col-xs-12 col-ssm-6">
                <Button onClick={() => setShow(true)} className="w-100">
                  Đánh giá
                </Button>
              </div>
            </Row>
          </Col>
        </Row>
        <Row className="position-relative mb-3">
          {rates.status === "loading" ? (
            <Loading type="inline" className="mt-3" />
          ) : rates.data.length > 0 ? (
            <>
              {rateFilter.slice(offset, offset + perPage).map((rate, index) => (
                <Col xs={12} key={index} className="rate__container">
                  <div className="rate__avatar">
                    <img src={rate.avatarLink} alt="avatar" />
                  </div>
                  <div className="rate__info">
                    <div className="fullname">
                      {rate.fullName} {rate.yourRate ? "(Bạn)" : null}
                    </div>
                    <StarRatings
                      rating={rate.star}
                      starRatedColor="#008248"
                      numberOfStars={5}
                      starDimension="12px"
                      starSpacing="1px"
                    />
                    <div>{rate.content}</div>
                    <div className="text-muted fs--11">
                      {formatDateTime(rate.createDate)}
                    </div>
                  </div>
                </Col>
              ))}
              {pageCount > 1 ? (
                <div className="d-flex justify-content-center mt-2">
                  <ReactPaginate
                    previousLabel={<GrCaretPrevious />}
                    nextLabel={<GrCaretNext />}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName="pagination"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    activeClassName="active"
                  />
                </div>
              ) : null}
            </>
          ) : (
            <p>Không có đánh giá nào</p>
          )}
        </Row>
      </div>
    </>
  );
}

export default React.memo(ProductRating);
